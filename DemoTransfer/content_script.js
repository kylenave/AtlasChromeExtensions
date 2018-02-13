console.log("Loading content script...");

var copyInfo = function () {
		
	var patientName = document.getElementsByClassName("wrap-all")[0].textContent;

	var insurancePlans = document.getElementsByClassName("insurance-plan");

	var dobLabel = document.evaluate("//h1[contains(., 'DOB')]", document, null, XPathResult.ANY_TYPE, null );
	var DOB = dobLabel[0].nextSibling().textContent;
	
	var outterRow = document.getElementsByClassName("row");
	
	
	var plan = insurancePlans[0].getElementsByTagName('h2')[0].textContent
	var info = insurancePlans[0].getElementsByTagName('dd')
	var primary = plan + ":" + info[0].textContent + ":" + info[1].textContent + ":" + info[2].textContent + ":" + info[3].textContent + ":" + info[4].textContent + ":" + info[5].textContent;

	//alert(primary);

	chrome.storage.sync.set({ 'demoData_patientName' : patientName }, function() {
		if (chrome.runtime.error) {
		  alert("Runtime error.");
		}

	  });
  
}

var testInfo = function () {
		
	var patientName = document.getElementById("first-name").value;

	alert(patientName);
}

var pasteInfo = function () {

	chrome.storage.sync.get('demoData_patientName', function (result) {
        var fullname = result['demoData_patientName'];
		var names = fullname.split(" ");
		var inputFName = window.frames['RTop'].document.getElementById("form_fname");
		inputFName.value = names[0];
		var inputLName = window.frames['RTop'].document.getElementById("form_lname");
		inputLName.value= names[1];
		
	   });

}

chrome.extension.onMessage.addListener(function (message, sender, callback) 
	{
		if (message.functiontoInvoke == "copyInfo") {
			copyInfo();
		}
		if (message.functiontoInvoke == "pasteInfo") {
			pasteInfo();
		}
		if (message.functiontoInvoke == "Test") {
			testInfo();
		}
	}
);

