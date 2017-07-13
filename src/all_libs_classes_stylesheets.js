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
  var appendScript = function(src) {
    document.write(`<script src="${src}"></script>`);
  };
  var appendStylesheet = function(src) {
    document.write(`<link rel="stylesheet" href="${src}">`);
  };

  appendScript('node_modules/jquery/dist/jquery.min.js');
  // TODO: Replace with local NPM managed file. https://www.npmjs.com/package/google-code-prettify
  appendScript('https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');

  appendScript('lib/blockly_compressed.js');
  appendScript('msg/js/en.js');
  appendScript('lib/blocks_compressed.js');
  appendScript('closure-library/closure/goog/base.js');  // Must be after Blockly
  appendScript('src/factory_utils.js');
  appendScript('src/list_element.js');
  appendScript('res/standard_categories.js');
  appendScript('src/workspacefactory/wfactory_model.js');
  appendScript('res/devtools_toolboxes.js');
  appendScript('src/workspacefactory/wfactory_controller.js');
  appendScript('src/workspacefactory/wfactory_generator.js');
  appendScript('src/block_library_view.js');
  appendScript('src/workspacefactory/wfactory_view.js');
  appendScript('src/workspacefactory/wfactory_generator.js');
  appendScript('src/workspacefactory/wfactory_init.js');
  appendScript('src/block_option.js');
  appendScript('src/factory.js');
  appendScript('src/block_library_storage.js');
  appendScript('src/block_library_controller.js');
  appendScript('src/block_exporter_tools.js');
  appendScript('src/block_exporter_view.js');
  appendScript('src/block_exporter_controller.js');
  appendScript('src/blocks.js');
  appendScript('src/model/resource.js');
  appendScript('src/model/project.js');
  appendScript('src/controller/project_controller.js');
  appendScript('src/controller/app_controller.js');
  appendScript('src/view/app_view.js');
  appendScript('src/new_block_dialog_view.js');
  appendScript('src/new_block_dialog_controller.js');
  appendScript('src/view/navigation_tree.js');
  appendScript('src/view/block_library_view.js');
  appendScript('src/view/toolbox_editor_view.js');
  appendScript('src/view/workspace_editor_view.js');
  appendScript('src/view/block_editor_view.js');
  appendScript('src/model/block_library.js');
  appendScript('src/model/workspace_preload.js');
  appendScript('src/model/toolbox.js');
  appendScript('src/controller/project_controller.js');
  appendScript('node_modules/jstree/dist/jstree.min.js');

  appendStylesheet('src/factory.css');
  appendStylesheet('node_modules/jstree/dist/themes/default/style.min.css');
})();
