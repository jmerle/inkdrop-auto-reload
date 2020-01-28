import chokidar from 'chokidar';
import debounce from 'lodash.debounce';

let watcher = null;

export function activate() {
  watcher = chokidar.watch(inkdrop.packages.getPackageDirPaths(), {
    ignoreInitial: true,
  });

  const reload = debounce(() => {
    inkdrop.window.reload();
  }, 250);

  watcher
    .on('add', () => reload())
    .on('change', () => reload())
    .on('unlink', () => reload());
}

export function deactivate() {
  if (watcher !== null) {
    watcher.close();
  }
}
