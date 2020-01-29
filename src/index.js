import chokidar from 'chokidar';

let watcher = null;
let reloadCalled = false;

function doReload() {
  inkdrop.commands.add(document.body, {
    'core:save-note': () => inkdrop.window.reload(),
  });

  inkdrop.commands.dispatch(document.body, 'core:save-note');
}

function reload(path) {
  if (reloadCalled) {
    return;
  }

  const packageName = /packages\/([^/\\]+)/.exec(path)[1];
  const disabled = inkdrop.packages.isPackageDisabled(packageName);
  const reloadDisabled = inkdrop.config.get('auto-reload.reloadDisabled');

  if (disabled && !reloadDisabled) {
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

export const config = {
  reloadImmediately: {
    title: 'Reload immediately when a change has been detected',
    type: 'boolean',
    default: false,
  },
  reloadDisabled: {
    title: 'Reload when a change in a disabled plugin has been detected',
    type: 'boolean',
    default: false,
  },
};

export function activate() {
  watcher = chokidar.watch(inkdrop.packages.getPackageDirPaths(), {
    ignoreInitial: true,
    ignored: path => path.includes('.git/') || path.includes('node_modules/'),
  });

  watcher
    .on('add', path => reload(path))
    .on('change', path => reload(path))
    .on('unlink', path => reload(path));
}

export function deactivate() {
  if (watcher !== null) {
    watcher.close();
    watcher = null;
  }
}
