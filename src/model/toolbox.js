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

goog.provide('Toolbox');

goog.require('ListElement');
goog.require('Resource');

goog.require('goog.dom');

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
    super(toolboxName, PREFIXES.TOOLBOX);

    /**
     * List of categories in current toolbox. Empty if there is a single flyout.
     * May contain separators (and not just categories).
     * @type {!Array.<!ListElement>}
     */
    this.categoryList = [];

    /**
     * A map of each block type in the toolbox to its corresponding XML.
     * @type {!Object.<string, string>}
     */
    this.xmlDefinitions = {};

    /**
     * Stores ListElement IFF there is only one category. Displayed as a flyout.
     * Null if there are multiple categories.
     * @type {?ListElement}
     */
    this.flyout = new ListElement(ListElement.TYPE_FLYOUT);

    /**
     * Stores reference to currently selected category. Points to flyout if
     * there is only one category (as a flyout).
     * @type {!ListElement}
     */
    this.selected = this.flyout;

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
     * XML of the toolbox. Used to display onto preview workspace.
     * @type {!Element}
     */
    this.xml = Blockly.Xml.textToDom('<xml></xml>');
  }

  /**
   * Sets XML of toolbox to given element.
   * @param {!Element} xml XML of toolbox.
   */
  setXml(xml) {
    if (!(xml instanceof Element)) {
      xml = Blockly.Xml.textToDom(xml);
    }
    this.xml = xml;
  }

  /**
   * Return ordered list of ListElement objects in this instance of Toolbox.
   * @return {!Array.<!ListElement>} ordered list of ListElement objects
   */
  getCategoryList() {
    // REFACTORED: Moved in from wfactory_model.js:getToolboxList()
    return this.categoryList;
  }

  /**
   * Given a ListElement, adds it to category list. Selects newly added category.
   * @param {!ListElement} element Element to be added to the list.
   */
  addElement(element) {
    // REFACTOR: Moved in from wfactory_model.js:addElementToList(element)
    // Update state if the copied category has a custom tag.
    this.hasVariableCategory = element.custom == 'VARIABLE' ? true :
        this.hasVariableCategory;
    this.hasProcedureCategory = element.custom == 'PROCEDURE' ? true :
        this.hasProcedureCategory;
    // Add element to toolboxList.
    this.categoryList.push(element);
    // Empty single flyout.
    this.flyout = null;
    this.selected = element;
  }

  /**
   * Given an index, deletes a list element and all associated data.
   * @param {number} index The index of the list element to delete.
   */
  deleteElement(index) {
    // From wfactory_model.js:deleteElementFromList(index)
    // Check if index is out of bounds.
    if (index < 0 || index >= this.categoryList.length) {
      return; // No entry to delete.
    }
    // Check if need to update flags.
    this.hasVariableCategory = this.categoryList[index].custom == 'VARIABLE' ?
        false : this.hasVariableCategory;
    this.hasProcedureCategory = this.categoryList[index].custom == 'PROCEDURE' ?
        false : this.hasProcedureCategory;
    // Remove element.
    this.categoryList.splice(index, 1);
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
    // From wfactory_model.js:moveElementToIndex(element, newIndex, oldIndex)
    // Check that indexes are in bounds.
    if (newIndex < 0 || newIndex >= this.categoryList.length || oldIndex < 0 ||
        oldIndex >= this.categoryList.length) {
      throw new Error('Index out of bounds when moving element in the model.');
    }
    this.deleteElement(oldIndex);
    this.categoryList.splice(newIndex, 0, element);
  }

  /**
   * Given the ID of a list element, returns that ListElement object.
   * @param {string} id The ID of element to search for.
   * @return {?ListElement} Corresponding ListElement object in toolboxList, or
   *     null if that element does not exist.
   */
  getElementById(id) {
    // From wfactory_model.js:getElementById(id)
    for (let element of this.categoryList) {
      if (element.id == id) {
        return element;
      }
    }
    return null; // ID not present in categoryList
  }

  /**
   * Given the index of a list element in toolboxList, returns that ListElement
   * object.
   * @param {number} index The index of the element to return.
   * @return {?ListElement} The corresponding ListElement object in toolboxList,
   *     or null if no element existed at that index.
   */
  getElementByIndex(index) {
    // From wfactory_model.js
    if (index < 0 || index >= this.categoryList.length) {
      return null;
    }
    return this.categoryList[index];
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
    // REFACTOR: Moved in from wfactory_model.js:setSelectedById(id)
    this.selected = this.getElementById(id);
  }

  /**
   * Returns ID of the currently selected element. Returns null if there are
   * no categories (if selected == null).
   * @return {string} The ID of the element currently selected.
   */
  getSelectedId() {
    // From wfactory_model.js
    return this.selected ? this.selected.id : null;
  }

  /**
   * Returns name of currently selected category. Returns null if there
   * are no category (if selected == null) or the selected element is not
   * a category (in which case its name is null).
   *
   * @return {string} The name of the category currently selected.
   */
  getSelectedName() {
    // From wfactory_model.js:getSelectedName()
    return this.selected ? this.selected.name : null;
  }

  /**
   * Returns the XML to load the selected element.
   * @return {!Element} The XML of the selected element, or null if there is
   *     no selected element.
   */
  getSelectedXml() {
    // REFACTOR: Moved in from wfactory_model.js
    return this.selected ? this.selected.xml : null;
  }

  /**
   * Given an ID of a list element, returns the index of that list element in
   * toolboxList. Returns -1 if ID is not present.
   * @param {string} id The ID of list element to search for.
   * @return {number} The index of the list element in toolboxList, or -1 if it
   *     doesn't exist.
   */
  getIndexById(id) {
    // From wfactory_model.js:getIndexByElementId(id)
    for (let i = 0; i < this.categoryList.length; i++) {
      let element = this.categoryList[i];
      if (element.id == id) {
        return i;
      }
    }
    return -1; // ID not present in element list.
  }

  /**
   * Gets the ID of a category given its name.
   * @param {string} name Name of category.
   * @return {number} ID of category
   */
  getCategoryId(name) {
    // From wfactory_model.js:getCategoryIdByName(name)
    for (let element of this.categoryList) {
      if (element.name == name) {
        return element.id;
      }
    }
    return null; // Name not present in categoryList.
  }

  /**
   * Adds a custom tag to a category, updating state variables accordingly.
   * Only accepts 'VARIABLE' and 'PROCEDURE' tags.
   * TODO(#175): Accept any type of custom tag input.
   * @param {!ListElement} category The category to add the tag to.
   * @param {string} tag The custom tag to add to the category.
   */
  addCustomTag(category, tag) {
    // From wfactory_model.js:addCustomTag(category, tag)
    // Only update list elements that are categories.
    if (category.type != ListElement.TYPE_CATEGORY) {
      return;
    }
    // Only update the tag to be 'VARIABLE' or 'PROCEDURE'.
    if (tag == 'VARIABLE') {
      this.hasVariableCategory = true;
      category.custom = 'VARIABLE';
    } else if (tag == 'PROCEDURE') {
      this.hasProcedureCategory = true;
      category.custom = 'PROCEDURE';
    }
  }

  /**
   * Class for a ListElement
   * Adds a shadow block to the list of shadow blocks.
   * @param {string} blockId The unique ID of block to be added.
   */
  addShadowBlock(blockId) {
    // Moved in from wfactory_model.js
    if (this.shadowBlocks.indexOf(blockId) == -1) {
      this.shadowBlocks.push(blockId);
    }
  }

  /**
   * Removes a shadow block ID from the list of shadow block IDs if that ID is
   * in the list.
   * @param {string} blockId The unique ID of block to be removed.
   */
  removeShadowBlock(blockId) {
    // From wfactory_model.js:removeShadowBlock(blockId)
    for (let i = 0; i < this.shadowBlocks.length; i++) {
      if (this.shadowBlocks[i] == blockId) {
        this.shadowBlocks.splice(i, 1);
        return;
      }
    }
  }

  /**
   * Determines if a block is a shadow block given a unique block ID.
   * @param {string} blockId The unique ID of the block to examine.
   * @return {boolean} True if the block is a user-generated shadow block, false
   *     otherwise.
   */
  isShadowBlock(blockId) {
    // From wfactory_model.js
    for (let id of this.shadowBlocks) {
      if (id == blockId) {
        return true;
      }
    }
    return false;
  }

  /**
   * Generates XML DOM element of Toolbox.
   *
   * @returns {!Element} XML DOM element of this Toolbox.
   */
  getExportData() {
    // REFACTORED: Moved in from wfactory_generator.js:generateToolboxXml()
    this.xml.setAttribute('id', this.name);
    return this.xml;
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
   * Determines whether user-given category name already exists. Used when getting
   * a valid category name from the user.
   *
   * @param {string} name String name to be compared against.
   * @return {boolean} True if string is a used category name, false otherwise.
   */
  hasCategory(name) {
    // From wfactory_model.js:hasCategoryByName(name)
    for (let element of this.categoryList) {
      if (element.type == ListElement.TYPE_CATEGORY && element.name == name) {
        return true;
      }
    }
    return false;
  }

  /**
   * Determines if a category with the 'VARIABLE' tag exists.
   * @return {boolean} True if there exists a category with the Variables tag,
   *     false otherwise.
   */
  hasVariables() {
    // Moved in from wfactory_model.js
    return this.hasVariableCategory;
  }

  /**
   * Determines if a category with the 'PROCEDURE' tag exists.
   * @return {boolean} True if there exists a category with the Procedures tag,
   *     false otherwise.
   */
  hasProcedures() {
    // Moved in from wfactory_model.js
    return this.hasProcedureCategory;
  }

  /**
   * Clears the toolbox and creates single empty flyout category.
   */
  clear() {
    // From wfactory_model.js:createDefaultSelectedIfEmpty()
    this.categoryList = [];
    this.flyout = new ListElement(ListElement.TYPE_FLYOUT);
    this.selected = this.flyout;
    this.xml = Blockly.Xml.textToDom('<xml></xml>');
  }
}
