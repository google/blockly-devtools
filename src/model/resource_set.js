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

goog.provide('ResourceSet');

goog.require('Resource');

/**
 * @class ResourceSet is the top level interface for sets of parts of a project,
 *     not including the project itself. Resource sets can only contain one type
 *     of resource, and cannot contain multiple resources with the same name.
 *
 */
 class ResourceSet extends Resource {
  /**
   * ResourceSet Class.
   * @param {string} resourceSetName The name for the resource set.
   * @param {string} projectName The name of the project the resource belongs to.
   * @constructor
   */
  constructor(resourceSetName, projectName) {
    super(resourceSetName);

    /**
     * The name of the project the resource belongs to.
     * @type {string}
     */
    this.project = projectName;

    /**
     * The resources that the project contains, mapped to their names.
     * @type {!Object<string, Resource>}
     */
    this.resources = {};
  }

  /**
   * Adds a resource to the set.
   * @param {!Resource} resource The resource to be added.
   */
  add(resource) {
    this.resources[resource.name] = resource;
  }

  /**
   * Removes a resource from the set.
   * @param {string} resourceName The name of the resource to be removed.
   */
  remove(resourceName) {
    delete this.resources[resourceName];
  }

  /**
   * Gets a resource contained within the set.
   * @param {string} resourceName The resource to be returned.
   * @return {!Resource} The resource, or null if it's not contained in the set.
   */
  get(resourceName) {
    return this.resources[resourceName];
  }

  /**
   * Gets the names of all resources contained within the set.
   * @return {Array.<string>} The names of all resources the set contains.
   */
  getNames() {
    return Object.keys(this.resources);
  }

  /**
   * Returns whether or not the resource set is empty.
   * @return {boolean} Whether or not the set is empty.
   */
  isEmpty() {
    return this.getNames().length === 0;
  }

  /**
   * Returns the navigation tree-specific JSON representation of the resource set.
   * @return {!Object} The JSON representing the set.
   */
  getNavTreeJson() {
    let resourceSetJson = [];
    for (let resourceName of this.getNames()) {
      var resourceJson = this.resources[resourceName].getNavTreeJson();
      resourceSetJson.push(resourceJson);
    }
    return resourceSetJson;
  }

  /**
   * Reads the resource set from local storage.
   */
  loadFromLocalStorage() {
    //TODO: validate input.
    const set = goog.global.localStorage[this.name];
    this.resources = JSON.parse(set).children;
  }

  /**
   * Gets the data necessary to export the resource set.
   * @return {!Object} The data needed to export the resource set.
   */
  getExportData() {
    throw 'unimplemented: getExportData';
  }

  /**
   * Returns whether or not a resource by a given name is in the set.
   * @param {string} resourceName The name of the resource to be found.
   * @return {boolean} Whether or not the resource is present in the set.
   */
  has(resourceName) {
    const resourceNames = this.getResourceNames();
    for (const name of resourceNames) {
      if (name === resourceName) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns flat list of all data for the resources in the set.
   * @return {Array.<Object>} Flat list of data for all resources in the set.
   */
  getMetadata() {
    const metadata = [];
    for (let resourceName of Object.keys(this.resources)) {
      metadata.concat(this.get(resourceName).buildMetadata());
    }
    return metadata;
  }
}
