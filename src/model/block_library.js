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
 * @class BlockLibrary stores one or more block definitions. User
 *     interations with the DevTools Application change definitions in the
 *     BlockLibrary. A BlockLibrary cannot contain multiple blocks with the same
 *     type.
 */
class BlockLibrary extends Resource {
  /**
   * BlockLibrary Class
   * @param {string} libraryName The name for the new library.
   * @constructor
   */
  constructor(libraryName) {
    /*
     * TODO: fully implement
     *
     * References: N/A
     */
    super(libraryName);
    /**
     * An array of all block types stored in the block library.
     * @type {!Array.<string>}
     */
    this.blocks;
  }

  /**
   * Saves block to block library.
   * @param {!BlockDefinition} blockDefinition The definition of the block to be
   *    saved.
   */
  addBlockDefinition(blockDefinition) {
    throw "unimplemented: addBlock";
  }

  /**
   * Returns array of all block types stored in the block library.
   * @return {!Array.<string>} Array of block types stored in block library.
   */
  getBlockTypes() {
    throw "unimplemented: getBlockTypes";
  }

  /**
   * Returns the XML of given block type stored in the block library.
   * @param {string} blockType Type of block.
   * @return {Element} The XML that represents the block type or null.
   */
  getBlockXml(blockType) {
    throw "unimplemented: getBlockXml";
  }

  /**
   * Returns the JSON of given block type stored in the block library.
   * @param {string} blockType Type of block.
   * @return {Object} The JSON that represents the block type or null.
   */
  getBlockJson(blockType) {
    throw "unimplemented: getBlockJson";
  }

  /**
   * Returns map of each block type to its corresponding XML in the
   *     block library.
   * @param {!Array.<string>} blockTypes Types of blocks.
   * @return {!Object<string, Element>} Map of block type to corresponding XML.
   */
  getBlockXmlMap(blockTypes) {
    /* TODO: handle the blockType not being contained within the library
     * TODO: Move from src/block_library_storage.js, see if method necessary
     * References:
     * - getBlockXmlMap(blockTypes)
     *
     */
    throw "unimplemented: getBlockXmlMap";
  }

  /**
   * Clears the block library.
   */
  clear() {
    /*
     * TODO: Move from src/block_library_storage.js
     *
     * References:
     * - clear()
     *
     */
    throw "unimplemented: clear";
  }

  /**
   * Removes block from the block library.
   * @param {string} blockType Type of block.
   */
  removeBlock(blockType) {
    /*
     * TODO: Move from src/block_library_storage.js
     *
     * References:
     * - removeBlock(blockType)
     *
     */
    throw "unimplemented: removeBlock";
  }

  /**
   * Checks to see if block library is empty.
   * @return {boolean} True if empty, false otherwise.
   */
  isEmpty() {
    /*
     * TODO: Move from src/block_library_storage.js
     *
     * References:
     * - isEmpty()
     *
     */
    throw "unimplemented: isEmpty";
  }

  /**
   * Returns map of blockType to associated JSON object.
   * @return {{!Object<string, Object>} Map of block type to corresponding JSON.
   */
  getBlockJsonMap() {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - getBlockXmlTextMap()
     *
     */
    throw "unimplemented: getBlockXmlTextMap";
  }

  /**
   * Returns boolean of whether or not a given blockType is stored in  the block
   *     library.
   * @param {string} blockType Type of block.
   * @return {boolean} Whether or not blockType is stored in block library.
   */
  has(blockType) {
    /*
     * TODO: Move from src/block_library_storage.js
     *
     * References:
     * - has(blockType)
     *
     * Additional reference: src/block_library_controller.js
     * - has(blockType)
     *
     */
    throw "unimplemented: has";
  }

  /**
   * Renames the library.
   * @param {string} newName New name of the library.
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
   * Gets the data necessary to export the library.
   * @return {!Object} The data needed to export the library.
   */
  getExportData() {
    //TODO: implement
    throw "unimplemented: getExportData";
  }

  /**
   * Gets the JSON object necessary to represent the library in the navigation
   *     tree.
   * @return {!Object} The tree-specific JSON representation of the library.
   */
  getTreeJson() {
    throw "unimplemented: getTreeJson";
  }
}
