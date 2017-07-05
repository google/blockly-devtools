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
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo)
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
  }

  /**
   * Currently prompts the user for a name, checking that it's valid (not used
   * before), and then creates a tab and switches to it.
   */
  addCategory() {
    /*
     * TODO: Move in from wfactory_controller.js
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
  }

  /**
   * Checks if the user wants to delete the current category. Removes the category
   * and switches to another. When the last category is removed, it switches to
   * a single flyout mode.
   */
  removeElement() {
    /*
     * TODO: Move in from wfactory_controller.js
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
  }

  /**
   * Changes the name of the selected category. Continues prompting the user until
   * they input a category name that is not currently in use. Exits if canceled.
   */
  changeCategoryName() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - getSelected()
     * - promptForNewCategoryName()
     * - changeName(newName)
     * - updateCategoryName(newName, this.model.getSelectedId())
     * - updatePreview()
     */
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
     *
     * References:
     * - getSelected()
     * - getIndexByElementId()
     * - getElementByIndex(swapIndex)
     * - moveElementToIndex()
     * - updateState()
     * - updatePreview()
     */
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
  }

  /**
   * Clears the toolbox workspace and loads XML to it, marking shadow blocks
   * as necessary.
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
  }

  /*
   * Updates the block library category in the toolbox workspace toolbox.
   * @param {!Element} categoryXml XML for the block library category.
   * @param {!Array.<string>} libBlockTypes Array of block types from the block
   *     library.
   */
  setBlockLibCategory(categoryXml, libBlockTypes) {
    /*
     * TODO: Move in from wfactory_controller.js
     *       (Also moved into: workspace_controller.js)
     *
     * References:
     * - updateLibBlockTypes()
     * - clearAndLoadXml_()
     */
  }

  /**
   * Return the block types used in the custom toolbox and pre-loaded workspace.
   * @return {!Array.<string>} Block types used in the custom toolbox and
   *     pre-loaded workspace.
   */
  getAllUsedBlockTypes() {
    /*
     * TODO: Move in from wfactory_controller.js
     *       (Also moved into: workspace_controller.js)
     *
     * References:
     * - model.getAllUsedBlockTypes()
     */

    // TODO: Separate getAllUsedBlockTypes() so that it is restricted to just
    //       used block types in a toolbox editor or just used block types in
    //       workspace editor.
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
  }
}
