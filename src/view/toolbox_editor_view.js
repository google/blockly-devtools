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
 * @fileoverview ToolboxEditorView manages the visible parts of the application involved
 * in editing toolboxes, creating categories, and populating them with blocks for a
 * user's Blockly application. ToolboxView contains EventHandlers and popups (prompts,
 * etc.) necessary to create a toolbox.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo), evd2014 (Emma Dauterman)
 */
class ToolboxEditorView {
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
        toolbox: DevToolsToolboxes.toolboxEditor('')
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
     * Keeps track of association between ListElement ID and the DOM element
     * of that ListElement in the view.
     * @type {!Object.<!ListElement, !Element>}
     */
    this.categoryTabs = {};
  }

  /**
   * Adds a category tab to the UI, and updates categoryTabs accordingly.
   * @param {string} name The name of the category being created.
   * @param {string} id ID of category being created.
   * @return {!Element} DOM element created for tab
   */
  addCategoryTab(name, id) {
    /*
     * TODO: Move in from wfactory_view.js:addCategoryRow(name, id)
     *
     * References:
     * - createCategoryIdName()
     */
    throw 'Unimplemented: addCategoryTab()';
  }

  /**
   * Deletes a category tab from the UI and updates categoryTabs accordingly.
   * @param {string} id ID of category to be deleted.
   * @param {string} name Name of the category to be deleted.
   */
  deleteCategoryTab(id, index) {
    /*
     * TODO: Move in from wfactory_view.js:deleteElementRow(id, index)
     *
     * References:
     * - addEmptyCategoryMessage()
     */
    throw 'Unimplemented: deleteCategoryTab()';
  }

  /**
   * Given the ID of a certain category, updates the corresponding tab in
   * the DOM to show a new name.
   * @param {string} newName Name of string to be displayed on tab
   * @param {string} id ID of category to be updated
   */
  renameCategoryTab(newname, id) {
    /*
     * TODO: Move in from wfactory_view.js:updateCategoryName(name, id)
     */
    throw 'Unimplemented: renameCategoryTab()';
  }

  /**
   * Given a separator ID, creates a corresponding tab in the view, updates
   * tab map, and returns the tab.
   * @param {string} id The ID of the separator.
   * @param {!Element} The td DOM element representing the separator.
   */
  addSeparatorTab(id) {
    /*
     * TODO: Move in from wfactory_view.js
     */
    throw 'Unimplemented: addSeparatorTab()';
  }

  /**
   * Moves a tab from one index to another. Adjusts index inserting before
   * based on if inserting before or after. Checks that the indexes are in
   * bounds, throws error if not.
   * @param {string} id The ID of the category to move.
   * @param {number} newIndex The index to move the category to.
   * @param {number} oldIndex The index the category is currently at.
   */
  moveTab(id, newIndex, oldIndex) {
    /*
     * TODO: Move in from wfactory_view.js:moveTabToIndex(id, newIndex, oldIndex)
     */
    throw 'Unimplemented: moveTab()';
  }

  /**
   * Removes all categories and separators in the view. Clears categoryTabs to
   * reflect this.
   */
  clearTabs() {
    // TODO: Move in from wfactory_view.js
    throw 'Unimplemented: clearTabs()';
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

  /**
   * Enables/disables ListElement buttons (add, remove, move up/down) depending
   * on what ListElement is currently selected.
   * Called when adding or removing elements, or when changing/swapping to new
   * element.
   *
   * @param {number} selectedIndex The index of the currently selected category,
   *     -1 if no categories created.
   * @param {ListElement} selected The selected ListElement.
   */
  updateElementButtons(selectedIndex, selected) {
    /*
     * TODO: Move in wfactory_view.js:updateState()
     */
    throw 'Unimplemented: updateElementButtons()';
  }

  /**
   * Determines the DOM ID for a category given its name.
   * @param {string} name Name of category
   * @return {string} ID of category tab
   */
  createcategoryIdName(name) {
    // Moved in from wfactory_view.js
    return 'tab_' + name;
  }

  /**
   * Switches a tab on or off.
   * @param {string} id ID of the tab to switch on or off.
   * @param {boolean} selected True if tab should be on, false if tab should be
   *     off.
   */
  setCategoryTabSelection(id, selected) {
    /*
     * TODO: Move in from wfactory_view.js
     */
    throw 'Unimplemented: setCategoryTabSelection()';
  }

  /**
   * Disables or enables the workspace by putting a div over or under the
   * toolbox workspace, depending on the value of disable. Used when switching
   * to/from separators where the user shouldn't be able to drag blocks into
   * the workspace.
   *
   * @param {boolean} disable True if the workspace should be disabled, false
   *     if it should be enabled.
   */
  disableEditorWorkspace(disable) {
    /*
     * TODO: Move in from wfactory_view.js:disableWorkspace(disable)
     */
    throw 'Unimplemented: disableEditorWorkspace()';
  }

  /**
   * Transfers the blocks in the user's flyout to a new category if
   * the user is creating their first category and their workspace is not
   * empty. Should be called whenever it is possible to switch from single flyout
   * to categories (not including importing).
   */
  transferFlyoutBlocksToCategory() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - hasElements()
     * - createCategory()
     * - getCategoryIdByName()
     * - setSelectedById()
     * - setCategoryTabSelection()
     * - setCategoryOptions()
     * - generateNewOptions()
     * - updatePreview()
     */
    throw 'Unimplemented: transferFlyoutBlocksToCategory()';
  }

  /**
   * Switches to a new tab for the element given by ID. Stores XML and blocks
   * to reload later, updates selected accordingly, and clears the workspace
   * and clears undo, then loads the new element.
   * @param {string} id ID of tab to be opened, must be valid element ID.
   */
  switchElement(id) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - getSelectedId()
     * - clearAndLoadElement(id)
     */
    throw 'Unimplemented: switchElement()';
  }

  /**
   * Switches to a new tab for the element by ID. Helper for switchElement.
   * Updates selected, clears the workspace and clears undo, loads a new element.
   * @param {string} id ID of category to load.
   */
  clearAndLoadElement(id) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - getSelectedId()
     * - setCategoryTabSelection()
     * - clearAndLoadXml_()
     * - getSelectedXml()
     * - setCategoryTabSelection(id, true)
     * - updateState()
     */
    throw 'Unimplemented: clearAndLoadElement()';
  }

  /**
   * Updates the preview workspace based on the toolbox workspace. If switching
   * from no categories to categories or categories to no categories, reinjects
   * Blockly with reinjectPreview, otherwise just updates without reinjecting.
   * Called whenever a list element is created, removed, or modified and when
   * Blockly move and delete events are fired. Do not call on create events
   * or disabling will cause the user to "drop" their current blocks. Make sure
   * that no changes have been made to the workspace since updating the model
   * (if this might be the case, call saveStateFromWorkspace).
   */
  updatePreview() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - generateToolboxXml()
     * - reinjectPreview(tree)
     * - generateWorkspaceXml()
     */
    throw 'Unimplemented: updatePreview()';
  }

  /**
   * Changes the color of the selected category. Does nothing if the selected
   * element is a separator.
   * @param {string} color The color to change the selected category. Must be
   *     a valid CSS string.
   */
  changeSelectedCategoryColor(color) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - getSelected()
     * - ListElement
     * - changeColor(color)
     * - setBorderColor()
     * - updatePreview()
     */
    throw 'Unimplemented: changeSelectedCategoryColor()';
  }

  /**
   * Prompts user for name of a standard Blockly category (case insensitive),
   * loads it as a new category, and switches to it. Leverages StandardCategories.
   */
  loadCategory() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - isStandardCategoryName(name)
     * - loadCategoryByName(name)
     */
    throw 'Unimplemented: loadCategory()';
  }

  /**
   * Loads a Standard Category by name and switches to it. Leverages
   * StandardCategories. Does nothing if cannot load standard category.
   * @param {string} name Name of the standard category to load.
   */
  loadCategoryByName(name) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - isStandardCategoryName(name)
     * - hasVariables()
     * - hasProcedures()
     * - hasCategoryByName(standardCategory.name)
     * - transferFlyoutBlocksToCategory()
     * - hasElements()
     * - addElementToList()
     * - addClickToSwitch()
     * - setBorderColor()
     * - convertShadowBlocks()
     * - saveStateFromWorkspace()
     * - setCategoryOptions()
     * - generateNewOptions()
     * - updatePreview()
     */
    throw 'Unimplemented: loadCategoryByName()';
  }

  /**
   * Loads the standard Blockly toolbox into the editing space. Should only
   * be called when the mode is set to toolbox.
   */
  loadStandardToolbox() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - loadCategoryByName()
     * - addSeparator()
     */
    throw 'Unimplemented: loadStandardToolbox()';
  }

  /**
   * Given a set of blocks currently loaded user-generated shadow blocks, visually
   * marks them without making them actual shadow blocks (allowing them to still
   * be editable and movable).
   * @param {!Array.<!Blockly.Block>} blocks Array of user-generated shadow blocks
   *     currently loaded.
   */
  markShadowBlocks(blocks) {
    /*
     * TODO: Move in from wfactory_view.js:markShadowBlocks(blocks)
     *           and from wfactory_view.js:markShadowBlock(block)
     */
    throw 'Unimplemented: markShadowBlocks()';
  }

  /**
   * Removes visual marking for a shadow block given a rendered block.
   * @param {!Blockly.Block} block The block that should be unmarked as a shadow
   *     block (must be rendered).
   */
  unmarkShadowBlock(block) {
    /*
     * TODO: Move in from wfactory_view.js
     */
  }

  /**
   * Given a set of blocks currently loaded, returns all blocks in the workspace
   * that are user generated shadow blocks.
   * @param {!<Blockly.Block>} blocks Array of blocks currently loaded.
   * @return {!<Blockly.Block>} Array of user-generated shadow blocks currently
   *   loaded.
   */
  getShadowBlocksInWorkspace() {
    /*
     * TODO: Move in from wfactory_model.js
     */

    // TODO: Investigate if this function is necessary at all. Possibly delete.
    //       (This method was never called in DevTools)
    throw 'Unimplemented: getShadowBlocksInWorkspace()';
  }

  /**
   * Displays imported Toolbox recently added to model onto editor view.
   *
   * @param {string} toolboxName Name of toolbox that was imported.
   * @param {string} xmlString String representation of XML of recently imported
   *     toolbox.
   */
  loadImportedToolbox(toolboxName, xmlString) {
    /*
     * TODO: Move in from wfactory_generator.js:loadXml(jsFileContents, importMode)
     *                    wfactory_generator.js:evaluateMarkedCode(code)
     *       Note: loadXml() is broken into two functions in refactored version.
     *
     * References:
     * - evaluateMarkedCode()
     */
    throw 'Unimplemented: loadImportedToolbox()';
  }

  /**
   * Given a category ID and color, use that color to color the left border of the
   * tab for that category.
   * @param {string} id The ID of the category to color.
   * @param {string} color Hex color to be used for tab border. Must be valid
   *     CSS string.
   */
  setBorderColor(id, color) {
    // TODO: Move in from wfactory_view.js
    throw 'Unimplemented: setBorderColor()';
  }
}
