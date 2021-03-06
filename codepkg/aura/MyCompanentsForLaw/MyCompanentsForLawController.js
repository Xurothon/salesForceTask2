({
	doInit : function(component, event, helper) {
        
		component.find("forceRecord").getNewRecord(
        "Contact",
        null,
        false,
        $A.getCallback(function() {
            var rec = component.get("v.contactRecord");
            var error = component.get("v.recordError");
            if (error || (rec === null)) {
                console.log("Error initializing record template: " + error);
                return;
            }
        })
    );
        component.find("force1Record").getNewRecord(
        "Account",
        null,
        false,
        $A.getCallback(function() {
            var rec = component.get("v.accountRecord");
            var error = component.get("v.recordError");
            if (error || (rec === null)) {
                console.log("Error initializing record template: " + error);
                return;
            }
        })
    );
	},

    saveRecord : function(component, event, helper) {
        var tesy;
        console.log("test" + testy)
        var myStatus = component.find('propStatus').get("v.value");
        if (myStatus.trim() == ''){
            myStatus = "Mr.";
        }
        var myNames = myStatus + " " + component.find('fName').get("v.value") 
        	+ " " + component.find('lName').get("v.value")
        component.set("v.contactRecord.LastName", myNames);
		component.set("v.contactRecord.Email", component.find('emmail').get("v.value"));
		component.set("v.contactRecord.Phone", component.find('phoneNumber').get("v.value"));
        component.set("v.accountRecord.Name", myNames);
        var tempRec1 = component.find("force1Record");
        var rec;
        tempRec1.saveRecord($A.getCallback(function(result) {
            var resultsToast = $A.get("e.force:showToast");
            if (result.state === "SUCCESS") {
                rec = result.recordId;
            } else if (result.state === "ERROR") {
                resultsToast.setParams({
                    "title": "Error",
                    "message": "There was an error saving the record: " + JSON.stringify(result.error)
                });
                resultsToast.fire();
            } else {
                console.log('Unknown problem, state: ' + result.state + ', error: ' + JSON.stringify(result.error));
            }
    }));
                    component.set("v.contactRecord.AccountId", rec);
                    var tempRec = component.find("forceRecord");
                    tempRec.saveRecord($A.getCallback(function(result) {
                    if (result.state === "SUCCESS") {
                        resultsToast.setParams({
                        "title": "Saved",
                            "message": "The record was saved."
                        });
                        resultsToast.fire();
                        var recId = result.recordId;
                        helper.navigateTo(component, recId);
                    } else if (result.state === "ERROR") {
                        console.log("ERROR " + JSON.stringify(result.error));
                    } else {
                        console.log('Unknown problem, state: ' + result.state + ', error: ' + JSON.stringify(result.error));
                    }
                }));
        },
    
    cancelDialog : function(component, helper) {
        var homeEvt = $A.get("e.force:navigateToObjectHome");
		homeEvt.setParams({
    		"scope": "Account"
		});
		homeEvt.fire();
	},  
    
    makeFields : function(cmp) {
        $A.createComponent(
            "lightning:input",
            {
                "aura:id": "fName",
                "name": "fName",
                "label": "First Name"
            },
            function(newButton, status, errorMessage){
                var body = cmp.get("v.body");
                body.push(newButton);
                cmp.set("v.body", body);
            }
        );
        $A.createComponent(
            "lightning:input",
            {
                "aura:id": "lName",
                "name": "lName",
                "label": "Last Name"
            },
            function(newButton, status, errorMessage){
                var body = cmp.get("v.body");
                body.push(newButton);
                cmp.set("v.body", body);
            }
        );
        $A.createComponent(
            "lightning:input",
            {
                "aura:id": "title",
                "name": "title",
                "label": "Title"
            },
            function(newButton, status, errorMessage){
                var body = cmp.get("v.body");
                body.push(newButton);
                cmp.set("v.body", body);
            }
        );
        $A.createComponent(
            "lightning:input",
            {
                "label": " ",
                "value": "   ",
                "readonly": "true"
            },
            function(newButton, status, errorMessage){
                var body = cmp.get("v.body");
                body.push(newButton);
                cmp.set("v.body", body);
            }
        );
    },
})