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

goog.provide('Resource');

/**
 * @class Resource is the top level interface for the parts of a project,
 *     including the project itself
 */
class Resource {
  /**
   * Resource Class.
   * @param {string} resourceName The name for the resource.
   * @constructor
   */
  constructor(resourceName) {
    /**
     * The name of the resource.
     * @type {string}
     */
     this.name = resourceName;
  }

  /**
   * Reads the resource from local storage.
   */
  loadFromLocalStorage() {
    throw 'abstract method: loadFromLocalStorage';
  }

  /**
   * Writes the resource to local storage.
   */
  saveToLocalStorage() {
    goog.global.localStorage[this.name] = JSON.stringify(this.blocks);
  }

  /**
   * Gets the data necessary to export the resource.
   * @return {!Object} The data needed to export the resource.
   */
  getExportData() {
    throw 'abstract method: getExportData';
  }

  /**
   * Gets the JSON object necessary to represent the resource in the navigation
   *     tree.
   * @return {!Object} The tree-specific JSON representation of the resource.
   */
  getTreeJson() {
    throw 'abstract method: getTreeJson';
  }

  /**
   * Makes tree JSON from array of strings. Used in most resource getTreeJson()
   *     methods. Takes strings from array, and gives them nodes on the same
   *     level (under this.name as a parent node) with ids equivalent to their
   *     text.
   * @param {!Array.<string>} nameArray Array of strings, usually names of some
   *     objects in the resource, to be made in to JSON.
   *
   * @return {!Object} The tree-specific JSON representation of the array.
   */
  makeTreeJsonFromArray(nameArray) {
    let treeJson;
    let iterationIndex = 1;
    let finalIndex = 0;
    let toAdd;
    let text;
    while (nameArray[iterationIndex]) {
      text = nameArray[iterationIndex - 1];
      toAdd = {'text': text, 'id': text, 'parent': this.name};
      treeJson.push(toAdd);
      iterationIndex++;
      finalIndex++;
    }
    text = nameArray[finalIndex];
    toAdd = {'text': text, 'id': text, 'parent': this.name};
    treeJson.push(toAdd);
    return treeJson;
  }

  /**
   * Renames the resource.
   * @param {string} newName New name of the resource.
   */
  setName(newName) {
    this.name = newName;
  }
}
