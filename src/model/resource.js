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

goog.require('goog.global');

/**
 * @class Resource is the top level interface for the parts of a project,
 *     including the project itself
 */
class Resource {
  /**
   * Resource Class.
   * @param {string} resourceName The name for the resource.
   * @param {string} resourceType The type of resource.
   */
  constructor(resourceName, resourceType) {
    /**
     * The name of the resource.
     * @type {string}
     */
     this.name = resourceName;

    /**
     * The type of resource.
     * @type {string}
     */
    this.resourceType = resourceType;

    /**
     * Filepath leading to the resource's saved data for web export.
     * @type {string}
     */
    this.webFilepath = '';
  }

  /**
   * Reads the resource from local storage.
   */
  loadFromLocalStorage() {
    localStorage.getItem(this.resourceType + '_' + this.name);
  }

  /**
   * Writes the resource to local storage.
   */
  saveToLocalStorage() {
    // Refactored from block_library_storage.js
    goog.global.localStorage[this.name] = this.getJson();
  }

  /**
   * Gets the data necessary to export the resource.
   * @return {!Object} The data needed to export the resource.
   */
  getExportData() {
    throw 'abstract method: getExportData';
  }

  /**
   * Gets the navigation tree-specific JSON object which represents the resource.
   *
   * @return {!Object} The tree-specific JSON representation of the resource.
   */
  // TODO(#219): Move this code to NavigationTree and remove this method.
  getNavTreeJson() {
    const resourceJson = {
      'text': this.name,
    };
    return resourceJson;
  }

  /**
   * Renames the resource.
   * @param {string} newName New name of the resource.
   */
  setName(newName) {
    this.name = newName;
  }

  /**
   * Modifies the JSON object that comprises the resource's metadata.
   * @param {!Object} obj Object to extend with necessary data.
   */
  buildMetadata(obj) {
    obj.name = this.name;
    obj.resourceType = this.resourceType;
    /*
     * The ReadWriteController will assign a filepath to the object given to
     * buildMetadata. If no filepath has been assigned, or the web attribute is
     * missing, the buildMetadata will create these fields.
     */
    obj.web = {
      export: true,
      filepath: this.webFilepath
    };
  }
}
