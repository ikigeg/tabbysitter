# Tabby Sitter

**All credit first of all to [unclespode](https://github.com/andrewspode) for creating the [`Oh No You Didn't!`](https://chrome.google.com/webstore/detail/oh-no-you-didnt/acdablfhjbhkjbcifldncdkmlophfgda?hl=en) chrome extension, which this is really just an extension of.**

Original blurb for the extension:

> Chrome has a habit of crashing, often for no real reason. When running a Kiosk, or Digital Signage - the ability the quickly reload the page is essential. This plugin does exactly that.

> This is not a replacement for correcting problems in the first place (memory leaks especially) and isn't particularly useful in an everyday environment, where you can simply press the refresh button yourself.

This version of the extension goes a little bit further, in that it will also reload all the tabs after 30 minutes. This was to tackle an edge case of poorly performing kiosk devices, displaying sites prone to memory leakage **shakes fist at grafana**.

You can also click the icon in the toolbar to see when the next crash check and reload are anticipated... I say "anticipated" as with these relying on the javascript setInterval method, other things may affect when the code will really execute.

If you would like to see the extension in action, once installed just type the following URL into your address bar. The extension will attempt to reload the tab to whatever it was previously:

```
chrome://crash
```
