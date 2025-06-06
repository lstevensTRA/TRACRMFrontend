if (typeof CrmJS === "undefined") {
  var CrmJS = { __namespace: true };
}

// Global mappings
const StageMappings = {
  StageToOptionSet: {
    "TI Admin": 0,
    "TI Compliance": 1,
    "TI Analyst": 2,
    "TI Resolution": 3,
    "Tax Preparation": 4
  },
  StatusCodeByStage: {
    "TI Admin": 211050001,
    "TI Compliance": 211050002,
    "TI Analyst": 211050003,
    "TI Resolution": 211050004,
    "Tax Preparation": 211050005,
  }
};

let bypassStageValidation = false;

CrmJS.TRACase = {
  onLoad: function (executionContext) {
    const formContext = executionContext.getFormContext();

    // Initial filter
    CrmJS.TRACase.filterSubgridByBpfStage(formContext);

    // On actual stage change (forward only)
    formContext.data.process.addOnStageChange(async (ctx) => {
      const event = ctx.getEventArgs();

    
        await CrmJS.TRACase.filterSubgridByBpfStage(formContext);
          await CrmJS.TRACase.manageStatusReason(formContext,event.getDirection());
      
      bypassStageValidation = false;
    });

    // On attempt to change stage
    formContext.data.process.addOnPreStageChange(async (ctx) => {
      const eventArgs = ctx.getEventArgs();
      const direction = eventArgs.getDirection();

      if (bypassStageValidation) return;

      const allStages = formContext.data.process.getActivePath().getAll();
      const currentStage = formContext.data.process.getActiveStage();
      if (!currentStage) return;

      const currentIndex = allStages.findIndex(stage => stage.getId() === currentStage.getId());
      const nextIndex = direction === "Next" ? currentIndex + 1 : -1;
      if (nextIndex < 0 || nextIndex >= allStages.length) return;

      const nextStage = allStages[nextIndex];
      eventArgs.preventDefault(); // block default

      const canProceed = await CrmJS.TRACase.validateTasksBeforeStageChangeAsync(
        formContext,
        nextStage.getName(),
        currentStage.getName()
      );

      if (!canProceed) return;

      bypassStageValidation = true;
      formContext.data.process.setActiveStage(nextStage.getId(), async () => {
          try {
              await formContext.data.process.moveNext();
              const statusUpdated = CrmJS.TRACase.manageStatusReason(formContext, nextStage.getName());
              if (statusUpdated) {
                  // await formContext.data.save();
              } else {
                  console.error("Status update failed. Save skipped.");
              }
          } catch (error) {
              console.error("Error during stage transition and save:", error);
          }
      });        
    });
  },

  onSave: async function (executionContext) {
    // Currently not used
  },

  manageStatusReason: async function (formContext, nextStageName) {
      try {
          const statusMap = StageMappings.StatusCodeByStage;
          const targetStatusValue = statusMap[nextStageName];
  
          if (targetStatusValue !== undefined) {
              const statusAttr = formContext.getAttribute("statuscode");
              if (statusAttr && statusAttr.getValue() !== targetStatusValue) {
                  statusAttr.setValue(targetStatusValue);
                  statusAttr.setSubmitMode('always');
              }
          } else {
              console.warn("No statuscode mapping found for next stage: " + nextStageName);
          }
  
      } catch (error) {
          console.error("Error in manageStatusReason:", error);
      }
  },     

  validateTasksBeforeStageChangeAsync: function (formContext, targetStageName, currentStageName) {
    return new Promise((resolve) => {
      const stageValue = StageMappings.StageToOptionSet[currentStageName];
      const targetStageValue = StageMappings.StageToOptionSet[targetStageName];

      if (targetStageValue === undefined) {
        resolve(true); // No validation required
        return;
      }

      const caseId = formContext.data.entity.getId().replace(/[{}]/g, "");
      const query = `?$select=tra_taskname,tra_status&$filter=_tra_case_value eq ${caseId} and tra_stage eq ${stageValue} and (tra_status eq 0 or tra_status eq 1)`;

      Xrm.WebApi.retrieveMultipleRecords("tra_casetaskchecklist", query)
        .then(result => {
          if (result.entities.length > 0) {
            Xrm.Navigation.openAlertDialog({
              text: `You cannot proceed to "${targetStageName}". Complete all tasks in the current stage first.`,
              title: "⚠️"
            });
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(error => {
          console.error("Checklist validation error:", error.message);
          resolve(false);
        });
    });
  },

  filterSubgridByBpfStage: function (formContext) {
    const activeStage = formContext.data.process.getActiveStage();
    if (!activeStage) {
      console.warn("No active stage.");
      return;
    }

    const stageName = activeStage.getName();
    const optionSetValue = StageMappings.StageToOptionSet[stageName];
    if (optionSetValue === undefined) {
      console.warn("No OptionSet value for stage: " + stageName);
      return;
    }

    const subgrid = formContext.getControl("subgrid_case_task_checklist_information");
    if (!subgrid) {
      console.warn("Subgrid not found.");
      return;
    }

    subgrid.setFilterXml(`<filter><condition attribute='tra_stage' operator='eq' value='${optionSetValue}' /></filter>`);
    subgrid.refresh();
  },

  UploadIRSTranscripts: async function (primaryControl) {
    var formContext = primaryControl;
    var caseId = formContext.data.entity.getId().replace(/[{}]/g, "");
    var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");

    // Step 1: Get the Opportunity lookup value from Case
    var opportunityId = formContext.getAttribute("tra_opportunity").getValue()[0].id.replace(/[{}]/g, ""); // without underscores
    if (!opportunityId) {
        Xrm.Navigation.openAlertDialog({ text: "Opportunity is not set on the case." });
        return;
    }

    // Step 2: Retrieve Opportunity record (example: get 'name' field)
    try {
        const opportunity = await Xrm.WebApi.retrieveRecord("opportunity", opportunityId);
        var caseName = opportunity.name.trim();
        var caseId = opportunity.tra_caseid;
        const rawCaseNameID = `${caseName}_${caseId}`;
        var pageInput = {
            pageType: "webresource",
            webresourceName: "tra_/HTML/UploadIRSTranscript",
            data: encodeURIComponent(JSON.stringify({
                currentUserId: currentUserId,
                rawCaseNameID: rawCaseNameID // pass it if needed
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
    } catch (error) {
        console.error("Failed to retrieve opportunity", error);
        Xrm.Navigation.openAlertDialog({ text: "Unable to fetch opportunity details." });
    }
},
// Helper function to get status reason label
getStatusReasonLabel: function (statusValue) {
  const options = Xrm.Page.getAttribute("statuscode").getOptions();
  const match = options.find(opt => opt.value === statusValue);
  return match ? match.text : "";
},
filterSubStatus: function (formContext) {
  var subStatusField = "tra_substatus";
  var subStatusAttr = formContext.getAttribute(subStatusField);
  var subStatusControl = formContext.getControl("header_tra_substatus");
  if (!subStatusAttr || !subStatusControl) return;

  var statusValue = formContext.getAttribute("statuscode").getValue();
  if (statusValue === null) return;

  // Store all options once and reuse
  if (!cachedAllOptions) {
    cachedAllOptions = subStatusControl.getOptions();
  }

  // Define allowed options
  var allowedOptions = [];
  switch (statusValue) {
    case 211050001: // TI Admin
      allowedOptions = [211050000, 211050001];
      break;
    case 211050002: // TI Compliance
      allowedOptions = [211050000, 211050001, 211050002];
      break;
    case 211050003: // TI Analyst
      allowedOptions = [211050003, 211050004, 211050005, 211050006, 211050007, 211050008];
      break;
    case 211050004: // TI Resolution
      allowedOptions = [211050000, 211050003, 211050009, 211050010, 211050011];
      break;
    case 211050005: // On-Hold TI Process
      allowedOptions = [211050012, 211050013, 211050014];
      break;
    case 211050006: // TI Completed
      allowedOptions = [211050015];
      break;
  }

  // If no allowed options are defined, show all options
  if (allowedOptions.length === 0) {
    allowedOptions = cachedAllOptions.map(option => option.value);
  }

  // First remove all options
  cachedAllOptions.forEach(option => {
    subStatusControl.removeOption(option.value);
  });

  // Then re-add only allowed ones (in correct order)
  cachedAllOptions.forEach(option => {
    if (allowedOptions.includes(option.value)) {
      subStatusControl.addOption(option);
    }
  });
}
};