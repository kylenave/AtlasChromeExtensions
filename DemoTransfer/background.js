
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"content_script.js"});
});

chrome.runtime.onInstalled.addListener(function() {
  var context = "page";
  var title = "Copy Patient Data from Practice Fusion";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "Copy" + context, "onclick": onClickCopy});  
});

chrome.runtime.onInstalled.addListener(function() {
  var context = "page";
  var title = "Paste Patient Data to OpenEMR";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "Paste" + context, "onclick": onClickPaste});  
});

chrome.runtime.onInstalled.addListener(function() {
  var context = "page";
  var title = "Test";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "Test" + context, "onclick": onClickTest});  
});

// add click event
//chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickCopy(info, tab) {
	chrome.tabs.sendMessage(tab.id, {"functiontoInvoke": "copyInfo"});
};


function onClickPaste(info, tab) {
	chrome.tabs.sendMessage(tab.id, {"functiontoInvoke": "pasteInfo"});
};

function onClickTest(info, tab) {
	chrome.tabs.sendMessage(tab.id, {"functiontoInvoke": "Test"});
};