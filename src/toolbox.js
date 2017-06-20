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
 * @fileoverview Toolbox object. Contains references to controller and view.
 *
 * @author Celine Choo (celinechoo)
 */

class Toolbox {
  constructor(name) {
    this.name = name;
    this.categories = {};
  }

  /**
   * Renames toolbox.
   * @param {string} newName New name of toolbox.
   */
  setName(newName) {
    this.name = newName;
  }

  /**
   * Adds block to toolbox.
   * @returns {boolean} True if added succesfully.
   */
  addBlock(categoryName, blockName, xmlDefinition) {
    if (categoryName.trim() && blockName.trim() && xmlDefinition.trim()) {
      if ()
      this.blocks[blockName] = xmlDefinition;
      return true;
    } else {
      return false;
    }
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
}

class Category {
  constructor(name) {
    this.name = name;
    this.blocks = {};
  }
}