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
// TODO: Replace this with the right way for both global references and module imports.
(function() {
  var appendScript = function(src) {
    document.write(`<script src="${src}"></script>`);
  };
  var appendStylesheet = function(src) {
    document.write(`<link rel="stylesheet" href="${src}">`);
  };

  appendScript('node_modules/jquery/dist/jquery.min.js');
  appendScript('node_modules/code-prettify/src/run_prettify.js');

  appendScript('lib/blockly_compressed.js');
  appendScript('msg/js/en.js');
  appendScript('lib/blocks_compressed.js');
  appendScript('closure-library/closure/goog/base.js');  // Must be after Blockly
  appendScript('src/controller/block_definition_extractor.js');
  appendScript('src/factory_utils.js');
  appendScript('src/list_element.js');
  appendScript('res/standard_categories.js');
  appendScript('res/devtools_toolboxes.js');
  appendScript('src/block_option.js');
  appendScript('src/blocks.js');

  appendScript('src/model/resource.js');
  appendScript('src/model/block_definition.js');
  appendScript('src/model/block_library.js');
  appendScript('src/model/workspace_configuration.js');
  appendScript('src/model/workspace_contents.js');
  appendScript('src/model/toolbox.js');
  appendScript('src/model/resource_set.js');
  appendScript('src/model/toolbox_set.js');
  appendScript('src/model/block_library_set.js');
  appendScript('src/model/workspace_configuration_set.js');
  appendScript('src/model/workspace_contents_set.js');
  appendScript('src/model/project.js');

  appendScript('src/view/navigation_tree.js');
  appendScript('src/view/block_editor_view.js');
  appendScript('src/view/popup_view.js');
  appendScript('src/view/new_resource_popup_view.js');
  appendScript('src/view/new_block_popup_view.js');
  appendScript('src/view/new_project_popup_view.js');
  appendScript('src/view/new_library_popup_view.js');
  appendScript('src/view/new_toolbox_popup_view.js');
  appendScript('src/view/new_workspace_contents_popup_view.js');
  appendScript('src/view/new_config_view.js');
  appendScript('src/view/app_view.js');
  appendScript('src/view/save_project_popup_view.js');
  appendScript('src/view/open_project_popup_view.js');
  appendScript('src/view/import_resource_view.js');
  appendScript('src/view/toolbox_editor_view.js');
  appendScript('src/view/workspace_editor_view.js');
  appendScript('node_modules/jstree/dist/jstree.min.js');

  appendScript('src/controller/block_editor_controller.js');
  appendScript('src/controller/shadow_controller.js');
  appendScript('src/controller/toolbox_controller.js');
  appendScript('src/controller/workspace_controller.js');
  appendScript('src/controller/project_controller.js');
  appendScript('src/controller/popup_controller.js');
  appendScript('src/controller/import_resource_controller.js');
  appendScript('src/controller/save_project_popup_controller.js');
  appendScript('src/controller/new_block_popup_controller.js');
  appendScript('src/controller/open_project_popup_controller.js');
  appendScript('src/controller/read_write_controller.js');
  appendScript('src/controller/new_library_popup_controller.js');
  appendScript('src/controller/new_project_popup_controller.js');
  appendScript('src/controller/editor_controller.js');
  appendScript('src/controller/app_controller.js');

  appendStylesheet('src/factory.css');
  appendStylesheet('node_modules/jstree/dist/themes/default/style.min.css');
  appendStylesheet('https://ssl.gstatic.com/docs/script/css/add-ons1.css');
})();
