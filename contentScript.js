
var contentTextToAnalyze = document.getElementsByTagName("p")
if(contentTextToAnalyze)
{
  contentTextToAnalyze = contentTextToAnalyze[0].innerHTML
}
else {
  contentTextToAnalyze = "Warning, no first paragraph found"
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: contentTextToAnalyze});
  });

console.log("content script has been loaded");
