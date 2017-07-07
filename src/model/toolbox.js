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
 * @class A Toolbox object is a grouping of blocks from which end-users can
 *     drag and drop blocks into the workspace. A toolbox can also be considered
 *     as a collection of categories, which contain one or more blocks.
 *     If a toolbox has one category, the category is displayed as an unnamed flyout.
 *     Otherwise, Toolboxes can have multiple categories with different colors per
 *     category. Categories can also be separated by a Separator object.
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
     * May contain separators (and not just categories).
     * Moved from wfactory_model.js:toolboxList (will remove this line after rf)
     * @type {!Array.<!ListElement>}
     */
    this.categoryList = [];

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
    // TODO: Implement function.
    throw "Unimplemented: setName()";
  }

  /**
   * Return ordered list of ListElement objects in this instance of Toolbox.
   * @return {!Array.<!ListElement>} ordered list of ListElement objects
   */
  getCategoryList() {
    /*
     * TODO: Move in from wfactory_model.js:getToolboxList()
     */
    throw 'Unimplemented: getCategoryList()';
  }

  /**
   * Clears category list in this instance of Toolbox. Deletes all ListElements.
   */
  clearCategoryList() {
    /*
     * TODO: Move in from wfactory_model.js:clearToolboxList()
     *
     * References:
     * - this.toolboxList
     * - this.hasVariablesCategory
     * - this.hasProceduresCategory
     * - this.shadowBlocks
     * - this.selected
     */
    throw 'Unimplemented: clearCategoryList()';
  }

  /**
   * Given a ListElement, adds it to category list.
   * @param {!ListElement} element Element to be added to the list.
   */
  addElement(element) {
    /*
     * TODO: Move in from wfactory_model.js:addElementToList(element)
     *
     * References:
     * - this.hasVariableCategory
     * - this.hasProcedureCategory
     * - this.toolboxList
     * - this.flyout
     */
    throw 'Unimplemented: addElement()';
  }

  /**
   * Given an index, deletes a list element and all associated data.
   * @param {number} index The index of the list element to delete.
   */
  deleteElement(index) {
    /*
     * TODO: Move in from wfactory_model.js:deleteElementFromList(index)
     *
     * References:
     * - this.toolboxList
     * - this.hasVariableCategory
     * - this.hasProcedureCategory
     */
    throw 'Unimplemented: deleteElement()';
  }

  /**
   * Moves ListElement of category to a certain position in toolboxList by removing it
   * and then inserting it at the correct index. Checks that indices are in
   * bounds (throws error if not), but assumes that oldIndex is the correct index
   * for the ListElement.
   *
   * @param {!ListElement} element The ListElement to move.
   * @param {number} newIndex The index to insert the element at.
   * @param {number} oldIndex The index the element is currently at.
   */
  moveElement(element, newIndex, oldIndex) {
    /*
     * TODO: Move in from wfactory_model.js:moveElementToIndex(element, newIndex, oldIndex)
     *
     * References:
     * - this.toolboxList
     * - deleteElementFromList(oldIndex)
     */
    throw 'Unimplemented: moveElement()';
  }

  /**
   * Given the ID of a list element, returns that ListElement object.
   * @param {string} id The ID of element to search for.
   * @return {ListElement} Corresponding ListElement object in toolboxList, or
   *     null if that element does not exist.
   */
  getElementById(id) {
    /*
     * TODO: Move in from wfactory_model.js
     *
     * References:
     * - this.toolboxList
     */
    throw 'Unimplemented: getElementById()';
  }

  /**
   * Given the index of a list element in toolboxList, returns that ListElement
   * object.
   * @param {number} index The index of the element to return.
   * @return {ListElement} The corresponding ListElement object in toolboxList.
   */
  getElementByIndex(index) {
    /*
     * TODO: Move in from wfactory_model.js
     *
     * References:
     * - this.toolboxList
     */
    throw 'Unimplemented: getElementByIndex()';
  }

  /**
   * Returns currently selected category ListElement.
   * @return {ListElement} Currently selected ListElement
   */
  getSelected() {
    // Moved from wfactory_model.js
    return this.selected;
  }

  /**
   * Given an id of a ListElement, sets that ListElement as the currently selected
   * element.
   * @param {string} id ID of list element that should now be selected.
   */
  setSelected(id) {
    /*
     * TODO: Move in from wfactory_model.js:setSelectedById(id)
     *
     * References: N/A
     */
    throw 'Unimplemented: setSelected()';
  }

  /**
   * Returns ID of the currently selected element. Returns null if there are
   * no categories (if selected == null).
   * @return {string} The ID of the element currently selected.
   */
  getSelectedId() {
    /*
     * TODO: Move in from wfactory_model.js
     */
    throw 'Unimplemented: getSelectedId()';
  }

  /**
   * Returns name of currently selected category. Returns null if there
   * are no category (if selected == null) or the selected element is not
   * a category (in which case its name is null).
   *
   * @return {string} The name of the category currently selected.
   */
  getSelectedName() {
    /*
     * TODO: Move in from wfactory_model.js:getSelectedName()
     */
    throw 'Unimplemented: getSelectedName()';
  }

  /**
   * Returns the XML to load the selected element.
   * @return {!Element} The XML of the selected element, or null if there is
   *     no selected element.
   */
  getSelectedXml() {
    /*
     * TODO: Move in from wfactory_model.js
     */
    throw 'Unimplemented: getSelectedXml()';
  }

  /**
   * Given an ID of a list element, returns the index of that list element in
   * toolboxList. Returns -1 if ID is not present.
   * @param {string} id The ID of list element to search for.
   * @return {number} The index of the list element in toolboxList, or -1 if it
   *     doesn't exist.
   */
  getElementIndex(id) {
    /*
     * TODO: Move in from wfactory_model.js:getIndexByElementId(id)
     *
     * References:
     * - this.toolboxList
     */
    throw 'Unimplemented: getElementIndex()';
  }

  /**
   * Gets the ID of a category given its name.
   * @param {string} name Name of category.
   * @return {number} ID of category
   */
  getCategoryId(name) {
    /*
     * TODO: Move in from wfactory_model.js:getCategoryIdByName(name)
     *
     * References:
     * - this.toolboxList
     */
    throw 'Unimplemented: getCategoryId()';
  }

  /**
   * Adds a custom tag to a category, updating state variables accordingly.
   * Only accepts 'VARIABLE' and 'PROCEDURE' tags.
   * @param {!ListElement} category The category to add the tag to.
   * @param {string} tag The custom tag to add to the category.
   */
  addCustomTag(category, tag) {
    /*
     * TODO: Move in from wfactory_model.js
     *
     * References:
     * - this.hasVariablesCategory
     * - this.hasProcedureCategory
     */
    throw 'Unimplemented: addCustomTag()';
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
    throw 'Unimplemented: createDefaultSelectedIfEmpty()';

    // TODO: Rename function to be more clear/readable.
  }

  /**
   * Class for a ListElement
   * Adds a shadow block to the list of shadow blocks.
   * @param {string} blockId The unique ID of block to be added.
   */
  addShadowBlock(blockId) {
    // Moved in from wfactory_model.js
    if (this.shadowBlocks.indexOf(blockId) != -1) {
      this.shadowBlocks.push(blockId);
    }
  }

  /**
   * Removes a shadow block ID from the list of shadow block IDs if that ID is
   * in the list.
   * @param {string} blockId The unique ID of block to be removed.
   */
  removeShadowBlock(blockId) {
    /*
     * TODO: Move in from wfactory_model.js
     *
     * References:
     * - this.shadowBlocks
     */
    throw 'Unimplemented: removeShadowBlock()';
  }

  /**
   * Determines if a block is a shadow block given a unique block ID.
   * @param {string} blockId The unique ID of the block to examine.
   * @return {boolean} True if the block is a user-generated shadow block, false
   *     otherwise.
   */
  isShadowBlock(blockId) {
    /*
     * TODO: Move in from wfactory_model.js
     *
     * References:
     * - this.shadowBlocks
     */
    throw 'Unimplemented: isShadowBlock()';
  }

  /**
   * Generates XML DOM element of Toolbox.
   *
   * @returns {!Element} XML DOM element of this Toolbox.
   */
  getExportData() {
    /*
     * TODO: Move in from wfactory_generator.js:generateToolboxXml()
     *
     * References:
     * - hasElements()
     * - loadToHiddenWorkspace_()
     * - appendHiddenWorkspaceToDom_()
     * - getSelected()
     * - getSelectedXml()
     * - getToolboxList()
     * - ListElement
     */
    throw "unimplemented: getExportData()";
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
    throw 'Unimplemented: categoryIsInToolbox()';
  }

  /**
   * Determines if a category with the 'VARIABLE' tag exists.
   * @return {boolean} True if there exists a category with the Variables tag,
   * false otherwise.
   */
  hasVariables() {
    // Moved in from wfactory_model.js
    return this.hasVariableCategory;
  }

  /**
   * Determines if a category with the 'PROCEDURE' tag exists.
   * @return {boolean} True if there exists a category with the Procedures tag,
   * false otherwise.
   */
  hasProcedures() {
    // Moved in from wfactory_model.js
    return this.hasProcedureCategory;
  }

  /**
   * Gets the JSON object necessary to represent the toolbox in the navigation
   *     tree.
   * @return {!Object} The tree-specific JSON representation of the toolbox.
   */
  getTreeJson() {
    throw "unimplemented: getTreeJson";
  }
}
