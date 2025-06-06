if (typeof (CrmJS) === "undefined") {
    CrmJS = { __namespace: true };
}

CrmJS.AccountFunctions = {

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

    //******* On Load *******
    onLoad: function (executionContext) {
        CrmJS.AccountFunctions.initialize(executionContext);
        CrmJS.AccountFunctions.process(executionContext);
    },

    initialize: function (executionContext) {
        Common.globalUIContext = executionContext;
    },

    process: function (executionContext) {
        //On Load Methods
      
    },

    //*************** On Save *********************
    onSave: function (executionContext) {
        CrmJS.AccountFunctions.CalculateTotalAllowableExpenses(executionContext);
    },


    /************************************* onchange functions*************************************/

    onZipCodeChange: function (executionContext) {
        CrmJS.AccountFunctions.validateZipCode(executionContext);
    },








       //********************** Functions for On load, On Save and On Change **********************************

    validateZipCode: function (executionContext) {
        CrmJS.AccountFunctions.formatFieldZipCode(executionContext, "address1_postalcode");
        
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


    namespace: true
};