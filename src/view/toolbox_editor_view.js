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

    /**
     * DOM element of buttons in editor workspace.
     * @type {!Object.<string, !Element>}
     */
    this.buttons = {
      remove: $('#button_remove').get(0),
      up: $('#button_up').get(0),
      down: $('#button_down').get(0),
      edit: $('#button_editCategory').get(0),
      add: $('#button_add').get(0),
      addCategory: $('#dropdown_newCategory').get(0),
      removeCategory: $('#button_remove').get(0),
      addShadow: $('#button_addShadow').get(0),
      removeShadow: $('#button_removeShadow').get(0)
    };

    /**
     * Maps ID of a ListElement to the td DOM element. Used for navigating
     * between category tabs in editor.
     * @type {!Object.<!ListElement, !Element>}
     */
    this.tabMap = {};

    // Disable category editing buttons until categories are created.
    this.buttons.remove.disabled = true;
    this.buttons.up.disabled = true;
    this.buttons.down.disabled = true;
    this.buttons.edit.disabled = true;

    /**
     * ID of currently open modal (dropdowns, etc.) in the toolbox editor view.
     * Null if no modal is open.
     * @type {?string}
     * @private
     */
    this.openModal_ = null;
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
   * @param {!ToolboxController} controller ToolboxController used as reference
   *     in event listeners.
   */
  init(controller) {
    // Workspace change listener.
    this.editorWorkspace.addChangeListener((event) => {
      controller.onChange(event);
    });
    this.initEventListeners_(controller);
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
   * @param {!ToolboxController} controller ToolboxController used as reference
   *     in event listeners.
   * @private
   */
  initEventListeners_(controller) {
    // From wfactory_init.js:addWorkspaceFactoryEventListeners_()
    console.log(this.buttons.add);
    $('#modalShadow').click(() => {
      FactoryUtils.closeModal(this.openModal_);
      this.openModal_ = null;
    });
    this.buttons.add.addEventListener('click', () => {
      this.openModal_ = FactoryUtils.openModal('dropdownDiv_add');
    });
    this.buttons.addCategory.addEventListener('click', () => {
      controller.addCategory();
      FactoryUtils.closeModal(this.openModal_);
      this.openModal_ = null;
    });
  }

  /**
   * Display or hide the add shadow button.
   * @param {boolean} show True if the add shadow button should be shown, false
   *     otherwise.
   */
  displayAddShadow(show) {
    // REFACTOR: Moved in from wfactory_init.js:displayAddShadow_(show)
    this.buttons.addShadow.style.display = show ? 'inline-block' : 'none';
  }

  /**
   * Display or hide the remove shadow button.
   * @param {boolean} show True if the remove shadow button should be shown, false
   *     otherwise.
   */
  displayRemoveShadow(show) {
    // TODO: Move in from wfactory_model.js:displayRemoveShadow_(show)
    this.buttons.removeShadow.style.display = show ? 'inline-block' : 'none';
  }

  /**
   * Updates the toolbox used in the toolbox editor workspace.
   * @param {!string} toolbox String representation of toolbox XML to display.
   */
  updateEditorToolbox(toolbox) {
    this.editorWorkspace.updateToolbox(toolbox);
  }

  /**
   * Switches a category tab on or off.
   * @param {string} id ID of the tab to switch on or off.
   * @param {boolean} selected True if tab should be on, false if tab should be
   *     off.
   */
  selectTab(id, selected) {
    // REFACTOR: Moved in from wfactory_view.js:setCategoryTabSelection(id, selected)
    if (!this.tabMap[id]) {
      return; // Exit if tab does not exist.
    }
    this.tabMap[id].className = selected ? 'tabon' : 'taboff';
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
   * Given the index of the currently selected element, updates the state of
   * the buttons that allow the user to edit the list elements. Updates the edit
   * and arrow buttons. Should be called when adding or removing elements
   * or when changing to a new element or when swapping to a different element.
   * TODO(evd2014): Switch to using CSS to add/remove styles.
   * @param {number} selectedIndex The index of the currently selected category,
   *   -1 if no categories created.
   * @param {ListElement} selected The selected ListElement.
   */
  updateState(selectedIndex, selected) {
    // From
    // Disable/enable editing buttons as necessary.
    this.buttons.edit.disabled = selectedIndex < 0 ||
        selected.type != ListElement.TYPE_CATEGORY;
    this.buttons.remove.disabled = selectedIndex < 0;
    this.buttons.up.disabled = selectedIndex <= 0;
    var table = document.getElementById('categoryTable');
    this.buttons.down.disabled = selectedIndex >=
        table.rows.length - 1 || selectedIndex < 0;
    // Disable/enable the workspace as necessary.
    this.disableWorkspace(this.shouldDisableWorkspace(selected));
  }

  /**
   * Disables or enables the workspace by putting a div over or under the
   * toolbox workspace, depending on the value of disable. Used when switching
   * to/from separators where the user shouldn't be able to drag blocks into
   * the workspace.
   * @param {boolean} disable True if the workspace should be disabled, false
   * if it should be enabled.
   */
  disableWorkspace(disable) {
    // From wfactory_view.js:disableWorkspace(disable)
    if (disable) {
      document.getElementById('toolbox_section').className = 'disabled';
      document.getElementById('toolboxDiv').style.pointerEvents = 'none';
    } else {
      document.getElementById('toolbox_section').className = '';
      document.getElementById('toolboxDiv').style.pointerEvents = 'auto';
    }
  }

  /**
   * Determines if the workspace should be disabled. The workspace should be
   * disabled if category is a separator or has VARIABLE or PROCEDURE tags.
   * @return {boolean} True if the workspace should be disabled, false otherwise.
   */
  shouldDisableWorkspace(category) {
    // From wfactory_view.js:shouldDisableWorkspace(category)
    return category != null && category.type != ListElement.TYPE_FLYOUT &&
        (category.type == ListElement.TYPE_SEPARATOR ||
        category.custom == 'VARIABLE' || category.custom == 'PROCEDURE');
  }

  /**
   * Adds a category tab to the UI, and updates tabMap accordingly.
   * @param {string} name The name of the category being created.
   * @param {string} id ID of category being created.
   * @return {!Element} DOM element created for tab.
   */
  addCategoryRow(name, id) {
    // TODO: Move in from wfactory_view.js:addCategoryRow(name, id)
    const table = document.getElementById('categoryTable');
    const count = table.rows.length;

    // Delete help label and enable category buttons if it's the first category.
    if (count == 0) {
      document.getElementById('categoryHeader').textContent = 'Your categories:';
    }

    // Create tab.
    const row = table.insertRow(count);
    const nextEntry = row.insertCell(0);
    // Configure tab.
    nextEntry.id = 'tab_' + name;
    nextEntry.textContent = name;
    // Store tab.
    this.tabMap[id] = table.rows[count].cells[0];
    // Return tab.
    return nextEntry;
  }

  /**
   * Used to bind a click to a certain DOM element (used for category tabs).
   * Taken directly from code.js
   * @param {string|!Element} e1 Tab element or corresponding ID string.
   * @param {!Function} func Function to be executed on click.
   */
  bindClick(el, func) {
    if (typeof el == 'string') {
      el = document.getElementById(el);
    }
    el.addEventListener('click', func, true);
    el.addEventListener('touchend', func, true);
  }

  /**
   * Adds a help message to emphasize empty toolbox. Shown when starting with empty
   * Toolbox or when user manually deletes all categories in their Toolbox.
   */
  addEmptyToolboxMessage() {
    /*
     * TODO: Move in from wfactory_view.js:addEmptyCategoryMessage()
     */
    console.warn('Unimplemented: addEmptyToolboxMessage()');
  }

  /**
   * Given a category ID and color, use that color to color the left border of the
   * tab for that category.
   * @param {string} id The ID of the category to color.
   * @param {string} color Hex color to be used for tab border. Must be valid
   *     CSS string.
   */
  setBorderColor(id, color) {
    // From wfactory_view.js:setBorderColor(id, color)
    const tab = this.tabMap[id];
    tab.style.borderLeftWidth = '8px';
    tab.style.borderLeftStyle = 'solid';
    tab.style.borderColor = color;
  }

  /**
   * Given a set of blocks currently loaded user-generated shadow blocks, visually
   * marks them without making them actual shadow blocks (allowing them to still
   * be editable and movable).
   * @param {!Array.<!Blockly.Block>} blocks Array of user-generated shadow blocks
   *     currently loaded.
   */
  markShadowBlocks(blocks) {
    // REFACTOR: Moved in from wfactory_view.js:markShadowBlocks(blocks)
    blocks.forEach((block) => {
      this.markShadowBlock(block);
    });
    this.toolbox.addShadowBlock(block.id);
  }

  /**
   * Given a Blockly.Block, visually marks a block in the view to look like a
   * shadow block.
   * @param {!Blockly.Block} block Blockly block to be marked as a shadow block.
   */
  markShadowBlock(block) {
    // REFACTOR: Moved in from wfactory_view.js:markShadowBlock(block)
    // Add Blockly CSS for user-generated shadow blocks.
    Blockly.utils.addClass(block.svgGroup_, 'shadowBlock');
    // If not a valid shadow block, add a warning message.
    if (!block.getSurroundParent()) {
      block.setWarningText('Shadow blocks must be nested inside other blocks' +
          ' be displayed.');
    }
    if (FactoryUtils.hasVariableField(block)) {
      block.setWarningText('Cannot make variable blocks shadow blocks.');
    }
  }

  /**
   * Removes visual marking for a shadow block given a rendered block.
   * @param {!Blockly.Block} block The block that should be unmarked as a shadow
   *     block (must be rendered).
   */
  unmarkShadowBlock(block) {
    // REFACTOR: Moved in from wfactory_view.js
    Blockly.utils.removeClass(block.svgGroup_, 'shadowBlock');
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
      <h3>Toolbox Preview</h3>
      <p>This is what your custom toolbox will look like in your workspace.</p>
    </div>
    <div id="toolboxPreview" class="content"></div>
  </div>
</aside>
`;
