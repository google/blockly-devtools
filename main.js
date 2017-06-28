/**
 * Blockly DevTools
 *
 * Copyright 2017 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var gui = require('nw.gui');
var doTests = false

gui.App.argv.forEach(function (val, index, array) {
  if (val == '--test') {
    doTests = true
  }
});

var options = {
    "width": 1500,
    "height": 1000
}
// TODO: Check App.dataPath for prior saved window values. Overwrite if found.
//       See https://github.com/nwjs/nw.js/wiki/save-persistent-data-in-app

if (doTests) {
  options.title = 'DevTools Unit Tests'
  nw.Window.open('tests.html', options, function(win) {});
} else {
  options.title = 'Blockly DevTools'
  nw.Window.open('app.html', options, function(win) {});
}