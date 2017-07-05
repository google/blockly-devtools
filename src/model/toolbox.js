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
 * @class Toolbox represents a toolbox object. Contains references to controller
 *     and view.
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
  }

  /**
   * Renames toolbox.
   * @param {string} newName New name of toolbox.
   */
  setName(newName) {
    console.log('setName() called!')
    // TODO: Implement function.
  }

  /**
   * Adds block to toolbox.
   * @returns {boolean} True if added succesfully.
   */
  addBlock(categoryName, blockName, xmlDefinition) {
    console.log('Add block called!');
    // TODO: Implement function.
  }

  /**
   * Removes block from toolbox.
   */
  removeBlock(blockName) {
    console.log('Remove block called!');
    if (this.blocks[blockName]) {
      delete this.blocks[blockName];
    }
  }

  /**
   * Generates JavaScript string representation of toolbox for user to download.
   * Does not deal with popups or file system access; just generates content.
   *
   * @returns {string} String representation of JS file to be exported.
   */
  exportJs() {
    // TODO: Implement function.
    console.log('exportJs() called.');
  }

  /**
   * Generates XML string representation of toolbox for user to download. Does
   * not deal with popups or file system access; just generates content.
   *
   * @returns {string} String representation of XML file to be exported.
   */
  getExportXml() {
    // TODO: Implement function.
    console.log('getExportXml() called.');
  }

  /**
   * Returns true if given category name already exists within toolbox.
   *
   * @param {string} categoryName Name of category.
   * @returns {boolean} Whether category name exists in toolbox.
   */
  categoryIsInToolbox(categoryName) {
    // TODO: Implement function.
  }

  /**
   * Returns true if this toolbox does not contain any blocks in any category.
   *
   * @returns {boolean} Whether the toolbox is empty.
   */
  isEmpty() {
    // TODO: Implement function.
  }

  /**
   * Renames the project.
   * @param {string} newName New name of the project.
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
   * Gets the data necessary to export the toolbox.
   * @return {!Object} The data needed to export the toolbox.
   */
  getExportData() {
    //TODO: implement
    throw "unimplemented: getExportData";
  }
  //TODO: Create getters/has specified for nature of Toolbox
}
