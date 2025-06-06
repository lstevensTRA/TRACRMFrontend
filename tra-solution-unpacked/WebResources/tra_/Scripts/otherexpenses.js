if (typeof (CrmJS) === "undefined") {
    CrmJS = { __namespace: true };
}

CrmJS.OtherExpensesFunctions = {

    //*************** Option Sets**************


    //******* On Load *******
    onLoad: function (executionContext) {
        CrmJS.OtherExpensesFunctions.initialize(executionContext);
        CrmJS.OtherExpensesFunctions.process(executionContext);
    },

    initialize: function (executionContext) {
        Common.globalUIContext = executionContext;
    },

    process: function (executionContext) {
        
    },

    //*************** On Save *********************
    onSave: function (executionContext) {
    },
    onRecordSelect: function (executionContext) {
        CrmJS.OtherExpensesFunctions.lockFields(executionContext);
    },

    
    lockFields: function (executionContext) {
        var formContext = executionContext.getFormContext();
        if (formContext) {
            var arrFields = ["tra_allowable"];
            var objEntity = formContext.data.entity;
            objEntity.attributes.forEach(function (attribute, i) {
                if (arrFields.indexOf(attribute.getName()) > -1) {
                    let attributeToDisable = attribute.controls.get(0);
                    attributeToDisable.setDisabled(true);
                }
            })
        }
    },



namespace: true
};