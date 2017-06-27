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
 * @fileoverview BlockLibrary object. A BlockLibrary provides the structure by
 *      which definitions of blocks are grouped. It is these definitions that
 *      are changed based upon user interaction with the DevTools Application,
 *      rather than the definitions contained within the other structures under
 *      Project. Moreover, block libraries cannot contain multiple blocks with
 *      the same type and definition.
 * @author
 */


/**
 * @class BlockLibrary stores a group of block definitions.
 */
class BlockLibrary extends Resource {
  /**
   * BlockLibrary Class
   * @param {string} libraryName The name for the new library.
   * @constructor
   */
  constructor(libraryName) {
    /*
     * TODO: fully impliment
     *
     * References: N/A
     */
    /**
     * The name of the library.
     * @type {string}
     */
    this.name = libraryName;
    /**
     * An array of all block types stored in the current block library.
     * @type {!Array.<string>}
     */
    this.blocks;
  }

  /**
   * Saves block to block library.
   * @param {string} blockType Type of block.
   * @param {Element} blockXML The block's XML pulled from workspace.
   */
  addBlock(blockType, blockXML) {
    throw "unimplimented: addBlock";
  }

  /**
   * Returns array of all block types stored in current block library.
   * @return {!Array.<string>} Array of block types stored in block library.
   */
  getBlockTypes() {
    throw "unimplimented: getBlockTypes";
  }

  /**
   * Returns the XML of given block type stored in current block library
   *     (this.blocks).
   * @param {string} blockType Type of block.
   * @return {Element} The XML that represents the block type or null.
   */
  getBlockXml(blockType) {
    throw "unimplimented: getBlockXml";
  }

  /**
   * Returns map of each block type to its corresponding XML stored in current
   *     block library (this.blocks).
   * @param {!Array.<string>} blockTypes Types of blocks.
   * @return {!Object} Map of block type to corresponding XML.
   */
  getBlockXmlMap(blockTypes) {
    /*
     * TODO: Move from src/block_library_storage.js
     *
     * References:
     * - getBlockXmlMap(blockTypes)
     *
     */
    throw "unimplimented: getBlockXmlMap";
  }

  /**
   * Clears the current block library.
   */
  clear() {
    /*
     * TODO: Move from src/block_library_storage.js
     *
     * References:
     * - clear()
     *
     */
    throw "unimplimented: clear";
  }

  /**
   * Removes block from current block library (this.blocks).
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
    throw "unimplimented: removeBlock";
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
    throw "unimplimented: isEmpty";
  }

  /**
   * Returns array of all block types stored in current block library.
   * @return {!Array.<string>} Map of block type to corresponding XML text.
   */
  getBlockXmlTextMap() {
    /*
     * TODO: Move from src/block_library_storage.js
     *
     * References:
     * - getBlockXmlTextMap()
     *
     */
    throw "unimplimented: getBlockXmlTextMap";
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
    throw "unimplimented: has";
  }

  /**
   * Renames the library.
   * @param {string} newName New name of the library.
   */
  setName(newName) {
    /*
     * TODO: impliment
     *
     * References: N/A
     */
    throw "unimplimented: setName";
  }
}
