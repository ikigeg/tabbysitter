var port = chrome.extension.connect({
  name: 'TabbySitter Comms',
});

var checkCrashDateElement = document.getElementById('check-crash-date');
var tabCrashDateElement = document.getElementById('tab-reload-date');

function updateDates(dates) {
  checkCrashDateElement.innerHTML = dates.nextCrashCheck;
  tabCrashDateElement.innerHTML = dates.nextTabsReload;
}

port.postMessage({ type: 'refresh' });
var checkDates = setInterval(function() {
  port.postMessage({ type: 'refresh' });
}, 2000);

port.onMessage.addListener(function(msg) {
  updateDates(msg);
});
