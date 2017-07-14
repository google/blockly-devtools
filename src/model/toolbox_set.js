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
 * @class ToolboxSet is a set of Toolbox objects.
 */
class ToolboxSet extends ResourceSet {
  /**
   * ToolboxSet Class.
   * @param {string} toolboxSetName The name for the toolbox set.
   * @param {string} projectName The name of the project the set belongs to.
   *
   * @constructor
   */
  constructor(toolboxSetName, projectName) {
    super(toolbox SetName, projectName, Toolbox);
  }

  /**
   * Adds a toolbox to the set.
   * @param {string} toolboxName The name of the toolbox to be added.
   */
  addToolbox(toolboxName) {
    super.addResource(toolbox Name);
  }

  /**
   * Removes a toolbox from the set.
   * @param {string} toolboxName The name of the toolbox to be removed.
   */
  removeToolbox(toolboxName) {
    super.removeResource(toolbox Name);
  }

  /**
   * Gets a toolbox contained within the set.
   * @param {string} toolboxName The toolbox to be returned.
   * @return {!Object} The toolbox, or null if it's not contained in the set.
   */
  getToolbox(toolboxName) {
    return super.getResource(toolbox Name);
  }

  /**
   * Gets the names of all toolboxes contained within the set.
   * @return {Array.<string>} The names of all toolboxes the set contains.
   */
  getToolboxNames() {
    return super.getResourceNames();
  }

  /**
   * Removes a named block from the entire set.
   * @param {string} blockType The name of the block to remove.
   */
  removeBlockFromSet(blockType) {
    throw "unimplemented: removeBlockFromSet";
  }

  /**
   * Removes a block from a named toolbox.
   * @param {string} toolboxName The name of the toolbox to remove the
   *     block from.
   * @param {string} blockType The name of the block to remove.
   */
  removeBlockFromToolbox(toolboxName, blockType) {
    throw "unimplemented: removeBlockFromToolbox";
  }

  /**
   * Clears a toolbox in the set.
   * @param {string} toolboxName The name of the toolbox to be cleared.
   */
  clearToolbox(toolboxName) {
    throw "unimplemented: clearToolbox";
  }

  /**
   * Produces the JSON needed to organize toolboxes in the tree.
   * @return {!Object} The JSON for the tree's toolbox section.
   */
  getTreeJson() {
    const toolboxSetJson = [
      {'id': 'Toolbox', 'text': 'Toolboxes'},
      {'children': super.getTreeJson()}
    ];
    return toolboxSetJson;
  }
}
