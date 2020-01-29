import chokidar from 'chokidar';

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

export const config = {
  reloadImmediately: {
    title: 'Reload immediately when a change is detected',
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
    .on('add', () => reload())
    .on('change', () => reload())
    .on('unlink', () => reload());
}

export function deactivate() {
  if (watcher !== null) {
    watcher.close();
    watcher = null;
  }
}
