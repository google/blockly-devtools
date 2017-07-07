/**
 * @license
 * Blockly Demos: Block Factory
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

/**
 * @fileoverview BlockEditorView deals with the visual components of defining a
 * custom block.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo)
 */

class BlockEditorView {
  constructor(blockDefinition) {
    /**
     * BlockDefinition object associated with this instance of BlockLibraryView.
     * @type {!BlockDefinition}
     */
    this.blockDefinition = blockDefinition;

    /**
     * Blockly workspace of main block defining workspace.
     * @type {!Blockly.Workspace}
     */
    this.blockDefinitionWorkspace = Blockly.inject('blockly',
      {
        collapse: false,
        toolbox: DevToolsToolboxes.blockFactory,
        media: 'media/'
      });
  }

  /**
   * Add click handlers to each tab to allow switching between the Block Factory,
   * Workspace Factory, and Block Exporter tab.
   * @param {!Object} tabMap Map of tab name to div element that is the tab.
   */
  addTabHandlers(tabMap) {
    /*
     * TODO: Move in from app_controller.js
     *
     * References:
     * - makeTabClickHandler_()
     */
  }

  /**
   * Creates the tab click handler specific to the tab specified.
   * @param {string} tabName AppController.BLOCK_FACTORY,
   *     AppController.WORKSPACE_FACTORY, or AppController.EXPORTER
   * @return {!Function} The tab click handler.
   */
  makeTabClickHandler(tabName) {
    /*
     * TODO: Move in from app_controller.js
     *
     * References:
     * - this.setSelected_()
     * - this.onTab()
     */
  }
}
