if (typeof (Common) === "undefined") {
    Common = { __namespace: true };
}

Common = {
    /***** CATEGORIES *****
  
    // ATTRIBUTES / FIELDS / CONTROLS
    // ASYNC WEB API METHODS
    // BPF
    // DIALOG
    // ENTITY FORM
    // ENTITY FORM FOOTER
    // ENTITY FORM HEADER
    // GENERAL
    // HTML WEB RESOURCE 
    // LOOKUP ATTRIBUTES
    // OPTIONSET ATTRIBUTES
    // SECURITY ROLE
    // SYNC WEB API METHODS
    // TABS AND SECTIONS
    // TEXT ATTRIBUTES
  
    /***** GLOBAL DECLARATIONS *****/
    globalContext: Xrm.Utility.getGlobalContext(),
    headerAtributePrefix: "header_",
    footerAtributePrefix: "footer_",
    bpfAtributePrefix: "header_process_",
    createFormType: 1,
    updateFormType: 2,
    readOnlyFormType: 3,
    disabledFormType: 4,
    globalUIContext: null, //We have to set this context on load event of every forms.
    //Create the dynamic client URL for the current CRM instance.
    //Cannot access "globalContext" global variable at the time of initialization,
    //So that, directly used CRM's global context.
    webClientUrl: Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/",

    /********************************************************/
    /************* ATTRIBUTES / FIELDS / CONTROLS ***********/
    /********************************************************/


    //********************************************************************
    //Method Purpose 	:	Remove a message already displayed for a control.
    //Tags        	  : Control, Clear, Notification
    //Linked methods  : processAttributeControls
    //********************************************************************
    clearControlNotification: function (executionContext, attributeName, notificationId) {
        Common.processAttributeControls(executionContext, attributeName, function (control) { control.clearNotification(notificationId); });
    },

    //*******************************************************************************************************************************
    //Method Purpose 	:	Causes the OnChange event to occur on the attribute so that any script associated to that event can execute.
    //Tags        	  : Attribute, Fire, OnChange, 
    //Linked methods  : getAttribute
    //*******************************************************************************************************************************
    fireAttributeOnChange: function (executionContext, attributeName) {
        var attribute = Common.getAttribute(executionContext, attributeName);
        if (attribute != null) {
            attribute.fireOnChange();
        }
    },

    //**********************************************************************
    //Method Purpose 	:	Returns the attribute that the control is bound to.
    //Tags        	  : Attribute, Get
    //Linked methods  : getFormContext, isBlankOrNull
    //**********************************************************************
    getAttribute: function (executionContext, attributeName) {
        var attribute = null;
        var formContext = Common.getFormContext(executionContext);
        if (formContext != null &&
            !Common.isBlankOrNull(attributeName))
            attribute = formContext.getAttribute(attributeName);
        return attribute;
    },

    //**********************************************************************************************************
    //Method Purpose 	:	Returns a Boolean value indicating if there are unsaved changes to the attribute value.
    //Tags        	  : Attribute, Change, Dirty, Get  
    //Linked methods  : getAttributePropertyValue
    //**********************************************************************************************************
    getAttributeIsDirty: function (executionContext, attributeName) {
        return Common.getAttributePropertyValue(executionContext, attributeName, function (attribute) { return attribute.getIsDirty(); });
    },

    //************************************************************************
    //Method Purpose 	:	Returns the expected property value of the attribute.
    //Tags        	  : Attribute, Property, Value, Get
    //Linked methods  : getAttribute
    //************************************************************************
    getAttributePropertyValue: function (executionContext, attributeName, action) {
        var propertyValue = null
        var attribute = Common.getAttribute(executionContext, attributeName);
        if (attribute != null &&
            action != null) {
            propertyValue = action(attribute);
        }
        return propertyValue;
    },

    //*****************************************************************************
    //Method Purpose 	:	Get the attribute value for specified attribute from form.
    //Tags        	  : Attribute, Value, Get
    //Linked methods  : getAttributePropertyValue
    //*****************************************************************************
    getAttributeValue: function (executionContext, attributeName) {
        return Common.getAttributePropertyValue(executionContext, attributeName, function (attribute) { return attribute.getValue(); })
    },

    //*****************************************************************************
    //Method Purpose 	:	Get the attribute text for specified attribute from form.
    //                  This method only created for OptionSet attribute
    //Tags        	  : Attribute, Value, Get,Text
    //Linked methods  : getAttributePropertyValue
    //*****************************************************************************
    getAttributeText: function (executionContext, attributeName) {
        var attribute = Common.getAttribute(executionContext, attributeName);
        var attributeText = null;
        if (attribute != null) {
            attributeText = attribute.getText();
        }
        return attributeText;
    },

    //************************************************
    //Method Purpose 	:	Gets a control on the form.
    //Tags        	  : Control, Get
    //Linked methods  : getFormContext, isBlankOrNull
    //************************************************
    getControl: function (executionContext, attributeName) {
        var control = null;
        var formContext = Common.getFormContext(executionContext);
        if (formContext != null &&
            !Common.isBlankOrNull(attributeName)) { control = formContext.getControl(attributeName); }
        return control;
    },

    //**********************************************************************
    //Method Purpose 	:	Returns the expected property value of the control.
    //Tags        	  : Control, Property, Value, Get
    //Linked methods  : getControl
    //**********************************************************************
    getControlPropertyValue: function (executionContext, controlName, action) {
        var propertyValue = null
        var control = Common.getControl(executionContext, controlName);
        if (control != null &&
            action != null) {
            propertyValue = action(control);
        }
        return propertyValue;
    },

    //*******************************************************************************************
    //Method Purpose 	:	Returns a value that indicates whether the control is currently visible.
    //Tags        	  : Control, Visible, Control, Get
    //Linked methods  : getControlPropertyValue
    //*******************************************************************************************
    getControlVisible: function (executionContext, controlName) {
        return Common.getControlPropertyValue(executionContext, controlName, function (control) { return control.getVisible(); });
    },

    //**************************************************************************
    //Method Purpose 	:	Iterate through all the instances of a control on form.
    //Tags        	  : Loop, Iterate, Controls
    //Linked methods  : getAttribute
    //**************************************************************************
    processAttributeControls: function (executionContext, attributeName, action) {
        var attribute = Common.getAttribute(executionContext, attributeName);
        if (attribute != null) {
            attribute.controls.forEach(
                function (control, i) {
                    if (control != null) {
                        action(control);
                    }
                }
            );
        }
    },

    //****************************************************************************************
    //Method Purpose 	:	Sets a value that indicates whether the array of controls is visible.
    //Tags        	  : Controls, Array, Visible, Show, Hide, Set
    //Linked methods  : isBlankOrNull, processAttributeControls
    //****************************************************************************************
    setAttributesControlsVisible: function (executionContext, attributeNamesArray, isVisible) { //Specify true to show the control; false to hide the control.
        if (!Common.isBlankOrNull(attributeNamesArray) &&
            isVisible != null) {
            attributeNamesArray.forEach(function (attributeName) {
                Common.processAttributeControls(executionContext, attributeName, function (control) { control.setVisible(isVisible); });
            });
        }
    },

    //*******************************************************************************************************************************
    //Method Purpose 	:	Sets whether data is required or recommended for the array of attribute list before the record can be saved.
    //Tags        	  : Attribute, Array, Required, Mandatory, Level, Set
    //Linked methods  : isBlankOrNull, setAttributePropertyValue
    //*******************************************************************************************************************************
    setAttributesRequiredLevel: function (executionContext, attributeNamesArray, requiredLevel) { //"none", "required" or "recommended"
        if (!Common.isBlankOrNull(attributeNamesArray) &&
            !Common.isBlankOrNull(requiredLevel)) {
            attributeNamesArray.forEach(function (attributeName) {
                Common.setAttributePropertyValue(executionContext, attributeName, function (attribute) { attribute.setRequiredLevel(requiredLevel); });
            });
        }
    },

    //*************************************************************************************************************
    //Method Purpose 	:	Sets whether data from the array of attributes will be submitted when the record is saved.
    //Tags        	  : Attribute, Array, Submit, Mode, Set
    //Linked methods  : isBlankOrNull, setAttributePropertyValue
    //*************************************************************************************************************
    setAttributesSubmitMode: function (executionContext, attributeNamesArray, submitMode) { //submitMode = always, never, dirty
        if (!Common.isBlankOrNull(attributeNamesArray) &&
            !Common.isBlankOrNull(submitMode)) {
            attributeNamesArray.forEach(function (attributeName) {
                Common.setAttributePropertyValue(executionContext, attributeName, function (attribute) { attribute.setSubmitMode(submitMode); });
            });
        }
    },

    //***********************************************************
    //Method Purpose 	:	Enable/Disable the array of controls.
    //Tags        	  : Control, Array, Disable, Enable , Set
    //Linked methods  : isBlankOrNull, setAttributePropertyValue
    //***********************************************************
    setControlsDisable: function (executionContext, controlNamesArray, isDisable) { //Specify true or false to disable or enable the controls.
        if (!Common.isBlankOrNull(controlNamesArray)) {
            controlNamesArray.forEach(function (controlName) {
                Common.setControlPropertyValue(executionContext, controlName, function (control) { control.setDisabled(isDisable); });
            });
        }
    },

    //*************************************************
    //Method Purpose 	:	Sets attribute property value.
    //Tags        	  : Attribute, Property, Set
    //Linked methods  : getAttribute
    //*************************************************
    setAttributePropertyValue: function (executionContext, attributeName, action) {
        var attribute = Common.getAttribute(executionContext, attributeName);
        if (attribute != null &&
            action != null) {
            action(attribute);
        }
    },

    //********************************************************
    //Method Purpose 	:	Sets the data value for an attribute.
    //Tags        	  : Attribute, Value , Set
    //Linked methods  : setAttributePropertyValue
    //********************************************************
    setAttributeValue: function (executionContext, attributeName, attributeValue) {
        Common.setAttributePropertyValue(executionContext, attributeName, function (attribute) { attribute.setValue(attributeValue); });
    },

    //*************************************************
    //Method Purpose 	:	Sets the focus on the control.
    //Tags        	  : Control, Focus, Set
    //Linked methods  : setAttributePropertyValue
    //*************************************************
    setControlFocus: function (executionContext, controlName) {
        Common.setControlPropertyValue(executionContext, controlName, function (control) { control.setFocus(); });
    },

    //***************************************************************************************************************************************************************************************************************************************************
    //Method Purpose 	:	Displays an error message for the control to indicate that data isn�t valid. When this method is used, a red "X" icon appears next to the control. On Dynamics 365 mobile clients, tapping on the icon will display the message.
    //Tags        	  : Control, Notification, Set
    //Linked methods  : isBlankOrNull, processAttributeControls
    //***************************************************************************************************************************************************************************************************************************************************
    setControlNotification: function (executionContext, attributeName, message, notificationId) {
        if (!Common.isBlankOrNull(message) &&
            !Common.isBlankOrNull(notificationId)) {
            Common.processAttributeControls(executionContext, attributeName, function (control) { control.setNotification(message, notificationId); });
        }
    },

    //**********************************************************
    //Method Purpose 	:	Sets control property value.
    //Tags        	  : Attribute, Property, Set
    //Linked methods  : getControl
    //**********************************************************
    setControlPropertyValue: function (executionContext, controlName, action) {
        var control = Common.getControl(executionContext, controlName);
        if (control != null &&
            action != null) {
            action(control);
        }
    },

    //******************************************************************************
    //Method Purpose 	:	Sets a value that indicates whether the control is visible.
    //Tags        	  : Control, Visible, Show, Hide, Set
    //Linked methods  : setControlPropertyValue
    //******************************************************************************
    setControlVisible: function (executionContext, controlName, isVisible) { //Specify true to show the control; false to hide the control.
        if (isVisible != null) {
            Common.setControlPropertyValue(executionContext, controlName, function (control) { control.setVisible(isVisible); });
        }
    },


    /*******************************************************************************************************************************************/
    /********************************************************ASYNC WEB API METHODS**************************************************************/
    /*******************************************************************************************************************************************/


    //**************************************************************
    //Method Purpose 	:	Associate request asynchronously.
    //Tags        	  : Associate, Object
    //Linked methods  : isBlankOrNull, plural, xmlHttpRequestAsync
    //**************************************************************
    associateRequestAsync: function (sourceEntityName, sourceEntityId, destinationEntityName, destinationEntityId, relatioshipName, successCallBack, errorCallBack) {
        var requestString = !Common.isBlankOrNull(sourceEntityName) &&
            !Common.isBlankOrNull(destinationEntityName) &&
            !Common.isBlankOrNull(sourceEntityId) &&
            !Common.isBlankOrNull(destinationEntityId) &&
            !Common.isBlankOrNull(relatioshipName) ? Common.webClientUrl + Common.plural(sourceEntityName) + "(" + sourceEntityId + ")/" + relatioshipName + "/$ref" :
            null;

        if (!Common.isBlankOrNull(requestString)) {
            var association = {
                "@odata.id": Common.webClientUrl + Common.plural(destinationEntityName) + "(" + destinationEntityId + ")"
            };

            Common.xmlHttpRequestAsync("POST", requestString, association, successCallBack, errorCallBack);
        }
    },

    //**********************************************************************
    //Method Purpose  :	Execute Web API request to create the entity record.
    //Tags        	  : Web API, Create, Async
    //Linked methods  : isBlankOrNull
    //**********************************************************************
    createRecordAsync: function (entityName, data, successCallback, errorCallback) {
        if (!Common.isBlankOrNull(entityName) &&
            !Common.isBlankOrNull(data)) {

            //Call and execute OOB CRM V9 Web Api request to create record.
            Xrm.WebApi.createRecord(entityName, data).then(
                function success(response) {
                    successCallback(response);
                },
                function (error) {
                    errorCallback(error);
                }
            );
        }
    },

    //**********************************************************************
    //Method Purpose  :	Execute Web API request to delete the entity record.
    //Tags        	  : Web API, delete, Async
    //Linked methods  : isBlankOrNull
    //**********************************************************************
    deleteRecordAsync: function (entityName, entityId, successCallback, errorCallback) {
        if (!Common.isBlankOrNull(entityName) &&
            !Common.isBlankOrNull(entityId)) {

            //Call and execute OOB CRM V9 Web Api request to delete record.
            Xrm.WebApi.deleteRecord(entityName, entityId).then(
                function success(response) {
                    successCallback(response);
                },
                function (error) {
                    errorCallback(error);
                }
            );
        }
    },

    //*************************************************************
    //Method Purpose 	:	Diassociate request asynchronously. 
    //Tags        	  : Diassociate, Object
    //Linked methods  : isBlankOrNull, plural, xmlHttpRequestAsync
    //*************************************************************
    disassociateRequestAsync: function (sourceEntityName, sourceEntityId, destinationEntityId, relatioshipName, successCallBack, errorCallBack) {

        var requestString = !Common.isBlankOrNull(sourceEntityName) &&
            !Common.isBlankOrNull(sourceEntityId) &&
            !Common.isBlankOrNull(destinationEntityId) &&
            !Common.isBlankOrNull(relatioshipName) ? Common.webClientUrl + Common.plural(sourceEntityName) + "(" + sourceEntityId + ")/" + relatioshipName + "(" + destinationEntityId + ")/$ref" :
            null;

        if (!Common.isBlankOrNull(requestString)) {
            Common.xmlHttpRequestAsync("DELETE", requestString, null, successCallBack, errorCallBack);
        }
    },

    //***********************************************************************************************************************************************
    //Method Purpose       : Execute Web API request to retrieve multiple entity records.
    //Tags        	       : Web API, retrieveMultiple, Async
    //Linked methods       : isBlankOrNull
    //Response             : Retrieve the response length as response.entities.length and elements as response.entities[i].attributename
    //Passing query string : "&$expand=relationshipname($select=list of fields to retrieve)&$filter=fieldName eq fieldValue&$orderby=fieldName asc"
    //Example              : function successCallback(response) {
    //                        for (var i = 0; i < response.entities.length; i++) {
    //                          alert(response.entities[i].fieldName);
    //                           }
    //                          }
    //***********************************************************************************************************************************************
    retrieveMultipleRecordAsync: function (entityName, arrayOfFieldsToRetrieve, queryString, successCallback, errorCallback) {
        if (!Common.isBlankOrNull(entityName) &&
            !Common.isBlankOrNull(arrayOfFieldsToRetrieve)) {
            var query = "?$select=" + arrayOfFieldsToRetrieve.join(",");

            if (!Common.isBlankOrNull(queryString)) { query += queryString; }

            //Call and execute OOB CRM V9 Web Api request to retrieve multiple records.
            Xrm.WebApi.retrieveMultipleRecords(entityName, query).then(
                function success(response) {
                    successCallback(response);
                },
                function (error) {
                    errorCallback(error);
                }
            );
        }
    },

    //*********************************************************************************************
    //Method Purpose  :	Execute Web API request to retrieve multiple entity records using fetchxml.
    //Tags        	  : Web API, retrieveMultiple, fetchxml, Async
    //Linked methods  : isBlankOrNull
    //*********************************************************************************************
    retrieveMultipleUsingFetchXmlAsync: function (entityName, fetchXml, successCallback, errorCallback) {
        if (!Common.isBlankOrNull(entityName) &&
            !Common.isBlankOrNull(fetchXml)) {
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml); //Encoding the URI components as required for web Api calls to execute fetchxml.

            //Call and execute OOB CRM V9 Web Api request to retrieve multiple records using fetchxml.
            Xrm.WebApi.retrieveMultipleRecords(entityName, fetchXml).then(
                function success(response) {
                    successCallback(response);
                },
                function (error) {
                    errorCallback(error);
                }
            );
        }
    },

    //*********************************************************************************************************************************************
    //Method Purpose                          :	Execute Web API request to retrieve the entity record.
    //Tags        	                          : Web API, retrieve, Async
    //Linked methods                          : isBlankOrNull
    //Passing query string for related entity : "&$expand=relatedEntityLookupSchemaname($select=list of fields name)"
    //Example to retrieve data from response  : function successCallback(response) {
    //                                           alert(response.fieldName); - To retrieve entity attributes
    //                                           alert(response.relatedEntityLookupSchemaname.fieldName); - To retrieve related entity attributes
    //                                           }
    //*********************************************************************************************************************************************
    retrieveRecordAsync: function (entityName, entityId, arrayOfFieldsToRetrieve, queryString, successCallback, errorCallback) {
        if (!Common.isBlankOrNull(entityName) &&
            !Common.isBlankOrNull(entityId) &&
            !Common.isBlankOrNull(arrayOfFieldsToRetrieve)) {
            var query = "?$select=" + arrayOfFieldsToRetrieve.join(",");

            if (!Common.isBlankOrNull(queryString)) { query += queryString; }

            //Call and execute OOB CRM V9 Web Api request to retrieve record.
            Xrm.WebApi.retrieveRecord(entityName, entityId, query).then(
                function success(response) {
                    successCallback(response);
                },
                function (error) {
                    errorCallback(error);
                }
            );
        }
    },

    //**********************************************************************
    //Method Purpose  :	Execute Web API request to update the entity record.
    //Tags        	  : Web API, update, Async
    //Linked methods  : isBlankOrNull
    //**********************************************************************
    updateRecordAsync: function (entityName, entityId, data, successCallback, errorCallback) {
        if (!Common.isBlankOrNull(entityName) &&
            !Common.isBlankOrNull(entityId) &&
            !Common.isBlankOrNull(data)) {

            //Call and execute OOB CRM V9 Web Api request to update record.
            Xrm.WebApi.updateRecord(entityName, entityId, data).then(
                function success(response) {
                    successCallback(response);
                },
                function (error) {
                    errorCallback(error);
                }
            );
        }
    },

    //*********************************************************
    //Method Purpose 	:	Create and execute Async Web API call.
    //Tags        	  : request, XMLHttpRequest, XMLHttp
    //Linked methods  : isBlankOrNull
    //*********************************************************
    xmlHttpRequestAsync: function (requestType, requestString, entityDataJsonObject, successCallBack, errorCallBack) {
        var result = null;
        var entityDataObject = "";

        if (!Common.isBlankOrNull(entityDataJsonObject)) {
            entityDataObject = JSON.stringify(entityDataJsonObject);
        }
        var req = new XMLHttpRequest();
        req.open(requestType, requestString, true);//false - Sync, true - Async
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200 || //Success codes with return value
                    this.status === 204 || //Success codes without return value
                    this.status === 1223) { //Success codes for associate and dissociate requests
                    result = "Success";
                    if (!Common.isBlankOrNull(this.response)) {
                        result = JSON.parse(this.response);
                    }
                    else if (!Common.isBlankOrNull(this.getResponseHeader("OData-EntityId"))) {
                        var uri = this.getResponseHeader("OData-EntityId");
                        result = uri.substr(uri.length - 38).substring(1, 37); //Get GUID of record returned in the response header
                    }
                    successCallBack(result); //This must not be placed inside above if statement as in case of associate and disassociate requests "this.response" will always be null.
                }
                else {
                    errorCallBack(this.statusText); //Return the statustext in case the status is not a success
                }
            }
        };
        req.send(entityDataObject);
    },


    /********************************************************/
    /************************* BPF **************************/
    /********************************************************/


    //***********************************************************************
    //Method Purpose 	:	Get the name of the current active stage on the BPF.
    //Tags        	  : BPF, Stage, Active, Name, Get
    //***********************************************************************
    getCurrentBPFStageName: function (executionContext) {
        var activeStageName = null;
        var activeProcess = Common.getEntityBPF(executionContext);  //Get the BPF object on the form  
        if (activeProcess != null) {
            activeStageName = activeProcess.getActiveStage().getName();   //Current active stage Name
        }
        return activeStageName;
    },

    //******************************************
    //Method Purpose 	:	Get entity BPF on form.
    //Tags        	  : BPF, Process
    //******************************************
    getEntityBPF: function (executionContext) {
        var activeProcess = null;
        var formContext = Common.getFormContext(executionContext);
        if (formContext != null) {
            var activeProcess = formContext.data.process;
        }
        return activeProcess;
    },

    //**************************************************************
    //Method Purpose 	:	Get the GUID of the active stage on the BPF.
    //Tags        	  : BPF, Process, Field, GUID                   
    //**************************************************************
    getEntityBPFActiveStageId: function (executionContext) {
        var activeStageId = null;
        var activeProcess = Common.getEntityBPF(executionContext);
        if (activeProcess != null) {
            activeStageId = activeProcess.getActiveStage().getId(); //Get BPF active stage Id
        }
        return activeStageId;
    },

    //****************************************************
    //Method Purpose 	:	Sets BPF attribute property value.
    //Tags        	  : Attribute, Property, Set, BPF
    //****************************************************
    setBPFAttributePropertyValue: function (executionContext, attributeName, action) {
        var control = Common.getControl(executionContext, attributeName);
        if (control != null) {
            var attribute = control.getAttribute();
            if (attribute != null &&
                action != null) {
                action(attribute);
            }
        }
    },

    //****************************************************
    //Method Purpose 	:	Gets BPF attribute property value.
    //Tags        	  : Attribute, Property, Get, BPF
    //****************************************************
    getBPFAttributePropertyValue: function (executionContext, attributeName, action) {
        var control = Common.getControl(executionContext, attributeName);
        if (control != null) {
            var attribute = control.getAttribute();
            if (attribute != null &&
                action != null) {
                propertyValue = action(attribute);
            }
            return propertyValue;
        }
    },

    //*********************************************************************************************************************
    //Method Purpose 	:	Sets whether data is required or recommended for the BPF attribute before the record can be saved.
    //Tags        	  : BPF, Attribute, Required, Mandatory, Level, Set
    //*********************************************************************************************************************
    setBPFAttributeRequiredLevel: function (executionContext, attributeName, requiredLevel) { //none, required, recommended
        Common.setBPFAttributePropertyValue(executionContext, attributeName, function (attribute) { attribute.setRequiredLevel(requiredLevel); });
    },

    //*******************************************************************************************************
    //Method Purpose 	:	Sets whether data from the BPF attribute will be submitted when the record is saved.
    //Tags        	  : BPF, Attribute, Submit, Mode, Set
    //*******************************************************************************************************
    setBPFAttributeSubmitMode: function (executionContext, attributeName, submitMode) { //submitMode = always, never, dirty
        Common.setBPFAttributePropertyValue(executionContext, attributeName, function (attribute) { attribute.setSubmitMode(submitMode); });
    },

    //*****************************************************************
    //Method Purpose 	:	Disable/Enable Fields on BPF.
    //Tags        	  : BPF, Control, Attribute, Disable, Enable, Set
    //*****************************************************************
    setBPFControlDisable: function (executionContext, controlName, isDisable) { //Specify true or false to disable or enable the control.
        Common.setControlsDisable(executionContext, [Common.bpfAtributePrefix + controlName], isDisable);
    },

    //*************************************************************
    //Method Purpose 	:	Sets the focus on the BPF control.
    //Tags        	  : BPF, Attribute, Field, Control, Focus, Set
    //*************************************************************
    setBPFControlFocus: function (executionContext, controlName) {
        Common.setControlFocus(executionContext, Common.bpfAtributePrefix + controlName);
    },

    //*************************************************************
    //Method Purpose 	:	Show or Hide Fields on BPF.
    //Tags        	  : BPF, Fields, Attribute, Visible, Hide, Set
    //*************************************************************
    setBPFControlVisible: function (executionContext, controlName, isVisible) { //Specify true to show the control; false to hide the control.
        Common.setControlVisible(executionContext, Common.bpfAtributePrefix + controlName, isVisible);
    },

    //****************************************************************************************************
    //Method Purpose 	:	Update attribute values if the BPF active stage is the same as the expected stage.
    //Tags        	  : BPF, Process, Field, Update, Attributes
    //****************************************************************************************************
    updateAttributesDependingOnBPFActiveStage: function (executionContext, requiredBPFActiveStageId, attributesDataObject) {
        var activeStageId = Common.getEntityBPFActiveStageId(executionContext);
        if (activeStageId != null &&
            !Common.isBlankOrNull(requiredBPFActiveStageId) &&
            activeStageId == requiredBPFActiveStageId) {
            if (!Common.isBlankOrNull(attributesDataObject)) {
                for (var key in attributesDataObject) {
                    var value = Common.getObjectKeyValue(key, attributesDataObject);
                    Common.setAttributeValue(executionContext, key, value);
                }
            }
        }
    },

    //*****************************************************************************************************************************
    //Method Purpose 	:	Update the related BPF entity stage on the form.
    //Tags        	  : RelatedBPF, Attribute, Stage, Set, StageId
    //Parameters      : relatedEntityLookupOnBpfEntitySchemaName - To be entered in the format "_LookupOnBpfEntitySchemaName_value"
    //*****************************************************************************************************************************
    updateRelatedBPFEntityStage: function (executionContext, bpfEntitySchemaName, stageIdToUpdate) {
        var result = null;
        var formContext = !Common.isBlankOrNull(stageIdToUpdate) && !Common.isBlankOrNull(executionContext) && !Common.isBlankOrNull(bpfEntitySchemaName) ? Common.getFormContext(executionContext) : null;
        if (!Common.isBlankOrNull(formContext)) {
            var entityName = formContext.data.entity.getEntityName();
            var entityId = Common.removeCurlyBraceFromGuid(formContext.data.entity.getId());
            var record = Common.retrieveAllRecordSync(bpfEntitySchemaName, ["businessprocessflowinstanceid"], "&$filter=_bpf_" + entityName + "id_value eq " + entityId);
            if (!Common.isBlankOrNull(record) &&
                record.value.length > 0) {
                record = record.value[0]; //Their always be a single record for each BPF for a particular entity record in CRM.
                var entity = { //Entity object for Web Api update call.
                    "activestageid@odata.bind": "processstages(" + stageIdToUpdate + ")"
                }
                result = Common.updateRecordSync(bpfEntitySchemaName, record.businessprocessflowinstanceid, entity);
            }
        }
        return result;
    },

    /***********************************************************/
    /************************* DIALOG **************************/
    /***********************************************************/


    //**************************************
    //Method Purpose 	:	Open Alert Dialog.
    //Tags        	  : Open, Alert, Dialog
    //**************************************
    openAlertDialog: function (confirmButtonLabelText, alertMessageText, alertWindowHeight, alertWindowWidth, successCallback, errorCallback) {
        var alertStrings = { confirmButtonLabel: confirmButtonLabelText, text: alertMessageText };
        var alertOptions = { height: alertWindowHeight, width: alertWindowWidth };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
            successCallback,
            errorCallback
        );
    },

    //****************************************
    //Method Purpose 	:	Open Confirm Dialog.
    //Tags        	  : Open, Confirm, Dialog
    //****************************************
    openConfirmDialog: function (confirmButtonLabelText, cancelButtonLabelText, subTitleText, confirmMessageText, confirmWindowTitle, confirmWindowHeight, confirmWindowWidth, successCallback, errorCallback) {
        var confirmStrings = { confirmButtonLabel: confirmButtonLabelText, cancelButtonLabel: cancelButtonLabelText, subtitle: subTitleText, text: confirmMessageText, title: confirmWindowTitle };
        var confirmOptions = { height: confirmWindowHeight, width: confirmWindowWidth };
        Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
            successCallback,
            errorCallback
        );
    },

    //***************************************
    //Method Purpose 	:	Open Error Dialog.
    //Tags        	  : Open, Error, Dialog
    //***************************************
    openErrorDialog: function (errorOptions, successCallback, errorCallback) {
        Xrm.Navigation.openErrorDialog(errorOptions).then(
            successCallback,
            errorCallback);
    },


    /********************************************************/
    /*********************** ENTITY FORM ********************/
    /********************************************************/


    //************************************
    //Method Purpose 	:	Get form context.
    //Tags        	  : Form, Context
    //************************************
    getFormContext: function (executionContext) {
        var formContext = null;
        if (executionContext !== null) {
            if (typeof executionContext.getAttribute === 'function') {
                formContext = executionContext; //most likely called from the ribbon.
            } else if (typeof executionContext.getFormContext === 'function') {
                formContext = executionContext.getFormContext(); // most likely called from the form via a handler
            }
        }
        return formContext;
    },

    //**************************************************
    //Method Purpose 	:	Prevent the record from saving.
    //Tags        	  : Prevent, Record, Save
    //**************************************************
    preventSaveRecord: function (executionContext) {
        if (executionContext != null) {
            Common.preventSaveRecordAndAlert(executionContext, "");
        }
    },

    //*************************************************************************
    //Method Purpose 	:	Prevent user from saving the record and show an alert.
    //Tags        	  : Form, Entity, Prevent, Save, Alert
    //*************************************************************************
    preventSaveRecordAndAlert: function (executionContext, alertMessage) {
        if (executionContext != null) {
            var saveEvent = executionContext.getEventArgs();
            if (saveEvent != null) {
                if (!Common.isBlankOrNull(alertMessage)) {
                    Common.openAlertDialog("Ok", alertMessage);
                }
                saveEvent.preventDefault();
            }
        }
    },

    //**********************************************
    //Method Purpose 	:	Reload current entity form.
    //Tags        	  : Form, Entity, Reload
    //**********************************************
    reloadEntityForm: function (executionContext) {
        var formContext = Common.getFormContext(executionContext);
        if (formContext != null) {
            var entityFormOptions = {};
            var entity = formContext.data.entity;
            entityFormOptions["entityName"] = entity.getEntityName();
            entityFormOptions["entityId"] = Common.removeCurlyBraceFromGuid(entity.getId());
            Xrm.Navigation.openForm(entityFormOptions); //Reload current entity form
        }
    },

    //**********************************************
    //Method Purpose 	:	Reload current entity form using formcontext as a parameter on ribbon button click.
    //Tags        	  : Form, Entity, Reload, formcontext.
    //**********************************************
    reloadEntityFormWithFormContext: function (formContext) {
        if (formContext != null) {
            var entityFormOptions = {};
            var entity = formContext.data.entity;
            entityFormOptions["entityName"] = entity.getEntityName();
            entityFormOptions["entityId"] = Common.removeCurlyBraceFromGuid(entity.getId());
            Xrm.Navigation.openForm(entityFormOptions); //Reload current entity form
        }
    },


    /********************************************************/
    /******************* ENTITY FORM FOOTER *****************/
    /********************************************************/


    //***********************************************************************************************************************
    //Method Purpose 	:	Sets whether data is required or recommended for the footer attribute before the record can be saved.
    //Tags        	  : Footer, Attribute, Required, Mandatory, Level, Set
    //***********************************************************************************************************************
    setFooterAttributeRequiredLevel: function (executionContext, controlName, requiredLevel) { //none, required, recommended
        Common.setAttributesRequiredLevel(executionContext, [Common.footerAtributePrefix + controlName], requiredLevel);
    },

    //**********************************************************************************************************
    //Method Purpose 	:	Sets whether data from the footer attribute will be submitted when the record is saved.
    //Tags        	  : Footer, Attribute, Submit, Mode, Set
    //**********************************************************************************************************
    setFooterAttributeSubmitMode: function (executionContext, controlName, submitMode) { //submitMode = always, never, dirty
        Common.setAttributesSubmitMode(executionContext, [Common.footerAtributePrefix + controlName], submitMode);
    },

    //***********************************************************************
    //Method Purpose 	:	Disable/Enable the fields on the footer of the form.
    //Tags        	  : Footer, Control, Attribute, Disable, Enable, Set
    //***********************************************************************
    setFooterControlDisable: function (executionContext, controlName, isDisable) { //Specify true or false to disable or enable the control.
        Common.setControlsDisable(executionContext, [Common.footerAtributePrefix + controlName], isDisable);
    },

    //****************************************************************
    //Method Purpose 	:	Sets the focus on the footer control.
    //Tags        	  : Footer, Attribute, Field, Control, Focus, Set
    //****************************************************************
    setFooterControlFocus: function (executionContext, controlName) {
        Common.setControlFocus(executionContext, Common.footerAtributePrefix + controlName);
    },

    //******************************************************************
    //Method Purpose 	:	Show/Hide the fields on the footer of the form.
    //Tags        	  : Footer, Fields, Attribute, Visible, Hide, Set
    //******************************************************************
    setFooterControlVisible: function (executionContext, controlName, isVisible) { //Specify true to show the control; false to hide the control.
        Common.setControlVisible(executionContext, Common.footerAtributePrefix + controlName, isVisible);
    },


    /********************************************************/
    /******************* ENTITY FORM HEADER *****************/
    /********************************************************/


    //***********************************************************************************************************************
    //Method Purpose 	:	Sets whether data is required or recommended for the header attribute before the record can be saved.
    //Tags        	  : Header, Attribute, Required, Mandatory, Level, Set
    //***********************************************************************************************************************
    setHeaderAttributeRequiredLevel: function (executionContext, controlName, requiredLevel) { //none, required, recommended
        Common.setAttributesRequiredLevel(executionContext, [Common.headerAtributePrefix + controlName], requiredLevel);
    },

    //**********************************************************************************************************
    //Method Purpose 	:	Sets whether data from the header attribute will be submitted when the record is saved.
    //Tags        	  : Attribute, Field, Submit, Mode
    //**********************************************************************************************************
    setHeaderAttributeSubmitMode: function (executionContext, controlName, submitMode) { //submitMode = always, never, dirty
        Common.setAttributesSubmitMode(executionContext, [Common.headerAtributePrefix + controlName], submitMode);
    },

    //***********************************************************************
    //Method Purpose 	:	Disable/Enable the fields on the header of the form.
    //Tags        	  : Header, Control, Attribute, Disable, Enable, Set
    //***********************************************************************
    setHeaderControlDisable: function (executionContext, controlName, isDisable) { //Specify true or false to disable or enable the control.
        Common.setControlsDisable(executionContext, [Common.headerAtributePrefix + controlName], isDisable);
    },

    //****************************************************************
    //Method Purpose 	:	Sets the focus on the header control.
    //Tags        	  : Header, Attribute, Field, Control, Focus, Set
    //****************************************************************
    setHeaderControlFocus: function (executionContext, controlName) {
        Common.setControlFocus(executionContext, Common.headerAtributePrefix + controlName);
    },

    //******************************************************************
    //Method Purpose 	:	Show/Hide the fields on the header of the form.
    //Tags        	  : Header, Fields, Attribute, Visible, Hide, Set
    //******************************************************************
    setHeaderControlVisible: function (executionContext, controlName, isVisible) { //Specify true to show the control; false to hide the control.
        Common.setControlVisible(executionContext, Common.headerAtributePrefix + controlName, isVisible);
    },


    /***********************/
    /******* GENERAL *******/
    /***********************/


    //*******************************************************
    //Method Purpose 	:	Get the key value from a data object
    //Tags        	  : Object, Key, Value
    //*******************************************************
    getObjectKeyValue: function (key, dataObject) {
        var value = null;
        if (!Common.isBlankOrNull(dataObject) &&
            !Common.isBlankOrNull(key)) {
            value = dataObject[key];
        }
        return value;
    },

    //*********************************************************************************
    //Method Purpose 	:	Returns a Boolean value indicating if the value is blank/null.
    //Tags        	  : Value, Blank, Null
    //*********************************************************************************
    isBlankOrNull: function (value) {
        return (value == null ||
            value === "" ||
            value.length === 0);

    },

    //********************************************************************
    //Method Purpose 	:	Validate the specified reg ex on specified field 
    //Tags        	  : RegEx, Field
    //********************************************************************
    isStringMatchesRegEx: function (str, regEx) {
        var isStringMatches = false;
        if (!Common.isBlankOrNull(str) &&
            !Common.isBlankOrNull(regEx)) {
            var re = new RegExp(regEx);
            if (re.test(str)) {
                isStringMatches = true;
            }
        }
        return isStringMatches;
    },

    //********************************************
    //Method Purpose 	:	Convert number to string
    //Tags        	  : Number, Pad, String
    //********************************************
    pad: function (number) {
        var r = String(number);
        if (r.length === 1) {
            r = '0' + r;
        }
        return r;
    },

    //**********************************************
    //Method Purpose  :	Get the plural of the word.
    //Tags        	  : Plural, String
    //**********************************************
    plural: function (str) {
        if (!Common.isBlankOrNull(str)) {
            var arrayOfNonPluralEntitySchemaNames = ['usersettingscollection'];
            if ((arrayOfNonPluralEntitySchemaNames.indexOf(str)) === -1) {
                if ((str.endsWith("s")) ||
                    (str.endsWith("x"))) {
                    str += "es";
                }
                else if (str.endsWith("y")) { str = str.replace(/.$/, "ies"); } // Replacing the last character "/.$/" with "ies"
                else { str += "s"; }
            }
        }
        return str;
    },

    //*********************************************************
    //Method Purpose 	:	Remove the curly braces from the GUID.
    //Tags        	  : Curly, Braces, GUID
    //*********************************************************
    removeCurlyBraceFromGuid: function (guid) {
        var returnGuid = guid;
        try {
            if (guid != null) {
                returnGuid = returnGuid.replace("{", "").replace("}", "");
            }
        }
        catch (error) { }  //Supress error.
        return returnGuid;
    },

    //**************************************************************************
    //Method Purpose 	:	Update the "State" and "Statuscode" of an entity record
    //Tags        	  : Set, StateCode, StatusCode, EntityId, EntityName.
    //**************************************************************************
    updateEntityState: function (entityId, entityName, stateCode, statusCode) {
        var entityDataObject = {};
        entityDataObject.statecode = stateCode;
        entityDataObject.statuscode = statusCode;

        Common.updateRecordSync(entityName, entityId, entityDataObject);
    },


    /**********************************/
    /******* HTML WEB RESOURCE  *******/
    /**********************************/


    //*********************************************************
    //Method Purpose 	:	Refresh HTML Web Resource on form.
    //Tags        	  : HTML, Control, Refresh, Web Resource
    //*********************************************************
    refreshHTMLWebResource: function (executionContext, webResourceControlName) {
        var formContext = Common.getFormContext(executionContext);
        if (formContext != null) {
            formContext.data.entity.save(null);
            var wrRelatedOpportunities = formContext.ui.controls.get(webResourceControlName);
            var src = wrRelatedOpportunities.getSrc();
            wrRelatedOpportunities.setSrc(null);
            wrRelatedOpportunities.setSrc(src);
        }
    },


    /********************************************************/
    /****************** LOOKUP ATTRIBUTES *******************/
    /********************************************************/


    //**************************************************************
    //Method Purpose 	:	Pre filter lookup attribute on entity form.
    //Tags        	  : Attribute, Field, Lookup, Filter, FetchXml
    //**************************************************************
    addLookupControlPreSearch: function (executionContext, lookupAttributeName, preSearchHandler) {
        if (lookupAttributeName != null &&
            preSearchHandler != null) {
            var lookupControl = Common.getControl(executionContext, lookupAttributeName);
            if (lookupControl != null) {
                lookupControl.addPreSearch(preSearchHandler);
            }
        }
    },

    //****************************************************************************************************************************************************
    //Method Purpose 	:	Retrieve the fields of the entity for the selected record in the lookup.
    //NOTE            : In the parameter "arrayOfFieldsToRetrieve", for Lookup field please specify the name in the format "_transactioncurrencyid_value"
    //Tags        	  : Attribute, Field, Lookup, Elements
    //****************************************************************************************************************************************************
    getFieldsOfLookupEntity: function (executionContext, lookupAttributeName, arrayOfFieldsToRetrieve) {
        var result = null;
        if (!Common.isBlankOrNull(arrayOfFieldsToRetrieve)) {
            var attribute = Common.getLookupAttributeElements(executionContext, lookupAttributeName);
            if (attribute != null) {
                result = Common.retrieveSingleRecordSync(attribute.entityType, attribute.id, arrayOfFieldsToRetrieve, null);
            }
        }
        return result;
    },

    //***************************************************************************************
    //Method Purpose 	:	Get the lookup attribute elements for specified attribute from form.
    //Tags        	  : Attribute, Field, Lookup, Elements, Get
    //Linked methods  : getAttributeValue
    //***************************************************************************************
    getLookupAttributeElements: function (executionContext, attributeName) {
        var lookupAttributeElements = null;
        var attribute = Common.getAttributeValue(executionContext, attributeName);
        if (attribute != null) {
            lookupAttributeElements = attribute[0];
        }
        return lookupAttributeElements;
    },

    //****************************************************************************************
    //Method Purpose 	:	Function to get the lookup attribute object from the entity retrieved.
    //Tags        	  : entityObject, lookupSchemaName
    //Linked methods  : isBlankOrNull
    //****************************************************************************************
    getLookupAttributeFromEntityObject: function (entityObject, lookupSchemaName) {
        var lookupAttribute = null;
        if (entityObject != null &&
            !Common.isBlankOrNull(lookupSchemaName)) {
            lookupAttribute = new Array();
            lookupAttribute[0] = new Object();
            lookupAttribute[0].id = entityObject["_" + lookupSchemaName + "_value"];
            lookupAttribute[0].name = entityObject["_" + lookupSchemaName + "_value@OData.Community.Display.V1.FormattedValue"];
            lookupAttribute[0].entityType = entityObject["_" + lookupSchemaName + "_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
        }
        return lookupAttribute;
    },

    //***********************************************************************
    //Method Purpose 	:	Pre filter customer lookup attribute on entity form.
    //Tags        	  : Attribute, Field, Lookup, Filter, FetchXml
    //***********************************************************************
    preFilterCustomerTypeLookup: function (executionContext, lookupAttributeName, fetchXmlForAccount, fetchXmlForContact) {
        if (lookupAttributeName != null &&
            (fetchXmlForAccount != null ||
                fetchXmlForContact != null)) {
            var lookupControl = Common.getControl(executionContext, lookupAttributeName);
            if (lookupControl != null) {
                lookupControl.addPreSearch(function () {
                    var lookupControl = Common.getControl(executionContext, lookupAttributeName);
                    if (lookupControl != null) {
                        if (fetchXmlForAccount != null) {
                            lookupControl.addCustomFilter(fetchXmlForAccount, "account");
                        }
                        if (fetchXmlForContact != null) {
                            lookupControl.addCustomFilter(fetchXmlForContact, "contact");
                        }
                    }
                });
            }
        }
    },

    //*********************************************************************
    //Method Purpose 	:	Remove Pre filter lookup attribute on entity form.
    //Tags        	  : Attribute, Field, Lookup, Filter, FetchXml
    //*********************************************************************
    removeLookupControlPreSearch: function (executionContext, lookupAttributeName, preSearchHandler) {
        if (lookupAttributeName != null &&
            preSearchHandler != null) {
            var lookupControl = Common.getControl(executionContext, lookupAttributeName);
            if (lookupControl != null) {
                lookupControl.removePreSearch(preSearchHandler);
            }
        }
    },

    //***********************************************************
    //Method Purpose 	:	Set value in a lookup attribute on form.
    //Tags        	  : Attribute, Value, Set, Lookup
    //***********************************************************
    setLookupAttributeValue: function (executionContext, attributeName, recordId, recordName, entityName) {
        var attribute = Common.getAttribute(executionContext, attributeName);
        if (attribute != null &&
            recordId != null &&
            recordName != null &&
            entityName != null) {
            var attributeValue = new Array();
            attributeValue[0] = new Object();
            attributeValue[0].id = recordId;
            attributeValue[0].name = recordName;
            attributeValue[0].entityType = entityName;
            Common.setAttributeValue(executionContext, attributeName, attributeValue);
        }
    },

    //*************************************************************************
    //Method Purpose 	:	Update field values in the related record in a lookup.
    //Tags        	  : Update, Fields, Lookup, Entity
    //*************************************************************************
    updateFieldsOfLookupEntity: function (executionContext, lookupAttributeName, entityObject) {
        var result = null;
        if (entityObject != null) {
            var attribute = Common.getLookupAttributeElements(executionContext, lookupAttributeName);
            if (attribute != null) {
                result = Common.updateRecordSync(attribute.entityType, attribute.id, entityObject);
            }
        }
        return result;
    },


    /********************************************************/
    /****************** OPTIONSET ATTRIBUTES ****************/
    /********************************************************/


    //**************************************************************************************************
    //Method Purpose 	:	Returns an array of option objects representing valid options for an attribute.
    //Tags        	  : Attribute, Field, OptionSet, Items, Values
    //**************************************************************************************************
    getOptionSetItems: function (executionContext, attributeSchemaName) {
        var optionSet = [];
        var attribute = Common.getAttribute(executionContext, attributeSchemaName);
        if (attribute != null) {
            optionSet = attribute.getOptions();
        }
        return optionSet;
    },

    //***************************************************************************************************************************************
    //Method Purpose 	:	Get the Option set Item text from the value from the collection of items obtained from function "getOptionSetItems".
    //Tags        	  : Attribute, Field, OptionSet, Text, Item
    //***************************************************************************************************************************************
    getOptionSetItemText: function (optionSetItemValue, optionSet) {
        if (optionSetItemValue != null &&
            optionSet != null) {
            for (var i = 0; i < optionSet.length; i++) {
                if (optionSet[i].value == optionSetItemValue) {
                    return optionSet[i].text;
                }
            }
        }
    },

    //**********************************************************
    //Method Purpose 	:	Get selected option set attribute text.
    //Tags        	  : Attribute, Selected, OptionSet, Text, 
    //**********************************************************
    getSelectedOptionSetAttributeText: function (executionContext, attributeName) {
        var optionSetText = null;
        var attributeValue = Common.getAttributeValue(executionContext, attributeName);
        if (attributeValue != null) {
            var optionSet = Common.getOptionSetItems(executionContext, attributeName);
            if (optionSet != null) {
                optionSetText = Common.getOptionSetItemText(attributeValue, optionSet);
            }
        }
        return optionSetText;
    },


    /********************************************************/
    /******************** SECURITY ROLE *********************/
    /********************************************************/


    //*****************************************************************************
    //Method Purpose 	:	Get the associated teams Id of the current logged in user.
    //Tags        	  : Team, User, Name, GUID, Get
    //*****************************************************************************
    getAssociatedTeamsIdOfLoggedInUser: function (executionContext) {
        var teamIds = [];
        var formContext = Common.getFormContext(executionContext);
        if (formContext != null) {
            var userId = Common.removeCurlyBraceFromGuid(formContext.context.getUserId()); //Get logged-in user GUID

            var teams = Common.retrieveAllRecordSync("teammembership", ["teamid"], "&$filter=systemuserid eq" + " " + userId);
            if (teams != null) {
                for (var i = 0; i < teams.value.length; i++) {
                    teamIds.push(teams.value[i]["teamid"]);
                }
            }
        }
        return teamIds;
    },

    //*******************************************************************************************************************************
    //Method Purpose 	:	Returns an array object having "id" & "name" key/value pair of security role GUID and their respective name.
    //Tags        	  : Logged-In, User, Security, Roles, Name, GUID, Get
    //*******************************************************************************************************************************
    getLoggedInUserSecurityRoles: function () {
        var securityRoles = [];
        //This will give us security roles GUID of current user as well as security roles GUID of all teams assigned to current user
        var currentUserRoleIds = Common.globalContext.userSettings.securityRoles;
        if (!Common.isBlankOrNull(currentUserRoleIds)) {
            //Prepare array in the formate required in api filter
            //For example : roleid eq 00000000-0000-0000-0000-000000000000 or roleid eq 00000000-0000-0000-0000-000000000000
            roleIdsforFilterArray = "roleid eq " + currentUserRoleIds.join(" or roleid eq ");
            //var result = createAndExecuteWebApiRequest("GET", "role", null, null, ["name", "roleid"], roleIdsforFilterArray, null, null, null, false)
            var queryString = "&$filter=" + roleIdsforFilterArray;
            result = Common.retrieveAllRecordSync("role", ["name", "roleid"], queryString)
            if (result != null) {
                for (var i = 0; i < result.value.length; i++) {
                    securityRoles.push({ id: result.value[i]["roleid"], name: result.value[i]["name"] });
                }
            }
        }
        return securityRoles;
    },

    //********************************************************
    //Method Purpose 	:	Get security role name using role id.
    //Tags        	  : Security, Role, Name, GUID, Get
    //********************************************************
    getSecurityRoleName: function (roleId) {
        var roleName = null;
        if (!Common.isBlankOrNull(roleId)) {
            var role = Common.retrieveSingleRecordSync("role", roleId, ["name"], null);
            if (role != null) {
                roleName = role["name"];
            }
        }
        return roleName;
    },

    //*****************************************************************************
    //Method Purpose 	:	Check if the logged-in is associated with the team or not. 
    //Tags        	  : Team, User, Name.
    //*****************************************************************************
    isLoggedInUserAssociatedWithTheTeam: function (executionContext, teamId) {
        var retrievedTeamsId = [];
        var isUserInTeam = false;
        retrievedTeamsId = Common.getAssociatedTeamsIdOfLoggedInUser(executionContext);
        if (!Common.isBlankOrNull(retrievedTeamsId)) {
            retrievedTeamsId.forEach(function (retrievedTeamId) {
                if (retrievedTeamId.toUpperCase() === teamId.toUpperCase()) { //Compare the team GUID with the GUID
                    isUserInTeam = true;
                }
            });
        }
        return isUserInTeam;
    },

    //**********************************************************
    //Method Purpose 	:	Check if the user has the specific role. 
    //Tags        	  : Security, Role, Name.
    //**********************************************************
    isLoggedInUserHasRole: function (roleName) {
        var isSecurityRolePresent = false;
        var securityRoles = [];
        securityRoles = Common.getLoggedInUserSecurityRoles();
        if (!Common.isBlankOrNull(securityRoles)) {
            securityRoles.forEach(function (securityRole) {
                if (securityRole.name === roleName) {
                    isSecurityRolePresent = true;
                }
            });
        }
        return isSecurityRolePresent;
    },


    /******************************************************************************************************************************************/
    /***************************************************SYNC WEB API METHODS*******************************************************************/
    /******************************************************************************************************************************************/


    //***************************************************
    //Method Purpose 	:	Associate request synchronously.
    //Tags        	  : Associate, Object
    //***************************************************
    associateRequestSync: function (sourceEntityName, sourceEntityId, destinationEntityName, destinationEntityId, relatioshipName) {
        var result = null;

        var requestString = !Common.isBlankOrNull(sourceEntityName) &&
            !Common.isBlankOrNull(sourceEntityId) &&
            !Common.isBlankOrNull(destinationEntityName) &&
            !Common.isBlankOrNull(destinationEntityId) &&
            !Common.isBlankOrNull(relatioshipName) ? Common.webClientUrl + Common.plural(sourceEntityName) + "(" + sourceEntityId + ")/" + relatioshipName + "/$ref" :
            null;

        if (!Common.isBlankOrNull(requestString)) {
            var association = {
                "@odata.id": Common.webClientUrl + Common.plural(destinationEntityName) + "(" + destinationEntityId + ")"
            };
            result = Common.xmlHttpRequestSync("POST", requestString, association);
        }
        return result;
    },

    //*************************************************************
    //Method Purpose 	:	Call global or local action synchronously.
    //Tags        	  : Action, Object
    //*************************************************************
    callGlobalOrLocalActionSync: function (actionSchemaName, relatedEntityName, recordId, parametersObject) {
        var result = null;

        //Create request string to execute global action
        var requestString = !Common.isBlankOrNull(actionSchemaName) ? Common.webClientUrl + actionSchemaName :
            null;

        //Create request string to execute local action in case required parameters are provided
        requestString = !Common.isBlankOrNull(relatedEntityName) && !Common.isBlankOrNull(recordId) ? Common.webClientUrl + Common.plural(relatedEntityName) + "(" + Common.removeCurlyBraceFromGuid(recordId) + ")" + "/Microsoft.Dynamics.CRM." + actionSchemaName :
            requestString;

        if (!Common.isBlankOrNull(requestString)) {
            result = Common.xmlHttpRequestSync("POST", requestString, parametersObject);
        }
        return result;
    },

    //*******************************************************
    //Method Purpose 	:	Create entity record synchronously.
    //Tags        	  : Create, Object
    //*******************************************************
    createRecordSync: function (entitySchemaName, entityDataObject) {
        var result = null;
        var requestString = !Common.isBlankOrNull(entitySchemaName) && !Common.isBlankOrNull(entityDataObject) ? Common.webClientUrl + Common.plural(entitySchemaName) :
            null;
        if (!Common.isBlankOrNull(requestString)) {
            result = Common.xmlHttpRequestSync("POST", requestString, entityDataObject);
        }
        return result;
    },

    //*******************************************************
    //Method Purpose 	:	Delete entity record synchronously.
    //Tags        	  : Update, Object
    //*******************************************************
    deleteRecordSync: function (entitySchemaName, recordId) {
        var result = null;
        var requestString = !Common.isBlankOrNull(entitySchemaName) && !Common.isBlankOrNull(recordId) ? Common.webClientUrl + Common.plural(entitySchemaName) + "(" + Common.removeCurlyBraceFromGuid(recordId) + ")" :
            null;

        if (!Common.isBlankOrNull(requestString)) {
            result = Common.xmlHttpRequestSync("DELETE", requestString, null);
        }
        return result;
    },

    //*****************************************************
    //Method Purpose 	:	Diassociate request synchronously.
    //Tags        	  : Diassociate, Object
    //*****************************************************
    disassociateRequestSync: function (sourceEntityName, sourceEntityId, destinationEntityId, relatioshipName) {
        var result = null;

        var requestString = !Common.isBlankOrNull(sourceEntityName) &&
            !Common.isBlankOrNull(sourceEntityId) &&
            !Common.isBlankOrNull(destinationEntityId) &&
            !Common.isBlankOrNull(relatioshipName) ? Common.webClientUrl + Common.plural(sourceEntityName) + "(" + sourceEntityId + ")/" + relatioshipName + "(" + destinationEntityId + ")/$ref" :
            null;

        if (!Common.isBlankOrNull(requestString)) {
            result = Common.xmlHttpRequestSync("DELETE", requestString, null);
        }
        return result;
    },

    //****************************************************
    //Method Purpose 	:	Execute workflows synchronously.
    //Tags        	  : Workflows, Object
    //****************************************************
    executeWorkflowSync: function (workflowId, recordId) {
        var result = null;

        var requestString = !Common.isBlankOrNull(workflowId) &&
            !Common.isBlankOrNull(recordId) ? Common.webClientUrl + "workflows(" + Common.removeCurlyBraceFromGuid(workflowId) + ")" + "/Microsoft.Dynamics.CRM.ExecuteWorkflow" :
            null;

        if (!Common.isBlankOrNull(requestString)) {
            var data = {
                "EntityId": Common.removeCurlyBraceFromGuid(recordId)
            };

            result = Common.xmlHttpRequestSync("POST", requestString, data);
        }
        return result;
    },

    //*********************************************************************************************************************************************************
    //Method Purpose 	             : Retrive all entity record synchronously.
    //Tags        	               : Retrive, Result, All, Multiple
    //Passing query string example : "&$expand=relationshipname($select=list of fields to retrieve)&$filter=fieldName eq fieldValue&$orderby=fieldName asc"
    //*********************************************************************************************************************************************************
    retrieveAllRecordSync: function (entitySchemaName, arrayOfFieldsToRetrieve, queryString) {
        var result = null;

        var requestString = !Common.isBlankOrNull(entitySchemaName) ? Common.webClientUrl + Common.plural(entitySchemaName) :
            null;

        if (!Common.isBlankOrNull(requestString)) {
            requestString = !Common.isBlankOrNull(arrayOfFieldsToRetrieve) ? requestString + "?$select=" + arrayOfFieldsToRetrieve.join(",") : //Append names of the fields to retrieve in the request string.
                requestString;

            requestString = !Common.isBlankOrNull(queryString) ? requestString + queryString : requestString; //Append additional query string provided to implement expand, filter or orderby.
            result = Common.xmlHttpRequestSync("GET", requestString, null);
        }
        return result;
    },

    //****************************************************************
    //Method Purpose 	:	Retrieve record using fetchXml synchronously.
    //Tags        	  : fetchXml, Object
    //****************************************************************
    retrieveRecordFetchXmlSync: function (entitySchemaName, fetchXml) {
        var result = null;

        var requestString = !Common.isBlankOrNull(entitySchemaName) && !Common.isBlankOrNull(fetchXml) ? Common.webClientUrl + Common.plural(entitySchemaName) :
            null;
        var fetchXml = encodeURIComponent(fetchXml); //Encoding the URI components as required for web Api calls to execute fetchxml.
        requestString += "?fetchXml=" + fetchXml;
        result = Common.xmlHttpRequestSync("GET", requestString, null);
        return result;
    },

    //*******************************************************************************************
    //Method Purpose 	        :	Retrive single entity record synchronously.
    //Tags        	          : Retrive, Result, Single
    //Passing query string    : "&$expand=relationshipname($select=list of fields to retrieve)"
    //*******************************************************************************************
    retrieveSingleRecordSync: function (entitySchemaName, recordId, arrayOfFieldsToRetrieve, queryString) {
        var result = null;

        var requestString = !Common.isBlankOrNull(entitySchemaName) && !Common.isBlankOrNull(recordId) ? Common.webClientUrl + Common.plural(entitySchemaName) + "(" + Common.removeCurlyBraceFromGuid(recordId) + ")" :
            null;

        if (!Common.isBlankOrNull(requestString)) {
            requestString = !Common.isBlankOrNull(arrayOfFieldsToRetrieve) ? requestString + "?$select=" + arrayOfFieldsToRetrieve.join(",") : //Append names of the fields to retrieve in the request string.
                requestString;
            requestString = !Common.isBlankOrNull(queryString) ? requestString + queryString : requestString; //Append additional query string provided to implement expand, filter or orderby.
            result = Common.xmlHttpRequestSync("GET", requestString, null);
        }
        return result;
    },

    //*******************************************************
    //Method Purpose 	:	Update entity record synchronously.
    //Tags        	  : Update, Object
    //*******************************************************
    updateRecordSync: function (entitySchemaName, recordId, entityDataObject) {
        var result = null;
        var requestString = !Common.isBlankOrNull(entitySchemaName) && !Common.isBlankOrNull(entityDataObject) && !Common.isBlankOrNull(recordId) ?
            Common.webClientUrl + Common.plural(entitySchemaName) + "(" + Common.removeCurlyBraceFromGuid(recordId) + ")" :
            null;
        if (!Common.isBlankOrNull(requestString)) {
            result = Common.xmlHttpRequestSync("PATCH", requestString, entityDataObject);
        }
        return result;
    },

    //********************************************************
    //Method Purpose 	:	Create and execute sync Web API call. 
    //Tags        	  : request, XMLHttpRequest, XMLHttp
    //********************************************************
    xmlHttpRequestSync: function (requestType, requestString, entityDataJsonObject) {
        var result = null;
        var entityDataObject = "";

        if (!Common.isBlankOrNull(entityDataJsonObject)) {
            entityDataObject = JSON.stringify(entityDataJsonObject);
        }
        var req = new XMLHttpRequest();
        req.open(requestType, requestString, false); //false - Sync, true - Async
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.onreadystatechange = function () {

            if (this.readyState === 4) {
                req.onreadystatechange = null;

                if (this.status === 200 || //Success codes with return value
                    this.status === 204 || //Success codes without return value
                    this.status === 1223) { //Success codes for associate and dissociate requests
                    result = "Success";
                    if (!Common.isBlankOrNull(this.response)) {
                        result = JSON.parse(this.response);
                    }
                    else if (!Common.isBlankOrNull(this.getResponseHeader("OData-EntityId"))) {
                        var uri = this.getResponseHeader("OData-EntityId");
                        result = uri.substr(uri.length - 38).substring(1, 37); //Get GUID of record returned in the response header
                    }
                }
            }
        };
        req.send(entityDataObject);
        return result;
    },


    /********************************************************/
    /****************** TABS AND SECTIONS *******************/
    /********************************************************/


    //***********************************************************************************************************
    //Method Purpose  :	Clear all the attribute values in all the sections of specified tabs.
    //Tags        	  : Tab, Section, Attribute, Value, Clear
    //Linked methods  : processSectionControls, isBlankOrNull, getSections, getTab, isBlankOrNull, getFormContext
    //***********************************************************************************************************
    clearAttributesInTabs: function (executionContext, tabNamesArray) {
        Common.processTabControls(executionContext, tabNamesArray, function (control) {
            var attribute = control.getAttribute(); if (attribute != null) {
                attribute.setValue(null);
            }
        });
    },

    //*********************************************************
    //Method Purpose  :	Get a particular section on the form.
    //Tags        	  : Section, Get
    //Linked methods  : getTab, isBlankOrNull, getFormContext
    //*********************************************************
    getSection: function (executionContext, tabName, sectionName) {
        var section = null;
        var tab = Common.getTab(executionContext, tabName);
        if (tab != null) {
            section = tab.sections.get(sectionName);
        }
        return section;
    },

    //******************************************************************
    //Method Purpose  :	Get the collection of all the sections in a tab.
    //Tags        	  : Section, Get, Tab
    //Linked methods  : getTab, isBlankOrNull, getFormContext
    //******************************************************************
    getSections: function (executionContext, tabName) {
        var sections = null;
        var tab = Common.getTab(executionContext, tabName);
        if (tab != null) {
            sections = tab.sections.get();
        }
        return sections;
    },

    //*****************************************
    //Method Purpose 	:	Retrieve a tab object.
    //Tags        	  : Tab, Get
    //*****************************************
    getTab: function (executionContext, tabName) {
        var tab = null;
        if (!Common.isBlankOrNull(tabName)) {
            var formContext = Common.getFormContext(executionContext);
            if (formContext != null) {
                tab = formContext.ui.tabs.get(tabName);
            }
        }
        return tab;
    },

    //********************************************
    //Method Purpose 	:	Retrieve all tabs object.
    //Tags        	  : Tabs, Get
    //********************************************
    getTabs: function (executionContext) {
        var tabs = null;
        var formContext = Common.getFormContext(executionContext);
        if (formContext != null) {
            tabs = formContext.ui.tabs.get();
        }
        return tabs;
    },

    //*****************************************
    //Method Purpose 	:	Get a tab visibility of an object.
    //Tags        	  : Tab, Get, Visible
    //Linked methods  : getTab
    //*****************************************
    getTabVisible: function (executionContext, tabName) {
        var tab = Common.getTab(executionContext, tabName);
        var isVisible = false;
        if (tab != null) {
            isVisible = tab.setVisible();
        }
        return isVisible;
    },

    //*****************************************************************************************************
    //Method Purpose 	:	Iterate through the specified tabs and sections in each tab and execute the action.
    //Tags        	  : Loop, Iterate, Sections, Controls
    //Linked methods  : isBlankOrNull, getSections, getTab, isBlankOrNull, getFormContext
    //*****************************************************************************************************
    processSectionControls: function (executionContext, sectionsArray, action) {
        if (action != null &&
            !Common.isBlankOrNull(sectionsArray)) {
            sectionsArray.forEach(function (section, sectionIndex) {
                section.controls.forEach(function (control, controlIndex) {
                    action(control);
                });
            });
        }
    },

    //************************************************************************************************************
    //Method Purpose 	:	Iterate through the specified tabs and execute the action.
    //Tags        	  : Loop, Iterate, Tabs, Controls
    //Linked methods  : isBlankOrNull, processSectionControls, getSections, getTab, isBlankOrNull, getFormContext
    //************************************************************************************************************
    processTabControls: function (executionContext, tabNamesArray, action) {
        if (action != null &&
            !Common.isBlankOrNull(tabNamesArray)) {
            tabNamesArray.forEach(function (tabName) {
                var sections = Common.getSections(executionContext, tabName);
                Common.processSectionControls(executionContext, sections, action);
            });
        }
    },

    //********************************************************
    //Method Purpose 	:	Iterate through all the tabs on form.
    //Tags        	  : Loop, Iterate, Tabs
    //********************************************************
    processTabs: function (executionContext, action) {
        var tabs = Common.getTabs(executionContext);
        if (tabs != null &&
            action != null) {
            for (var i in tabs) {
                var tab = tabs[i];
                action(tab);
            }
        }
    },

    //******************************************************************************
    //Method Purpose 	:	Sets a value that indicates whether the section is visible.
    //Tags        	  : Section, Show, Hide, Form
    //******************************************************************************
    setSectionVisible: function (executionContext, tabName, sectionName, isVisible) { //Specify true to show and false to hide.
        var tab = Common.getTab(executionContext, tabName);
        if (tab != null) {
            var section = tab.sections.get(sectionName);
            if (section != null) {
                section.setVisible(isVisible);
            }
        }
    },

    //***********************************************************************
    //Method Purpose 	:	Sets display state of the tab (ie. Collapse/Expand).
    //Tags        	  : Tabs, Sections, Collapse, Expand
    //***********************************************************************
    setTabsDisplayState: function (executionContext, state) { //Specify "expanded" or "collapsed".
        if (!Common.isBlankOrNull(state)) {
            Common.processTabs(executionContext, function (tab) { tab.setDisplayState(state); });
        }
    },

    //***********************************************
    //Method Purpose 	:	Show all hidden tabs on form
    //Tags        	  : Tabs, Show, Form, Hidden
    //***********************************************
    setTabsVisible: function (executionContext, isVisible) { //Specify true to show and false to hide.
        if (isVisible != null) {
            Common.processTabs(executionContext, function (tab) { tab.setVisible(isVisible); });
        }
    },

    //******************************************
    //Method Purpose 	:	Show Hide single tab.
    //Tags        	  : Tab, Show, Hide, Single
    //******************************************
    setTabVisible: function (executionContext, tabName, isVisible) { //Specify true to show and false to hide.
        var tab = Common.getTab(executionContext, tabName);
        if (tab != null) {
            tab.setVisible(isVisible);
        }
    },


    /********************************************************/
    /******************** TEXT ATTRIBUTES *******************/
    /********************************************************/


    //*******************************************************************************************************************
    //Method Purpose 	:	Update Target text attribute from the concatenation of values from  multiple source attributes.
    //Tags        	  : Text, Target, Attribute, Multiple, Values
    //*******************************************************************************************************************
    concatenateTextFromMultipleAttributesAndSetResultInTargetAttribute: function (executionContext, attributeNames, seperator, targetAttributeName) {
        if (!Common.isBlankOrNull(attributeNames) &&
            !Common.isBlankOrNull(targetAttributeName)) {
            var targetAttribute = Common.getAttribute(executionContext, targetAttributeName);
            if (targetAttribute != null &&
                (targetAttribute.getAttributeType() === "string" ||
                    targetAttribute.getAttributeType() === "memo")) {
                var targetText = "";
                var attributeValue = null;
                for (var i = 0; i < attributeNames.length; i++) {
                    var attributeName = attributeNames[i];
                    var attribute = Common.getAttribute(executionContext, attributeName);
                    if (attribute != null) {
                        var attributeType = attribute.getAttributeType();
                        if (attributeType === "optionset") { attributeValue = Common.getSelectedOptionSetAttributeText(executionContext, attributeName); }
                        else if (attributeType === "multiselectoptionset") { attributeValue = attribute.getText(); }
                        else if (attributeType === "lookup") { attributeValue = Common.getLookupAttributeElements(executionContext, attributeName); }
                        else { attributeValue = attribute.getValue(); }

                        if (attributeValue != null) { if (attributeType !== "lookup") { targetText += attributeValue; } else { targetText += attributeValue.name; } }

                        if (i !== (attributeNames.length - 1)) { targetText += seperator; }
                    }
                }
                targetAttribute.setValue(targetText);
            }
            else {
                Common.openAlertDialog("Ok", "Invalid target attribute type.");
            }
        }
    },

    //**********************************************************
    //Method Purpose 	:	Convert the string value to Title case.
    //Tags        	  : Text, Title, Upper, Case, Convert
    //**********************************************************
    convertToTitleCase: function (str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    },

    //*******************************************************************
    //Method Purpose 	:	Convert the First letter of string to uppercase.
    //Tags        	  : Text, First, Letter, Upper, Case, Convert
    //*******************************************************************
    convertToUpperCaseFirstLetter: function (str) {
        if (str != null) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        else { return ""; }
    },

    //*****************************************************************
    //Method Purpose 	:	Convert the First word of string to uppercase.
    //Tags        	  : Text, First, Word, Upper, Case, Convert
    //*****************************************************************
    convertToUpperCaseFirstWord: function (str) {
        var result = "";
        if (str != null) {
            var strArray = str.split(' ');
            if (!Common.isBlankOrNull(strArray)) {
                strArray[0] = strArray[0].toUpperCase();
                result = strArray.join(' ');
            }
            else { result = str; }
        }
        return result;
    },

    //*****************************************************************
    //Method Purpose 	:	Gets the type of form. like Create, Update etc...
    //Tags        	  : Form, Type
    //*****************************************************************
    getFormType: function (executionContext) {
        var formType = null;

        var formContext = Common.getFormContext(executionContext);
        if (formContext != null) {
            formType = formContext.ui.getFormType();
        }

        return formType;
    },

    //*****************************************************************
    //Method Purpose 	:	Clear the forms notification for specific notification id.
    //Tags        	  : Clear, Form, Notification
    //*****************************************************************
    clearFormNotification: function (executionContext, uniqueId) {
        var formContext = Common.getFormContext(executionContext);
        if (formContext != null) {
            formContext.ui.clearFormNotification(uniqueId);
        }
    },

    //*****************************************************************
    //Method Purpose 	:	Sets the forms notification for specific notification id.
    //Tags        	  : Set, Form, Notification
    //*****************************************************************
    setFormNotification: function (executionContext, message, level, uniqueId) {
        var formContext = Common.getFormContext(executionContext);
        if (formContext != null) {
            formContext.ui.setFormNotification(message, level, uniqueId);
        }
    },

    //*********************************************************
    //Method Purpose : Async Web API call.
    //Tags : request, XMLHttpRequest, XMLHttp
    //*********************************************************
    webApiXMLHttpRequest: function (requestType, webApiURL, entityDataJsonObject, authorizationToken, successCallBack, errorCallBack) {
        var result = null;
        var req = new XMLHttpRequest();
        req.open(requestType, webApiURL, true);//false - Sync, true - Async
        req.setRequestHeader("authorization-token", authorizationToken);
        req.setRequestHeader("Content-Type", "application/json");
        req.withCredentials = true;
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200 || //Success codes with return value
                    this.status === 204 || //Success codes without return value
                    this.status === 1223) { //Success codes for associate and dissociate requests
                    result = "Success";
                    if (this.response != null) {
                        result = JSON.parse(this.response);
                    }
                    successCallBack(result); //This must not be placed inside above if statement as in case of associate and disassociate requests "this.response" will always be null.
                }
                else if (this.status === 0) {
                    successCallBack(result);
                }
                else {
                    errorCallBack(this.statusText); //Return the statustext in case the status is not a success
                }
            }
        };
        req.send(entityDataJsonObject);
    },

    //*************************************************************
    //Method Purpose : Call global or local action asynchronously.
    //Tags : Action, Object
    //*************************************************************
    callGlobalOrLocalActionAsync: function (actionSchemaName, relatedEntityName, recordId, parametersObject, successCallback, errorCallback) {
        //Create request string to execute global action
        var requestString = !Common.isBlankOrNull(actionSchemaName) ? Common.webClientUrl + actionSchemaName :
            null;



        //Create request string to execute local action in case required parameters are provided
        requestString = !Common.isBlankOrNull(relatedEntityName) && !Common.isBlankOrNull(recordId) ? Common.webClientUrl + Common.plural(relatedEntityName) + "(" + Common.removeCurlyBraceFromGuid(recordId) + ")" + "/Microsoft.Dynamics.CRM." + actionSchemaName :
            requestString;



        if (!Common.isBlankOrNull(requestString)) {
            Common.xmlHttpRequestAsync("POST", requestString, parametersObject, successCallback, errorCallback);
        }
    },


    namespace: true
}