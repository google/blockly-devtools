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

'use strict';

goog.provide('ToolboxEditorView');

goog.require('FactoryUtils');

/**
 * @fileoverview ToolboxEditorView manages the visible parts of the application involved
 * in editing toolboxes, creating categories, and populating them with blocks for a
 * user's Blockly application. ToolboxView contains EventHandlers and popups (prompts,
 * etc.) necessary to create a toolbox.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo), evd2014 (Emma Dauterman)
 */
class ToolboxEditorView {
  /**
   * @constructor
   * @param {!Toolbox} toolbox Toolbox that is being edited by the view.
   */
  constructor(toolbox) {
    /**
     * Toolbox associated with this instance of ToolboxView.
     * @type {!Toolbox}
     */
    this.toolbox = toolbox;

    /**
     * Blockly workspace where users define/edit toolboxes.
     * @type {!Blockly.Workspace}
     */
    this.editorWorkspace = Blockly.inject('toolboxDiv',
      {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        media: 'media/',
        toolbox: DevToolsToolboxes.toolboxEditor([])
      });

    /**
     * Blockly workspace where users can preview a defined WorkspaceContents.
     * @type {!Blockly.Workspace}
     */
    this.previewWorkspace = Blockly.inject('toolboxPreview',
      {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        media: 'media/',
        toolbox: '<xml></xml>'
      });

    // Initialize editor view
    this.initColorPicker_();
    this.initClickHandlers_();
    this.initEventListeners_();

    // Disable category editing buttons until categories are created.
    document.getElementById('button_remove').disabled = true;
    document.getElementById('button_up').disabled = true;
    document.getElementById('button_down').disabled = true;
    document.getElementById('button_editCategory').disabled = true;
  }

  /**
   * Initialize the color picker in Toolbox editor.
   * @private
   */
  initColorPicker_() {
    /*
     * TODO: Move in from wfactory_init.js:initColorPicker_(controller)
     *
     * References:
     * - hsvToHex_()
     * - changeSelectedCategoryColor()
     */
    console.warn('Unimplemented: initColorPicker_()');
  }

  /**
   * Assign click handlers for Toolbox editor.
   * @private
   */
  initClickHandlers_() {
    /*
     * TODO: Move in from wfactory_init.js:assignWorkspaceFactoryClickHandlers_()
     *       (Also moved into workspace_editor_view.js)
     */
     console.warn('Unimplemented: initClickHandlers_()');
  }

  /**
   * Add event listeners for Toolbox editor.
   * @private
   */
  initEventListeners_() {
    /*
     * TODO: Move in from wfactory_init.js:addWorkspaceFactoryEventListeners_()
     *       (Also moved into workspace_editor_view.js)
     */
    console.warn('Unimplemented: initEventListeners_()');
  }

  /**
   * Display or hide the add shadow button.
   * @param {boolean} show True if the add shadow button should be shown, false
   *     otherwise.
   */
  displayAddShadow_(show) {
    /*
     * TODO: Move in from wfactory_init.js
     */
    console.warn('Unimplemented: displayAddShadow_()');
  }

  /**
   * Display or hide the remove shadow button.
   * @param {boolean} show True if the remove shadow button should be shown, false
   *     otherwise.
   */
  displayRemoveShadow_(show) {
    /*
     * TODO: Move in from wfactory_model.js
     */
    console.warn('Unimplemented: displayRemoveShadow_()');
  }

  /**
   * Updates the toolbox used in the toolbox editor workspace.
   * @param {!string} toolbox String representation of toolbox XML to display.
   */
  updateEditorToolbox(toolbox) {
    this.editorWorkspace.updateToolbox(toolbox);
  }

  /**
   * Removes all categories and separators in the view.
   */
  clearElements() {
    const oldCategoryTable = $('#categoryTable');
    const newCategoryTable = $('#table');
    newCategoryTable.id = 'categoryTable';
    newCategoryTable.style.width = 'auto';
    oldCategoryTable.parentElement.replaceChild(newCategoryTable,
        oldCategoryTable);
  }

  /**
   * Adds a help message to emphasize empty toolbox. Shown when starting with empty
   * Toolbox or when user manually deletes all categories in their Toolbox.
   */
  addEmptyToolboxMessage() {
    /*
     * TODO: Move in from wfactory_view.js:addEmptyCategoryMessage()
     */
    throw 'Unimplemented: addEmptyToolboxMessage()';
  }
}
