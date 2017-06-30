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

/*
 * This file attempts to import all the library files and class
 * files used by Blockly DevTools in the correct order. It is a
 * crude solution to dealing with the incompatible mix of node requires(),
 * closure goog.requires(), and app specific local libraries in the
 * browser-like context.
 */

(function() {
  var newScript = function(src) {
    document.write(`<script src="${src}"></script>`);
  };

  newScript('lib/blockly_compressed.js');
  newScript('closure-library/closure/goog/base.js');
  newScript('src/factory_utils.js');
  newScript('src/workspacefactory/wfactory_controller.js');
  newScript('src/workspacefactory/wfactory_generator.js');
})();
