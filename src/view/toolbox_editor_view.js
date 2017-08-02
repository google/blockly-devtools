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
     * Keeps track of currently selected block in the editor workspace. Used for
     * checking the shadow block status of selected blocks and its descendants/
     * connected blocks. Null if no block is selected.
     * @type {?Blockly.Block}
     */
    this.selectedBlock = null;

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
        toolbox: '<xml></xml>',
        trashcan: true
      });

    /**
     * DOM element of buttons in editor workspace.
     * @type {!Object.<string, !Element>}
     */
    this.removeButton = $('#button_remove').get(0);
    this.upButton = $('#button_up').get(0);
    this.downButton = $('#button_down').get(0);
    this.editButton = $('#button_editCategory').get(0);
    this.addButton = $('#button_add').get(0);
    this.addCategoryButton = $('#dropdown_newCategory').get(0);
    this.removeCategoryButton = $('#button_remove').get(0);
    this.addSeparatorButton = $('#dropdown_separator').get(0);
    this.standardCategoryButton = $('#dropdown_loadCategory').get(0);
    this.standardToolboxButton = $('#dropdown_loadStandardToolbox').get(0);
    this.addShadowButton = $('#button_addShadow').get(0);
    this.removeShadowButton = $('#button_removeShadow').get(0);
    this.editNameButton = $('#dropdown_name').get(0);
    this.editColorButton = $('#dropdown_color').get(0);
    this.clearButton = $('#button_clearToolbox').get(0);

    /**
     * Maps ID of a ListElement to the td DOM element. Used for navigating
     * between category tabs in editor.
     * @type {!Object.<!ListElement, !Element>}
     */
    this.tabMap = {};

    // Disable category editing buttons until categories are created.
    this.removeButton.disabled = true;
    this.upButton.disabled = true;
    this.downButton.disabled = true;
    this.editButton.disabled = true;
    this.refreshToolboxInfo();

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
   * @package
   */
  init(controller) {
    // Workspace change listener.
    this.editorWorkspace.addChangeListener((event) => {
      controller.onChange(event);
    });
    this.initEventListeners_(controller);
    this.initClickHandlers_(controller);
    this.initColorPicker_(controller);
  }

  /**
   * Initialize the color picker in Toolbox editor.
   * @param {!ToolboxController} controller ToolboxController used as reference
   *     in event listeners.
   * @private
   */
  initColorPicker_(controller) {
    // From wfactory_init.js:initColorPicker_(controller)
    // Array of Blockly category colours, consitent with the 15 degree default
    // of the block factory's colour wheel.
    const colours = [];
    for (let hue = 0; hue < 360; hue += 15) {
      colours.push(FactoryUtils.hsvToHex(hue,
          Blockly.HSV_SATURATION, Blockly.HSV_VALUE));
    }

    // Create color picker with specific set of Blockly colours.
    const colourPicker = new goog.ui.ColorPicker();
    colourPicker.setSize(6);
    colourPicker.setColors(colours);

    // Create and render the popup colour picker and attach to button.
    const popupPicker = new goog.ui.PopupColorPicker(null, colourPicker);
    popupPicker.render();
    popupPicker.attach(document.getElementById('dropdown_color'));
    popupPicker.setFocusable(true);
    goog.events.listen(popupPicker, 'change', (event) => {
      controller.changeSelectedCategoryColor(popupPicker.getSelectedColor());
      FactoryUtils.closeModal(this.openModal_);
      this.openModal_ = null;
    });
  }

  /**
   * Assign click handlers for Toolbox editor.
   * @param {!ToolboxController} controller ToolboxController used as reference
   *     in event listeners.
   * @private
   */
  initClickHandlers_(controller) {
    // From wfactory_init.js:assignWorkspaceFactoryClickHandlers_()
    // Listener for user clicking outside of modal popup.
    $('#modalShadow').click(() => {
      FactoryUtils.closeModal(this.openModal_);
      this.openModal_ = null;
    });

    // Listener for clearing editor.
    this.clearButton.addEventListener('click', () => {
      controller.clear();
    });

    // Shows dropdown for adding elements.
    this.addButton.addEventListener('click', () => {
      this.openModal_ = 'dropdownDiv_add';
      FactoryUtils.openModal(this.openModal_);
    });

    // Listener for adding a category.
    this.addCategoryButton.addEventListener('click', () => {
      controller.addCategory();
      FactoryUtils.closeModal(this.openModal_);
      this.openModal_ = null;
    });

    // Listener for removing a category.
    this.removeCategoryButton.addEventListener('click', () => {
      controller.removeElement();
      FactoryUtils.closeModal(this.openModal_);
      this.openModal_ = null;
    });

    // Listener for adding a separator.
    this.addSeparatorButton.addEventListener('click', () => {
      controller.addCategorySeparator();
    });

    // Listener for importing the standard toolbox.
    this.standardToolboxButton.addEventListener('click', () => {
      controller.loadStandardToolbox();
    });

    // Listener for importing a standard category.
    this.standardCategoryButton.addEventListener('click', () => {
      controller.loadStandardCategory();
    });

    // Listener for moving a category up.
    this.upButton.addEventListener('click', () => {
      controller.moveElement(-1);
    });

    // Listener for moving a category down.
    this.downButton.addEventListener('click', () => {
      controller.moveElement(1);
    });

    // Listener for edit category dropdown button.
    this.editButton.addEventListener('click', () => {
      this.openModal_ = 'dropdownDiv_editCategory';
      FactoryUtils.openModal(this.openModal_);
    });

    // Listener for editing category name.
    this.editNameButton.addEventListener('click', () => {
      controller.changeCategoryName();
      FactoryUtils.closeModal(this.openModal_);
      this.openModal_ = null;
    });

    // Listener for adding a shadow block.
    this.addShadowButton.addEventListener('click', () => {
      controller.setSelectedAsShadowBlock();
    });

    // Listener for removing a shadow block.
    this.removeShadowButton.addEventListener('click', () => {
      controller.unsetSelectedAsShadowBlock();
    });

    $('#button_importBlocks').click(() => {
      this.openModal_ = 'dropdownDiv_importBlocks';
      FactoryUtils.openModal(this.openModal_);
    });

    $('#button_load').click(() => {
      this.openModal_ = 'dropdownDiv_load';
      FactoryUtils.openModal(this.openModal_);
    });

    $('#button_export').click(() => {
      this.openModal_ = 'dropdownDiv_export';
      FactoryUtils.openModal(this.openModal_);
    });

    $('#dropdown_exportToolboxXML').click(() => {
      controller.export(this.toolbox, ProjectController.TYPE_XML);
    });

    $('#dropdown_exportToolboxJS').click(() => {
      controller.export(this.toolbox, ProjectController.TYPE_JS);
    });
  }

  /**
   * Add event listeners for Toolbox editor.
   * @param {!ToolboxController} controller ToolboxController used as reference
   *     in event listeners.
   * @private
   */
  initEventListeners_(controller) {
    // From wfactory_init.js:addWorkspaceFactoryEventListeners_()
  }

  /**
   * Refreshes any information in the view (such as the name of the currently
   * edited toolbox) to match any changes in the Toolbox model object.
   */
  refreshToolboxInfo() {
    $('#currentToolbox').text(this.toolbox.name);
  }

  /**
   * Display or hide the add shadow button.
   * @param {boolean} show True if the add shadow button should be shown, false
   *     otherwise.
   */
  displayAddShadow(show) {
    // REFACTOR: Moved in from wfactory_init.js:displayAddShadow_(show)
    this.addShadowButton.style.display = show ? 'inline-block' : 'none';
  }

  /**
   * Display or hide the remove shadow button.
   * @param {boolean} show True if the remove shadow button should be shown, false
   *     otherwise.
   */
  displayRemoveShadow(show) {
    // TODO: Move in from wfactory_model.js:displayRemoveShadow_(show)
    this.removeShadowButton.style.display = show ? 'inline-block' : 'none';
  }

  /**
   * Updates the toolbox used in the toolbox editor workspace.
   * @param {!string} toolbox String representation of toolbox XML to display.
   */
  updateEditorToolbox(toolbox) {
    this.editorWorkspace.updateToolbox(toolbox);
  }

  /**
   * Given the ID of a certain category, updates the corresponding tab in
   * the DOM to show a new name.
   * @param {string} newName Name of string to be displayed on tab
   * @param {string} id ID of category to be updated
   */
  updateCategoryName(newName, id) {
    // TODO: Move in from wfactory_view.js:updateCategoryName(name, id)
    this.tabMap[id].textContent = newName;
    this.tabMap[id].id = 'tab_' + newName;
  }

  /**
   * Switches a category tab on or off. If tab is switched on, all other tabs
   * are turned off.
   * @param {string} id ID of the tab to switch on or off.
   * @param {boolean} opt_selected True if tab should be on, false if tab should be
   *     off. Optional, assumed to be true if not passed in.
   */
  selectTab(id, opt_selected) {
    // REFACTOR: Moved in from wfactory_view.js:setCategoryTabSelection(id, selected)
    const tab = this.tabMap[id];
    if (!tab) {
      return; // Exit if tab does not exist.
    }
    if (opt_selected) {
      $(tab).removeClass('taboff');
      tab.className = 'tabon';
    } else {
      $(tab).removeClass('tabon');
      tab.className = 'taboff';
    }
  }

  /**
   * Removes all categories and separators in the view.
   */
  clearElements() {
    if (this.toolbox.getSelected().type == ListElement.TYPE_FLYOUT) {
      return;
    }
    const oldCategoryTable = document.getElementById('categoryTable');
    const newCategoryTable = document.createElement('table');
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
   * TODO(#128): Switch to using CSS to add/remove styles.
   * @param {number} selectedIndex The index of the currently selected category,
   *     -1 if no categories created.
   * @param {ListElement} selected The selected ListElement.
   */
  updateState(selectedIndex, selected) {
    // From
    // Disable/enable editing buttons as necessary.
    this.editButton.disabled = selectedIndex < 0 ||
        selected.type != ListElement.TYPE_CATEGORY;
    this.removeButton.disabled = selectedIndex < 0;
    this.upButton.disabled = selectedIndex <= 0;
    var table = document.getElementById('categoryTable');
    this.downButton.disabled = selectedIndex >=
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
   *     if it should be enabled.
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
   * @param {!ListElement} category Category used to check if workspace should
   *     be disabled.
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
  addCategoryTab(name, id) {
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
    this.selectTab(id, true);
    // Return tab.
    return nextEntry;
  }

  /**
   * Deletes given element from the category-tab view.
   * @param {string} id ID of element to remove.
   * @param {number} index Index of element in category/element list.
   */
  deleteElementTab(id, index) {
    // From wfactory_view.js:deleteElementRow(id, index)
    // Delete tab entry.
    delete this.tabMap[id];
    // Delete tab row.
    const table = document.getElementById('categoryTable');
    const count = table.rows.length;
    table.deleteRow(index);

    // If last category removed, add category help text and disable category
    // buttons.
    this.addEmptyToolboxMessage();
  }

  /**
   * Given a separator ID, creates a corresponding tab in the view, updates
   * tab map, and returns the tab.
   * @param {string} id The ID of the separator.
   * @return {!Element} The td DOM element representing the separator.
   */
  addSeparatorTab(id) {
    // From wfactory_view.js:addSeparatorTab(id)
    const table = document.getElementById('categoryTable');
    const count = table.rows.length;

    if (count == 0) {
      document.getElementById('categoryHeader').textContent = 'Your categories:';
    }
    // Create separator.
    const row = table.insertRow(count);
    const nextEntry = row.insertCell(0);
    // Configure separator.
    nextEntry.style.height = '10px';
    // Store and return separator.
    this.tabMap[id] = table.rows[count].cells[0];
    return nextEntry;
  }

  /**
   * Moves a tab from one index to another. Adjusts index inserting before
   * based on if inserting before or after. Checks that the indexes are in
   * bounds, throws error if not.
   * @param {string} id The ID of the category to move.
   * @param {number} newIndex The index to move the category to.
   * @param {number} oldIndex The index the category is currently at.
   * @throws {Error} For index out of bounds error if newIndex is invalid.
   */
  moveTabToIndex(id, newIndex, oldIndex) {
    // TODO: Move in from wfactory_view.js:moveTabToIndex(id, newIndex, oldIndex)
    const table = document.getElementById('categoryTable');

    // Check that indexes are in bounds.
    const outOfBounds = newIndex < 0 || newIndex >= table.rows.length ||
        oldIndex < 0 || oldIndex >= table.rows.length;
    if (outOfBounds) {
      throw new Error('Index out of bounds when moving tab in the view.');
    }

    if (newIndex < oldIndex) {
      // Inserting before.
      const row = table.insertRow(newIndex);
      row.appendChild(this.tabMap[id]);
      table.deleteRow(oldIndex + 1);
    } else {
      // Inserting after.
      const row = table.insertRow(newIndex + 1);
      row.appendChild(this.tabMap[id]);
      table.deleteRow(oldIndex);
    }
  }

  /**
   * Used to bind a click to a certain DOM element (used for category tabs).
   * Taken directly from code.js
   * @param {string|!Element} el Tab element or corresponding ID string.
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
    // From wfactory_view.js:addEmptyCategoryMessage()
    const table = document.getElementById('categoryTable');
    if (!table.rows.length) {
      document.getElementById('categoryHeader').textContent =
          'You currently have no categories.';
    }
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
    if (!tab) {
      return;
    }
    tab.style.borderLeftWidth = '8px';
    tab.style.borderLeftStyle = 'solid';
    tab.style.borderColor = color;
  }

  /**
   * Enables or disables the add/remove shadow block buttons depending on whether
   * the selected block (1) is already marked as a shadow block, and (2) is in
   * a valid shadow block position.
   * @param {boolean} isShadow Whether the selected block is already marked as
   *     a shadow block.
   * @param {boolean} isValid Whether the selected block is in a valid shadow
   *     block position.
   */
  enableShadowButtons(isShadow, isValid) {
    if (isShadow) {
      // Is a shadow block
      this.showAndEnableShadow(false, true);
    } else if (!isShadow && isValid) {
      // Is not a shadow block but can be a valid shadow block.
      this.showAndEnableShadow(true, true);
    } else {
      // Is not a shadow block and is not in a valid shadow block position.
      this.showAndEnableShadow(true, false);
    }
  }

  /**
   * Shows and enables shadow buttons.
   * @param {boolean} ifAdd Whether to show the add button. Shows remove button
   *     if false.
   * @param {boolean} ifEnable Whether to enable the add or remove button that
   *     is shown.
   * @param {boolean=} opt_disableAll Whether to hide both buttons entirely.
   */
  showAndEnableShadow(ifAdd, ifEnable, opt_disableAll) {
    if (opt_disableAll) {
      this.displayAddShadow(false);
      this.displayRemoveShadow(false);
      return;
    }
    this.displayAddShadow(ifAdd);
    this.displayRemoveShadow(!ifAdd);
    const button = ifAdd ? this.addShadowButton : this.removeShadowButton;
    button.disabled = ifEnable ? false : true;
  }

  /**
   * Display or hide the add shadow button.
   * @param {boolean} show True if the add shadow button should be shown, false
   *     otherwise.
   */
  displayAddShadow(show) {
    // REFACTOR: Moved in from wfactory_init.js:displayAddShadow_(show)
    this.addShadowButton.style.display = show ? 'inline-block' : 'none';
  }

  /**
   * Display or hide the remove shadow button.
   * @param {boolean} show True if the remove shadow button should be shown, false
   *     otherwise.
   */
  displayRemoveShadow(show) {
    // TODO: Move in from wfactory_model.js:displayRemoveShadow_(show)
    this.removeShadowButton.style.display = show ? 'inline-block' : 'none';
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
        <a id="dropdown_exportToolboxXML">Toolbox as XML</a>
        <a id="dropdown_exportToolboxJS">Toolbox as JS</a>
        <a id="dropdown_exportAll">All</a>
      </div>
    </div>

    <button id="button_clearToolbox">Clear</button>

    <span id="saved_message"></span>
  </p>
</div>

<section id="createDiv">
  <div id="createHeader">
    <h3>Edit Toolboxes</h3>
    <p id="editHelpText">Drag blocks into the workspace to configure the toolbox in your custom workspace.</p>
    <p><b>Current toolbox:</b> <span id="currentToolbox"></span></p>
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

    <button id="button_remove" class="large">-</button><br>

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

  <button id="button_addShadow" style="display: none">Make Shadow</button><br>
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
