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
 * @class ResourceSet is the top level interface for sets of parts of a project.
 */
 class ResourceSet {
  /**
   * ResourceSet Class.
   * @param {string} resourceSetName The name for the resource set.
   * @constructor
   */
  constructor(resourceSetName) {
    /**
     * The name of the resource set.
     * @type {string}
     */
     this.name = resourceSetName;
  }

  /**
   * Writes the resource set to local storage.
   */
  saveSetToLocalStorage(){
    throw "unimplemented: saveSet";
  }

  /**
   * Reads the resource set from local storage
   */
  loadSetFromLocalStorage(){
    throw "unimplemented: loadSet";
  }

  /**
   * Adds a resource to the set.
   * @param {string} resourceName The name of the resource to be added.
   */
  addResource(resourceName){
    throw "unimplemented: addResource";
  }

  /**
   * Removes a resource from the set.
   * @param {string} resourceName The name of the resource to be removed.
   */
  removeResource(resourceName){
    throw "unimplemented: removeResource";
  }

  /**
   * Gets a resource contained within the set.
   * @param {string} resourceName The resource to be returned.
   * @return {!Object} The resource, or null if it's not contained in the set.
   */
  getResource(resourceName){
    throw "unimplemented: getResource";
  }

  /**
   * Gets the names of all resources contained within the set.
   */
  getNames(){
    throw "unimplemented: getNames";
  }

  /**
   * Returns whether or not a given name can be added to the resource set.
   * @param name The name to be added.
   * @return {Boolean} Whether or not the name can be added.
   */
  isValidName(name){
    throw "unimplemented: isValidName";
  }

  /**
   * Returns whether or not a resource's type prohibits it from being added to
   *     the set.
   * @param {string} resource The resource to be added.
   */
  isValidType(resource, resourceType){
    /* most likely will just return resource instanceof resourceType,
     *     thus for classes which extend ResourceSet the isValidType method will
     *     just call super.isValid(resource, <resource type for that set>)
     */
    throw "unimplemented: isValidType";
  }

  /**
   * Returns the JSON object for the  resource set's tree representation.
   * @return {!Object} The JSON representing the set's tree structure.
   */
  getTreeJSON(){
    /*
     * TODO: add getTreeJSON methods to resources, such that the set getTreeJSON
     *     method simply combines the objects for this method. This is lower
     *     priority on account of the fact that the tree will update using
     *     listeners, thus this method would really only be used upon loading
     *     DevTools with a previously existing project.
     */
    throw "unimplemented: getTreeJSON";
  }

  /**
   * Returns the metadata for the set.
   * @return {!Object} The metadata for the set.
   */
  getData(){
    /*
     * For use in creating the project metadata.
     * TODO: define metadata structure for sets/projects.
     */
    throw "unimplemented: getData";
  }
}
