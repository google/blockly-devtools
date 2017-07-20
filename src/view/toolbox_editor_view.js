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
goog.require('Toolbox');

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
     * JQuery container of toolbox editor view.
     * @type {!JQuery}
     */
    this.container = $('#toolboxEditor');

    // Inserts HTML into toolbox editor container. Keeps hidden.
    this.container.html(ToolboxEditorView.html);
    this.container.hide();

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
   * Removes contents of this editor view from application view. Used when switching
   * editors.
   */
  hide() {
    // Deselect tab.
    const tab = $('#' + AppController.TOOLBOX_EDITOR);
    tab.removeClass('tabon');
    tab.addClass('taboff');
    // Hide this view.
    this.container.hide();
  }

  /**
   * Shows contents of this editor to application view. Used when switching editors.
   * @param {!Toolbox} toolbox Toolbox object to populate in toolbox editor when
   *     shown.
   */
  show(toolbox) {
    // Select tab.
    const tab = $('#' + AppController.TOOLBOX_EDITOR);
    tab.removeClass('taboff');
    tab.addClass('tabon');

    // Show this view.
    this.container.show();

    // Resizes workspace to fit container.
    Blockly.svgResize(this.editorWorkspace);
    Blockly.svgResize(this.previewWorkspace);

    // TODO: Make editor show the @param toolbox (when user clicks on a
    //       specific toolbox in the navtree).
  }

  /**
   * Initializes all event handlers and listeners for buttons/etc. in this view.
   * @private
   */
  init_() {
    console.warn('Unimplemented: init_()');
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

/**
 * Toolbox editor HTML contents. Injected into div on page load, then hidden.
 * @type {string}
 */
ToolboxEditorView.html = `
<!-- Workspace Factory tab -->
<div id="factoryHeader">
  <p>
    <div class="dropdown">
      <button id="button_importBlocks">Import Custom Blocks</button>
      <div id="dropdownDiv_importBlocks" class="dropdown-content">
        <input type="file" id="input_importBlocksJson" accept=".js, .json, .txt" class="inputfile"</input>
        <label for="input_importBlocksJson">From JSON</label>
        <input type="file" id="input_importBlocksJs" accept=".js, .txt" class="inputfile"</input>
        <label for="input_importBlocksJs">From Javascript</label>
      </div>
    </div>

    <div class="dropdown">
      <button id="button_load">Load to Edit</button>
      <div id="dropdownDiv_load" class="dropdown-content">
        <input type="file" id="input_loadToolboxXML" accept=".xml" class="inputfile"></input>
        <label for="input_loadToolboxXML">Toolbox as XML</label>
        <input type="file" id="input_loadToolboxJS" accept=".js" class="inputfile"></input>
        <label for="input_loadToolboxJS">Toolbox as JS</label>
        <input type="file" id="input_loadPreloadXML" accept=".xml" class="inputfile"</input>
        <label for="input_loadPreloadXML">Workspace Blocks as XML</label>
        <input type="file" id="input_loadPreloadJS" accept=".js" class="inputfile"</input>
        <label for="input_loadPreloadJS">Workspace Blocks as JS</label>
      </div>
    </div>

    <div class="dropdown">
      <button id="button_export">Export</button>
      <div id="dropdownDiv_export" class="dropdown-content">
        <a id="dropdown_exportOptions">Starter Code</a>
        <a id="dropdown_exportToolboxXML">Toolbox as XML</a>
        <a id="dropdown_exportToolboxJS">Toolbox as JS</a>
        <a id="dropdown_exportPreloadXML">Workspace Blocks as XML</a>
        <a id="dropdown_exportPreloadJS">Workspace Blocks as JS</a>
        <a id="dropdown_exportAll">All</a>
      </div>
    </div>

    <button id="button_clear">Clear</button>

    <span id="saved_message"></span>
  </p>
</div>

<section id="createDiv">
  <div id="createHeader">
    <h3>Edit Toolboxes</h3>
    <p id="editHelpText">Drag blocks into the workspace to configure the toolbox in your custom workspace.</p>
  </div>
  <section id="toolbox_section">
    <div id="toolboxDiv"></div>
  </section>
  <aside id="toolbox_div">
    <p id="categoryHeader">You currently have no categories.</p>
    <table id="categoryTable" style="width:auto; height:auto">
    </table>
    <p>&nbsp;</p>

    <div class="dropdown">
      <button id="button_add" class="large">+</button>
      <div id="dropdownDiv_add" class="dropdown-content">
        <a id="dropdown_newCategory">New Category</a>
        <a id="dropdown_loadCategory">Standard Category</a>
        <a id="dropdown_separator">Separator</a>
        <a id="dropdown_loadStandardToolbox">Standard Toolbox</a>
      </div>
    </div>

    <button id="button_remove" class="large">-</button>

    <button id="button_up" class="large">&#8593;</button>
    <button id="button_down" class="large">&#8595;</button>

    <br>
    <div class="dropdown">
      <button id="button_editCategory">Edit Category</button>
      <div id="dropdownDiv_editCategory" class="dropdown-content">
        <a id='dropdown_name'>Name</a>
        <a id='dropdown_color'>Colour</a>
      </div>
    </div>

  </aside>

  <button id="button_addShadow" style="display: none">Make Shadow</button>
  <button id="button_removeShadow" style="display: none">Remove Shadow</button>

</section>

<aside id="previewDiv">
  <div id="previewBorder">
    <div id="previewHelp">
      <h3>Preview</h3>
      <p>This is what your custom workspace will look like.</p>
    </div>
    <div id="toolboxPreview" class="content"></div>
  </div>
</aside>
`;
