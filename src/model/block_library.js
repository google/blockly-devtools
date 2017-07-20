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
 *     interations with the DevTools Application change definitions in the
 *     BlockLibrary. A BlockLibrary cannot contain multiple blocks with the same
 *     type.
 */
class BlockLibrary extends Resource {
  /**
   * BlockLibrary Class
   * @param {string} libraryName The name for the new library.
   * @param {string} prefix The prefix for identifying block libraries.
   * @constructor
   */
  constructor(libraryName, prefix) {
    /*
     * TODO: fully implement
     *
     * References: N/A
     */
    super(libraryName, prefix);

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
   * Returns the JSON of given block type stored in the block library.
   * @param {string} blockType Type of block.
   * @return {Object} The JSON that represents the block type or null.
   */
  getBlockJson(blockType) {
    return this.blocks[blockType].getJson();
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
    this.blocks = new Object(null);
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
    return this.getBlockTypes().length === 0;
  }

  /**
   * Returns map of blockType to associated JSON object.
   * @return {!Object<string, Object>} Map of block type to corresponding JSON.
   */
  getBlockJsonMap() {
    var jsonMap = {};
    for (let blockType of this.getBlockTypes()) {
      jsonMap[blockType] = this.blocks[blockType].getXml();
    }
    return jsonMap;
  }

  /**
   * Returns boolean of whether or not a given blockType is stored in  the block
   *     library.
   * @param {string} blockType Type of block.
   * @return {boolean} Whether or not blockType is stored in block library.
   */
  has(blockType) {
    return this.getBlockTypes().includes(blockType);
  }

  /**
   * Gets the data necessary to export the library.
   * @return {!Object} The data needed to export the library.
   */
  getExportData() {
    //TODO: implement
    throw 'unimplemented: getExportData';
  }

  /**
   * Gets the JSON object necessary to represent the library in the navigation
   *     tree.
   * @return {!Object} The tree-specific JSON representation of the library.
   */
  getJson() {
    const libraryJson = super.getJson();
    libraryJson.concat({'children': this.getBlockJson()});
    return libraryJson;
  }
}
