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
 * @fileoverview This file attempts to import all the library files and class
 *   files used by Blockly DevTools in the correct order. It is a crude
 *   solution to dealing with the incompatible mix of node requires(), Closure
 *   goog.requires(), and app specific local libraries in the browser-like
 *   (but not quite a browser) context.
 */

(function() {
  var newScript = function(src) {
    document.write(`<script src="${src}"></script>`);
  };

  newScript('node_modules/jquery/dist/jquery.min.js');

  newScript('lib/blockly_compressed.js');
  newScript('msg/js/en.js');
  newScript('lib/blocks_compressed.js');
  newScript('closure-library/closure/goog/base.js');  // Must be after Blockly
  newScript('src/factory_utils.js');
  newScript('src/workspacefactory/list_element.js');
  newScript('src/standard_categories.js');
  newScript('src/workspacefactory/wfactory_model.js');
  newScript('src/devtools_toolboxes.js');
  newScript('src/workspacefactory/wfactory_controller.js');
  newScript('src/workspacefactory/wfactory_generator.js');
})();
