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
   * Returns whether or not there are unsaved elements in the resource.
   * @return {boolean} Whether or not unsaved elements exist.
   */
  isDirty() {
    throw 'abstract method: isDirty';
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
    //TODO: pass saving mechanism to classes which extend resource.
    throw 'unimplemented: saveFromLocalStorage';
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
   * Renames the resource.
   * @param {string} newName New name of the resource.
   */
  setName(newName) {
    this.name = newName;
  }
}
