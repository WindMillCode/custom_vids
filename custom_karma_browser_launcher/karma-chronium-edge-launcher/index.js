// Karma Edge Launcher
// =================

// Dependencies
// ------------

var exec = require('child_process').exec

// Constructor
function EdgeBrowser (baseBrowserDecorator, args) {
  baseBrowserDecorator(this)

  var flags = args.flags || []
  var userDataDir = args.chromeDataDir || this._tempDir

  this._getOptions = function (url) {
    return [
      '--user-data-dir=' + userDataDir,
      // https://github.com/GoogleChrome/chrome-launcher/blob/master/docs/chrome-flags-for-tools.md#--enable-automation
      '--enable-automation',
      '--no-default-browser-check',
      '--no-first-run',
      '--disable-default-apps',
      '--disable-popup-blocking',
      '--disable-translate',
      '--disable-background-timer-throttling',
      // on macOS, disable-background-timer-throttling is not enough
      // and we need disable-renderer-backgrounding too
      // see https://github.com/karma-runner/karma-chrome-launcher/issues/123
      '--disable-renderer-backgrounding',
      '--disable-device-discovery-notifications'
    ].concat( flags,[url])
  }


}

EdgeBrowser.prototype = {
  name: 'Edge',
  DEFAULT_CMD: {
    win32:"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
  },
  ENV_CMD: 'EDGE_BIN'
}

EdgeBrowser.$inject = ['baseBrowserDecorator', 'logger']

// Publish di module
// -----------------

module.exports = {
  'launcher:Edge': ['type', EdgeBrowser]
}
