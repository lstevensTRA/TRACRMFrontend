if (typeof (CrmJS) === "undefined") {
    CrmJS = { __namespace: true };
}

CrmJS.OpportunityFunctions = {

    //*************** Option Sets**************

    CONST_OPTIONSETS: {

        MaritalStatus: {
            Single: {
                intValue: 0,
                textValue: "Single"
            },
            MarriedFilingJointly: {
                intValue: 1,
                textValue: "Married Filing Jointly"
            },
            MarriedFilingSeparate: {
                intValue: 2,
                textValue: "Married Filing Separate"
            },
            HeadOfHousehold: {
                intValue: 3,
                textValue: "Head of Household"
            },
            Widower: {
                intValue: 4,
                textValue: "Widower"
            }
        }
    },

    //******* On Load *******
    onLoad: function (executionContext) {
        CrmJS.OpportunityFunctions.initialize(executionContext);
        CrmJS.OpportunityFunctions.process(executionContext);
        var formContext = executionContext.getFormContext();
        /*formContext.data.process.addOnStageChange(function() {
            CrmJS.OpportunityFunctions.changeOpportunityStageToFinancial(executionContext);
        });*/

    },

    initialize: function (executionContext) {
        Common.globalUIContext = executionContext;
    },

    process: function (executionContext) {
        //On Load Methods
        CrmJS.OpportunityFunctions.showHideBusinesssection(executionContext);
        CrmJS.OpportunityFunctions.showHideIRSsection(executionContext);
        CrmJS.OpportunityFunctions.showHiderevenueofficersection(executionContext);
        CrmJS.OpportunityFunctions.SetCashonHands(executionContext);
        CrmJS.OpportunityFunctions.SetCashinBanks(executionContext);
        CrmJS.OpportunityFunctions.setVisibilityOfSpouseContactDetials(executionContext);
        CrmJS.OpportunityFunctions.setVisibilityOfSpouseInfoSection(executionContext);
        CrmJS.OpportunityFunctions.makeReadOnlySpouseInfoSection(executionContext);
        CrmJS.OpportunityFunctions.NetBusinessIncome(executionContext);

    },

    //*************** On Save *********************
    onSave: function (executionContext) {
        CrmJS.OpportunityFunctions.makeReadOnlySpouseInfoSection(executionContext);
    },

    /************************************* onchange functions*************************************/

    //***************** Spouse Birthdate On Change *****************************
    onSpouseBirthdateChange: function (executionContext) {
        CrmJS.OpportunityFunctions.validateSpouseBirthdate(executionContext);
    },

    //********* Zip Code On Change ************************
    onZipCodeChange: function (executionContext) {
        CrmJS.OpportunityFunctions.validateZipCode(executionContext);
    },

    //********* Business Field On Change ************************
    onBusinessFieldChange: function (executionContext) {
        CrmJS.OpportunityFunctions.showHideBusinesssection(executionContext);
    },

    //********* Received Letter On Change ************************
    onReceivedLetterFieldChange: function (executionContext) {
        CrmJS.OpportunityFunctions.showHideIRSsection(executionContext);
    },

    //********* Currently Assigned Officer On Change ************************
    onCurrentlyAssignedOfficerFieldChange: function (executionContext) {
        CrmJS.OpportunityFunctions.showHiderevenueofficersection(executionContext);
    },

    //********* Market Value On Change ************************
    onMarketvalueFieldChange: function (executionContext) {
        CrmJS.OpportunityFunctions.SetCashonHands(executionContext);
    },

    //********* Marke tValue Cash In Bank On Change ************************
    OnMarketValueCashinBankChange: function (executionContext) {
        CrmJS.OpportunityFunctions.SetCashinBanks(executionContext);
    },

    //********* Receivables Value On Change ************************
    onReceivablesValueChange: function (executionContext) {
        CrmJS.OpportunityFunctions.SetReceivablesAsset(executionContext);
    },

    //********* Other Asset Value On Change ************************
    onOtherAssetValueChange: function (executionContext) {
        CrmJS.OpportunityFunctions.SetOtherAssets(executionContext);
    },

    //********* Asset Value On Change ************************
    onAssetsvaluechange: function (executionContext) {
        CrmJS.OpportunityFunctions.TotalBusinessAssets(executionContext);
    },

    //********* Marital Status On Change ************************
    onmaritalstatuschange: function (executionContext) {
        CrmJS.OpportunityFunctions.setVisibilityOfSpouseContactDetials(executionContext);
        CrmJS.OpportunityFunctions.setVisibilityOfSpouseInfoSection(executionContext);
        CrmJS.OpportunityFunctions.clearSpouseInfoFieldsValueAndMakeEnable(executionContext);
    },

    //********* Spouse SSN On Change ************************
    onSpouseSSNChange: function (executionContext) {
        CrmJS.OpportunityFunctions.validateSSN(executionContext);
    },
    //********************Federal,Local and State Tax On Change*****************
    onTaxChange: function (executionContext) {
        CrmJS.OpportunityFunctions.TotalTaxForInterview(executionContext);
    },
    //*************On Total Monthly Income & Expense Change ******************
    onTotalMonthlyExpenseAndIncomeChange: function (executionContext) {
        CrmJS.OpportunityFunctions.NetBusinessIncome(executionContext);
    },

    //*******************************************onChange/Onload/onSave*****************************************************

    showHideIRSsection: function (executionContext) {
        var ReceivedLetter = Common.getAttributeValue(executionContext, "tra_didyoureceivealetterinthemail");

        if (ReceivedLetter === 0) {
            Common.setSectionVisible(executionContext, "tra_tabinterview", "tra_secinterview_section_6", true);
        }
        else {
            Common.setSectionVisible(executionContext, "tra_tabinterview", "tra_secinterview_section_6", false);
        }
    },

    showHideBusinesssection: function (executionContext) {
        var IsthatBusinessorPersonal = Common.getAttributeValue(executionContext, "tra_optandisthatbusinessorpersonal");

        if (IsthatBusinessorPersonal === 0 || IsthatBusinessorPersonal === 4) {
            Common.setSectionVisible(executionContext, "tra_tabinterview", "tra_tabinterview_section_5", false);
        }
        else if (IsthatBusinessorPersonal === 1 || IsthatBusinessorPersonal === 2 || IsthatBusinessorPersonal === 3) {
            Common.setSectionVisible(executionContext, "tra_tabinterview", "tra_tabinterview_section_5", true);
        }
    },

    showHiderevenueofficersection: function (executionContext) {
        var revenueofficer = Common.getAttributeValue(executionContext, "tra_currentlyhaveassignedtoarevenueofficer");

        if (revenueofficer === false) {
            Common.setSectionVisible(executionContext, "tra_tabinterview", "tra_secrevenueofficerdetails", false);
        }
        else if (revenueofficer === true) {
            Common.setSectionVisible(executionContext, "tra_tabinterview", "tra_secrevenueofficerdetails", true);
        }
    },

    validateZipCode: function (executionContext) {
        CrmJS.OpportunityFunctions.formatZipCode(executionContext, "tra_homeaddresszipcode");
        CrmJS.OpportunityFunctions.formatZipCode(executionContext, "tra_mailaddresszipcode");
        CrmJS.OpportunityFunctions.formatZipCode(executionContext, "tra_businessaddresszipcode");
    },

    formatZipCode: function (executionContext, fieldName) {
        var postalCode = Common.getAttributeValue(executionContext, fieldName);
        var control = Common.getControl(executionContext, fieldName);


        control.clearNotification();

        if (!postalCode) {
            return;
        }

        var sanitizedPostalCode = postalCode.replace(/-/g, "");

        if (sanitizedPostalCode.length !== 9 && sanitizedPostalCode.length !== 5) {
            control.setNotification("Please enter a valid ZIP code in the format 00000-0000/00000.");
            return;
        }

        var formattedPostalCode = "";
        if (sanitizedPostalCode.length > 0) {

            formattedPostalCode += sanitizedPostalCode.substring(0, 5);


            if (sanitizedPostalCode.length > 5) {
                formattedPostalCode += '-';
            }

            formattedPostalCode += sanitizedPostalCode.substring(5, 9);
        }

        Common.setAttributeValue(executionContext, fieldName, formattedPostalCode);
    },

    validateSSN: function (executionContext) {
        CrmJS.OpportunityFunctions.formatSSN(executionContext, "tra_spousessn");
    },

    formatSSN: function (executionContext, fieldName) {
        var ssnValue = Common.getAttributeValue(executionContext, fieldName);

        if (!ssnValue) {
            Common.getControl(executionContext, fieldName).clearNotification();
            return;
        }

        ssnValue = ssnValue.replace(/[^a-zA-Z0-9]/g, '');

        if (ssnValue.length !== 9) {
            Common.getControl(executionContext, fieldName).setNotification("Please enter in XXX-XX-XXXX format.");
            return;
        } else {
            Common.getControl(executionContext, fieldName).clearNotification();
        }

        var formattedSSN = "";
        if (ssnValue.length > 0) formattedSSN += ssnValue.substring(0, 3);
        if (ssnValue.length > 3) formattedSSN += '-';
        if (ssnValue.length > 3) formattedSSN += ssnValue.substring(3, 5);
        if (ssnValue.length > 5) formattedSSN += '-';
        if (ssnValue.length > 5) formattedSSN += ssnValue.substring(5, 9);
        Common.setAttributeValue(executionContext, fieldName, formattedSSN);
    },

    setVisibilityOfSpouseContactDetials: function (executionContext) {
        var maritalstatus = Common.getAttributeValue(executionContext, "tra_maritalstatus");
        if (maritalstatus != null) {
            if (maritalstatus === 0 || maritalstatus === 3) {
                Common.setSectionVisible(executionContext, "tra_tabclientdetails", "tra_secemployment-spouse", false);
                Common.setSectionVisible(executionContext, "tra_tabclientdetails", "tra_sechouseholdsize-spouse", false);
            }
            else if (maritalstatus === 1 || maritalstatus === 2 || maritalstatus === 4) {
                Common.setSectionVisible(executionContext, "tra_tabclientdetails", "tra_secemployment-spouse", true);
                Common.setSectionVisible(executionContext, "tra_tabclientdetails", "tra_sechouseholdsize-spouse", true);
            }
        }
        else {
            Common.setSectionVisible(executionContext, "tra_tabclientdetails", "tra_secemployment-spouse", false);
            Common.setSectionVisible(executionContext, "tra_tabclientdetails", "tra_sechouseholdsize-spouse", false);
        }
    },

    setVisibilityOfSpouseInfoSection: function (executionContext) {
        var maritalstatus = Common.getAttributeValue(executionContext, "tra_maritalstatus");

        Common.setSectionVisible(executionContext, "tra_tabclientinformation", "tra_secSpouseContactInformation", false);
        Common.setAttributesRequiredLevel(executionContext, ["tra_spouselastname"], "none");

        if (!Common.isBlankOrNull(maritalstatus)) {
            if (maritalstatus !== CrmJS.OpportunityFunctions.CONST_OPTIONSETS.MaritalStatus.Single.intValue &&
                maritalstatus !== CrmJS.OpportunityFunctions.CONST_OPTIONSETS.MaritalStatus.HeadOfHousehold.intValue) {
                Common.setSectionVisible(executionContext, "tra_tabclientinformation", "tra_secSpouseContactInformation", true);
                Common.setAttributesRequiredLevel(executionContext, ["tra_spouselastname"], "required");
            }
        }
    },

    clearSpouseInfoFieldsValueAndMakeEnable: function (executionContext) {
        var maritalstatus = Common.getAttributeValue(executionContext, "tra_maritalstatus");
        if (!Common.isBlankOrNull(maritalstatus)) {
            if (maritalstatus !== CrmJS.OpportunityFunctions.CONST_OPTIONSETS.MaritalStatus.Single.intValue &&
                maritalstatus !== CrmJS.OpportunityFunctions.CONST_OPTIONSETS.MaritalStatus.HeadOfHousehold.intValue) {
                Common.setControlsDisable(executionContext, ["tra_spousefirstname", "tra_spousemiddlename", "tra_spouselastname", "tra_spousedateofbirth", "tra_spousessn", "tra_spousedeceased", "tra_spousedod", "tra_spousehomephone", "tra_spouseworkphone", "tra_spousemobilephone", "tra_spousefax", "emailaddress"], false);
            } else {
                Common.setAttributeValue(executionContext, "tra_spousefirstname", null);
                Common.setAttributeValue(executionContext, "tra_spousemiddlename", null);
                Common.setAttributeValue(executionContext, "tra_spouselastname", null);
                Common.setAttributeValue(executionContext, "tra_spousedateofbirth", null);
                Common.setAttributeValue(executionContext, "tra_spousessn", null);
                Common.setAttributeValue(executionContext, "tra_spousedeceased", null);
                Common.setAttributeValue(executionContext, "tra_spousedod", null);
                Common.setAttributeValue(executionContext, "tra_spousehomephone", null);
                Common.setAttributeValue(executionContext, "tra_spouseworkphone", null);
                Common.setAttributeValue(executionContext, "tra_spousemobilephone", null);
                Common.setAttributeValue(executionContext, "tra_spousefax", null);
                Common.setAttributeValue(executionContext, "emailaddress", null);
            }
        }
    },

    makeReadOnlySpouseInfoSection: function (executionContext) {
        var maritalstatus = Common.getAttributeValue(executionContext, "tra_maritalstatus");

        if (!Common.isBlankOrNull(maritalstatus)) {

            if (maritalstatus !== CrmJS.OpportunityFunctions.CONST_OPTIONSETS.MaritalStatus.Single.intValue &&
                maritalstatus !== CrmJS.OpportunityFunctions.CONST_OPTIONSETS.MaritalStatus.HeadOfHousehold.intValue) {

                var lastName = Common.getAttributeValue(executionContext, "tra_spouselastname");
                if (!Common.isBlankOrNull(lastName)) {
                    Common.setControlsDisable(executionContext, ["tra_spousefirstname", "tra_spousemiddlename", "tra_spouselastname", "tra_spousedateofbirth", "tra_spousessn", "tra_spousedeceased", "tra_spousedod", "tra_spousehomephone", "tra_spouseworkphone", "tra_spousemobilephone", "tra_spousefax", "emailaddress"], true);
                }
            }
        }
    },

    validateSpouseBirthdate: function (executionContext) {
        var spouseBirthDate = Common.getAttributeValue(executionContext, "tra_spousedateofbirth");
        if (!Common.isBlankOrNull(spouseBirthDate)) {

            var spouseDate = new Date(spouseBirthDate);
            var today = new Date();

            // Remove the time part
            spouseDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            if (spouseDate > today) {
                Common.setControlNotification(executionContext, "tra_spousedateofbirth", "You can't select future date as a birthdate. Please select valid date.", "101")
            } else {
                Common.clearControlNotification(executionContext, "tra_spousedateofbirth", "101");
            }
        }
    },

    // Functions for MonthlyIncome Calculation

    SetCashonHands: function (executionContext) {
        var MarketValueCashonhand = Common.getAttributeValue(executionContext, "tra_marketvaluecashonhand");
        if (MarketValueCashonhand != null) {
            Common.setAttributeValue(executionContext, "tra_assetvaluecashonhand", MarketValueCashonhand);
        }
    },

    SetCashinBanks: function (executionContext) {
        var MarketValueCashinBank = Common.getAttributeValue(executionContext, "tra_marketvaluecashinbanks");
        if (MarketValueCashinBank != null) {
            Common.setAttributeValue(executionContext, "tra_assetvaluecashinbanks", MarketValueCashinBank);
        }
    },

    SetReceivablesAsset: function (executionContext) {
        var receivablesMarketvalue = Common.getAttributeValue(executionContext, "tra_marketvaluereceivables");
        var receivablesQuickSale = Common.getAttributeText(executionContext, "tra_quicksalereceivables").replace("%", "");
        var receivablesLoan = Common.getAttributeValue(executionContext, "tra_loansreceivables");
        var assetCalculation = (receivablesMarketvalue * receivablesQuickSale / 100) - receivablesLoan;
        Common.setAttributeValue(executionContext, "tra_assetvaluereceivables", assetCalculation);
    },

    SetOtherAssets: function (executionContext) {
        var OtherAssetsMarketvalue = Common.getAttributeValue(executionContext, "tra_marketvalueotherassets");
        var OtherAssetsQuickSale = Common.getAttributeText(executionContext, "tra_quicksaleotherassets");
        if (OtherAssetsQuickSale != null) {
            var OtherAssetsQuickSaleformattedvalue = Common.getAttributeText(executionContext, "tra_quicksaleotherassets").replace("%", "");
            var OtherAssetsLoan = Common.getAttributeValue(executionContext, "tra_loansotherassets");
            var assetCalculation = (OtherAssetsMarketvalue * OtherAssetsQuickSaleformattedvalue / 100) - OtherAssetsLoan;
            Common.setAttributeValue(executionContext, "tra_assetvalueotherassets", assetCalculation);
        }
        else {
            alert("Please Enter the Quick Sale");
        }

    },

    TotalBusinessAssets: function (executionContext) {
        //marketvalue-cash in bank
        var MarketValueCashinBank = Common.getAttributeValue(executionContext, "tra_marketvaluecashinbanks");
        //marketvalue- cash on hand
        var MarketValueCashonhand = Common.getAttributeValue(executionContext, "tra_marketvaluecashonhand");
        //calculation of receivables asset
        var receivablesMarketvalue = Common.getAttributeValue(executionContext, "tra_marketvaluereceivables");
        var receivablesQuickSale = Common.getAttributeText(executionContext, "tra_quicksalereceivables").replace("%", "");
        var receivablesLoan = Common.getAttributeValue(executionContext, "tra_loansreceivables");
        var assetCalculation = (receivablesMarketvalue * receivablesQuickSale / 100) - receivablesLoan;
        //calculation fo other assets
        var OtherAssetsMarketvalue = Common.getAttributeValue(executionContext, "tra_marketvalueotherassets");
        var OtherAssetsQuickSale = Common.getAttributeText(executionContext, "tra_quicksaleotherassets").replace("%", "");
        var OtherAssetsLoan = Common.getAttributeValue(executionContext, "tra_loansotherassets");
        var assetCalculation1 = (OtherAssetsMarketvalue * OtherAssetsQuickSale / 100) - OtherAssetsLoan;
        //Final Calculation
        var TotalBusinessAssets = (MarketValueCashinBank + MarketValueCashonhand + assetCalculation + assetCalculation1);
        if (TotalBusinessAssets !== null) {
            Common.setAttributeValue(executionContext, "tra_totalbusinessselfemployedassets", TotalBusinessAssets);
        }
    },

    TotalTaxForInterview: function (executionContext) {
        var FederalTax = Common.getAttributeValue(executionContext, "tra_federaltax");
        var StateTax = Common.getAttributeValue(executionContext, "tra_statetax");
        var LocalTax = Common.getAttributeValue(executionContext, "tra_localtax");
        var Totalamount = (FederalTax + StateTax + LocalTax);
        Common.setAttributeValue(executionContext, "tra_totaltax2", Totalamount);
    },

    NetBusinessIncome: function (executionContext) {
        var MonthlyGross = Common.getAttributeValue(executionContext, "tra_totalmonthlygrossincome");
        var MonthlyExpense = Common.getAttributeValue(executionContext, "tra_totalmonthlyexpenses");
        var Totalamount = (MonthlyExpense + MonthlyGross)
        Common.setAttributeValue(executionContext, "tra_netbusinessincome", Totalamount);

    },

    //******************************************* Ribbon Buttons ********************************************************

    RB_CreateInvoice_OnClick: function (executionContext) {
        var formContext = Common.getFormContext(executionContext);
        if (formContext !== null) {
            //Show progress indicator
            Xrm.Utility.showProgressIndicator("Processing");

            var opportunityId = Common.removeCurlyBraceFromGuid(formContext.data.entity.getId());

            var opportunityName = formContext.data.entity.getEntityName();

            Common.callGlobalOrLocalActionAsync("tra_ActionCallPluginOnClickofCreateInvoice", opportunityName,
                opportunityId, null,
                function (result) {
                    if (result != null) {
                        if (result.InvoiceID !== null) {
                            //Close progress indicator;
                            Xrm.Utility.closeProgressIndicator();
                            Common.openAlertDialog("OK", "Invoice Successfully Created. Invoice ID: " + result.InvoiceID);
                        }
                        else {
                            //Close progress indicator;
                            Xrm.Utility.closeProgressIndicator();
                        }
                    }
                    else {
                        //Close progress indicator;
                        Xrm.Utility.closeProgressIndicator();
                    }
                },
                function (errorStatus) {
                    //Close progress indicator
                    Xrm.Utility.closeProgressIndicator();
                    Common.openAlertDialog("OK", "Error while Creating Invoice!");
                });
        }

    },
    changeOpportunityStageToFinancial: function (executionContext) {
        var formContext = executionContext;
        if (executionContext.getFormContext != undefined)
            formContext = executionContext.getFormContext();
        debugger;
        var opportunityId = formContext.data.entity.getId();
        Xrm.WebApi.retrieveMultipleRecords("new_bpf_6c80ca80a14e434fa49fcaa936f640f7", "?$filter=_bpf_opportunityid_value eq " + opportunityId).then(
            function success(results) {
                debugger;
                console.log(results);
                var bpfId = "";
                for (var i = 0; i < 1; i++) {
                    var result = results.entities[i];
                    // Columns
                    if (result._bpf_tra_financialsid_value != undefined || result._bpf_tra_financialsid_value != null) {
                        //var financial_id = result["tra_financialsid"]; // mscrm.tra_financials
                        var pageInput = {
                            pageType: "entityrecord",
                            entityName: "tra_financials",
                            entityId: result._bpf_tra_financialsid_value
                        };
                        var navigationOptions = {
                            target: 1
                        };
                        Xrm.Navigation.navigateTo(pageInput, navigationOptions);
                        return;
                    }
                    else {
                        bpfId = result["businessprocessflowinstanceid"]; // Guid
                        CrmJS.OpportunityFunctions.getOpportunityBPFId(executionContext, bpfId);
                    }
                }

            },
            function (error) {
                console.log(error.message);
            }
        );
    },
    getOpportunityBPFId: function (executionContext, bpfId) {
        debugger;
        var execute_tra_MoveOpportunitytonextStage_Request =
        {
            // Parameters
            entity: { entityType: "new_bpf_6c80ca80a14e434fa49fcaa936f640f7", id: bpfId }, // entity

            getMetadata: function () {
                return {
                    boundParameter: "entity",
                    parameterTypes: {
                        entity: { typeName: "mscrm.new_bpf_6c80ca80a14e434fa49fcaa936f640f7", structuralProperty: 5 }
                    },
                    operationType: 0, operationName: "tra_MoveOpportunitytonextStage"
                };
            }
        };

        Xrm.WebApi.execute(execute_tra_MoveOpportunitytonextStage_Request).then(
            function success(response) {
                debugger;
                if (response.ok) {
                    return response.json();
                }
            }
        ).then(function (responseBody) {
            var result = responseBody;
            console.log(result);
            // Return Type: mscrm.tra_MoveOpportunitytonextStageResponse
            // Output Parameters
            var financial_id = result["tra_financialsid"]; // mscrm.tra_financials
            var pageInput = {
                pageType: "entityrecord",
                entityName: "tra_financials",
                entityId: financial_id
            };
            var navigationOptions = {
                target: 1
            };
            Xrm.Navigation.navigateTo(pageInput, navigationOptions);
        }).catch(function (error) {
            console.log(error.message);
        });
    },
    namespace: true
};

CrmJS.TRAOpportunity = {
    USED_FIELDS: [],
    FIELD_SECTION_MAP: {},

    onLoad: async function (executionContext) {
        var formContext = executionContext.getFormContext();
        Xrm.Utility.showProgressIndicator("Please wait...");
        CrmJS.TRAOpportunity.manageSectionandFontStyles(formContext);
        try {
            const formType = formContext.ui.getFormType();
            if (formType !== 1) {
                // Get the side pane if it exists and close it initially
                const pane = Xrm.App.sidePanes.getPane("CustomWebResourcePane");
                if (pane) {
                    pane.close();
                }
                const opportunityId = formContext.data.entity.getId();
                if (opportunityId) {
                    const cleanId = opportunityId.replace("{", "").replace("}", "");
                    // Include statusreason in the select query
                    const opportunityRecord = await Xrm.WebApi.retrieveRecord(
                        "opportunity",
                        cleanId,
                        "?$select=_tra_currentsection_value,statuscode"
                    );

                    // Check statusreason (statuscode) - only proceed if 1 or 2
                    const statusReason = opportunityRecord.statuscode;
                    if (statusReason !== 1 && statusReason !== 2) {
                        // Status reason is not 1 or 2, do not open the side panel or proceed
                        const tabs = Xrm?.Page.ui.tabs;
                        if (!tabs) retur
                        const entityName = Xrm?.Page.data.entity.getEntityName();
                        const summaryTabs = ["Summary", "Summary_2"];
                        if (entityName === "opportunity") {
                            // Show all tabs except those in summaryTabs, and show all sections in visible tabs
                            tabs.forEach(tab => {
                                const tabName = tab.getName();
                                if (summaryTabs.includes(tabName)) {
                                    tab.setVisible(false);
                                } else {
                                    tab.setVisible(true);
                                    const sections = tab.sections;
                                    sections.forEach(section => {
                                        section.setVisible(true);
                                    });
                                }
                            });
                            return;
                        }
                        return;
                    };
                    const currentSectionId = opportunityRecord["_tra_currentsection_value"];
                    if (currentSectionId) {
                        const rawSectionName = opportunityRecord["_tra_currentsection_value@OData.Community.Display.V1.FormattedValue"];
                        const match = rawSectionName.match(/\d+/);
                        const currentSectionName = match ? match[0] : null;
                        if (currentSectionName) {
                            CrmJS.TRAOpportunity.RB_InterviewScripts_OnClick(formContext, currentSectionName);
                        } else {
                            CrmJS.TRAOpportunity.RB_InterviewScripts_OnClick(formContext, 4); // default fallback
                        }
                    } else {
                        CrmJS.TRAOpportunity.RB_InterviewScripts_OnClick(formContext, 4); // fallback if section not found
                    }
                } else {
                    CrmJS.TRAOpportunity.RB_InterviewScripts_OnClick(formContext, 4); // fallback if opportunityId not found
                }
            } else {
                CrmJS.TRAOpportunity.RB_InterviewScripts_OnClick(formContext, 4); // fallback for create form
            }
        } catch (error) {
            console.error("Error during onLoad:", error);
        } finally {
            Xrm.Utility.closeProgressIndicator();
            setInterval(() => {
                CrmJS.TRAOpportunity.manageSectionandFontStyles(formContext);
            }, 1000);
        }
    },

    sendForApproval: async function (primaryControl) {
        const formContext = primaryControl;
        const confirmResult = await Xrm.Navigation.openConfirmDialog({
            title: "Send for Approval",
            text: "Are you sure you want to send this opportunity for approval?"
        });
        if (!confirmResult.confirmed) return;
        try {
            Xrm.Utility.showProgressIndicator("Sending for approval...");
            const opportunityId = formContext.data.entity.getId().replace(/[{}]/g, "");
            const updateFields = {
                statuscode: 211050002 // "Sent for Approval" status reason
            };
            await Xrm.WebApi.updateRecord("opportunity", opportunityId, updateFields);
            await formContext.data.refresh();
            await formContext.ui.refreshRibbon();
            // Status reason is not 1 or 2, do not open the side panel or proceed
            const tabs = Xrm?.Page.ui.tabs;
            if (!tabs) return;
            const summaryTabs = ["Summary", "Summary_1", "Summary_2", "Summary_3"];
            // Show all tabs except those in summaryTabs, and show all sections in visible tabs
            tabs.forEach(tab => {
                const tabName = tab.getName();
                if (summaryTabs.includes(tabName)) {
                    tab.setVisible(false);
                } else {
                    tab.setVisible(true);
                    const sections = tab.sections;
                    sections.forEach(section => {
                        section.setVisible(true);
                    });
                }
            });
            formContext.ui.setFormNotification("Opportunity sent for approval.", "INFO", "approvalSent");
            setTimeout(() => {
                formContext.ui.clearFormNotification("approvalSent");
            }, 5000);
            const pane = Xrm.App.sidePanes.getPane("CustomWebResourcePane");
            if (pane) {
                pane.close();
            };
        } catch (error) {
            console.error("Error in sendForApproval:", error);
            Xrm.Navigation.openErrorDialog({ message: `Unexpected error: ${error.message}` });
        } finally {
            Xrm.Utility.closeProgressIndicator();
        }
    },

    OnApproval: async function (primaryControl) {
        const formContext = primaryControl;
        const confirmResult = await Xrm.Navigation.openConfirmDialog({
            title: "Approve Opportunity",
            text: "Are you sure you want to approve this opportunity and create a case?"
        });
        if (!confirmResult.confirmed) return;

        try {
            Xrm.Utility.showProgressIndicator("Approving opportunity...");

            const opportunityId = formContext.data.entity.getId().replace(/[{}]/g, "");
            const currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");
            const currentDate = new Date().toISOString();

            // Step 1: Update Opportunity
            const updateData = {
                statuscode: 211050003, // Approved
                "tra_approvedbyid@odata.bind": `/systemusers(${currentUserId})`,
                // tra_approveddate: currentDate
            };
            await Xrm.WebApi.updateRecord("opportunity", opportunityId, updateData);

            // Step 2: Retrieve updated Opportunity
            const opportunity = await Xrm.WebApi.retrieveRecord("opportunity", opportunityId);
            const customerId = opportunity._parentcontactid_value;

            const leadId = opportunity._originatingleadid_value;
            const lead = await Xrm.WebApi.retrieveRecord("lead", leadId, "?$select=_tra_closedby_value");
            const setOfficer = lead._tra_closedby_value;

            // Step 3: Create Case
            const caseData = {
                "customerid_contact@odata.bind": `/contacts(${customerId})`,
                "title": opportunity.name,
                "tra_opportunity@odata.bind": `/opportunities(${opportunityId})`,
                "tra_thsstatus": 211050000, // Pending
                "tra_irsstatus": 211050000, // Pending
                "statuscode": 211050001,    // TI Admin
                "tra_substatus": 211050000,  // 8821 Form Review
                "tra_setofficer@odata.bind": `/systemusers(${setOfficer})`,
            };
            const caseResponse = await Xrm.WebApi.createRecord("incident", caseData);
            const caseId = caseResponse.id.replace(/[{}]/g, "");

            // Step 4: Retrieve all master checklist items
            const checklistResponse = await Xrm.WebApi.retrieveMultipleRecords(
                "tra_timastertaskchecklist"
            );
            const checklistItems = checklistResponse.entities;

            // Step 5: Create related case checklist records
            const DEFAULT_STATUS = 0; // Replace with actual value for "Not Started"

            for (const item of checklistItems) {
                const checklistData = {
                    tra_taskname: item.tra_name,
                    tra_stage: item.tra_stage,
                    tra_status: DEFAULT_STATUS,
                    tra_entityname: 211050002,//case
                    "tra_case@odata.bind": `/incidents(${caseId})`,
                    "tra_timastertaskchecklist@odata.bind": `/tra_timastertaskchecklists(${item.tra_timastertaskchecklistid})`
                };
                await Xrm.WebApi.createRecord("tra_casetaskchecklist", checklistData);
            }

            // Step 6: Notify and open case
            formContext.ui.setFormNotification("Approval complete. Case and checklist have been created.", "INFO", "approvalSuccess");
            setTimeout(() => {
                formContext.ui.clearFormNotification("approvalSuccess");
            }, 5000);

            await Xrm.Navigation.openForm({
                entityName: "incident",
                entityId: caseId
            });

        } catch (error) {
            console.error("Error in OnApproval:", error);
            Xrm.Navigation.openErrorDialog({ message: error.message || "An error occurred during approval." });
        } finally {
            Xrm.Utility.closeProgressIndicator();
        }
    },

    OnReject: function (primaryControl) {
        var formContext = primaryControl;
        var opportunityId = formContext.data.entity.getId().replace(/[{}]/g, "");
        var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");

        var pageInput = {
            pageType: "webresource",
            webresourceName: "tra_/HTML/RejectionDialog",
            data: encodeURIComponent(JSON.stringify({
                opportunityId: opportunityId,
                currentUserId: currentUserId
            }))
        };

        var navigationOptions = {
            target: 2,
            width: 500,
            height: 400,
            position: 1,
            title: "Reason For Rejection"
        };

        Xrm.Navigation.navigateTo(pageInput, navigationOptions).catch(function (error) {
            console.error("Popup error:", error.message);
        });
    },

    UploadIRSTranscripts: async function (primaryControl) {
        Xrm.Utility.showProgressIndicator();
        var formContext = primaryControl;
        var opportunityId = formContext.data.entity.getId().replace(/[{}]/g, "");
        var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");

        // Step 1: Get the Opportunity lookup value from Case
        if (!opportunityId) {
            Xrm.Navigation.openAlertDialog({ text: "Opportunity is not set on the case." });
            return;
        }

        // Step 2: Retrieve Opportunity record (example: get 'name' field)
        try {
            const opportunity = await Xrm.WebApi.retrieveRecord("opportunity", opportunityId);
            var caseName = opportunity.name.trim();
            const rawCaseNameID = `${caseName}_${opportunity.tra_caseid}`;
            var pageInput = {
                pageType: "webresource",
                webresourceName: "tra_/HTML/UploadIRSTranscript",
                data: encodeURIComponent(JSON.stringify({
                    currentUserId: currentUserId,
                    rawCaseNameID: rawCaseNameID, // pass it if needed
                    entityName: "opportunity"
                }))
            };
            var navigationOptions = {
                target: 2,
                width: 500,
                height: 400,
                position: 1,
                title: "Upload Documents"
            };

            Xrm.Navigation.navigateTo(pageInput, navigationOptions);
            Xrm.Utility.closeProgressIndicator();
        } catch (error) {
            console.error("Failed to retrieve opportunity", error);
            Xrm.Navigation.openAlertDialog({ text: "Unable to fetch opportunity details." });
            Xrm.Utility.closeProgressIndicator();
        }
    },
    RB_InterviewScripts_OnClick: async function (formContext, sequenceNumber) {
        Xrm.Utility.showProgressIndicator("Please wait...");
        try {
            const recordGUID = formContext.data.entity.getId().replace(/[{}]/g, "");
            const paneId = "CustomWebResourcePane";
            let pane = Xrm.App.sidePanes.getPane(paneId);
            if (!pane) {
                // Pane doesn't exist — create it
                pane = await Xrm.App.sidePanes.createPane({
                    title: "Interview Script",
                    imageSrc: "WebResources/msfp_SurveyIcon_32",
                    paneId: paneId,
                    canClose: true,
                    width: 440,
                });
            }
            // Navigate or refresh content in the existing or newly created pane
            await pane.navigate({
                pageType: "webresource",
                webresourceName: "tra_/HTML/InterviewTranscript",
                data: sequenceNumber, // Pass only the number (e.g., "2")
            });
            CrmJS.TRAOpportunity.manageSectionandFontStyles(formContext);
        } catch (error) {
            console.error("Error opening Interview Script pane:", error);
        } finally {
            Xrm.Utility.closeProgressIndicator();
        }
    },

    manageSectionandFontStyles: function (formContext) {
    try {
        var $ = window.$ || parent.$ || top.$;
        if (!$ || !$.fn) {
            console.warn("jQuery ($) is not available. Skipping styling logic.");
            return;
        }

        // Delay to allow DOM to settle
        setTimeout(function () {
            $("li[role='tab']").each(function () {
                $(this).css({
                    "font-size": "14px",
                    "color": "#1a73e8",
                    "font-weight": "bold"
                });
            });

            $("section h2").each(function () {
                $(this).css({
                    "font-size": "18px",
                    "color": "#1a73e8",
                    "font-weight": "bold"
                });
            });
        }, 2000);

    } catch (error) {
        console.error("Error in manageSectionandFontStyles:", error);
    }
},
    namespace: true,
};