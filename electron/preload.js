// Preload script - contextIsolation enabled
// The renderer uses fetch() to call the Express API directly
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('appVersion', {
  version: require('../package.json').version,
});
