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

goog.provide('BlockLibrary');

goog.require('BlockDefinition');
goog.require('Resource');

/**
 * @class BlockLibrary stores one or more block definitions. User
 * interations with the DevTools Application change definitions in the
 * BlockLibrary. A BlockLibrary cannot contain multiple blocks with the same
 * type.
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
    super(libraryName, PREFIXES.LIBRARY);

    /**
     * A map of all blocks in the library to their definitions.
     * @type {!Object<string, !BlockDefinition>}
     */
    this.blocks = {};
  }

  /**
   * Saves block to block library.
   * @param {!BlockDefinition} blockDefinition The definition of the block to be
   *    saved.
   */
  add(blockDefinition) {
    this.blocks[blockDefinition.type()] = blockDefinition;
  }

  /**
   * Returns array of all block types stored in the block library.
   * @return {!Array.<string>} Array of block types stored in block library.
   */
  getBlockTypes() {
    return Object.keys(this.blocks);
  }

  /**
   * Returns the XML of given block type stored in the block library.
   * @param {string} blockType Type of block.
   * @return {Element} The XML that represents the block type or null.
   */
   //TODO #87: phase out
  getBlockXml(blockType) {
    return this.blocks[blockType].getXml();
  }

  /**
   * Returns the JSON of all blocks stored in the block library.
   * @return {Object} The JSON that represents all bocks in the library.
   */
  getBlockArrayJson() {
    let blockArrayJson = [];
    for (let blockType in this.getBlockTypes()) {
      blockArrayJson.push(this.blocks[blockType].json);
    }
    return blockArrayJson;
  }

  /**
   * Returns map of each block type to its corresponding XML in the
   *     block library.
   * @param {!Array.<string>} blockTypes Types of blocks.
   * @return {!Object<string, Element>} Map of block type to corresponding XML.
   */
  //TODO #87: phase out
  getBlockXmlMap(blockTypes) {
    var xmlMap = {};
    for (let blockType of this.getBlockTypes()) {
      xmlMap[blockType] = this.blocks[blockType].getXml();
    }
    return xmlMap;
  }

  /**
   * Clears the block library.
   */
  clear() {
    this.blocks = Object.create(null);
  }

  /**
   * Removes block from the block library.
   * @param {string} blockType Type of block.
   */
  remove(blockType) {
    delete this.blocks[blockType];
  }

  /**
   * Checks to see if block library is empty.
   * @return {boolean} True if empty, false otherwise.
   */
  isEmpty() {
    return this.getBlockTypes().length == 0;
  }

  /**
   * Returns boolean of whether or not a given blockType is stored in  the block
   *     library.
   * @param {string} blockType Type of block.
   * @return {boolean} Whether or not blockType is stored in block library.
   */
  has(blockType) {
    return !this.blocks[blockType];
  }

  /**
   * Returns a flat list of all block data.
   */
  getAllBlockData() {
    let blockData = [];
    for (let blockType of this.blocks) {
      blockData.push(this.blocks[blockType].getExportData());
    }
    return blockData;
  }

  /**
   * Gets the data necessary to export the library.
   * @return {!Object} The data needed to export the library.
   */
  getExportData() {
    let data = Object.create(null);
    super.buildMetadata(data);
    data.blocks = getAllBlockData();
    return data;
  }

  /**
   * Gets the JSON object necessary to represent the library in the navigation
   *     tree.
   * @return {!Object} The tree-specific JSON representation of the library.
   */
  getJson() {
    const libraryJson = $.extend(true, super.getJson(),
      {'id': PREFIXES.LIBRARY, 'children': this.getBlockArrayJson()});
    return libraryJson;
  }
}
