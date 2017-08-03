/**
 * @license
 * Blockly Demos: Block Factory
 *
 * Copyright 2016 Google Inc.
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
 * @fileoverview Stores and updates information about state and categories
 * in workspace factory. Each list element is either a separator or a category,
 * and each category stores its name, XML to load that category, color,
 * custom tags, and a unique ID making it possible to change category names and
 * move categories easily. Keeps track of the currently selected list
 * element. Also keeps track of all the user-created shadow blocks and
 * manipulates them as necessary.
 *
 * @author Emma Dauterman (evd2014)
 */

goog.provide('WorkspaceFactoryModel');
goog.require('ListElement');


/**
 * Class for a WorkspaceFactoryModel
 * @constructor
 */
WorkspaceFactoryModel = function() {
  // Ordered list of ListElement objects. Empty if there is a single flyout.
  this.toolboxList = [];
  // ListElement for blocks in a single flyout. Null if a toolbox exists.
  this.flyout = new ListElement(ListElement.TYPE_FLYOUT);
  // Array of block IDs for all user created shadow blocks.
  this.shadowBlocks = [];
  // Reference to currently selected ListElement. Stored in this.toolboxList if
  // there are categories, or in this.flyout if blocks are displayed in a single
  // flyout.
  this.selected = this.flyout;
  // Boolean for if a Variable category has been added.
  this.hasVariableCategory = false;
  // Boolean for if a Procedure category has been added.
  this.hasProcedureCategory = false;
  // XML to be pre-loaded to workspace. Empty on default;
  this.preloadXml = Blockly.Xml.textToDom('<xml></xml>');
  // Options object to be configured for Blockly inject call.
  this.options = new Object(null);
  // Block Library block types.
  this.libBlockTypes = [];
  // Imported block types.
  this.importedBlockTypes = [];
  //
};

// SOME FUNCTIONS FROM THIS FILE HAVE BEEN REMOVED THROUGH THE REFACTORING PROCESS.

/**
 * Given a name, determines if it is the name of a category already present.
 * Used when getting a valid category name from the user.
 * @param {string} name String name to be compared against.
 * @return {boolean} True if string is a used category name, false otherwise.
 */
WorkspaceFactoryModel.prototype.hasCategoryByName = function(name) {
  for (var i = 0; i < this.toolboxList.length; i++) {
    if (this.toolboxList[i].type == ListElement.TYPE_CATEGORY &&
        this.toolboxList[i].name == name) {
      return true;
    }
  }
  return false;
};

/**
 * Determines if a category with the 'VARIABLE' tag exists.
 * @return {boolean} True if there exists a category with the Variables tag,
 * false otherwise.
 */
WorkspaceFactoryModel.prototype.hasVariables = function() {
  return this.hasVariableCategory;
};

/**
 * Determines if a category with the 'PROCEDURE' tag exists.
 * @return {boolean} True if there exists a category with the Procedures tag,
 * false otherwise.
 */
WorkspaceFactoryModel.prototype.hasProcedures = function() {
  return this.hasProcedureCategory;
};

/**
 * Determines if the user has any elements in the toolbox. Uses the length of
 * toolboxList.
 * @return {boolean} True if elements exist, false otherwise.
 */
WorkspaceFactoryModel.prototype.hasElements = function() {
  return this.toolboxList.length > 0;
};

/**
 * Given an index, deletes a list element and all associated data.
 * @param {number} index The index of the list element to delete.
 */
WorkspaceFactoryModel.prototype.deleteElementFromList = function(index) {
  // Check if index is out of bounds.
  if (index < 0 || index >= this.toolboxList.length) {
    return; // No entry to delete.
  }
  // Check if need to update flags.
  this.hasVariableCategory = this.toolboxList[index].custom == 'VARIABLE' ?
      false : this.hasVariableCategory;
  this.hasProcedureCategory = this.toolboxList[index].custom == 'PROCEDURE' ?
      false : this.hasProcedureCategory;
  // Remove element.
  this.toolboxList.splice(index, 1);
};

/**
 * Sets selected to be an empty category not in toolbox list if toolbox list
 * is empty. Should be called when removing the last element from toolbox list.
 * If the toolbox list is empty, selected stores the XML for the single flyout
 * of blocks displayed.
 */
WorkspaceFactoryModel.prototype.createDefaultSelectedIfEmpty = function() {
  if (this.toolboxList.length == 0) {
    this.flyout = new ListElement(ListElement.TYPE_FLYOUT);
    this.selected = this.flyout;
  }
};

/**
 * Moves a list element to a certain position in toolboxList by removing it
 * and then inserting it at the correct index. Checks that indices are in
 * bounds (throws error if not), but assumes that oldIndex is the correct index
 * for list element.
 * @param {!ListElement} element The element to move in toolboxList.
 * @param {number} newIndex The index to insert the element at.
 * @param {number} oldIndex The index the element is currently at.
 */
WorkspaceFactoryModel.prototype.moveElementToIndex = function(element, newIndex,
    oldIndex) {
  // Check that indexes are in bounds.
  if (newIndex < 0 || newIndex >= this.toolboxList.length || oldIndex < 0 ||
      oldIndex >= this.toolboxList.length) {
    throw new Error('Index out of bounds when moving element in the model.');
  }
  this.deleteElementFromList(oldIndex);
  this.toolboxList.splice(newIndex, 0, element);
};

/**
 * Clears the toolbox list, deleting all ListElements.
 */
WorkspaceFactoryModel.prototype.clearToolboxList = function() {
  this.toolboxList = [];
  this.hasVariableCategory = false;
  this.hasProcedureCategory = false;
  this.shadowBlocks = [];
  this.selected.xml = Blockly.Xml.textToDom('<xml></xml>');
};

/**
 * Class for a ListElement
 * Adds a shadow block to the list of shadow blocks.
 * @param {string} blockId The unique ID of block to be added.
 */
WorkspaceFactoryModel.prototype.addShadowBlock = function(blockId) {
  this.shadowBlocks.push(blockId);
};

/**
 * Removes a shadow block ID from the list of shadow block IDs if that ID is
 * in the list.
 * @param {string} blockId The unique ID of block to be removed.
 */
WorkspaceFactoryModel.prototype.removeShadowBlock = function(blockId) {
  for (var i = 0; i < this.shadowBlocks.length; i++) {
    if (this.shadowBlocks[i] == blockId) {
      this.shadowBlocks.splice(i, 1);
      return;
    }
  }
};

/**
 * Determines if a block is a shadow block given a unique block ID.
 * @param {string} blockId The unique ID of the block to examine.
 * @return {boolean} True if the block is a user-generated shadow block, false
 *    otherwise.
 */
WorkspaceFactoryModel.prototype.isShadowBlock = function(blockId) {
  for (var i = 0; i < this.shadowBlocks.length; i++) {
    if (this.shadowBlocks[i] == blockId) {
      return true;
    }
  }
  return false;
};

/**
 * Adds a custom tag to a category, updating state variables accordingly.
 * Only accepts 'VARIABLE' and 'PROCEDURE' tags.
 * @param {!ListElement} category The category to add the tag to.
 * @param {string} tag The custom tag to add to the category.
 */
WorkspaceFactoryModel.prototype.addCustomTag = function(category, tag) {
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
};

/**
 * Have basic pre-loaded workspace working
 * Saves XML as XML to be pre-loaded into the workspace.
 * @param {!Element} xml The XML to be saved.
 */
WorkspaceFactoryModel.prototype.savePreloadXml = function(xml) {
  this.preloadXml = xml;
};

/**
 * Gets the XML to be pre-loaded into the workspace.
 * @return {!Element} The XML for the workspace.
 */
WorkspaceFactoryModel.prototype.getPreloadXml = function() {
  return this.preloadXml;
};

/**
 * Sets a new options object for injecting a Blockly workspace.
 * @param {Object} options Options object for injecting a Blockly workspace.
 */
WorkspaceFactoryModel.prototype.setOptions = function(options) {
  this.options = options;
};

/*
 * Returns an array of all the block types currently being used in the toolbox
 * and the pre-loaded blocks. No duplicates.
 * TODO(evd2014): Move pushBlockTypesToList to FactoryUtils.
 * @return {!Array.<string>} Array of block types currently being used.
 */
WorkspaceFactoryModel.prototype.getAllUsedBlockTypes = function() {
  var blockTypeList = [];

  // Given XML for the workspace, adds all block types included in the XML
  // to the list, not including duplicates.
  var pushBlockTypesToList = function(xml, list) {
    // Get all block XML nodes.
    var blocks = xml.getElementsByTagName('block');

    // Add block types if not already in list.
    for (var i = 0; i < blocks.length; i++) {
      var type = blocks[i].getAttribute('type');
      if (list.indexOf(type) == -1) {
        list.push(type);
      }
    }
  };

  if (this.flyout) {
    // If has a single flyout, add block types for the single flyout.
    pushBlockTypesToList(this.getSelectedXml(), blockTypeList);
  } else {
    // If has categories, add block types for each category.

    for (var i = 0, category; category = this.toolboxList[i]; i++) {
      if (category.type == ListElement.TYPE_CATEGORY) {
        pushBlockTypesToList(category.xml, blockTypeList);
      }
    }
  }

  // Add the block types from any pre-loaded blocks.
  pushBlockTypesToList(this.getPreloadXml(), blockTypeList);

  return blockTypeList;
};

/**
 * Adds new imported block types to the list of current imported block types.
 * @param {!Array.<string>} blockTypes Array of block types imported.
 */
WorkspaceFactoryModel.prototype.addImportedBlockTypes = function(blockTypes) {
  this.importedBlockTypes = this.importedBlockTypes.concat(blockTypes);
};

/**
 * Updates block types in block library.
 * @param {!Array.<string>} blockTypes Array of block types in block library.
 */
WorkspaceFactoryModel.prototype.updateLibBlockTypes = function(blockTypes) {
  this.libBlockTypes = blockTypes;
};

/**
 * Checks if any of the block types are already defined.
 * @param {!Array.<string>} blockTypes Array of block types.
 * @return {boolean} True if a block type in the array is already defined,
 *    false if none of the blocks are already defined.
 */
WorkspaceFactoryModel.prototype.hasDefinedBlockTypes = function(blockTypes) {
  for (var i = 0, blockType; blockType = blockTypes[i]; i++) {
    if (this.isDefinedBlockType(blockType)) {
      return true;
    }
  }
  return false;
};
