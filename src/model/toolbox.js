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
 * @fileoverview Toolbox object. Contains references to controller and view.
 *
 * @author Celine Choo (celinechoo)
 */

class Toolbox {
  constructor(name) {
    this.name = name;
    this.xmlDefinitions = {};
  }

  /**
   * Renames toolbox.
   * @param {string} newName New name of toolbox.
   */
  setName(newName) {
  }

  /**
   * Adds block to toolbox.
   * @returns {boolean} True if added succesfully.
   */
  addBlock(categoryName, blockName, xmlDefinition) {
  }

  /**
   * Removes block from toolbox.
   */
  removeBlock(blockName) {
    if (this.blocks[blockName]) {
      delete this.blocks[blockName];
    }
  }

  /**
   * Exports toolbox as JS file.
   */
  exportJs() {
    return;
  }

  /**
   * Exports toolbox as XML file.
   */
  exportXml() {
    return;
  }

  /**
   *
   */
  moveCategory() {

  }

  /**
   * Returns true if given category name already exists within toolbox.
   *
   * @param {string} categoryName Name of category.
   */
  categoryIsInToolbox() {

  }

  /**
   * Returns true if given block name already exists within toolbox.
   *
   * @param {string} blockName Name of block.
   */
  blockIsInToolbox() {

  }

  /**
   * Returns true if all blocks within this toolbox is empty.
   *
   * @returns {boolean} Whether the toolbox is empty.
   */
  isEmpty() {

  }
}
