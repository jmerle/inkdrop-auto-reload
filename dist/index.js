'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.activate = activate;
exports.deactivate = deactivate;

var _chokidar = _interopRequireDefault(require('chokidar'));

var _lodash = _interopRequireDefault(require('lodash.debounce'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

let watcher = null;

function activate() {
  watcher = _chokidar.default.watch(inkdrop.packages.getPackageDirPaths(), {
    ignoreInitial: true,
  });
  const reload = (0, _lodash.default)(() => {
    inkdrop.window.reload();
  }, 250);
  watcher
    .on('add', () => reload())
    .on('change', () => reload())
    .on('unlink', () => reload());
}

function deactivate() {
  if (watcher !== null) {
    watcher.close();
  }
}
//# sourceMappingURL=index.js.map
