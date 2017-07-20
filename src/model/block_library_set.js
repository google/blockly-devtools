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

goog.provide('BlockLibrarySet');

goog.require('BlockLibrary');
goog.require('ResourceSet');

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
    super(librarySetName, projectName);
  }

  /**
   * Gets the blockTypes contained within the library set.
   * @return {Array.<string>} The block types contained across all libraries in
   *     the set.
   */
  getBlockTypes() {
    console.warn('unimplemented: getBlockTypes');
   }

  /**
   * Returns a map of all block types in the library set to their definitions.
   * @return {!Object<string, BlockDefinition>} Map of all block types to their
   *     definitions.
   */
  getAllBlockDefinitionsMap() {
    console.warn('unimplemented: getAllBlockDefinitionsMap');
  }

  /**
   * Returns a map of all block types in a named library to their definitions.
   * @param {string} libraryName The name of the library to get the map from.
   * @return {!Object<string, BlockDefinition>} Map of the library's block types
   *     to their definitions.
   */
  getBlockDefinitionMap(libraryName) {
    console.warn('unimplemented: getBlockDefinitionMap');
  }

  /**
   * Returns whether or not a named block is in the library set.
   * @param {string} blockType The name of the block to be found.
   * @return {boolean} Whether or not the block is in the set.
   */
  hasBlock(blockType) {
    console.warn('Unimplemented: hasBlock');
  }

  /**
   * Produces the JSON needed to organize libraries in the tree.
   * @param {string} prefix The id prefix for libraries.
   * @return {!Object} The JSON for the tree's library section.
   */
  getJson(prefix) {
    const librarySetJson = {
      'id': prefix,
      'text': 'Libraries',
      'children': super.getJson()
    };
    return librarySetJson;
  }
}
