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
 * @fileoverview WorkspaceContents object. Contains a set of positioned blocks
 *    specified by the developer and used to initialize an app's workspace.
 *
 * @author
 */

/**
 * @class Workspacecontents stores a group of positioned blocks.
 */
class WorkspaceContents extends Resource {
  /**
   * Workspacecontents Class
   * @param {string} workspaceContentsName The name for the workspace contents.
   * @constructor
   */
  constructor(workspaCecontentsName) {
    /*
     * TODO: fully implement
     *
     * References: N/A
     */
    /**
     * The name of the workspace contents.
     * @type {string}
     */
    this.name = workspaceContentsName;
  }

  /**
   * Saves block to block workspace contents.
   * @param {string} blockType Type of block.
   * @param {Element} blockXML The block's XML pulled from workspace contents.
   */
  addBlock(blockType, blockXML) {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - addBlock(blockType, blockXML)
     */
    throw "unimplemented: addBlock";
  }

  /**
   * Returns array of all block types stored in the workspace contents.
   * @return {!Array.<string>} Array of block types stored in workspace contents.
   */
  getBlockTypes() {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - getBlockTypes
     */
    throw "unimplemented: getBlockTypes";
  }

  /**
   * Returns the XML of given block type stored in the workspace contents
   * @param {string} blockType Type of block.
   * @return {Element} The XML that represents the block type or null.
   */
  getBlockXml(blockType) {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - getBlockXmlMap(blockTypes)
     */
    throw "unimplemented: getBlockXml";
  }

  /**
   * Returns map of each block type to its corresponding XML stored in the
   *     workspace contents .
   * @param {!Array.<string>} blockTypes Types of blocks.
   * @return {!Object} Map of block types to corresponding XML.
   */
  getBlockXmlMap(blockTypes) {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - getBlockXmlMap(blockTypes)
     */
    throw "unimplemented: getBlockXmlMap";
  }

  /**
   * Clears the workspace contents.
   */
  clear() {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - clear()
     */
    throw "unimplemented: clear";
  }

  /**
   * Removes block from the workspace contents.
   * @param {string} blockType Type of block.
   */
  removeBlock(blockType) {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - removeBlock(blockType)
     */
    throw "unimplemented: removeBlock";
  }

  /**
   * Checks to see if block workspace contents is empty.
   * @return {boolean} True if empty, false otherwise.
   */
  isEmpty() {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - isEmpty()
     */
    throw "unimplemented: isEmpty";
  }

  /**
   * Returns array of all block types stored in the workspace contents.
   * @return {!Array.<string>} Map of block type to corresponding XML text.
   */
  getBlockXmlTextMap() {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - getBlockXmlTextMap()
     */
    throw "unimplemented: getBlockXmlTextMap";
  }

  /**
   * Returns boolean of whether or not a given blockType is stored in the
   * workspace contents.
   * @param {string} blockType Type of block.
   * @return {boolean} Whether or not blockType is in the workspace contents.
   */
  has(blockType) {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - has(blockType)
     *
     * Additional reference: src/block_library_controller.js
     * - has(blockType)
     *
     */
    throw "unimplemented: has";
  }

  /**
   * Renames the workspace contents.
   * @param {string} newName New name of the workspace contents.
   */
  setName(newName) {
    /*
     * TODO: implement
     *
     * References: N/A
     */
    throw "unimplemented: setName";
  }
}
