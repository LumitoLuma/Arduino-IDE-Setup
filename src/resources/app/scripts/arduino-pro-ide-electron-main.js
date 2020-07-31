const os = require('os');
const path = require('path');

// To be able to propagate the `process.versions.electron` to the backend main, so that we can load natives correctly.
process.env.THEIA_ELECTRON_VERSION = process.versions.electron;

process.env.THEIA_DEFAULT_PLUGINS = `local-dir:${path.resolve(__dirname, '..', 'plugins')}`;
process.env.THEIA_PLUGINS = [
    process.env.THEIA_PLUGINS,
    `local-dir:${path.resolve(os.homedir(), '.arduinoProIDE', 'plugins')}`
].filter(Boolean).join(',');

require('../src-gen/frontend/electron-main.js');
