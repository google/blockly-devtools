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
 * @author sagev (Sage Vouse), celinechoo (Celine Choo), evd2014 (Emma Dauterman)
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
   * @param {!Project} project the project from which the data to be managed
   *     comes from.
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
   * Creates new project that the ProjectController is controlling.
   *
   * @param {!Project} newProject New project to create that the user
   *     will edit.
   */
  setProject(newProject) {
    this.project = newProject;
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
   * Adds new toolbox to this.project's toolbox set.
   *
   * @param {!Toolbox} toolbox Toolbox object to add to project.
   */
  addToolbox(toolbox) {
    // TODO: Implement
  }

  /**
   * Removes toolbox from this.project's toolbox set.
   *
   * @param {!Toolbox} toolbox Toolbox object to remove from project.
   */
  removeToolbox(toolboxName) {
    // TODO: Implement
  }

  /**
   * Adds new WorkspaceContents to this.project's workspace contents set.
   *
   * @param {!WorkspaceContents} workspaceContents WorkspaceContents object to
   *     add to project.
   */
  addWorkspaceContents(workspaceContents) {
    // TODO: Implement
  }

  /**
   * Removes WorkspaceContents object from this.project's workspace contents set.
   *
   * @param {!WorkspaceContents} workspaceContents WorkspaceContents object to
   *     remove from project.
   */
  removeWorkspaceContents(workspaceContents) {
    // TODO: Implement
  }

  /**
   * Adds new WorkspaceOptions to this.project. Prompts user to select from
   * a list of checkbox options and name the grouping of options.
   *
   * @param {!WorkspaceOptions} workspaceOptionsName WorkspaceOptions object to
   *     add to project.
   */
  addWorkspaceOptions(workspaceOptions) {
    // TODO: Implement
  }

  /**
   * Removes WorkspaceOptions object from this.project.
   *
   * @param {!WorkspaceOptions} workspaceOptions WorkspaceOptions object to
   *     remove from project.
   */
  removeWorkspaceOptions(workspaceOptions) {
    // TODO: Implement
  }

  /**
   * Adds new BlockLibrary to this.project.
   *
   * @param {!BlockLibrary} blockLibraryName BlockLibrary object to add to
   *     project.
   */
  addBlockLibrary(blockLibraryName) {
    // TODO: Implement
  }

  /**
   * Removes BlockLibrary from project.
   *
   * @param {!BlockLibrary} blockLibrary BlockLibrary object to remove from project.
   */
  removeBlockLibrary(blockLibraryName) {
    // TODO: Implement
  }

  /**
   * Exports XML to file after potentially prompting user for file name.
   *
   * @param {string} exportMode The type of file to export
   *    (WorkspaceFactoryController.MODE_TOOLBOX for the toolbox configuration,
   *    and WorkspaceFactoryController.MODE_PRELOAD for the pre-loaded workspace
   *    configuration)
   */
  exportXmlFile(exportMode) {
    /*
     * TODO: Move in from wfactory_controller.js
     *       Adjust so that this function only generates file content.
     *       Actual file downloading will be done at the AppController level.
     *
     * References:
     * - generateWorkspaceXml()
     * - createAndDownloadFile(fileName, data)
     */
  }

  /**
   * Exports JS file after potentailly prompting user for file name.
   *
   * @param {string} exportMode Component of project being exported; either
   *     toolbox (WorkspaceFactoryController.MODE_TOOLBOX) or preloaded workspace
   *     (WorkspaceFactoryController.MODE_PRELOAD).
   */
  exportJsFile(exportMode) {
    /*
     * TODO: Move in from wfactory_controller.js
     *       Adjust so that it generates file content for files that need to be
     *       JS file types. Actuall file downloading done at AppController level.
     *
     * References:
     * - generateToolboxXml()
     * - generateWorkspaceXml()
     * - generateJsFromXml()
     * - createAndDownloadFile(fileName, data)
     */
  }

  /**
   * Imports and loads either (1) custom toolbox or (2) custom workspace contents
   * into Project object. Catches errors from file reading and prints an error
   * message alerting the user.
   *
   * @param {string} file The path for the file to be imported into the workspace.
   *     Should contain valid toolbox XML.
   * @param {string} importMode The mode corresponding to the type of file the
   *     user is importing (WorkspaceFactoryController.MODE_TOOLBOX or
   *     WorkspaceFactoryController.MODE_PRELOAD).
   * @param {string} fileType The language that the user is importing the toolbox
   *     or workspace in (WorkspaceFactoryController.MODE_JS or
   *     WorkspaceFactoryController.MODE_XML).
   */
  importFile(file, importMode, fileType) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - setMode()
     * - hasElements()
     * - importToolboxFromTree_(tree)
     * - importPreloadFromTree_(tree)
     * - loadXml()
     */
  }

  /**
   * Exports the entire project.
   */
  exportProject() {
    throw "unimplemented: exportProject";
  }
}
