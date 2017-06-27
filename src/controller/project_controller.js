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
 * @fileoverview The ProjectController Class controls the management of the
 *   information contained within projects (libraries, toolboxes, workspaces);
 *   when blocks are opened, storage, warning behavior, importing and exporting.
 *
 * @author sagev@google.com (Sage Vouse)
 */

 /**
  * @class ProjectController manages the DevTools Project object's information.
  *    it controls opening and storing blocks, warning about unsaved changes
  *    to libraries, and importing and exporting projects and the elements that
  *    they contain.
  */
  //TODO #44: refactor
  //TODO #50: manage project metadata

/**
 * @class ProjectController manages warnings for unsaved project data when
 *    exiting the application, access to Project metadata, import and export of
 *    projects and their components, and management of project data on local
 *    local filesystems between sessions.
 */
class ProjectController {

  /**
   * ProjectController class
   * @param {string} projectName Name of project loaded into DevTools.
   * @constructor
   */
  constructor(projectName) {
    /**
     * The project to be managed.
     * @type {!Project}
     */
    this.project = new Project(projectName);

  }

  /**
   * Return whether or not the project has unsaved changes.
   */
   //TODO #52: move warning behavior here
  warnIfUnsaved() {
    return this.project.isDirty();
  };

  /**
   * Retrieves information about project and collects together to download
   * as one folder on user's filesystem. Called from AppController's save
   * function.
   *
   * @returns {!Promise} Resolves with project name if successfully saved;
   *     rejects with error message if user canceled or error came up.
   */
  saveToFile() {
    // Save/store current work.
    this.saveToolbox();
    this.saveLibrary();
    this.saveWorkspace();

    // Prompt to save to filesystem.
    // TODO: Implement
    return new Promise();
  }

  /**
   * Exports sample starter code for user to begin with, in creating a Blockly
   * application. Previously WorkspaceFactoryController.exportInjectFile().
   *
   * @returns {!Promise} Resolves with starter code name if successfully saved;
   *     rejects with error message if user canceled or error came up.
   */
  exportStarterCode() {
    return new Promise();
  }

  /**
   * Saves XML currently in workspace into currently active toolbox under this.toolboxList.
   *
   * @returns {Promise} If saved successfully, resolve with name of toolbox saved;
   *     else reject with error message string.
   */
  saveToolbox() {
    // TODO: Implement
    return new Promise();
  }

  /**
   * Saves library.
   *
   * @returns {Promise} If saved successfully, resolve with name of library saved,
   *     else reject with error message string.
   */
  saveLibrary() {
    // TODO: Implement
    return new Promise();
  }

  /**
   * Saves workspace.
   *
   * @returns {Promise} If saved successfully, resolve with name of workspace saved,
   *     else reject with error message string.
   */
  saveWorkspace() {
    // TODO: Implement.
    return new Promise();
  }
}
