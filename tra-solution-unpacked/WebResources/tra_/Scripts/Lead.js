if (typeof CrmJS === "undefined") {
  CrmJS = { __namespace: true };
}

CrmJS.LeadFunctions = {
  //******* On Load *******
  onLoad: function (executionContext) {
    CrmJS.LeadFunctions.initialize(executionContext);
    CrmJS.LeadFunctions.process(executionContext);
  },

  initialize: function (executionContext) {
    Common.globalUIContext = executionContext;
  },

  process: function (executionContext) {
    //On Load Methods
  },

  //************ SSN On Change ********************
  onSSNChange: function (executionContext) {
    CrmJS.LeadFunctions.formatSSN(executionContext);
  },

  //************ Zip Code On Change ********************
  onZipCodeChange: function (executionContext) {
    CrmJS.LeadFunctions.validateZipCode(executionContext);
  },

  //******************************************* Common Functions ******************************************************
  formatSSN: function (executionContext) {
    CrmJS.LeadFunctions.formatFieldSSN(executionContext, "tra_ssn");
  },

  formatFieldSSN: function (executionContext, fieldName) {
    var ssnValue = Common.getAttributeValue(executionContext, fieldName);

    if (!ssnValue) {
      Common.getControl(executionContext, fieldName).clearNotification();
      return;
    }

    ssnValue = ssnValue.replace(/[^a-zA-Z0-9]/g, "");

    if (ssnValue.length !== 9) {
      Common.getControl(executionContext, fieldName).setNotification(
        "Please enter in XXX-XX-XXXX format."
      );
      return;
    } else {
      Common.getControl(executionContext, fieldName).clearNotification();
    }

    var formattedSSN = "";
    if (ssnValue.length > 0) formattedSSN += ssnValue.substring(0, 3);
    if (ssnValue.length > 3) formattedSSN += "-";
    if (ssnValue.length > 3) formattedSSN += ssnValue.substring(3, 5);
    if (ssnValue.length > 5) formattedSSN += "-";
    if (ssnValue.length > 5) formattedSSN += ssnValue.substring(5, 9);
    Common.setAttributeValue(executionContext, fieldName, formattedSSN);
  },

  validateZipCode: function (executionContext) {
    CrmJS.LeadFunctions.formatFieldZipCode(
      executionContext,
      "address2_postalcode"
    );
    CrmJS.LeadFunctions.formatFieldZipCode(
      executionContext,
      "tra_mailingaddresszipcode"
    );
  },

  formatFieldZipCode: function (executionContext, fieldName) {
    var postalCode = Common.getAttributeValue(executionContext, fieldName);
    var control = Common.getControl(executionContext, fieldName);

    control.clearNotification();

    if (!postalCode) {
      return;
    }

    var sanitizedPostalCode = postalCode.replace(/-/g, "");

    if (sanitizedPostalCode.length !== 9 && sanitizedPostalCode.length !== 5) {
      control.setNotification(
        "Please enter a valid ZIP code in the format 00000-0000/00000."
      );
      return;
    }

    var formattedPostalCode = "";

    if (sanitizedPostalCode.length > 0) {
      formattedPostalCode += sanitizedPostalCode.substring(0, 5);

      if (sanitizedPostalCode.length > 5) {
        formattedPostalCode += "-";
      }
      formattedPostalCode += sanitizedPostalCode.substring(5, 9);
    }
    Common.setAttributeValue(executionContext, fieldName, formattedPostalCode);
  },

  //******************************************* Ribbon Buttons ********************************************************

  // RB_InterviewScripts_OnClick: function (executionContext, customPageName) {
  //     var formContext = Common.getFormContext(executionContext);
  //     if (formContext != null) {

  //         //Get record GUID and remove {}
  //         var recordGUID = formContext.data.entity.getId().replace(/[{}]/g, "");

  //         Xrm.App.sidePanes.createPane({
  //             title: "Interview Script",
  //             imageSrc: "WebResources/msfp_SurveyIcon_32",
  //             paneId: "CustomPage",
  //             canClose: true,
  //             width: 440
  //         }).then((pane) =>
  //             pane.navigate({
  //                 pageType: "custom",
  //                 name: customPageName, //Unique name of Custom page
  //                 entityName: "lead",
  //                 recordId: recordGUID
  //             })
  //         );

  //     }
  // },



  namespace: true,
};

CrmJS.TRALead = {
  USED_FIELDS: [],
  FIELD_SECTION_MAP: {},
  onLoad: async function (executionContext) {
    var formContext = executionContext.getFormContext();
    setInterval(() => {
                CrmJS.TRALead.manageSectionandFontStyles(formContext);
            }, 1000);
    await CrmJS.TRALead.manageSectionsAndTranscriptPane(executionContext);

  },
  RB_InterviewScripts_OnClick: async function (formContext, sequenceNumber) {
    const paneId = "CustomWebResourcePane";
    formContext.ui.tabs.get("Summary").setVisible(true);
    formContext.ui.tabs.get("Summary_2").setVisible(false);
    Xrm.Utility.showProgressIndicator("Please wait...");

    try {
      const existingPane = Xrm.App.sidePanes.getPane(paneId);

      // If exists, close and wait a bit before creating new one
      if (existingPane) {
        await existingPane.close();

        // Small delay to ensure pane is properly disposed
        setTimeout(() => {
          Xrm.App.sidePanes.createPane({
            title: "Interview Script",
            imageSrc: "WebResources/msfp_SurveyIcon_32",
            paneId: paneId,
            canClose: true,
            width: 440
          }).then(pane => {
            pane.navigate({
              pageType: "webresource",
              webresourceName: "tra_/HTML/InterviewTranscript",
              data: sequenceNumber
            });
          });
        }, 300); //  Delay allows Dynamics to complete form reset
      } else {
        // Direct creation if no pane exists
        const pane = await Xrm.App.sidePanes.createPane({
          title: "Interview Script",
          imageSrc: "WebResources/msfp_SurveyIcon_32",
          paneId: paneId,
          canClose: true,
          width: 440
        });

        await pane.navigate({
          pageType: "webresource",
          webresourceName: "tra_/HTML/InterviewTranscript",
          data: sequenceNumber
        });
      }
      Xrm.Utility.closeProgressIndicator();

    } catch (error) {
      console.error("Error in RB_InterviewScripts_OnClick:", error);
      Xrm.Utility.closeProgressIndicator();
    } finally {
      Xrm.Utility.closeProgressIndicator();
    }
  },
  manageSectionsAndTranscriptPane: async function (executionContext) {
    try {
      Xrm.Utility.showProgressIndicator("Please wait...");

      let formContext = executionContext.getFormContext();

      const formType = formContext.ui.getFormType();
      const pane = Xrm.App.sidePanes.getPane("CustomWebResourcePane");
      const leadId = formContext.data.entity.getId();
      const leadRecord = leadId ? await Xrm.WebApi.retrieveRecord("lead", leadId.replace("{", "").replace("}", ""), "?$select=_tra_currentsection_value") : null;

      //new: transcript section 1 with script tab
      //edit: transcript section dynamic with script tab
      //inactive: disable transcript and open summary tab
      if (formType === 1) {
        //disable summary tab
        formContext.ui.tabs.get("Summary_2").setVisible(false);
        //enable script tab
        formContext.ui.tabs.get("Summary").setVisible(true);
        //manage section in script tab
        CrmJS.TRALead.RB_InterviewScripts_OnClick(formContext, 1);
      } else if (formType == 2) {
        // if (!pane) {
          // //enable summary tab
          // formContext.ui.tabs.get("Summary_2").setVisible(true);
          // //disable script tab
          // formContext.ui.tabs.get("Summary").setVisible(false);
          //check if status is active or not
          const stateCode = leadRecord?.statecode;
          if (stateCode === 0) {
            return;
          }
          //current section
          const currentSectionId = leadRecord["_tra_currentsection_value"];
          const rawSectionName = leadRecord["_tra_currentsection_value@OData.Community.Display.V1.FormattedValue"];
          const match = rawSectionName.match(/\d+/);
          const currentSectionName = match ? match[0] : null;
          if (currentSectionId && currentSectionName) {
            //open current section
            CrmJS.TRALead.RB_InterviewScripts_OnClick(formContext,currentSectionName);
          } else {
            return // do nothing
          }
        // }
      } else {
        //enable summary tab
        formContext.ui.tabs.get("Summary_2").setVisible(true);
        //disable script tab
        formContext.ui.tabs.get("Summary").setVisible(false);

        const paneId = "CustomWebResourcePane";
        const existingPane = Xrm.App.sidePanes.getPane(paneId);
        if (existingPane) {
          await existingPane.close();
        }
      }
    } catch (error) {
      console.error("Error during onLoad:", error);
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
}
};
