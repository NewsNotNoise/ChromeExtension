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

function getDataTest2(searchUrl, callback, errorCallback) {
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

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    renderStatus('Analyzing data for: ' + url);

    getDataTest2(url, function(text,subjuctivity,polarity) {
      renderStatus2('test ' + text );
      renderSubjuctivity("subjuctivity: "+subjuctivity);
      renderPolarity("polarity: "+polarity);
    }, function(errorMessage) {
      renderStatus2('error nooo ' + errorMessage);
    });

  });
});
