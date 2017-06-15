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
 * @fileoverview Contains the code for Block Library Controller, which
 * depends on Block Library Storage and Block Library UI. Provides the
 * interfaces for the user to
 *  - save their blocks to the browser
 *  - re-open and edit saved blocks
 *  - delete blocks
 *  - clear their block library
 * Depends on BlockFactory functions defined in factory.js.
 *
 * @author quachtina96 (Tina Quach)
 */
'use strict';

goog.provide('BlockLibraryController');

goog.require('BlockLibraryStorage');
goog.require('BlockLibraryView');
goog.require('BlockFactory');


/**
 * Block Library Controller Class
 * @param {!JStree} tree Tree navigation, passed in by project_controller
 * @param {string} blockLibraryName Desired name of Block Library, also used
 *    to create the key for where it's stored in local storage.
 * @param {!BlockLibraryStorage} opt_blockLibraryStorage Optional storage
 *    object that allows user to import a block library.
 * @constructor
 */
BlockLibraryController = function(blockLibraryName, opt_blockLibraryStorage) {
  this.name = blockLibraryName;
  // Create a new, empty Block Library Storage object, or load existing one.
  this.storage = opt_blockLibraryStorage || new BlockLibraryStorage(this.name);
  // The BlockLibraryView object handles the proper updating and formatting of
  // the block library dropdown.
  this.view = new BlockLibraryView();

  this.tree = null;
};

BlockLibraryController.prototype.setTree = function(tree){
  // the navigation tree will be edited with changes to
  // block storage
  this.tree = tree;
}
/**
 * Returns the block type of the block the user is building.
 * @return {string} The current block's type.
 * @private
 */
BlockLibraryController.prototype.getCurrentBlockType = function() {
  var rootBlock = FactoryUtils.getRootBlock(BlockFactory.mainWorkspace);
  var blockType = rootBlock.getFieldValue('NAME').trim().toLowerCase();
  // Replace invalid characters.
  return FactoryUtils.cleanBlockType(blockType);
};

/**
 * Removes current block from Block Library and updates the save and delete
 * buttons so that user may save block to library and but not delete.
 * @param {string} blockType Type of block.
 */
BlockLibraryController.prototype.removeFromBlockLibrary = function() {
  var blockType = this.getCurrentBlockType();
  this.storage.removeBlock(blockType);
  this.storage.saveToLocalStorage();
  this.view.updateButtons(blockType, false, false);
  this.tree.deleteBlockNode(blockType);
};

/**
 * Updates the workspace to show the block user selected from library
 * @param {string} blockType Block to edit on block factory.
 */
BlockLibraryController.prototype.openBlock = function(blockType) {
  if (blockType) {
    var xml = this.storage.getBlockXml(blockType);
    BlockFactory.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(xml, BlockFactory.mainWorkspace);
    BlockFactory.mainWorkspace.clearUndo();
  } else {
    BlockFactory.showStarterBlock();
    this.view.setSelectedBlockType(null);
  }
};

/**
 * Returns type of block selected from library.
 * @return {string} Type of block selected.
 */
BlockLibraryController.prototype.getSelectedBlockType = function() {
  return this.view.getSelectedBlockType();
};

/**
 * Confirms with user before clearing the block library in local storage and
 * updating the dropdown and displaying the starter block (factory_base).
 */
BlockLibraryController.prototype.clearBlockLibrary = function() {
  var check = confirm('Delete all blocks from library?');
  if (check) {
    // Clear Block Library Storage.
    this.storage.clear();
    this.storage.saveToLocalStorage();

    // Show default block.
    BlockFactory.showStarterBlock('input_statement', 'new_block', 'block_type');

    // User may not save the starter block, but will get explicit instructions
    // upon clicking the red save button.
    this.view.updateButtons(null);

    // clear the tree
    this.tree.clearLibrary();

  }
};

/**
 * Saves current block to local storage and updates dropdown.
 */
BlockLibraryController.prototype.saveToBlockLibrary = function() {
  var blockType = this.getCurrentBlockType();
  // If user has not changed the name of the starter block.
  if (blockType == 'block_type') {
    // Do not save block if it has the default type, 'block_type'.
    alert('You cannot save a block under the name "block_type". Try changing ' +
        'the name before saving. Then, click on the "Block Library" button ' +
        'to view your saved blocks.');
    return;
  }

  // Create block XML.
  var xmlElement = goog.dom.createDom('xml');
  var block = FactoryUtils.getRootBlock(BlockFactory.mainWorkspace);
  xmlElement.appendChild(Blockly.Xml.blockToDomWithXY(block));

  // Do not add node again if block type is already in library.
  if (!this.has(blockType)) {
    this.tree.addBlockNode(blockType);
  }

  // Save block.
  this.storage.addBlock(blockType, xmlElement);
  this.storage.saveToLocalStorage();

  // Show saved block without other stray blocks sitting in Block Factory's
  // main workspace.
  this.openBlock(blockType);

  // Add select handler to the new option.
  this.addOptionSelectHandler(blockType);
};

/**
 * Checks to see if the given blockType is already in Block Library
 * @param {string} blockType Type of block.
 * @return {boolean} Boolean indicating whether or not block is in the library.
 */
BlockLibraryController.prototype.has = function(blockType) {
  var blockLibrary = this.storage.blocks;
  return (blockType in blockLibrary && blockLibrary[blockType] != null);
};

/**
 * Return block library mapping block type to XML.
 * @return {Object} Object mapping block type to XML text.
 */
BlockLibraryController.prototype.getBlockLibrary = function() {
  return this.storage.getBlockXmlTextMap();
};

/**
 * Return stored XML of a given block type.
 * @param {string} blockType The type of block.
 * @return {!Element} XML element of a given block type or null.
 */
BlockLibraryController.prototype.getBlockXml = function(blockType) {
  return this.storage.getBlockXml(blockType);
};

/**
 * Set the block library storage object from which exporter exports.
 * @param {!BlockLibraryStorage} blockLibStorage Block Library Storage object.
 */
BlockLibraryController.prototype.setBlockLibraryStorage
    = function(blockLibStorage) {
  this.storage = blockLibStorage;
};

/**
 * Get the block library storage object from which exporter exports.
 * @return {!BlockLibraryStorage} blockLibStorage Block Library Storage object
 *    that stores the blocks.
 */
BlockLibraryController.prototype.getBlockLibraryStorage = function() {
  return this.blockLibStorage;
};

/**
 * Get the block library storage object from which exporter exports.
 * @return {boolean} True if the Block Library is empty, false otherwise.
 */
BlockLibraryController.prototype.hasEmptyBlockLibrary = function() {
  return this.storage.isEmpty();
};

/**
 * Get all block types stored in block library.
 * @return {!Array.<string>} Array of block types.
 */
BlockLibraryController.prototype.getStoredBlockTypes = function() {
  return this.storage.getBlockTypes();
};

/**
 * If there are unsaved changes to the block in open in Block Factory
 * and the block is not the starter block, check if user wants to proceed,
 * knowing that it will cause them to lose their changes.
 * @return {boolean} Whether or not to proceed.
 */
BlockLibraryController.prototype.warnIfUnsavedChanges = function() {
  if (!FactoryUtils.savedBlockChanges(this)) {
    return confirm('You have unsaved changes. By proceeding without saving ' +
        ' your block first, you will lose these changes.');
  }
  return true;
};

/**
 * Add select handler for an option of a given block type. The handler will to
 * update the view and the selected block accordingly.
 * @param {string} blockType The type of block represented by the option is for.
 */
BlockLibraryController.prototype.addOptionSelectHandler = function(blockType) {
  var self = this;
  // Click handler for a block option. Sets the block option as the selected
  // option and opens the block for edit in Block Factory.
  var setSelectedAndOpen_ = function(blockOption) {
    var blockType = blockOption.textContent;
    self.openBlock(blockType);
    // The block is saved in the block library and all changes have been saved
    // Thus, the buttons show up as a disabled update button and an enabled
    // delete.
    self.view.updateButtons(blockType, true, true);
    blocklyFactory.closeModal();
  };

  // Returns a block option select handler.
  var makeOptionSelectHandler_ = function(blockOption) {
    return function() {
      // If there are unsaved changes warn user, check if they'd like to
      // proceed with unsaved changes, and act accordingly.
      var proceedWithUnsavedChanges = self.warnIfUnsavedChanges();
      if (!proceedWithUnsavedChanges) {
        return;
      }
      setSelectedAndOpen_(blockOption);
    };
  };
};

/**
 * Update the save and delete buttons based on the current block type of the
 * block the user is currently editing.
 * @param {boolean} Whether changes to the block have been saved.
 */
BlockLibraryController.prototype.updateButtons = function(savedChanges) {
  var blockType = this.getCurrentBlockType();
  var isInLibrary = this.has(blockType);
  this.view.updateButtons(blockType, isInLibrary, savedChanges);
};


