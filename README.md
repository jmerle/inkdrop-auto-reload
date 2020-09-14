# Auto Reload plugin for Inkdrop

[![Build Status](https://github.com/jmerle/inkdrop-auto-reload/workflows/Build/badge.svg)](https://github.com/jmerle/inkdrop-auto-reload/actions?query=workflow%3ABuild)
[![Latest release](https://inkdrop-plugin-badge.vercel.app/api/version/auto-reload?style=flat)](https://my.inkdrop.app/plugins/auto-reload)
[![Downloads](https://inkdrop-plugin-badge.vercel.app/api/downloads/auto-reload?style=flat)](https://my.inkdrop.app/plugins/auto-reload)
[![License](https://img.shields.io/github/license/jmerle/inkdrop-auto-reload)](https://github.com/jmerle/inkdrop-auto-reload/blob/master/LICENSE)

Automatically reload Inkdrop when a plugin is added/deleted/modified.

## Install

```
ipm install auto-reload
```

## Usage

Simply install the plugin to make it work. There are two settings available:
- Reload immediately when a change has been detected
    - By default reloading is postponed until the Inkdrop window is given focus. This is because reloading causes Inkdrop to steal focus from other applications, which can be quite annoying.
- Reload when a change in a disabled plugin has been detected
    - By default changes in disabled plugins don't trigger a reload.

If there is a note with unsaved changes open when a reload needs to happen, the note is saved before triggering the reload.

## Changelog

See the [GitHub releases](https://github.com/jmerle/inkdrop-auto-reload/releases) for an overview of what changed in each update.

## Contributing

All contributions are welcome. Please read the [Contributing Guide](https://github.com/jmerle/inkdrop-auto-reload/blob/master/CONTRIBUTING.md) first as it contains information regarding the tools used by the project and instructions on how to set up a development environment.
