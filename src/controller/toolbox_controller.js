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
   * Attached to "-" button. Checks if the user wants to delete
   * the current category.  Removes the category and switches to another.
   * When the last category is removed, it switches to a single flyout mode.
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
     * Move in from wfactory_controller.js
     * ALSO used in WorkspaceController
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
   * to swap with. Positive if the element to be swapped with is below, negative
   * if the element to be swapped with is above.
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
}
