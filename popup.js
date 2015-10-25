function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}

function evaluateWebsiteText(searchUrl, callback, errorCallback) {
  // okay this function deserves some comments
  // searchUrl is the url of the website we want to evaluate. This is gonna be passed to our python server
  // callBack is the function to be called after this code is done running, aka once the python server returns data
  // errorCallback is the function to be called if the python server errors out (ie can't be reached)
  var searchUrl =   "https://nnn15.pythonanywhere.com/analyzeText?urlToAnalyze="+encodeURIComponent(searchUrl);

  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  x.responseType = 'json';
  x.onload = function() {
    var response = x.response;
     var firstResult = response.responseData;
     var polarity = response.polarity;
     var subjuctivity = response.subjuctivity;
     callback(firstResult,polarity,subjuctivity);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

// these render functions are used to display the data on the front end
function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function renderStatus2(statusText){
  document.getElementById('status2').textContent = statusText;
}

function renderSubjuctivity(statusText){
  document.getElementById('subjuctivity').textContent = statusText;
}

function renderPolarity(statusText){
  document.getElementById('polarity').textContent = statusText;
}

function getCurrentTabUrlCallBack(url)
{
    renderStatus('Analyzing data for: ' + url);
    evaluateWebsiteText(url, function(text,subjuctivity,polarity) {
      renderStatus2('test ' + text );
      renderSubjuctivity("subjuctivity: "+subjuctivity);
      renderPolarity("polarity: "+polarity);
    }, function(errorMessage) {
      renderStatus2('error noooo ' + errorMessage);
    });
}


document.addEventListener('DOMContentLoaded', function() {
  // this code is executed when the user opens the extension
  getCurrentTabUrl(function(url) {
    getCurrentTabUrlCallBack(url);
  });
});
