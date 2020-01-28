'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.activate = activate;
exports.deactivate = deactivate;
exports.config = void 0;

var _chokidar = _interopRequireDefault(require('chokidar'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

let watcher = null;
let reloadCalled = false;

function doReload() {
  inkdrop.commands.add(document.body, {
    'core:save-note': () => inkdrop.window.reload(),
  });
  inkdrop.commands.dispatch(document.body, 'core:save-note');
}

function reload() {
  if (reloadCalled) {
    return;
  }

  reloadCalled = true;
  const reloadImmediately = inkdrop.config.get('auto-reload.reloadImmediately');
  const focused = inkdrop.window.isFocused();

  if (reloadImmediately || focused) {
    doReload();
  } else {
    inkdrop.window.once('focus', () => {
      doReload();
    });
  }
}

const config = {
  reloadImmediately: {
    title: 'Reload immediately when a change is detected',
    type: 'boolean',
    default: false,
  },
};
exports.config = config;

function activate() {
  watcher = _chokidar.default.watch(inkdrop.packages.getPackageDirPaths(), {
    ignoreInitial: true,
  });
  watcher
    .on('add', () => reload())
    .on('change', () => reload())
    .on('unlink', () => reload());
}

function deactivate() {
  if (watcher !== null) {
    watcher.close();
    watcher = null;
  }
}
//# sourceMappingURL=index.js.map
