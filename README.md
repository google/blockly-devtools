<!--
@license
Blockly Demos: Block Factory

Copyright 2017 Google Inc.
https://developers.google.com/blockly/

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

# Blockly Developer Tools

This is the future home for Google's Blockly Developer Tools.

Find out more at the
[develop page](https://developers.google.com/blockly/), on
[GitHub](https://github.com/google/blockly), or on the
[developer forum](https://groups.google.com/forum/#!forum/blockly).
Production version is stored
[here](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html)
([source](https://github.com/google/blockly/tree/master/demos/blockfactory)).

Want to contribute? Great! First, read
[our guidelines for contributors](https://developers.google.com/blockly/guides/modify/contributing).

## Setting Up

### Install node and NW.js

In order to properly run and test Blockly's devtools, install
[node.js](https://nodejs.org/en/download/) and
[NW.js](https://nwjs.io/downloads/) on your computer.
Instructions for installation can be found on the linked sites.

### Running Devtools

After cloning this repository, find the relative path to `nwjs/nw` that you
installed onto your computer. Run the following command from the repo's directory.

```
nwjs/nw .
```

Doing so will run devtools as an NW.js application on your computer.

### Closure dependency error

If you get an error upon loading the devtools app that there is a closure
dependency error, visit
[this page](https://developers.google.com/blockly/guides/modify/web/closure) to
find a link to download the closure library. Place the library into the
`blockly-devtools` directory, next to `lib` and `src`. We are currently working
on removing this dependency, but this will fix the issue until then.
