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
 * @fileoverview WorkspaceController manages user interaction with the
 * workspace configurations, which include (1) blocks that are pre-loaded onto a
 * developer's Blockly workspace, and (2) Blockly.Options which configure the
 * settings on a developer's workspace (e.g. trashcan, RTL/LTR, etc.).
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo)
 */
class WorkspaceController {
  constructor(project) {
    /**
     * Project whose library is controlled by this BlockLibraryController instance.
     * @type {!Project}
     */
    this.project = project;

    /**
     * Keeps track of what WorkspaceContents is currently being edited. Stores
     * name of WorkspaceContents.
     * @type {string}
     */
    this.currentWorkspaceContentsName = '';
  }

  /**
   * Adds new WorkspaceContents to this.project.
   *
   * @param {string} workspaceContentsName Name of WorkspaceContents to add.
   */
  addWorkspaceContents(workspaceContentsName) {
    // TODO: Implement
  }

  /**
   * Removes WorkspaceContents object from this.project.
   *
   * @param {string} workspaceContentsName Name of WorkspaceContents object
   *     to remove from project.
   */
  removeWorkspaceContents(workspaceContentsName) {
    // TODO: Implement
  }

  /**
   * Adds new WorkspaceOptions to this.project. Prompts user to select from
   * a list of checkbox options and name the grouping of options.
   *
   * @param {string} workspaceOptionsName Name of WorkspaceOptions to add.
   */
  addWorkspaceOptions(workspaceOptionsName) {
    // TODO: Implement
  }

  /**
   * Removes WorkspaceOptions object from this.project.
   *
   * @param {string} workspaceOptionsName Name of WorkspaceOptions to remove from
   *     project.
   */
  removeWorkspaceOptions(workspaceOptionsName) {
    // TODO: Implement
  }
}
