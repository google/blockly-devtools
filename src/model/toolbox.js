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
 * @class Toolbox represents a toolbox object. A Toolbox object is a collection
 *     of categories. If a toolbox has one category, the category is displayed as
 *     a flyout. Otherwise, each category should have a name.
 *     Toolboxes can have multiple categories with different colors per category.
 *     Categories can also be separated by a Separator object. Contains references to controller
 *     and view.
 *
 * @author Celine Choo (celinechoo)
 *
 */
class Toolbox extends Resource {
  /**
   * Toolbox Class
   * @param {string} toolboxName The name for the new toolbox.
   * @constructor
   */
  constructor(toolboxName) {
    super(toolboxName);

    /**
     * A map of each block type in the toolbox to its corresponding XML.
     * @type {!Object.<string, string>}
     */
    this.xmlDefinitions = {};

    /**
     * Array of Block IDs for all user-created shadow blocks.
     * @type {!Array.<string>}
     */
    this.shadowBlocks = [];

    /**
     * Boolean for if a Variable category has been added.
     * @type {boolean}
     */
    this.hasVariableCategory = false;

    /**
     * Boolean for if a Procedure category has been added.
     * @type {boolean}
     */
    this.hasProcedureCategory = false;

    /**
     * List of categories in current toolbox. Empty if there is a single flyout.
     * Moved from wfactory_model.js:toolboxList
     * @type {!Array.<!ListElement>}
     */
    this.categories = [];

    /**
     * Stores ListElement IFF there is only one category. Displayed as a flyout.
     * Null if there are multiple categories.
     * @type {!ListElement}
     */
    this.flyout = new ListElement(ListElement.TYPE_FLYOUT);

    /**
     * Stores reference to currently selected category. Points to flyout if
     * there is only one category (as a flyout).
     * @type {!ListElement}
     */
    this.selected = this.flyout;
  }

  /**
   * Renames toolbox.
   * @param {string} newName New name of toolbox.
   */
  setName(newName) {
    console.log('setName() called!');
    // TODO: Implement function.
  }

  /**
   * Adds block to toolbox.
   * @returns {boolean} True if added succesfully.
   */
  addBlock(categoryName, blockName, xmlDefinition) {
    console.log('Add block called!');
    // TODO: Implement function.
  }

  /**
   * Removes block from toolbox.
   */
  removeBlock(blockName) {
    console.log('Remove block called!');
    if (this.blocks[blockName]) {
      delete this.blocks[blockName];
    }
  }

  /**
   * Given a ListElement, adds it to category list.
   * @param {!ListElement} category Category to be added to the list.
   */
  addCategory(category) {
    /*
     * TODO: Move in from wfactory_model.js:addElementToList(element)
     *
     * References:
     * - this.hasVariableCategory
     * - this.hasProcedureCategory
     * - this.toolboxList
     * - this.flyout
     */
  }

  /**
   * Given an index, deletes a list element and all associated data.
   * @param {number} index The index of the list element to delete.
   */
  removeCategory(categoryIndex) {
    /*
     * TODO: Move in from wfactory_model.js:deleteElementFromList(index)
     *
     * References:
     * - this.toolboxList
     * - this.hasVariableCategory
     * - this.hasProcedureCategory
     */
  }

  /**
   * Creates a single empty category if there are no categories left in toolbox.
   * Called when user manually removes all categories in a toolbox. Sets this.selected
   * field to point to the empty category.
   */
  createDefaultSelectedIfEmpty() {
    /*
     * TODO: Move in from wfactory_generator.js
     *
     * References:
     * - this.toolboxList
     * - this.flyout
     * - ListElement
     * - this.selected
     */

    // TODO: Rename function to be more clear/readable.
  }

  /**
   * Rearranges category from one index to another.
   * Moves ListElement of category to a certain position in toolboxList by removing it
   * and then inserting it at the correct index. Checks that indices are in
   * bounds (throws error if not), but assumes that oldIndex is the correct index
   * for list element.
   *
   * @param {!ListElement} category The category ListElement to move.
   * @param {number} newIndex The index to insert the element at.
   * @param {number} oldIndex The index the element is currently at.
   */
  moveCategoryToIndex(category, newIndex, oldIndex) {
    /*
     * TODO: Move in from wfactory_model.js:moveElementToIndex(element, newIndex, oldIndex)
     *
     * References:
     * - this.toolboxList
     * - deleteElementFromList(oldIndex)
     */
  }

  /**
   * Returns currently selected category ListElement.
   * @return {ListElement} Currently selected ListElement
   */
  getSelectedCategory() {
    // Moved from wfactory_model.js:getSelected()
    return this.selected;
  }

  /**
   * Returns ID of the currently selected element. Returns null if there are
   * no categories (if selected == null).
   * @return {string} The ID of the element currently selected.
   */
  getSelectedCategoryId() {
    /*
     * TODO: Move in from wfactory_model.js:getSelectedId()
     */
  }

  /**
   * Returns name of currently selected category. Returns null if there
   * are no categories (if selected == null) or the selected element is not
   * a category (in which case its name is null).
   *
   * @return {string} The name of the category currently selected.
   */
  getSelectedCategoryName() {
    /*
     * TODO: Move in from wfactory_model.js:getSelectedName()
     */
  }

  /**
   * Generates JavaScript string representation of toolbox for user to download.
   * Does not deal with popups or file system access; just generates content.
   *
   * @returns {string} String representation of JS file to be exported.
   */
  exportJs() {
    // TODO: Implement function.
    console.log('exportJs() called.');
  }

  /**
   * Generates XML string representation of toolbox for user to download. Does
   * not deal with popups or file system access; just generates content.
   *
   * @returns {string} String representation of XML file to be exported.
   */
  exportXml() {
    // TODO: Implement function.
    console.log('exportXml() called.');
  }

  /**
   * Returns true if this toolbox does not contain any blocks in any category.
   *
   * @returns {boolean} Whether the toolbox is empty.
   */
  isEmpty() {
    // Moved from wfactory_generator.js:hasElements()
    let count = 0;
    for (let key in this.xmlDefinitions) {
      count += 1;
      if (count > 0) {
        return false;
      }
    }
    return count === 0;
  }

  /**
   * Renames the project.
   * @param {string} newName New name of the project.
   */
  setName(newName) {
    /*
     * TODO: implement
     *
     * References: N/A
     */
    throw "unimplemented: setName";
  }

  /**
   * Gets the data necessary to export the toolbox.
   * @return {!Object} The data needed to export the toolbox.
   */
  getExportData() {
    //TODO: implement
    throw "unimplemented: getExportData";
  }

  /**
   * Determines whether user-given category name already exists. Used when getting
   * a valid category name from the user.
   *
   * @param {string} name String name to be compared against.
   * @return {boolean} True if string is a used category name, false otherwise.
   */
  categoryIsInToolbox(name) {
    /*
     * TODO: Move in from wfactory_model.js:hasCategoryByName
     *
     * References:
     * - ListElement
     */
  }

  /**
   * Determines if a category with the 'VARIABLE' tag exists.
   * @return {boolean} True if there exists a category with the Variables tag,
   * false otherwise.
   */
  hasVariables() {
    return this.hasVariableCategory;
  }

  /**
   * Determines if a category with the 'PROCEDURE' tag exists.
   * @return {boolean} True if there exists a category with the Procedures tag,
   * false otherwise.
   */
  hasProcedures() {
    return this.hasProcedureCategory;
  }
}
