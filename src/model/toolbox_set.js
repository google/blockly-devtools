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

goog.provide('ToolboxSet');

goog.require('ResourceSet');
goog.require('Toolbox');

/**
 * @class ToolboxSet is a set of Toolbox objects.
 */
class ToolboxSet extends ResourceSet {
  /**
   * ToolboxSet Class.
   * @param {string} toolboxSetName The name for the toolbox set.
   * @param {string} projectName The name of the project the set belongs to.
   * @constructor
   */
  constructor(toolboxSetName, projectName) {
    super(toolboxSetName, projectName);
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
  //TODO #103
  clearToolbox(toolboxName) {
    throw "unimplemented: clearToolbox";
  }

  /**
   * Produces the JSON needed to organize toolboxes in the navigation tree.
   * @return {!Object} The navigation tree JSON for the toolbox set.
   */
  // TODO(#219): Move this code to NavigationTree
  getNavTreeJson() {
    const toolboxSetJson = {
      'id': PREFIXES.TOOLBOX,
      'text': 'Toolboxes',
      'children': super.getNavTreeJson()
    };
    return toolboxSetJson;
  }
}
