import chokidar from 'chokidar';

let watcher = null;
let commandListener = null;

let reloadQueued = false;

function doReload() {
  commandListener = inkdrop.commands.add(document.body, {
    'core:save-note': () => {
      inkdrop.packages.reset();
      inkdrop.window.reload();
    },
  });

  inkdrop.commands.dispatch(document.body, 'core:save-note');
}

function reload(path) {
  if (reloadQueued) {
    return;
  }

  const packageName = /packages\/([^/\\]+)/.exec(path)[1];
  const disabled = inkdrop.packages.isPackageDisabled(packageName);
  const reloadDisabled = inkdrop.config.get('auto-reload.reloadDisabled');

  if (disabled && !reloadDisabled) {
    return;
  }

  reloadQueued = true;

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
    description:
      'When disabled reloading is postponed until Inkdrop is given focus. Reloading causes Inkdrop to steal focus from other applications, which can be quite annoying.',
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

  if (commandListener !== null) {
    commandListener.dispose();
    commandListener = null;
  }
}
