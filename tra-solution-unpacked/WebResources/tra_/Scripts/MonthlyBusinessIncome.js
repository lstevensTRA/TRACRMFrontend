if (typeof (CrmJS) === "undefined") {
    CrmJS = { __namespace: true };
}

CrmJS.MonthlyBusinessIncomeFunctions = {

    //******* On Load *******
    onLoad: function (executionContext) {
        CrmJS.MonthlyBusinessIncomeFunctions.initialize(executionContext);

    },

    initialize: function (executionContext) {
        Common.globalUIContext = executionContext;
    },

    process: function (executionContext) {
        //On Load Methods

        //CrmJS.OpportunityFunctions.showHideBusinesssection(executionContext);

    },

    onChange: function (executionContext) {

    },

    onZipCodeChange: function (executionContext) {
        //CrmJS.OpportunityFunctions.validateZipCode(executionContext);
    },


    namespace: true
};