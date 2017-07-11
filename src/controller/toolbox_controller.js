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
 * @fileoverview ToolboxController manages user interaction with the toolbox
 * editor, where users group together blocks that were defined within BlockLibrary
 * as toolboxes for their desired Blockly application.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo), evd2014 (Emma Dauterman)
 */
class ToolboxController {
  constructor(project) {
    /**
     * Project whose library is controlled by this BlockLibraryController instance.
     * @type {!Project}
     */
    this.project = project;

    /**
     * Keeps track of which toolbox is currently being edited.
     * @type {!Toolbox}
     */
    this.currentToolbox = null;

    /**
     * ToolboxEditorView associated with this instance of ToolboxController.
     * @type {!ToolboxEditorView}
     */
    this.view = new ToolboxEditorView(this.currentToolbox);

    /**
     * Keeps track of association between ListElement ID and the DOM element
     * of that ListElement in the view.
     * @type {!Object.<!ListElement, !Element>}
     */
    this.categoryTabs = {};

    /**
     * True if key events are enabled. False otherwise. Used to enable/disable
     * view elements depending on which Editor is currently being used.
     * @type {boolean}
     */
    this.keyEventsEnabled = true;

    /**
     * Hidden Blockly workspace used to generate XML for shadow blocks.
     */
    this.hiddenWorkspace = Blockly.inject('shadowBlocksWorkspace');
  }

  /**
   * Currently prompts the user for a name, checking that it's valid (not used
   * before), and then creates a tab and switches to it.
   */
  addCategory() {
    /*
     * TODO: Move in from wfactory_controller.js
     *          Also from wfactory_view.js:addCategoryRow(name, id)
     *
     * References:
     * - transferFlyoutBlocksToCategory()
     * - hasElements()
     * - promptForNewCategoryName
     * - createCategory()
     * - switchElement()
     * - getCategoryIdByName()
     * - setCategoryOptions()
     * - generateNewOptions()
     * - updatePreview()
     */
    throw 'Unimplemented: ToolboxController.addCategory()';
  }

  /**
   * Helper method for addCategory. Adds a category to the view given a name, ID,
   * and a boolean for if it's the first category created. Assumes the category
   * has already been created in the model. Does not switch to category.
   * @param {string} name Name of category being added.
   */
  createCategory(name) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - new ListElement()
     * - addElementToList()
     * - addCategoryRow()
     * - addClickToSwitch()
     */
    throw 'Unimplemented: ToolboxController.createCategory()';
  }

  /**
   * Checks if the user wants to delete the current category. Removes the category
   * and switches to another. When the last category is removed, it switches to
   * a single flyout mode.
   */
  removeElement() {
    /*
     * TODO: Move in from wfactory_controller.js
     *          Also from wfactory_view.js:deleteElementRow(id, index)
     *
     * References:
     * - getSelected()
     * - getSelectedId()
     * - getIndexByElementId(selectedId)
     * - deleteElementRow(selectedId, selectedIndex)
     * - deleteElementFromList(selectedIndex)
     * - getElementByIndex(selectedIndex)
     * - clearAndLoadElement(nextId)
     * - createDefaultSelectedIfEmpty()
     * - updatePreview()
     */
    throw 'Unimplemented: ToolboxController.removeElement()';
  }

  /**
   * Adds category separator to current Toolbox.
   */
  addCategorySeparator() {
    /*
     * TODO: Move in from wfactory_controller.js:addSeparator()
     *          Also from from wfactory_view.js:addSeparatorTab(id)
     *
     * References:
     * - transferFlyoutBlocksToCategory()
     * - ListElement
     * - addElementToList()
     * - addSeparatorTab()
     * - switchElement()
     * - updatePreview()
     */
    throw 'Unimplemented: ToolboxController.addCategorySeparator()';
  }

  /**
   * Gets a valid name for a new category from the user.
   * @param {string} promptString Prompt for the user to enter a name.
   * @param {string=} opt_oldName The current name.
   * @return {string?} Valid name for a new category, or null if cancelled.
   */
  promptForNewCategoryName(promptString, opt_oldName) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - hasCategoryByName(name)
     */
    throw 'Unimplemented: promptForNewCategoryName()';
  }

  /**
   * Used to completely reinject the preview workspace. This should be used only
   * when switching from simple flyout to categories, or categories to simple
   * flyout. More expensive than simply updating the flyout or toolbox.
   * @param {!Element} Tree of XML elements
   * @package
   */
  reinjectPreview(tree) {
    /*
     * TODO: Move in from wfactory_controller.js
     *       (ALSO used in workspace_controller.js)
     *
     * References:
     * - readOptions_()
     * - generateWorkspaceXml()
     */
    throw 'Unimplemented: reinjectPreview()';
  }

  /**
   * Changes the name of the selected category. Continues prompting the user until
   * they input a category name that is not currently in use. Exits if canceled.
   */
  changeCategoryName() {
    /*
     * TODO: Move in from wfactory_controller.js
     *          Also from wfactory_view.js:updateCategoryName(name, id)
     *
     * References:
     * - getSelected()
     * - promptForNewCategoryName()
     * - changeName(newName)
     * - updateCategoryName(newName, this.model.getSelectedId())
     * - updatePreview()
     */
    throw 'Unimplemented: changeCategoryName()';
  }

  /**
   * Swaps ordering of categories in toolbox editor.
   *
   * @param {number} offset The index offset from the currently selected element
   *     to swap with. Positive if the element to be swapped with is below, negative
   *     if the element to be swapped with is above.
   */
  moveElement(offset) {
    /*
     * TODO: Move in from wfactory_controller.js
     *          Also from wfactory_view.js:moveTabToIndex(id, newIndex, oldIndex)
     *
     * References:
     * - getSelected()
     * - getIndexByElementId()
     * - getElementByIndex(swapIndex)
     * - moveElementToIndex()
     * - updateState()
     * - updatePreview()
     */
    throw 'Unimplemented: moveElement()';
  }

  /**
   * Moves a element to a specified index and updates the model and view
   * accordingly. Helper functions throw an error if indexes are out of bounds.
   * @param {!Element} element The element to move.
   * @param {number} newIndex The index to insert the element at.
   * @param {number} oldIndex The index the element is currently at.
   */
  moveElementToIndex(element, newIndex, oldIndex) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - moveElementToIndex()
     * - moveTabToIndex()
     */
    throw 'Unimplemented: moveElementToIndex()';
  }

  /**
   * Removes all categories and separators in the view. Clears categoryTabs to
   * reflect this.
   */
  clear() {
    /**
     * REFACTORED: from wfactory_view.js:clearToolboxTabs()
     *                  wfactory_controller.js:clearAll()
     */
    // Clears tabs
    this.categoryTabs = {};

    // Clears model
    this.currentToolbox.clearCategoryList();

    // Clears view elements
    this.view.clearElements();
    this.view.addEmptyToolboxMessage();
    this.updateElementButtons(-1, null);

    // Clears Blockly toolbox editor workspace
    this.view.editorWorkspace.clear();
    this.view.editorWorkspace.clearUndo();

    // Update preview.
    this.updatePreview();
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
   * Updates the editor toolbox to have categories for user-defined block libraries.
   */
  updateEditorToolbox() {
    const newToolboxXml = FactoryUtils.updateBlockLibCategory(this.project);
    this.view.updateEditorToolbox(newToolboxXml);
  }

  /**
   * Loads the given XML to the hidden Blockly.Workspace and sets any user-generated
   * shadow blocks to be actual shadow blocks in the hidden Blockly.Workspace.
   *
   * @param {!Element} xml XML to be loaded to the hidden workspace.
   * @private
   */
  loadToHiddenWorkspace_(xml) {
    /*
     * TODO: Move in from wfactory_generator.js
     *
     * References:
     * - hiddenWorkspace (@type {!Blockly.Workspace})
     * - setShadowBlocksInHiddenWorkspace_()
     */

    // TODO: Investigate if there is a better method than using hidden workspaces
    //       for grabbing Block XML information.

    throw 'Unimplemented: loadToHiddenWorkspace_()';
  }

  /**
   * Encodes blocks in the hidden workspace in a XML DOM element. Very
   * similar to workspaceToDom, but doesn't capture IDs. Uses the top-level
   * blocks loaded in hiddenWorkspace.
   * @private
   * @param {!Element} xmlDom Tree of XML elements to be appended to.
   */
  appendHiddenWorkspaceToDom_(xmlDom) {
    /*
     * TODO: Move in from wfactory_generator.js
     *
     * References:
     * - hiddenWorkspace (@type {!Blockly.Workspace})
     */
    throw 'Unimplemented: appendHiddenWorkspaceToDom_()';
  }

  /**
   * Sets the user-generated shadow blocks loaded into hiddenWorkspace to be
   * actual shadow blocks. This is done so that blockToDom records them as
   * shadow blocks instead of regular blocks.
   * @private
   */
  setShadowBlocksInHiddenWorkspace_() {
    /*
     * TODO: Move in from wfactory_generator.js
     *
     * References:
     * - isShadowBlock()
     */
    throw 'Unimplemented: setShadowBlocksInHiddenWorkspace_()';
  }

  /*
   * Makes the currently selected block a user-generated shadow block. These
   * blocks are not made into real shadow blocks, but recorded in the model
   * and visually marked as shadow blocks, allowing the user to move and edit
   * them (which would be impossible with actual shadow blocks). Updates the
   * preview when done.
   */
  addShadow() {
    /*
     * TODO: Move in from wfactory_controller.js
     *       (Also moved into: workspace_controller.js)
     *
     * References:
     * - addShadowForBlockAndChildren_()
     * - saveStateFromWorkspace()
     * - updatePreview()
     */
    throw 'Unimplemented: addShadow()';
  }

  /**
   * Sets a block and all of its children to be user-generated shadow blocks,
   * both in the model and view.
   * @param {!Blockly.Block} block The block to be converted to a user-generated
   *     shadow block.
   * @private
   */
  addShadowForBlockAndChildren_(block) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - markShadowBlock()
     * - addShadowBlock()
     * - addShadowForBlockAndChildren_() (recursion)
     */
     throw 'Unimplemented: addShadowForBlockAndChildren_()';
  }

  /**
   * If the currently selected block is a user-generated shadow block, this
   * function makes it a normal block again, removing it from the list of
   * shadow blocks and loading the workspace again. Updates the preview again.
   */
  removeShadow() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - removeShadowBlock()
     * - unmarkShadowBlock()
     * - saveStateFromWorkspace()
     * - updatePreview()
     */
     throw 'Unimplemented: removeShadow()';
  }

  /**
   * Given a unique block ID, uses the model to determine if a block is a
   * user-generated shadow block.
   * @param {string} blockId The unique ID of the block to examine.
   * @return {boolean} True if the block is a user-generated shadow block, false
   *     otherwise.
   */
  isUserGenShadowBlock(blockId) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - isShadowBlock()
     */
     throw 'Unimplemented: isUserGenShadowBlock()';
  }

  /**
   * Call when importing XML containing real shadow blocks. This function turns
   * all real shadow blocks loaded in the workspace into user-generated shadow
   * blocks, meaning they are marked as shadow blocks by the model and appear as
   * shadow blocks in the view but are still editable and movable.
   */
  convertShadowBlocks() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - isShadow()
     * - setShadow()
     * - addShadowBlock()
     * - markShadowBlock()
     */
     throw 'Unimplemented: convertShadowBlocks()';
  }

  /**
   * Given a XML DOM tree, loads it into the toolbox editing area so that the
   * user can continue editing their work. Assumes that tree is in valid toolbox
   * XML format. Assumes that the mode is MODE_TOOLBOX.
   * @param {!Element} tree XML tree to be loaded to toolbox editing area.
   * @private
   */
  importToolboxFromTree_(tree) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - clearToolboxList()
     * - clearToolboxTabs()
     * - convertShadowBlocks()
     * - view.addEmptyCategoryMessage()
     * - createCategory()
     * - setBorderColor()
     * - switchElement()
     * - updateState()
     * - saveStateFromWorkspace()
     * - setCategoryOptions()
     * - generateNewOptions()
     * - updatePreview()
     */
    throw 'Unimplemented: importToolboxFromTree_()';
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
     * - markShadowBlocks()
     * - warnForUndefinedBlocks_()
     */
    throw 'Unimplemented: clearAndLoadElement()';
  }

  /**
   * Clears the toolbox workspace and loads XML to it, marking shadow blocks
   * as necessary. Helper function of clearAndLoadElement().
   * @private
   * @param {!Element} xml The XML to be loaded to the workspace.
   */
  clearAndLoadXml_(xml) {
    /*
     * TODO: Move in from wfactory_controller.js
     *       (Also moved into: workspace_controller.js)
     *
     * References:
     * - markShadowBlocks()
     * - warnForUndefinedBlocks_()
     */
    throw 'Unimplemented: clearAndLoadXml_()';
  }

  /**
   * Imports blocks from a file, generating a category in the toolbox workspace
   * to allow the user to use imported blocks in the toolbox and in pre-loaded
   * blocks.
   * @param {!File} file File object for the blocks to import.
   * @param {string} format The format of the file to import, either 'JSON' or
   *     'JavaScript'.
   */
  importBlocks(file, format) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - defineAndGetBlockTypes()
     * - hasDefinedBlockTypes()
     * - getDefinedBlocks()
     * - addImportedBlockTypes()
     * - clearAndLoadXml_()
     */
    throw 'Unimplemented: importBlocks()';
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
   * Return the block types used in the custom toolbox and pre-loaded workspace.
   * @return {!Array.<string>} Block types used in the custom toolbox and
   *     pre-loaded workspace.
   */
  getAllUsedBlockTypes() {
    /*
     * TODO: Move in from wfactory_controller.js
     *       Also move in from wfactory_model.js
     *       (Also moved into: workspace_controller.js)
     *
     * References:
     * - model.getAllUsedBlockTypes()
     */

    // TODO: Separate getAllUsedBlockTypes() so that it is restricted to just
    //       used block types in a toolbox editor or just used block types in
    //       workspace editor.
    throw 'Unimplemented: getAllUsedBlockTypes()';
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

  /*
   * Determines if a standard variable category is in the custom toolbox.
   * @return {boolean} True if a variables category is in use, false otherwise.
   */
  hasVariablesCategory() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - hasVariables()
     */
    throw 'Unimplemented: hasVariablesCategory()';
  }

  /**
   * Determines if a standard procedures category is in the custom toolbox.
   * @return {boolean} True if a procedures category is in use, false otherwise.
   */
  hasProceduresCategory() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - hasProcedures()
     */
     throw 'Unimplemented: hasProceduresCategory()';
  }

  /**
   * Extracts Toolbox XML from user-uploaded file. XML should be between marked
   * comments in uploaded file.
   *
   * @param {string} fileContents Contents of JS file uploaded by user.
   * @return {!Object.<string, string>} Toolbox name to XML string pair.
   */
  extractToolboxXml(fileContents) {
    let extractedToolbox = {};
    extractedToolbox.name = '';
    extractedToolbox.xmlString = '';

    /*
     * TODO: Move in from wfactory_generator.js:loadXml(jsFileContents, importMode)
     *                    wfactory_generator.js:evaluateMarkedCode(code)
     *
     * References:
     * - evaluateMarkedCode()
     */
     throw 'Unimplemented: extractToolboxXml()';
  }

  /**
   * Generates JavaScript string representation of toolbox for user to download.
   * Does not deal with popups or file system access; just generates content.
   *
   * @returns {string} String representation of JS file to be exported.
   */
  generateJsFileContents() {
    /*
     * TODO: Move in from wfactory_generator.js:generateJsFromXml(xml, name, mode)
     *       (Also moved into: workspace_contents.js)
     *
     * References:
     * - [NEW] this.generateXml()
     * - [NEW] this.name
     */
    throw 'Unimplemented: generateJsFileContents()';
  }

  /**
   * Exports the toolbox.
   */
  exportToolbox() {
    throw 'Unimplemented: exportToolbox()';
  }

  /**
   * Enables/disables ListElement buttons (add, remove, move up/down) depending
   * on what ListElement is currently selected.
   * Called when adding or removing elements, or when changing/swapping to new
   * element.
   *
   * @param {number} selectedIndex The index of the currently selected category,
   *     -1 if no categories created.
   * @param {?ListElement} selected The selected ListElement.
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
  createCategoryIdName(name) {
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
   *     loaded.
   */
  getShadowBlocksInWorkspace() {
    /*
     * TODO: Move in from wfactory_model.js
     */

    // TODO: Investigate if this function is necessary at all. Possibly delete.
    //       (This method was never called in DevTools)
    throw 'Unimplemented: getShadowBlocksInWorkspace()';
  }
}
