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

goog.provide('WorkspaceContentsSet');

goog.require('ResourceSet');
goog.require('WorkspaceContentsSet');

/**
 * @class WorkspacecontentsSet is a set of WorkspaceContents objects.
 */
class WorkspaceContentsSet extends ResourceSet {
  /**
   * WorkspaceContentsSet Class.
   * @param {string} workspaceContentsSetName Name of the workspace contents set.
   * @param {string} projectName The name of the project the set belongs to.
   * @constructor
   */
  constructor(workspaceContentsSetName, projectName) {
    super(workspaceContentsSetName, projectName);
  }

  /**
   * Removes a named block from the entire set.
   * @param {string} blockType The name of the block to remove.
   */
  removeBlock(blockType) {
    throw 'unimplemented: removeBlock';
  }

  /**
   * Produces the navigation tree-spcific JSON that represents the workspace
   * contents set.
   * @return {!Object} The JSON for workspace contents set.
   */
  // TODO(#219): Move this code to NavigationTree
  getNavTreeJson() {
    const workspaceContentsSetJson = {
      'id': PREFIXES.WORKSPACE_CONTENTS,
      'text': 'Workspaces',
      'children': super.getNavTreeJson()
    };
    return workspaceContentsSetJson;
  }
}
