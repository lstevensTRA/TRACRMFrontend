if (typeof (CrmJS) === "undefined") {
    CrmJS = { __namespace: true };
}

CrmJS.ContactFunctions = {

    //*************** Option Sets**************

    CONST_OPTIONSETS: {

        ContactType: {
            Marital: {
                intValue: 0,
                textValue: "Marital"
            },
            Dependent: {
                intValue: 1,
                textValue: "Dependent"
            }
        }
    },

    //******* On Load *******
    onLoad: function (executionContext) {
        CrmJS.ContactFunctions.initialize(executionContext);
        CrmJS.ContactFunctions.process(executionContext);
    },

    initialize: function (executionContext) {
        Common.globalUIContext = executionContext;
    },

    process: function (executionContext) {
        //On Load Methods
        CrmJS.ContactFunctions.setContactType(executionContext);

    },

    /************************************* onchange functions*************************************/


    //********* SSN On Change ************************
    onformatSSNChange: function (executionContext) {
        CrmJS.ContactFunctions.formatSSN(executionContext);

    },

    //********* Zip Code On change ************************
    onZipCodeChange: function (executionContext) {
        CrmJS.ContactFunctions.validateZipCode(executionContext);

    },






    //********************** Functions for On load, On Save and On Change **********************************

    setContactType: function (executionContext) {
        var opportunity = Common.getAttributeValue(executionContext, "tra_opportunityid");
        if (!Common.isBlankOrNull(opportunity)) {
            Common.setAttributeValue(executionContext, "tra_contacttype", CrmJS.ContactFunctions.CONST_OPTIONSETS.ContactType.Dependent.intValue);
        }
    },

    formatSSN: function (executionContext) {

        var ssnFieldName = "tra_ssn";
        var ssnValue = Common.getAttributeValue(executionContext, ssnFieldName);

        if (!ssnValue) {

            Common.getControl(executionContext, ssnFieldName).clearNotification();
            return;
        }


        ssnValue = ssnValue.replace(/[^a-zA-Z0-9]/g, '');

        if (ssnValue.length !== 9) {

            Common.getControl(executionContext, ssnFieldName).setNotification("Please enter in XXX-XX-XXXX format.");
            return;
        } else {

            Common.getControl(executionContext, ssnFieldName).clearNotification();
        }


        var formattedSSN = "";


        if (ssnValue.length > 0) formattedSSN += ssnValue.substring(0, 3);

        if (ssnValue.length > 3) formattedSSN += '-';

        if (ssnValue.length > 3) formattedSSN += ssnValue.substring(3, 5);

        if (ssnValue.length > 5) formattedSSN += '-';

        if (ssnValue.length > 5) formattedSSN += ssnValue.substring(5, 9);

        Common.setAttributeValue(executionContext, ssnFieldName, formattedSSN);
    },

    validateZipCode: function (executionContext) {
        CrmJS.ContactFunctions.formatFieldZipCode(executionContext, "address2_postalcode");
        CrmJS.ContactFunctions.formatFieldZipCode(executionContext, "address1_postalcode");
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

