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
 * @author sagev (Sage Vouse), celinechoo (Celine Choo)
 */

/**
 * @class ProjectController manages the DevTools Project object's information.
 *    it controls opening and storing blocks, warning about unsaved changes
 *    to libraries, and importing and exporting projects and the elements that
 *    they contain.
 */
//TODO #44: refactor
//TODO #50: manage project metadata
class ProjectController {
  /**
   * ProjectController class
   * @param {string} projectName Name of project object which user is currently
   *     editing.
   * @constructor
   */
  constructor(projectName) {
    /**
     * The project to be managed.
     * @type {!Project}
     */
    this.project = new Project(projectName);

    /**
     * Toolbox Controller.
     * @type {!ToolboxController}
     */
    this.toolboxController = new ToolboxController(this.project);

    /**
     * Workspace Controller.
     * @type {!WorkspaceController}
     */
    this.workspaceController = new WorkspaceController(this.project);

    /**
     * BlockLibrary Controller
     * @type {BlockLibraryController}
     */
    this.blockLibraryController = new BlockLibraryController(this.project);
  }

  /**
   * Creates new project that the ProjectController is controlling.
   *
   * @param {string} newProjectName Name of new project to create that the user
   *     will edit.
   */
  setProject(newProjectName) {
    this.project = new Project(newProjectName);
    this.toolboxController = new ToolboxController(this.project);
    this.workspaceConfigController = new WorkspaceConfigController(this.project);
    this.blockLibraryController = new BlockLibraryController(this.project);
  }

  /**
   * Gets project being currently edited in DevTools.
   *
   * @returns {!Project}
   */
  getProject() {
    return this.project;
  }

  /**
   * Return whether or not the project has unsaved changes.
   */
   //TODO #52: move warning behavior here
  warnIfUnsaved() {
    return this.project.isDirty();
  }

  /**
   * Getter for block library controller.
   *
   * @returns {!BlockLibraryController}
   */
  getBlockLibraryController() {
    return this.blockLibraryController;
  }

  /**
   * Getter for toolbox controller.
   *
   * @returns {!ToolboxController}
   */
  getToolboxController() {
    return this.toolboxController;
  }

  /**
   * Getter for workspace controller. Controls the (1) preloaded blocks,
   * which are called the workspace contents, and the (2) workspace options,
   * which include whether there is a trash can, a grid, etc.
   *
   * @returns {!WorkspaceController}
   */
  getWorkspaceController() {
    return this.workspaceController;
  }
}
