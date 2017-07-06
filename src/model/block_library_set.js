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
 * @class BlockLibrarySet is a set of BlockLibrary objects.
 */
class BlockLibrarySet extends ResourceSet {
  /**
   * BlockLibrarySet Class.
   * @param {string} librarySetName The name for the block library set.
   * @param {string} projectName The name of the project the set belongs to.
   *
   * @constructor
   */
  constructor(librarySetName, projectName) {
    super(librarySetName, projectName, BlockLibrary);
  }

  /**
   * Adds a block library to the set.
   * @param {string} libraryName The name of the library to be added.
   */
  addLibrary(libraryName) {
    super.addResource(libraryName);
  }

  /**
   * Removes a library from the set.
   * @param {string} libraryName The name of the library to be removed.
   */
  removeLibrary(libraryName) {
    super.removeResource(libraryName);
  }

  /**
   * Gets a library contained within the set.
   * @param {string} libraryName The library to be returned.
   * @return {!Object} The library, or null if it's not contained in the set.
   */
  getLibrary(libraryName) {
    return super.getResource(libraryName);
  }

  /**
   * Gets the names of all libraries contained within the set.
   * @return {Array.<string>} The names of all libraries the set contains.
   */
  getLibraryNames() {
    return super.getResourceNames();
  }

  /**
   * Gets the blockTypes contained within the library set.
   * @return {Array.<string>} The block types contained across all libraries in
   *     the set.
   */
   getAllBlockTypes() {
    throw "unimplemented: getAllBlockTypes";
   }

  /**
   * Adds a block to the named library, or creates a new library with the given
   *     name and adds the block to it.
   * @param {string} libraryName The name of the library to add to or create.
   * @param {!BlockDefinition} block The block definition to add to the existing
   *     or new library.
   */
   addBlockToLibrary(libraryName, block) {
    if (this.has(libraryName)) {
      this.getLibrary(libraryName).addBlock(block);
    } else {
      this.addLibrary(libraryName);
      this.getLibrary(libraryName).addBlock(block);
    }
   }

}
