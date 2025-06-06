if (typeof (CrmJS) === "undefined") {
    CrmJS = { __namespace: true };
}

CrmJS.FinancialsFunctions = {
	totalAsyncCall:0,
    //*************** Option Sets**************


    CONST_OPTIONSETS: {

        NumberOfVehicle: {
            0: {
                intValue: 0,
                textValue: "0"
            },
            1: {
                intValue: 1,
                textValue: "1"
            },
            2: {
                intValue: 2,
                textValue: "2"
            },


        }
    },

    CONST_CATEGORYID: {
        Food: "424e666d-d9d3-ef11-8eea-0022481d602d",
        HousekeepingSupply: "454e666d-d9d3-ef11-8eea-0022481d602d",
        ApparelServices: "474e666d-d9d3-ef11-8eea-0022481d602d",
        PersonalCare: "494e666d-d9d3-ef11-8eea-0022481d602d",
        TransportationPublic: "514e666d-d9d3-ef11-8eea-0022481d602d",
        TransportationOwnership: "4f4e666d-d9d3-ef11-8eea-0022481d602d",
        Miscellaneous: "4b4e666d-d9d3-ef11-8eea-0022481d602d",
        HealthCare: "4d4e666d-d9d3-ef11-8eea-0022481d602d",
    },
    //******* On Load *******
    onLoad: function (executionContext) {
        CrmJS.FinancialsFunctions.initialize(executionContext);
        CrmJS.FinancialsFunctions.process(executionContext);
		CrmJS.FinancialsFunctions.hideBusinessTab(executionContext);
    },

    initialize: function (executionContext) {
        Common.globalUIContext = executionContext;
    },

    process: function (executionContext) {
        //On Load Methods
        CrmJS.FinancialsFunctions.NetBusinessIncome(executionContext);
        CrmJS.FinancialsFunctions.TotalMonthlyIncomeCalulation(executionContext);
        CrmJS.FinancialsFunctions.TotalPersonalAssetCalulation(executionContext);
        CrmJS.FinancialsFunctions.calculateTotalFoodClothingMiscExpenses(executionContext);
        CrmJS.FinancialsFunctions.calculateAllowableTotalHousingExpenses(executionContext);
        CrmJS.FinancialsFunctions.OnCalculateTotalAutoExpensesChange(executionContext);
        CrmJS.FinancialsFunctions.SetTotalHealthCareExpense(executionContext);
        CrmJS.FinancialsFunctions.ShowHideAllSectionInMonthlyExpenseTab(executionContext);
    },

    //*************** On Save *********************
    onSave: function (executionContext) {
        CrmJS.FinancialsFunctions.CalculateTotalAllowableExpenses(executionContext);
    },


    /************************************* onchange functions*************************************/

    //********* Market Value On Change ************************
    onCashOnHandChange: function (executionContext) {
        CrmJS.FinancialsFunctions.SetCashonHands(executionContext);
    },

    //********* Market Value Cash In Bank On Change ************************
    OnCashInBankChange: function (executionContext) {
        CrmJS.FinancialsFunctions.SetCashinBanks(executionContext);
    },

    //********* Receivables Value On Change ************************
    onReceivablesValueChange: function (executionContext) {
        CrmJS.FinancialsFunctions.Receivables(executionContext);
    },

    //********* Other Asset Value On Change ************************
    onOtherAssetChange: function (executionContext) {
        CrmJS.FinancialsFunctions.OtherAssets(executionContext);
    },

    //********* Asset Value On Change ************************
    onAssetsValueChange: function (executionContext) {
        CrmJS.FinancialsFunctions.TotalBusinessAssets(executionContext);
    },

    //*************On Total Monthly Income & Expense Change ******************
    onTotalMonthlyExpenseAndIncomeChange: function (executionContext) {
        CrmJS.FinancialsFunctions.NetBusinessIncome(executionContext);
    },

    //******Bank Account On Change************

    onBankAcountChnage: function (executionContext) {
        CrmJS.FinancialsFunctions.SetBankAccounts(executionContext);
    },

    //******Asset Cash On Hand Change************

    onAssetCashOnHandChange: function (executionContext) {
        CrmJS.FinancialsFunctions.SetAssetCashOnHand(executionContext);
    },

    //*****Investment On Change*********
    onInvestmentChange: function (executionContext) {
        CrmJS.FinancialsFunctions.Investments(executionContext);
    },

    //******Life Insurance On Change**********
    onLifeInsuranceChange: function (executionContext) {
        CrmJS.FinancialsFunctions.LifeInsurance(executionContext);
    },
    //****** Monthly Expenses****************
    onPersonUnderAge65Change: function (executionContext) {
        CrmJS.FinancialsFunctions.getMonthyExpenses(executionContext);
        CrmJS.FinancialsFunctions.getHealthCareAmount(executionContext);
        CrmJS.FinancialsFunctions.getIRSHousingExpense(executionContext);
    },
    onPersonAboveAge65Change: function (executionContext) {
        CrmJS.FinancialsFunctions.getMonthyExpenses(executionContext);
        CrmJS.FinancialsFunctions.getHealthCareAmount(executionContext);
        CrmJS.FinancialsFunctions.getIRSHousingExpense(executionContext);
    },
    onStateChange: function (executionContext) {
        CrmJS.FinancialsFunctions.getMonthyExpenses(executionContext);
        CrmJS.FinancialsFunctions.getIRSTransportExpense(executionContext);
    },
    onCountyChange: function (executionContext) {
        CrmJS.FinancialsFunctions.getMonthyExpenses(executionContext);
        CrmJS.FinancialsFunctions.getIRSHousingExpense(executionContext);
        CrmJS.FinancialsFunctions.getIRSTransportExpense(executionContext);
    },

    onTransportationChange: function (executionContext) {
        CrmJS.FinancialsFunctions.getTransportationExpenses(executionContext);
        CrmJS.FinancialsFunctions.getIRSTransportExpense(executionContext);
    },



    //******Retirement Acc On Change********
    onRetirementAccChange: function (executionContext) {
        CrmJS.FinancialsFunctions.RetirementAcc(executionContext);
    },

    onPersonalEffectsChange: function (executionContext) {
        CrmJS.FinancialsFunctions.PersonalEffects(executionContext);
    },

    //******** OtherAssets On Change ***********
    onAssetTabOtherAssetsChange: function (executionContext) {
        CrmJS.FinancialsFunctions.AssetTabOtherAssets(executionContext);
    },

    //***** Real Estate On Change**********
    onRealEstateChange: function (executionContext) {
        CrmJS.FinancialsFunctions.RealEstate(executionContext);
    },

    //****** PrimaryTaxpayerMonthlyCalulation Wages, Social Security, Pension On Change*************

    OnPrimaryTaxpayerChange: function (executionContext) {
        CrmJS.FinancialsFunctions.PrimaryTaxpayer(executionContext);
    },

    //************** Spouse Other Contributors Household On Change**********************

    OnSpouseOtherContributorsHouseholdChange: function (executionContext) {
        CrmJS.FinancialsFunctions.SpouseOtherContributorsHousehold(executionContext);
    },

    //******* Rental Section On Change**************************************
    OnRentalSectionCalculationChange: function (executionContext) {
        CrmJS.FinancialsFunctions.RentalSectionCalculation(executionContext);
    },

    //***************** On Monthly Expense Tab Monthly Value Change Calculate Total Monthly Income****************
    OnMonthlyExpenseTabMonthlyValueChange: function (executionContext) {
        CrmJS.FinancialsFunctions.TotalMonthlyIncomeCalulation(executionContext);
    },

    //************* In Asset Tab Total Personal Asset Calculation On Change*********************************
    OnAssetTabTotalPersonalAssetCalculationChange: function (executionContext) {
        CrmJS.FinancialsFunctions.TotalPersonalAssetCalulation(executionContext);
    },

    //*************On Summary Tab Status Change************

    OnSummaryTabStateChange: function (executionContext) {
        CrmJS.FinancialsFunctions.remainingAmountCalculation(executionContext);
    },

    //*******On Calculation Allowable Food Change******************
    OncalculationAllowableFoodChange: function (executionContext) {
        CrmJS.FinancialsFunctions.calculationAllowableFood(executionContext);
    },

    //**********On calculation Allowable Housingkeeping & Supplies Change*****************
    OnCalculationAllowableHousingkeepingSuppliesChange: function (executionContext) {
        CrmJS.FinancialsFunctions.calculationAllowableHousingkeepingSupplies(executionContext);
    },

    //***************On Calculation Allowable Apparel Services Change********************
    onCalculationAllowableApparelservicesChange: function (executionContext) {
        CrmJS.FinancialsFunctions.calculationAllowableApparelservices(executionContext);
    },

    //************On Calculation Allowable Personalcare Change***********************
    onCalculationAllowablePersonalcareChange: function (executionContext) {
        CrmJS.FinancialsFunctions.calculationAllowablePersonalcare(executionContext);
    },

    //*****************On Calculation Allowable Miscellaneous Change******************
    onCalculationAllowableMiscellaneousChange: function (executionContext) {
        CrmJS.FinancialsFunctions.calculationAllowableMiscellaneous(executionContext);
    },

    //***************On calculate Total Actual Change*****************************

    oncalculateTotalActualChange: function (executionContext) {
        CrmJS.FinancialsFunctions.calculateTotalActual(executionContext);
    },

    //**************** On Calculate Total Food Clothing Misc Expenses *************************
    onCalculateTotalFoodClothingMiscExpensesChange: function (executionContext) {
        CrmJS.FinancialsFunctions.calculateTotalFoodClothingMiscExpenses(executionContext);
    },

    //**************On calculate Allowable Total Housing Expenses Change***********************

    onCalculateAllowableTotalHousingExpensesChange: function (executionContext) {
        CrmJS.FinancialsFunctions.calculateAllowableTotalHousingExpenses(executionContext);
    },

    //****************On calculation Allowable Public Transportation Change*************************
    OncalculationAllowablePublicTransportationChange: function (executionContext) {
        CrmJS.FinancialsFunctions.calculationAllowablePublicTransportation(executionContext);
    },

    //**********On Calculation Allowable Auto Owner Ship Lease Cost1 Change************************
    OnCalculationAllowableAutoOwnerShipLeaseCost1Change: function (executionContext) {
        CrmJS.FinancialsFunctions.CalculationAllowableAutoOwnerShipLeaseCost1(executionContext);
    },

    //******************On Calculation Allowable Auto Owner Ship Lease Cost2 Change***************
    OnCalculationAllowableAutoOwnerShipLeaseCost2Change: function (executionContext) {
        CrmJS.FinancialsFunctions.CalculationAllowableAutoOwnerShipLeaseCost2(executionContext);
    },

    //*******************On Calculation Allowable Auto Expenses Change***************************
    OnCalculationAllowableAutoExpensesChange: function (executionContext) {
        CrmJS.FinancialsFunctions.CalculationAllowableAutoExpenses(executionContext);
    },

    //***************On Calculate Total Auto Expenses Change**********************
    OnCalculateTotalAutoExpensesChange: function (executionContext) {
        CrmJS.FinancialsFunctions.CalculateTotalAutoExpenses(executionContext);
    },

    //************On Calculate Total Allowable Expenses Change**********************
    OnCalculateTotalAllowableExpensesChange: function (executionContext) {
        CrmJS.FinancialsFunctions.CalculateTotalAllowableExpenses(executionContext);
    },

    //*********On Show Hide All Section In Monthly Expense Tab Change ********************
    OnShowHideAllSectionInMonthlyExpenseTabChange: function (executionContext) {
        CrmJS.FinancialsFunctions.ShowHideAllSectionInMonthlyExpenseTab(executionContext);
    },

    /************************************* onHealthInsuranceChange*************************************/
    onHealthInsuranceChange: function (executionContext) {
        CrmJS.FinancialsFunctions.SetAllowableHealthInsurance(executionContext);
    },

    onPrescriptionChange: function (executionContext) {
        CrmJS.FinancialsFunctions.SetAllowablePrescription(executionContext);
    },

    onPrescriptionCopaysChange: function (executionContext) {
        CrmJS.FinancialsFunctions.SetHealthCareActual(executionContext);
    },

    onAllowableHealthCareInsuranceChange: function (executionContext) {
        CrmJS.FinancialsFunctions.SetTotalHealthCareExpense(executionContext);
    },

    onTaxChange: function (executionContext) {
        CrmJS.FinancialsFunctions.SetAllowableTotalFederal(executionContext);
    },

    //*******************************************onChange/Onload/onSave*****************************************************


    // Functions for MonthlyIncome Calculation

    SetCashonHands: function (executionContext) {
        var MarketValueCashonhand = Common.getAttributeValue(executionContext, "tra_marketvaluecashonhand");
        if (MarketValueCashonhand != null) {
            Common.setAttributeValue(executionContext, "tra_assetvaluecashonhand", MarketValueCashonhand);
        }
        else {
            Common.setAttributeValue(executionContext, "tra_assetvaluecashonhand", null);
        }
    },

    SetCashinBanks: function (executionContext) {
        var MarketValueCashinBank = Common.getAttributeValue(executionContext, "tra_marketvaluecashinbanks");
        if (MarketValueCashinBank != null) {
            Common.setAttributeValue(executionContext, "tra_assetvaluecashinbanks", MarketValueCashinBank);
        }
        else {
            Common.setAttributeValue(executionContext, "tra_assetvaluecashinbanks", null);
        }
    },

    Receivables: function (executionContext) {
        var receivablesMarketvalue = Common.getAttributeValue(executionContext, "tra_marketvaluereceivables");
        var receivablesQuickSale = Common.getAttributeText(executionContext, "tra_quicksalereceivables");
        var receivablesLoan = Common.getAttributeValue(executionContext, "tra_loansreceivables");

        if (receivablesQuickSale !== null) {
            var receivablesQuickSale = Common.getAttributeText(executionContext, "tra_quicksalereceivables").replace("%", "");
            var assetCalculation = (receivablesMarketvalue * receivablesQuickSale / 100) - receivablesLoan;
            Common.setAttributeValue(executionContext, "tra_assetvaluereceivables", assetCalculation);
        } else {
            var assetCalculation = (receivablesMarketvalue * 0) - receivablesLoan;
            Common.setAttributeValue(executionContext, "tra_assetvaluereceivables", assetCalculation);
        }
    },

    OtherAssets: function (executionContext) {
        var OtherAssetsMarketvalue = Common.getAttributeValue(executionContext, "tra_marketvalueotherassets");
        var OtherAssetsQuickSale = Common.getAttributeText(executionContext, "tra_quicksaleotherassets");
        var OtherAssetsLoan = Common.getAttributeValue(executionContext, "tra_loansotherassets");

        if (OtherAssetsQuickSale !== null) {
            var OtherAssetsQuickSale = Common.getAttributeText(executionContext, "tra_quicksaleotherassets").replace("%", "");
            var assetCalculation = ((OtherAssetsMarketvalue * OtherAssetsQuickSale / 100) - OtherAssetsLoan)-4180;
			if(assetCalculation>=0)
			{
				Common.setAttributeValue(executionContext, "tra_assetvalueotherassets", assetCalculation);
			}
			else
			{
				Common.setAttributeValue(executionContext, "tra_assetvalueotherassets", 0);
			}
        } else {
            var assetCalculation = ((OtherAssetsMarketvalue * 0) - OtherAssetsLoan)-4180;
			if(assetCalculation>=0)
			{
				Common.setAttributeValue(executionContext, "tra_assetvalueotherassets", assetCalculation);
			}
			else
			{
				Common.setAttributeValue(executionContext, "tra_assetvalueotherassets", 0);
			}
        }

    },

    TotalBusinessAssets: function (executionContext) {

        var AssetValueCashinBank = Common.getAttributeValue(executionContext, "tra_assetvaluecashonhand");
        var AssetValueCashonhand = Common.getAttributeValue(executionContext, "tra_assetvaluecashinbanks");
        var AssetValueReceivables = Common.getAttributeValue(executionContext, "tra_assetvaluereceivables");
        var AssetValueOtherAssets = Common.getAttributeValue(executionContext, "tra_assetvalueotherassets");

        var TotalBusinessAssets = (AssetValueCashinBank + AssetValueCashonhand + AssetValueReceivables + AssetValueOtherAssets);

        if (TotalBusinessAssets !== null) {
			if(TotalBusinessAssets>=0)
			{
				Common.setAttributeValue(executionContext, "tra_totalbusinessselfemployedassets", TotalBusinessAssets);
			}
			else
			{
				Common.setAttributeValue(executionContext, "tra_totalbusinessselfemployedassets", 0);
			}
        }
    },

    NetBusinessIncome: function (executionContext) {
        var MonthlyGross = Common.getAttributeValue(executionContext, "tra_totalmonthlygrossincome");
        var MonthlyExpense = Common.getAttributeValue(executionContext, "tra_totalmonthlyexpenses");
        var Totalamount = (MonthlyGross - MonthlyExpense)
		if(Totalamount>=0)
		{
			Common.setAttributeValue(executionContext, "tra_netbusinessincome", Totalamount);
		}
		else
		{
			Common.setAttributeValue(executionContext, "tra_netbusinessincome", 0);
		}

    },

    //****Assets Tab Calculation********

    SetBankAccounts: function (executionContext) {
        var MarketValueBankAccounts = Common.getAttributeValue(executionContext, "tra_assetmarketvaluebankaccounts");
        if (MarketValueBankAccounts != null) {
            Common.setAttributeValue(executionContext, "tra_assetequitybankaccounts", MarketValueBankAccounts);
        }
        else {
            Common.setAttributeValue(executionContext, "tra_assetequitybankaccounts", null);
        }
    },

    SetAssetCashOnHand: function (executionContext) {
        var MarketValueAssetCashOnHand = Common.getAttributeValue(executionContext, "tra_assetmarketvaluecashonhand");
        if (MarketValueAssetCashOnHand != null) {
            Common.setAttributeValue(executionContext, "tra_assetequitycashonhand", MarketValueAssetCashOnHand);
        }
        else {
            Common.setAttributeValue(executionContext, "tra_assetequitycashonhand", null);
        }
    },

    Investments: function (executionContext) {
        var investmentMarketvalue = Common.getAttributeValue(executionContext, "tra_assetmarketvalueinvestments");
        var investmentLoan = Common.getAttributeValue(executionContext, "tra_assetloaninvestments");
        var investmentQuickSale = Common.getAttributeText(executionContext, "tra_assetquicksaleinvestments");

        if (investmentQuickSale !== null) {
            var investmentQuickSale = Common.getAttributeText(executionContext, "tra_assetquicksaleinvestments").replace("%", "");
            var EquityCalculation = (investmentMarketvalue * investmentQuickSale / 100) - investmentLoan;
            Common.setAttributeValue(executionContext, "tra_assetequityinvestments", EquityCalculation);
        } else {
            var EquityCalculation = (investmentMarketvalue * 0) - investmentLoan;
            Common.setAttributeValue(executionContext, "tra_assetequityinvestments", EquityCalculation);
        }

    },

    LifeInsurance: function (executionContext) {
        var lifeInsuranceMarketvalue = Common.getAttributeValue(executionContext, "tra_assetmarketvaluelifeinsurance");
        var lifeInsuranceQuickSale = Common.getAttributeText(executionContext, "tra_assetquicksalelifeinsurance");
        var lifeInsuranceLoan = Common.getAttributeValue(executionContext, "tra_assetloanlifeinsurance");

        if (lifeInsuranceQuickSale !== null) {
            var lifeInsuranceQuickSale = Common.getAttributeText(executionContext, "tra_assetquicksalelifeinsurance").replace("%", "");
            var EquityCalculation = (lifeInsuranceMarketvalue * lifeInsuranceQuickSale / 100) - lifeInsuranceLoan;
            Common.setAttributeValue(executionContext, "tra_assetequitylifeinsurance", EquityCalculation);
        } else {
            var EquityCalculation = (lifeInsuranceMarketvalue * 0) - lifeInsuranceLoan;
            Common.setAttributeValue(executionContext, "tra_assetequitylifeinsurance", EquityCalculation);
        }
    },

    RetirementAcc: function (executionContext) {
        var RetirementAccMarketvalue = Common.getAttributeValue(executionContext, "tra_assetmarketvalueretirementacc");
        var RetirementAccQuickSale = Common.getAttributeText(executionContext, "tra_assetquicksaleretirementacc");
        var RetirementAccLoan = Common.getAttributeValue(executionContext, "tra_assetloanretirementacc");

        if (RetirementAccQuickSale !== null) {
            var RetirementAccQuickSale = Common.getAttributeText(executionContext, "tra_assetquicksaleretirementacc").replace("%", "");
            var EquityCalculation = (RetirementAccMarketvalue * RetirementAccQuickSale / 100) - RetirementAccLoan;
            Common.setAttributeValue(executionContext, "tra_assetequityretirementacc", EquityCalculation);
        } else {
            var EquityCalculation = (RetirementAccMarketvalue * 0) - RetirementAccLoan;
            Common.setAttributeValue(executionContext, "tra_assetequityretirementacc", EquityCalculation);
        }
    },

    RealEstate: function (executionContext) {
        var RealEstateMarketvalue = Common.getAttributeValue(executionContext, "tra_assetmarketvaluerealestate");
        var RealEstateQuickSale = Common.getAttributeText(executionContext, "tra_assetquicksalerealestate");
        var RealEstateLoan = Common.getAttributeValue(executionContext, "tra_assetloanrealestate");

        if (RealEstateQuickSale !== null) {
            var RealEstateQuickSale = Common.getAttributeText(executionContext, "tra_assetquicksalerealestate").replace("%", "");
            var EquityCalculation = (RealEstateMarketvalue * RealEstateQuickSale / 100) - RealEstateLoan;
            Common.setAttributeValue(executionContext, "tra_assetequityrealestate", EquityCalculation);
        } else {
            var EquityCalculation = (RealEstateMarketvalue * 0) - RealEstateLoan;
            Common.setAttributeValue(executionContext, "tra_assetequityrealestate", EquityCalculation);
        }
    },

    PersonalEffects: function (executionContext) {
        var PersonalEffectsMarketvalue = Common.getAttributeValue(executionContext, "tra_assetmarketvaluepersonaleffects");
        var PersonalEffectsQuickSale = Common.getAttributeText(executionContext, "tra_assetquicksalepersonaleffects");
        var PersonalEffectsLoan = Common.getAttributeValue(executionContext, "tra_assetloanpersonaleffects");

        if (PersonalEffectsQuickSale !== null) {
            var PersonalEffectsQuickSale = Common.getAttributeText(executionContext, "tra_assetquicksalepersonaleffects").replace("%", "");
            var EquityCalculation = (PersonalEffectsMarketvalue * PersonalEffectsQuickSale / 100) - PersonalEffectsLoan;
            Common.setAttributeValue(executionContext, "tra_assetequitypersonaleffects", EquityCalculation);
        } else {
            var EquityCalculation = (PersonalEffectsMarketvalue * 0) - PersonalEffectsLoan;
            Common.setAttributeValue(executionContext, "tra_assetequitypersonaleffects", EquityCalculation);
        }
    },

    AssetTabOtherAssets: function (executionContext) {
        var OtherAssetsMarketvalue = Common.getAttributeValue(executionContext, "tra_assetmarketvalueotherassets");
        var OtherAssetsQuickSale = Common.getAttributeText(executionContext, "tra_assetquicksaleotherassets");
        var OtherAssetsLoan = Common.getAttributeValue(executionContext, "tra_assetloanotherassets");

        if (OtherAssetsQuickSale !== null) {
            var OtherAssetsQuickSale = Common.getAttributeText(executionContext, "tra_assetquicksaleotherassets").replace("%", "");
            var EquityCalculation = (OtherAssetsMarketvalue * OtherAssetsQuickSale / 100) - OtherAssetsLoan;
            Common.setAttributeValue(executionContext, "tra_assetequityotherassets", EquityCalculation);
        } else {
            var EquityCalculation = (OtherAssetsMarketvalue * 0) - OtherAssetsLoan;
            Common.setAttributeValue(executionContext, "tra_assetequityotherassets", EquityCalculation);
        }
    },

    //********* For Asset Tab Total Personal Asset Value Calculation***********************
    TotalPersonalAssetCalulation: function (executionContext) {

        var assetEquityBankAccounts = Common.getAttributeValue(executionContext, "tra_assetequitybankaccounts");
        var assetEquityCashOnHand = Common.getAttributeValue(executionContext, "tra_assetequitycashonhand");
        var assetEquityInvestments = Common.getAttributeValue(executionContext, "tra_assetequityinvestments");
        var assetEquitylifeinsurance = Common.getAttributeValue(executionContext, "tra_assetequitylifeinsurance");
        var assetEquityRetirementAcc = Common.getAttributeValue(executionContext, "tra_assetequityretirementacc");
        var assetEquityRealeState = Common.getAttributeValue(executionContext, "tra_assetequityrealestate");
        var totalVehicleEquity = Common.getAttributeValue(executionContext, "tra_totalvehicleequity");
        var assetEquityPersonalEffects = Common.getAttributeValue(executionContext, "tra_assetequitypersonaleffects");
        var assetEquityOtherAssets = Common.getAttributeValue(executionContext, "tra_assetequityotherassets");


        var TotalPersonalAssetValueSum = (assetEquityBankAccounts +
            assetEquityCashOnHand +
            assetEquityInvestments +
            assetEquitylifeinsurance +
            assetEquityRetirementAcc +
            assetEquityRealeState +
            totalVehicleEquity +
            assetEquityPersonalEffects +
            assetEquityOtherAssets);

        if (TotalPersonalAssetValueSum !== null) {
            Common.setAttributeValue(executionContext, "tra_totalpersonalassetvalue", TotalPersonalAssetValueSum);
        }
    },


    //******************************** Monthly Income Tab Calculation********************************************

    PrimaryTaxpayer: function (executionContext) {
        var WagesValue = Common.getAttributeValue(executionContext, "tra_primarytaxpayerwages");
        var SocialSecurityValue = Common.getAttributeValue(executionContext, "tra_primarytaxpayersocialsecurity");
        var PensionValue = Common.getAttributeValue(executionContext, "tra_primarytaxpayerpensions");
        var PrimaryTaxpayerMonthlyCalulation = (WagesValue + SocialSecurityValue + PensionValue);
        Common.setAttributeValue(executionContext, "tra_primarytaxpayermonthly", PrimaryTaxpayerMonthlyCalulation);
    },

    SpouseOtherContributorsHousehold: function (executionContext) {
        var WagesValue = Common.getAttributeValue(executionContext, "tra_spousecontributorswages");
        var SocialSecurityValue = Common.getAttributeValue(executionContext, "tra_spousecontributorssocialsecurity");
        var PensionValue = Common.getAttributeValue(executionContext, "tra_spousecontributorspensions");
        var SpouseContributorMonthlyCalulation = (WagesValue + SocialSecurityValue + PensionValue);
        Common.setAttributeValue(executionContext, "tra_spousecontributorsmonthly", SpouseContributorMonthlyCalulation);
    },


    RentalSectionCalculation: function (executionContext) {
        var RentalIncomeValue = Common.getAttributeValue(executionContext, "tra_rentalincome");
        var RentalExpensesValue = Common.getAttributeValue(executionContext, "tra_rentalexpenses");
        var RentalMonthlyCalulation = (RentalIncomeValue - RentalExpensesValue);
        Common.setAttributeValue(executionContext, "tra_rentalincomeexpensemonthly", RentalMonthlyCalulation);
    },

    TotalMonthlyIncomeCalulation: function (executionContext) {

        //PrimaryTaxpayer
        var PrimaryTaxpayerMonthlyCalulation = Common.getAttributeValue(executionContext, "tra_primarytaxpayermonthly");

        //SpouseOtherContributorsHousehold
        var SpouseContributorMonthlyCalulation = Common.getAttributeValue(executionContext, "tra_spousecontributorsmonthly");

        //RentalSectionCalculation
        var RentalMonthlyCalulation = Common.getAttributeValue(executionContext, "tra_rentalincomeexpensemonthly");

        //UnLockFieldsVariables
        var DividendsInterests = Common.getAttributeValue(executionContext, "tra_dividendsinterests");
        var NetBusinessIncomefrombusinesssection = Common.getAttributeValue(executionContext, "tra_netbusinessincome");
        var Distributionsk1Monthly = Common.getAttributeValue(executionContext, "tra_distributionsk1monthly");
        var AlimonyMonthly = Common.getAttributeValue(executionContext, "tra_alimonymonthly");
        var ChildSupportMonthly = Common.getAttributeValue(executionContext, "tra_childsupportmonthly");
        var OtherRentSubsidyOilCreditetcMonthly = Common.getAttributeValue(executionContext, "tra_otherrentsubsidyoilcreditetcmonthly");
        var OtherIncomeMonthly = Common.getAttributeValue(executionContext, "tra_otherincomemonthly");

        var TotalMonthlyIncomeSum = (PrimaryTaxpayerMonthlyCalulation +
            SpouseContributorMonthlyCalulation +
            RentalMonthlyCalulation +
            DividendsInterests +
            NetBusinessIncomefrombusinesssection +
            Distributionsk1Monthly +
            AlimonyMonthly +
            ChildSupportMonthly +
            OtherRentSubsidyOilCreditetcMonthly +
            OtherIncomeMonthly);

        if (TotalMonthlyIncomeSum !== null) {
            Common.setAttributeValue(executionContext, "tra_totalmonthlyincome", TotalMonthlyIncomeSum);
        }
    },

    remainingAmountCalculation: function (executionContext) {

        var monthlyNetIncome = Common.getAttributeValue(executionContext, "tra_totalmonthlyincome");
        var TotalAllowableExpenses = Common.getAttributeValue(executionContext, "tra_totalallowableexpenses");
        var remainingAmountCalculation = (monthlyNetIncome - TotalAllowableExpenses);
        Common.setAttributeValue(executionContext, "tra_remainingincome", remainingAmountCalculation);
    },

    //***************************** Monthly expenses tab calculation ***********************************************************


    calculationAllowableFood: function (executionContext) {

        var actualFood = Common.getAttributeValue(executionContext, "tra_actualfood");
        var irsStandardsFood = Common.getAttributeValue(executionContext, "tra_irsstandardsfood");
        var allowableFood = Math.min(actualFood, irsStandardsFood);
        Common.setAttributeValue(executionContext, "tra_allowablefood", allowableFood);
    },

    calculationAllowableHousingkeepingSupplies: function (executionContext) {

        var actual = Common.getAttributeValue(executionContext, "tra_actualhousingkeepingsupplies");
        var irsStandards = Common.getAttributeValue(executionContext, "tra_irsstandardshousekeepingsupplies");
        var HousingkeepingSupplies = Math.min(actual, irsStandards);
        Common.setAttributeValue(executionContext, "tra_allowablehousekeepingsupplies", HousingkeepingSupplies);
    },

    calculationAllowableApparelservices: function (executionContext) {

        var actual = Common.getAttributeValue(executionContext, "tra_actualapparelservices");
        var irsStandards = Common.getAttributeValue(executionContext, "tra_irsstandardsapparelservices");
        var ApparelServices = Math.min(actual, irsStandards);
        Common.setAttributeValue(executionContext, "tra_allowableapparelservices", ApparelServices);
    },

    calculationAllowablePersonalcare: function (executionContext) {

        var actual = Common.getAttributeValue(executionContext, "tra_actualpersonalcare");
        var irsStandards = Common.getAttributeValue(executionContext, "tra_irsstandardspersonalcare");
        var PersonalCare = Math.min(actual, irsStandards);
        Common.setAttributeValue(executionContext, "tra_allowablepersonalcare", PersonalCare);
    },

    calculationAllowableMiscellaneous: function (executionContext) {

        var actual = Common.getAttributeValue(executionContext, "tra_actualmiscellaneous");
        var irsStandards = Common.getAttributeValue(executionContext, "tra_irsstandardsmiscellaneous");
        var Miscellaneous = Math.min(actual, irsStandards);
        Common.setAttributeValue(executionContext, "tra_allowablemiscellaneous", Miscellaneous);
    },

    calculateTotalActual: function (executionContext) {

        var foodactual = Common.getAttributeValue(executionContext, "tra_actualfood");
        var housingkeepingSuppliesactual = Common.getAttributeValue(executionContext, "tra_actualhousingkeepingsupplies");
        var apparelServicesActual = Common.getAttributeValue(executionContext, "tra_actualapparelservices");
        var personalCareActual = Common.getAttributeValue(executionContext, "tra_actualpersonalcare");
        var miscellaneousActual = Common.getAttributeValue(executionContext, "tra_actualmiscellaneous");

        var totalActual = (foodactual +
            housingkeepingSuppliesactual +
            apparelServicesActual +
            personalCareActual +
            miscellaneousActual);
        Common.setAttributeValue(executionContext, "tra_actualtotal", totalActual);
    },

    calculateTotalFoodClothingMiscExpenses: function (executionContext) {

        var foodAllowable = Common.getAttributeValue(executionContext, "tra_allowablefood");
        var housingkeepingSuppliesAllowable = Common.getAttributeValue(executionContext, "tra_allowablehousekeepingsupplies");
        var apparelServicesAllowable = Common.getAttributeValue(executionContext, "tra_allowableapparelservices");
        var personalCareAllowable = Common.getAttributeValue(executionContext, "tra_allowablepersonalcare");
        var miscellaneousAllowable = Common.getAttributeValue(executionContext, "tra_allowablemiscellaneous");

        var totalFoodClothingMiscExpenses = (foodAllowable +
            housingkeepingSuppliesAllowable +
            apparelServicesAllowable +
            personalCareAllowable +
            miscellaneousAllowable);
        Common.setAttributeValue(executionContext, "tra_totalfoodclothingmiscexpenses", totalFoodClothingMiscExpenses);
    },

    calculateAllowableTotalHousingExpenses: function (executionContext) {

        var actual = Common.getAttributeValue(executionContext, "tra_actualtotalhousingexpenses");
        var irsStandards = Common.getAttributeValue(executionContext, "tra_irsstandardstotalhousingexpenses");
        var allowableTotalHousingExpenses = Math.min(actual, irsStandards);
        Common.setAttributeValue(executionContext, "tra_allowabletotalhousingexpenses", allowableTotalHousingExpenses);
    },

    calculationAllowablePublicTransportation: function (executionContext) {

        var actual = Common.getAttributeValue(executionContext, "tra_actualpublictransportation");
        var irsStandards = Common.getAttributeValue(executionContext, "tra_irsstandardspublictransportation");
        var allowablePublicTransportation = Math.min(actual, irsStandards);
        Common.setAttributeValue(executionContext, "tra_allowablepublictransportation", allowablePublicTransportation);
    },

    CalculationAllowableAutoOwnerShipLeaseCost1: function (executionContext) {

        var actual = Common.getAttributeValue(executionContext, "tra_actualautoownershipleasecost1");
        var irsStandards = Common.getAttributeValue(executionContext, "tra_irsstandardsautoownershipleasecost1");
        var additionalStandardsAutoOwnerShipCost = Common.getAttributeValue(executionContext, "tra_additionalstandardsautoownershipcost");
        var allowableAutoOwnerShipLeaseCost1 = Math.min(actual, irsStandards);
        if (additionalStandardsAutoOwnerShipCost === true) {
            var AdditionalCoast1 = (irsStandards + 200);
            var NewAllowableAuotOwnerShipLeaseCoast1 = Math.min(actual, AdditionalCoast1);
            Common.setAttributeValue(executionContext, "tra_allowableautoownershipleasecost1", NewAllowableAuotOwnerShipLeaseCoast1);
        }
        else {
            Common.setAttributeValue(executionContext, "tra_allowableautoownershipleasecost1", allowableAutoOwnerShipLeaseCost1);
        }


    },

    CalculationAllowableAutoOwnerShipLeaseCost2: function (executionContext) {

        var actual = Common.getAttributeValue(executionContext, "tra_actualautoownershipleasecost2");
        var irsStandards = Common.getAttributeValue(executionContext, "tra_irsstandardsautoownershipleasecost2");
        var additionalStandardsAutoOwnerShipCost2 = Common.getAttributeValue(executionContext, "tra_additionalstandardsautoownershipcost2");
        var allowableAutoOwnerShipLeaseCost2 = Math.min(actual, irsStandards);
        if (additionalStandardsAutoOwnerShipCost2 === true) {
            var AdditionalCoast2 = (irsStandards + 200);
            var NewAllowableAuotOwnerShipLeaseCoast2 = Math.min(actual, AdditionalCoast2);
            Common.setAttributeValue(executionContext, "tra_allowableautoownershipleasecost2", NewAllowableAuotOwnerShipLeaseCoast2);
        }
        else {
            Common.setAttributeValue(executionContext, "tra_allowableautoownershipleasecost2", allowableAutoOwnerShipLeaseCost2);
        }


    },

    CalculationAllowableAutoExpenses: function (executionContext) {

        var AutoExpenses = Common.getAttributeValue(executionContext, "tra_autoexpenses");
        var InsuranceAutoTransportationExpenses = Common.getAttributeValue(executionContext, "tra_insuranceautotransportationexpenses");
        var ActualAutoExpenses = (AutoExpenses + InsuranceAutoTransportationExpenses);

        Common.setAttributeValue(executionContext, "tra_actualautoexpenses", ActualAutoExpenses);

        var IRSStandardAutoExpenses = Common.getAttributeValue(executionContext, "tra_irsstandardautoexpenses");
        var AllowableAutoExpenses = Math.min(ActualAutoExpenses, IRSStandardAutoExpenses);

        Common.setAttributeValue(executionContext, "tra_allowableautoexpenses", AllowableAutoExpenses);

    },


    SetAllowableHealthInsurance: function (executionContext) {
        var HealthCareActualHealthInsurance = Common.getAttributeValue(executionContext, "tra_actualhealthinsurance");
        if (HealthCareActualHealthInsurance != null) {
            Common.setAttributeValue(executionContext, "tra_allowablehealthinsurance", HealthCareActualHealthInsurance);
        }
        else {
            Common.setAttributeValue(executionContext, "tra_allowablehealthinsurance", null);
        }
    },

    SetAllowablePrescription: function (executionContext) {
        var Actual = Common.getAttributeValue(executionContext, "tra_actualprescription");
        var IRSStandards = Common.getAttributeValue(executionContext, "tra_irsstandardsprescription");
        var AllowablePrescription = Math.min(Actual, IRSStandards);
        Common.setAttributeValue(executionContext, "tra_allowableprescription", AllowablePrescription);

    },
    SetHealthCareActual: function (executionContext) {
        var Copays = Common.getAttributeValue(executionContext, "tra_copayshealthcare");
        var Prescription = Common.getAttributeValue(executionContext, "tra_prescriptionhealthcare");
        var totalamount = (Copays + Prescription);
        Common.setAttributeValue(executionContext, "tra_actualprescription", totalamount);
    },

    SetTotalHealthCareExpense: function (executionContext) {
        var Allowable = Common.getAttributeValue(executionContext, "tra_allowableprescription");
        var AllowableHealthCare = Common.getAttributeValue(executionContext, "tra_allowablehealthinsurance");
        var totalamount = (Allowable + AllowableHealthCare);
        Common.setAttributeValue(executionContext, "tra_totalhealthcareexpenses", totalamount);

    },

    SetAllowableTotalFederal: function (executionContext) {
        var AllowableTotalFederalStateLocalTaxes = Common.getAttributeValue(executionContext, "tra_actualtotalfederalstatelocaltaxes");
        if (AllowableTotalFederalStateLocalTaxes != null) {
            Common.setAttributeValue(executionContext, "tra_allowabletotalfederalstatelocaltaxes", AllowableTotalFederalStateLocalTaxes);
        }
        else {
            Common.setAttributeValue(executionContext, "tra_allowabletotalfederalstatelocaltaxes", null);
        }
    },

    CalculateTotalAutoExpenses: function (executionContext) {
        var NumberOfVehicle = Common.getAttributeValue(executionContext, "tra_numberofvehicles");
        var AllowablePublicTransportation = Common.getAttributeValue(executionContext, "tra_allowablepublictransportation");
        var AllowableAutoOwnershipLeaseCost1 = Common.getAttributeValue(executionContext, "tra_allowableautoownershipleasecost1");
        var AllowableAutoOwnershipLeaseCost2 = Common.getAttributeValue(executionContext, "tra_allowableautoownershipleasecost2");
        var AllowableAutoExpenses = Common.getAttributeValue(executionContext, "tra_allowableautoexpenses");
        var TotalAutoExpenses = "";


        if (Common.isBlankOrNull(NumberOfVehicle) || NumberOfVehicle === CrmJS.FinancialsFunctions.CONST_OPTIONSETS.NumberOfVehicle[0].intValue) {// For 0 Vehicle

            Common.setAttributeValue(executionContext, "tra_totalautoexpenses", AllowablePublicTransportation);

        } else if (NumberOfVehicle === CrmJS.FinancialsFunctions.CONST_OPTIONSETS.NumberOfVehicle[1].intValue) {

            TotalAutoExpenses = (AllowablePublicTransportation + AllowableAutoOwnershipLeaseCost1 + AllowableAutoExpenses);
            Common.setAttributeValue(executionContext, "tra_totalautoexpenses", TotalAutoExpenses);

        } else if (NumberOfVehicle === CrmJS.FinancialsFunctions.CONST_OPTIONSETS.NumberOfVehicle[2].intValue) {

            TotalAutoExpenses = (AllowablePublicTransportation + AllowableAutoOwnershipLeaseCost1 + AllowableAutoOwnershipLeaseCost2 + AllowableAutoExpenses);
            Common.setAttributeValue(executionContext, "tra_totalautoexpenses", TotalAutoExpenses);
        }


    },

    CalculateTotalAllowableExpenses: function (executionContext) {

        var TotalFoodClothingMiscExpenses = Common.getAttributeValue(executionContext, "tra_totalfoodclothingmiscexpenses");
        var TotalHousingAllowable = Common.getAttributeValue(executionContext, "tra_allowabletotalhousingexpenses");
        var TotalAutoExpenses = Common.getAttributeValue(executionContext, "tra_totalautoexpenses");
        var TotalHealthCareExpenses = Common.getAttributeValue(executionContext, "tra_totalhealthcareexpenses");
        var AllowableTotalFederalStateAndLocalTaxes = Common.getAttributeValue(executionContext, "tra_allowabletotalfederalstatelocaltaxes");
        var TotalOtherExpenses = Common.getAttributeValue(executionContext, "tra_totalotherexpenses");
        var TotalAllowableExpenses = (TotalFoodClothingMiscExpenses +
            TotalHousingAllowable +
            TotalAutoExpenses +
            TotalHealthCareExpenses +
            AllowableTotalFederalStateAndLocalTaxes +
            TotalOtherExpenses);

        Common.setAttributeValue(executionContext, "tra_totalallowableexpenses", TotalAllowableExpenses);

    },

    ShowHideAllSectionInMonthlyExpenseTab: function (executionContext) {
        var PersonUnderAge65 = Common.getAttributeValue(executionContext, "tra_personunderage65");
        var PersonAge65OrOlder = Common.getAttributeValue(executionContext, "tra_personage65orolder");
        var State = Common.getAttributeValue(executionContext, "tra_stateid");
        var County = Common.getAttributeValue(executionContext, "tra_countyid");


        if (PersonUnderAge65 !== null && PersonAge65OrOlder !== null && State !== null && County !== null) {
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_secfood", true);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sechousingkeepingsupplies", true);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_secapparel&services", true);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_secpersonalcare", true);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_secmiscellaneous", true);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sectotalfoodclothingmisexpenses", true);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sechousingandutilities", true);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sectotalhousing", true);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_secautotransportationexpenses", true);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sechealthcare", true);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sectaxes", true);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_secotherexpenses", true);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sectotalexpenses", true);

        }
        else {
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_secfood", false);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sechousingkeepingsupplies", false);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_secapparel&services", false);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_secpersonalcare", false);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_secmiscellaneous", false);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sectotalfoodclothingmisexpenses", false);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sechousingandutilities", false);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sectotalhousing", false);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_secautotransportationexpenses", false);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sechealthcare", false);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sectaxes", false);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_secotherexpenses", false);
            Common.setSectionVisible(executionContext, "tra_tabmonthlyexpenses", "tra_sectotalexpenses", false);
        }
    },
    getMonthyExpenses: function (executionContext) {
        var personUnderAge65 = Common.getAttributeValue(executionContext, "tra_personunderage65");
        var personAge65 = Common.getAttributeValue(executionContext, "tra_personage65orolder");
        var countyLookup = Common.getAttributeValue(executionContext, "tra_countyid");
        var stateLookup = Common.getAttributeValue(executionContext, "tra_stateid");
        if (personUnderAge65 != null && personAge65 != null && countyLookup != null && stateLookup != null) {
            var stateId = stateLookup[0].id;
            var countyId = countyLookup[0].id;
            var totalPersons = personAge65 + personUnderAge65;

            var filterCriteria = "";
            var countFilter = "";
            var categoryFilter = "";
            if (totalPersons > 4) {
                totalPersons = 5;
                countFilter = "tra_count eq 4 or tra_count eq 3";
            }
            else {
                countFilter = "tra_count eq " + (totalPersons - 1);
            }
            categoryFilter = "(_tra_category_value eq " + CrmJS.FinancialsFunctions.CONST_CATEGORYID.Food
                + " or _tra_category_value eq " + CrmJS.FinancialsFunctions.CONST_CATEGORYID.HousekeepingSupply
                + " or _tra_category_value eq " + CrmJS.FinancialsFunctions.CONST_CATEGORYID.ApparelServices
                + " or _tra_category_value eq " + CrmJS.FinancialsFunctions.CONST_CATEGORYID.PersonalCare
                + " or _tra_category_value eq " + CrmJS.FinancialsFunctions.CONST_CATEGORYID.Miscellaneous + ")";
            var filterCriteria = "?$filter=" + countFilter + " and " + categoryFilter;
			CrmJS.FinancialsFunctions.totalAsyncCall=CrmJS.FinancialsFunctions.totalAsyncCall+1;
            Xrm.WebApi.retrieveMultipleRecords("tra_irsstandard", filterCriteria).then(
                function success(result) {

                    CrmJS.FinancialsFunctions.populateIRSStandardAmount(result, (personAge65 + personUnderAge65), executionContext);
					CrmJS.FinancialsFunctions.totalAsyncCall=CrmJS.FinancialsFunctions.totalAsyncCall-1;
                },
                function error(er) {
					CrmJS.FinancialsFunctions.totalAsyncCall=CrmJS.FinancialsFunctions.totalAsyncCall-1;
                    console.log(er);
                });
        }
    },
    getIRSTransportExpense: function (executionContext) {
        var countyLookup = Common.getAttributeValue(executionContext, "tra_countyid");
        var stateLookup = Common.getAttributeValue(executionContext, "tra_stateid");
        var noOfVehicles = Common.getAttributeValue(executionContext, "tra_numberofvehicles");
        Common.setAttributeValue(executionContext, "tra_irsstandardautoexpenses", 0);
        if (countyLookup != null && stateLookup != null) {
            var stateId = stateLookup[0].id;
            Xrm.WebApi.retrieveRecord("tra_state", stateId).then(
                function success(res) {
                    var countyId = countyLookup[0].id;
                    var region = res.tra_region;
                    var categoryFilter = "(_tra_stateid_value eq " + stateId + " and tra_region eq " + region + " and _tra_countyid_value eq " + countyId + ") or (tra_region eq " + region + " and _tra_stateid_value eq null and _tra_countyid_value eq null)";
                    var filterCriteria = "?$filter=" + categoryFilter;
                    var isStateDataExists = false;
                    Xrm.WebApi.retrieveMultipleRecords("tra_irsstandardforownershipcosts", filterCriteria).then(
                        function success(result) {
                            debugger;
                            for (index = 0; index < result.entities.length; index++) {
                                if (!isStateDataExists) {
                                    if (noOfVehicles == 1) {
                                        Common.setAttributeValue(executionContext, "tra_irsstandardautoexpenses", result.entities[index].tra_onecarprice);
                                    }
                                    else if (noOfVehicles == 2) {
                                        Common.setAttributeValue(executionContext, "tra_irsstandardautoexpenses", result.entities[index].tra_twocarprice);
                                    }
                                    if (result.entities[index]._tra_stateid_value != null || result.entities[index]._tra_stateid_value != undefined)
                                        isStateDataExists = true;
                                }
                            }
                        },
                        function error(er) {
                            console.log(er);
                        });
                });
        }
    },
    getIRSHousingExpense: function (executionContext) {
        var countyLookup = Common.getAttributeValue(executionContext, "tra_countyid");
        var personUnderAge65 = Common.getAttributeValue(executionContext, "tra_personunderage65");
        var personAge65 = Common.getAttributeValue(executionContext, "tra_personage65orolder");
        Common.setAttributeValue(executionContext, "tra_irsstandardstotalhousingexpenses", 0);
        if (countyLookup != null && personUnderAge65 != null && personAge65 != null) {
            var countyId = countyLookup[0].id;
            Xrm.WebApi.retrieveRecord("tra_county", countyId).then(
                function success(res) {
                    var familyMembers = personAge65 + personUnderAge65;
                    if (familyMembers == 1 && res.tra_housingexpenseforafamilyof1 != null) {
                        Common.setAttributeValue(executionContext, "tra_irsstandardstotalhousingexpenses", res.tra_housingexpenseforafamilyof1);
                    }
                    else if (familyMembers == 2 && res.tra_housingexpenseforafamilyof2 != null) {
                        Common.setAttributeValue(executionContext, "tra_irsstandardstotalhousingexpenses", res.tra_housingexpenseforafamilyof2);
                    }
                    else if (familyMembers == 3 && res.tra_housingexpenseforafamilyof3 != null) {
                        Common.setAttributeValue(executionContext, "tra_irsstandardstotalhousingexpenses", res.tra_housingexpenseforafamilyof3);
                    }
                    else if (familyMembers == 4 && res.tra_housingexpenseforafamilyof4 != null) {
                        Common.setAttributeValue(executionContext, "tra_irsstandardstotalhousingexpenses", res.tra_housingexpenseforafamilyof4);
                    }
                    else if (familyMembers >= 4 && res.tra_housingexpenseforafamilyof5currency != null) {
                        Common.setAttributeValue(executionContext, "tra_irsstandardstotalhousingexpenses", res.tra_housingexpenseforafamilyof5currency);
                    }
                });
        }
    },
    populateIRSStandardAmount: function (result, noOfPerson, executionContext) {
        var foodAmount = 0, housekeepingAmount = 0, appearlServiceAmount = 0, personalCareAmount = 0, miscAmount = 0;
        for (index = 0; index < result.entities.length; index++) {
            if (result.entities[index]._tra_category_value == CrmJS.FinancialsFunctions.CONST_CATEGORYID.Food) {
                if (result.entities[index].tra_count < 4) {
                    foodAmount += result.entities[index].tra_allowanceamount;
                }
                else if (result.entities[index].tra_count >= 4) {
                    foodAmount += ((noOfPerson - 4) * result.entities[index].tra_additionalpersonallowance);
                }
            }
            else if (result.entities[index]._tra_category_value == CrmJS.FinancialsFunctions.CONST_CATEGORYID.HousekeepingSupply) {
                if (result.entities[index].tra_count < 4) {
                    housekeepingAmount += result.entities[index].tra_allowanceamount;
                }
                else if (result.entities[index].tra_count >= 4) {
                    housekeepingAmount += ((noOfPerson - 4) * result.entities[index].tra_additionalpersonallowance);
                }

            }
            else if (result.entities[index]._tra_category_value == CrmJS.FinancialsFunctions.CONST_CATEGORYID.ApparelServices) {
                if (result.entities[index].tra_count < 4) {
                    appearlServiceAmount += result.entities[index].tra_allowanceamount;
                }
                else if (result.entities[index].tra_count >= 4) {
                    appearlServiceAmount += ((noOfPerson - 4) * result.entities[index].tra_additionalpersonallowance);
                }
            }
            else if (result.entities[index]._tra_category_value == CrmJS.FinancialsFunctions.CONST_CATEGORYID.PersonalCare) {
                if (result.entities[index].tra_count < 4) {
                    personalCareAmount += result.entities[index].tra_allowanceamount;
                }
                else if (result.entities[index].tra_count >= 4) {
                    personalCareAmount += ((noOfPerson - 4) * result.entities[index].tra_additionalpersonallowance);
                }
            }
            else if (result.entities[index]._tra_category_value == CrmJS.FinancialsFunctions.CONST_CATEGORYID.Miscellaneous) {
                if (result.entities[index].tra_count < 4) {
                    miscAmount += result.entities[index].tra_allowanceamount;
                }
                else if (result.entities[index].tra_count >= 4) {
                    miscAmount += ((noOfPerson - 4) * result.entities[index].tra_additionalpersonallowance);
                }
            }
        }
        Common.setAttributeValue(executionContext, "tra_irsstandardsfood", foodAmount);
        Common.setAttributeValue(executionContext, "tra_irsstandardshousekeepingsupplies", housekeepingAmount);
        Common.setAttributeValue(executionContext, "tra_irsstandardsapparelservices", appearlServiceAmount);
        Common.setAttributeValue(executionContext, "tra_irsstandardspersonalcare", personalCareAmount);
        Common.setAttributeValue(executionContext, "tra_irsstandardsmiscellaneous", miscAmount);
    },
    getTransportationExpenses: function (executionContext) {
        var noOfVehicles = Common.getAttributeValue(executionContext, "tra_numberofvehicles");
        if (noOfVehicles != null) {
            Common.setAttributeValue(executionContext, "tra_irsstandardspublictransportation", 0);
            Common.setAttributeValue(executionContext, "tra_irsstandardsautoownershipleasecost1", 0);
            Common.setAttributeValue(executionContext, "tra_irsstandardsautoownershipleasecost2", 0);
            var filterCriteria = "?$filter=_tra_category_value eq " + CrmJS.FinancialsFunctions.CONST_CATEGORYID.TransportationOwnership
                + " or _tra_category_value eq " + CrmJS.FinancialsFunctions.CONST_CATEGORYID.TransportationPublic;
				CrmJS.FinancialsFunctions.totalAsyncCall=CrmJS.FinancialsFunctions.totalAsyncCall+1;
            Xrm.WebApi.retrieveMultipleRecords("tra_irsstandard", filterCriteria).then(
                function success(result) {
					CrmJS.FinancialsFunctions.totalAsyncCall=CrmJS.FinancialsFunctions.totalAsyncCall-1;
                    for (index = 0; index < result.entities.length; index++) {
                        var val = 0;
                        val = result.entities[index].tra_allowanceamount;

                        if (result.entities[index]._tra_category_value == CrmJS.FinancialsFunctions.CONST_CATEGORYID.TransportationPublic) {
                            Common.setAttributeValue(executionContext, "tra_irsstandardspublictransportation", val);
                        }
                        else if (result.entities[index]._tra_category_value == CrmJS.FinancialsFunctions.CONST_CATEGORYID.TransportationOwnership) {
                            if (result.entities[index].tra_count == 0 && noOfVehicles > 0)
                                Common.setAttributeValue(executionContext, "tra_irsstandardsautoownershipleasecost1", val);

                            else if (result.entities[index].tra_count == 1 && noOfVehicles > 1)
                                Common.setAttributeValue(executionContext, "tra_irsstandardsautoownershipleasecost2", val);
                        }
                    }
                },
                function error(er) {
					CrmJS.FinancialsFunctions.totalAsyncCall=CrmJS.FinancialsFunctions.totalAsyncCall-1;
                    console.log(er);
                });
        }
    },
    getHealthCareAmount: function (executionContext) {
        var personAge65 = Common.getAttributeValue(executionContext, "tra_personunderage65");
        var personAge65Above = Common.getAttributeValue(executionContext, "tra_personage65orolder");
        if (personAge65 != null && personAge65Above != null) {

            var filterCriteria = "?$filter=_tra_category_value eq " + CrmJS.FinancialsFunctions.CONST_CATEGORYID.HealthCare;
			CrmJS.FinancialsFunctions.totalAsyncCall=CrmJS.FinancialsFunctions.totalAsyncCall+1;
            Xrm.WebApi.retrieveMultipleRecords("tra_irsstandard", filterCriteria).then(
                function success(result) {
                    var totalHealthCare = 0;
					CrmJS.FinancialsFunctions.totalAsyncCall=CrmJS.FinancialsFunctions.totalAsyncCall-1;
                    for (index = 0; index < result.entities.length; index++) {
                        if (result.entities[index].tra_agegroup == 933310000) {
                            var amount = result.entities[index].tra_allowanceamount * personAge65;
                            totalHealthCare += amount;
                        }
                        else if (result.entities[index].tra_agegroup == 933310001) {
                            var amount = result.entities[index].tra_allowanceamount * personAge65Above;
                            totalHealthCare += amount;
                        }
                    }
                    Common.setAttributeValue(executionContext, "tra_irsstandardsprescription", totalHealthCare);
                },
                function error(er) {
					CrmJS.FinancialsFunctions.totalAsyncCall=CrmJS.FinancialsFunctions.totalAsyncCall-1;
                    console.log(er);
                });
        }
    },
    CalculateIRSStandards: function (executionContext) {
        Xrm.Utility.showProgressIndicator("Please wait while processing..");
        //var formContext = executionContext.getFormContext();
		CrmJS.FinancialsFunctions.totalAsyncCall=0;
        CrmJS.FinancialsFunctions.getMonthyExpenses(executionContext);
        CrmJS.FinancialsFunctions.getHealthCareAmount(executionContext);
        CrmJS.FinancialsFunctions.getTransportationExpenses(executionContext);
		setTimeout(function(){
		CrmJS.FinancialsFunctions.saveAndCloseProgress(executionContext);
		},3000);
    },
	saveAndCloseProgress:function(executionContext) {
		if(CrmJS.FinancialsFunctions.totalAsyncCall<=0)
		{
			executionContext.data.entity.save();
			Xrm.Utility.closeProgressIndicator();
		}
		else
		{
			setTimeout(function(){
			CrmJS.FinancialsFunctions.saveAndCloseProgress(executionContext);
			},2000);
		}
	},
	hideBusinessTab:function(executionContext) {
		var opportunityLookup = Common.getAttributeValue(executionContext, "tra_opportunityid");
		if(opportunityLookup!=null)
		{
			 var opportunityId = opportunityLookup[0].id;
			 Xrm.WebApi.retrieveRecord("opportunity", opportunityId).then(
                function success(res) {
					debugger;
					if(res.tra_optandisthatbusinessorpersonal!=null)
					{
						if(res.tra_optandisthatbusinessorpersonal==1 || res.tra_optandisthatbusinessorpersonal==2)
						{
							Common.setTabVisible(executionContext, "tra_tabbusiness", true);
						}
						else
						{
							Common.setTabVisible(executionContext, "tra_tabbusiness", false);
						}
					}
				},
				function error(er){
					console.log(er);
				});
			 
		}
	},
    namespace: true
};