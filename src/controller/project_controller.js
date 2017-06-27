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
   * @param {!Project} project the project from which the data to be managed
   *    comes from.
   * @constructor
   */
  constructor(project) {
    /**
     * The project to be managed.
     * @type {!Project}
     */
    this.project = project;
  }

  /**
   * Return whether or not the project has unsaved changes.
   */
   //TODO #52: move warning behavior here
   warnIfUnsaved() {
    return this.project.isDirty();
  };
}
