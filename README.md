# Auto Reload

[![Build Status](https://dev.azure.com/jmerle/inkdrop-auto-reload/_apis/build/status/Build?branchName=master)](https://dev.azure.com/jmerle/inkdrop-auto-reload/_build/latest?definitionId=13&branchName=master)
[![Latest release)](https://img.shields.io/github/v/release/jmerle/inkdrop-auto-reload)](https://github.com/jmerle/inkdrop-auto-reload/releases/latest)
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
    - By default changes in disabled plugin don't trigger a reload.

## Changelog

See the [GitHub releases](https://github.com/jmerle/inkdrop-auto-reload/releases) for an overview of what changed in each update.

## Contributing

All contributions are welcome. Please read the [Contributing Guide](https://github.com/jmerle/inkdrop-auto-reload/blob/master/CONTRIBUTING.md) first as it contains information regarding the tools used by the project and instructions on how to set up a development environment.
