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
   *
   * @constructor
   */
  constructor(workspaceContentsSetName, projectName) {
    super(workspaceContentsSetName, projectName);
  }

  /**
   * Adds a workspace contents object to the set.
   * @param {string} workspaceContentsName The name of the workspace contents to
   *     add to the project.
   */
  addWorkspaceContents(workspaceContentsName) {
    super.addResource(workspaceContentsName);
  }

  /**
   * Removes a workspace contents object from the set.
   * @param {string} workspaceContentsName The name of the workspace contents
   *     to be removed.
   */
  removeWorkspaceContents(workspaceContentsName) {
    super.removeResource(libraryName);
  }

  /**
   * Gets a workspace contents object contained within the set.
   * @param {string} workspaceContentsName The workspace contents to be returned.
   * @return {!Object} The workspace contents, or null if they're not in the set.
   */
  getWorkspaceContents(workspaceContentsName) {
    return super.getResource(workspaceContentsName);
  }

  /**
   * Gets the names of all workspace contents contained within the set.
   * @return {Array.<string>} The names of all workspace contents in the set.
   */
  getWorkspaceContentsNames() {
    super.getResourceNames();
  }

  /**
   * Removes a named block from the entire set.
   * @param {string} blockType The name of the block to remove.
   */
  removeBlockFromSet(blockType) {
    throw 'unimplemented: removeBlockFromSet';
  }

  /**
   * Removes a block from a named workspace contents.
   * @param {string} workspaceContentsName The name of the workspace contents
   *     to remove the block from.
   * @param {string} blockType The name of the block to be removed.
   */
  removeBlockFromWorkspaceContents(workspaceContentsName, blockType) {
    throw 'unimplemented: removeBlockFromWorkspaceContents';
  }

  /**
   * Clears a workspace contents object in the set.
   * @param {string} workspaceContentsName The name of the workspace contents
   *     to clear.
   */
  //TODO #103
  clearWorkspaceContents(workspaceContentsName) {
    throw "unimplemented: clearWorkspaceContents";
  }

  /**
   * Produces the JSON needed to organize workspace contents in the tree.
   * @return {!Object} The JSON for the tree's workspace contents section.
   */
  getTreeJson() {
    const workspaceContentsSetJson = [
      {'id': 'WorkspaceContents', 'text': 'Workspace Contents'},
      {'children': super.getTreeJson()}
    ];
    return workspaceContentsSetJson;
  }
}
