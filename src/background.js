/* TabbySitter
 * Automatic reload of crashed tabs
 * https://github.com/ikigeg/tabbysitter/tree/master
 */

/*
Go to this URL to trigger a crash:

chrome://crash
*/

function checkCrashed(tabs) {
  var tabsLength = tabs.length;

  while (tabsLength--) {
    /* It's in a function to create a closure */
    (function() {
      var thisTab = tabs[tabsLength];

      if (
        (thisTab.url.substring(0, 4) == 'http' ||
          thisTab.url.substring(0, 4) == 'file' ||
          thisTab.url === 'chrome://crash') &&
        thisTab.status == 'complete'
      ) {
        // Perform a no-op
        chrome.tabs.executeScript(
          thisTab.id,
          {
            code: 'null;',
          },
          function(result) {
            // We will get a callback no matter what (unlike when I first released this)

            // If it reports it's closed, then it's crashed, because a genuine close fires an event. A crashed tab does not.
            if (
              chrome.runtime.lastError &&
              chrome.runtime.lastError.message == 'The tab was closed.'
            ) {
              console.log('Crashed, reloading: ', thisTab.title, thisTab.id);
              chrome.tabs.reload(thisTab.id); //reload it
            }
          },
        );
      }
    }.call());
  }
}

function reloadTabs(tabs) {
  var tabsLength = tabs.length;

  while (tabsLength--) {
    /* It's in a function to create a closure */
    (function() {
      var thisTab = tabs[tabsLength];

      if (
        thisTab.url.substring(0, 4) == 'http' &&
        thisTab.status == 'complete'
      ) {
        chrome.tabs.reload(thisTab.id);
      }
    }.call());
  }
}

function nextDate(interval) {
  return new Date(new Date().getTime() + interval);
}

var crashCheckMs = 3000;
var reloadTabsMs = 1800000;

var nextCrashCheck = nextDate(crashCheckMs);
var nextTabsReload = nextDate(reloadTabsMs);

var checkCrashedInterval = setInterval(function() {
  nextCrashCheck = nextDate(crashCheckMs);

  chrome.tabs.query({}, checkCrashed);
}, crashCheckMs);

var reloadTabsInterval = setInterval(function() {
  nextTabsReload = nextDate(reloadTabsMs);

  chrome.tabs.query({}, reloadTabs);
}, reloadTabsMs);

/*Check once a second to make sure tabs are still responding*/
chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(payload) {
    if (!typeof payload === 'object' || typeof payload.type === 'undefined') {
      return;
    }

    if (payload.type === 'refresh') {
      port.postMessage({
        nextCrashCheck: nextCrashCheck,
        nextTabsReload: nextTabsReload,
      });
    }
  });
});
