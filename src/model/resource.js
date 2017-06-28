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
 * @fileoverview The Resource object is the abstract parent class for all
 *     potential groupings of blocks in Blockly DevTools. This abstract class
 *     is made knowing that these groupings can take many different forms
 *     (currently the DevTools Application supports Projects, Toolboxes,
 *     BlockLibraries, and Workspacecontents, all of which are, in the most
 *     abstract sense, groups of blocks) and thus it is expected that they will
 *     have methods in addition to those provided by Resource; however, it is
 *     expected that the functions in Resource are defined by all classes which
 *     extend from it. Resource objects have the capability to add blocks,
 *     remove them, get their definitions, verify their presence, confirm or
 *     or deny empty status, have their names changed, save/load from local
 *     storage, and return whether or not they contain unsaved changes.
 *
 */

/**
 * @class Resource provides method requirements for the Toolbox, BlockLibrary,
 *     and WorkspaceContents classes.
 */
class Resource {
  /**
   * Adds a block to the resource.
   */
  addBlock() {
    throw "abstract method: addBlock";
  }

  /**
   * Returns an array of all blocktypes contained within a resource.
   * @return {!Array.<string>} The BlockTypes contained within the resource.
   */
  getBlockTypes() {
    throw "abstract method: getBlockTypes";
  }

  /**
   * Returns the XML of given blockType (if the blockType is in the resource).
   * @param {stirng} blockType The blockType to get the XML for.
   * @return {Element} The XML that represents the blockType or null.
   */
  getBlockXml(blockType) {
    throw "abstract method: getBlockXml";
  }

  /**
   * Returns a map of each blockType contained in the resource to its
   *    associated XML.
   * @return {!Object} Map of block type to corresponding XML.
   */
  getBlockXmlMap() {
    throw "abstract method: getBlockXmlMap";
  }

  /**
   * Returns array of all block types stored in a resource.
   * @return {!Array.<string>} Map of block type to corresponding XML text.
   */
  getBlockXmlTextMap() {
    throw "abstract method: getBlockXmlMap";
  }

  /**
   * Removes block from a resource.
   */
  removeBlock() {
    throw "abstract method: removeBlock";
  }

  /**
   * Clears all blocks from a resource.
   */
  clear() {
    throw "abstract method: clear";
  }

  /**
   * Returns whether or not a resource is empty.
   */
  isEmpty() {
    throw "abstract method: isEmpty";
  }

  /**
   * Returns whether or not a resource has a given blockType.
   * @param {string} blockType Type of block.
   * @return {boolean} Whether or not blockType is stored in the resource.
   */
  has(blockType) {
    throw "abstract method: has";
  }

  /**
   * Renames the resource.
   * @param {string} newName New name of resource.
   */
  setName(newName) {
    throw "abstract method: setName";
  }

  /**
   * Returns whether or not there are unsaved elements in the resource.
   * @return {boolean} Whether or not unsaved elements exist.
   */
  isDirty() {
    throw "abstract method: isDirty";
  }

  /**
   * Reads the resource from local storage.
   */
  loadFromLocalStorage() {
        throw "abstract method: isDirty";
  }

  /**
   * Writes the resource to local storage.
   */
  saveToLocalStorage() {
  }
}
