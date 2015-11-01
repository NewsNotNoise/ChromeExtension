
var contentTextToAnalyze = document.getElementsByTagName("p")
var contentTextToAnalyzeParsed = [""];
if(contentTextToAnalyze)
{
  for (i = 0; i < contentTextToAnalyze.length; i++) {
    contentTextToAnalyzeParsed[i] = contentTextToAnalyze[i].innerHTML;
  }
}
else {
  contentTextToAnalyzeParsed[0] = "Warning, no first paragraph found"
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: contentTextToAnalyzeParsed});
  });

console.log("content script has been loaded");
