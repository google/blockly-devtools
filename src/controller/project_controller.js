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
   * @param {!Project} project The project from which the data to be managed
   *     comes from.
   * @param {!JSTree} tree The tree which represents that project, to be updated
   *     by the controller as the project is.
   * @constructor
   */
  constructor(project, tree) {
    /**
     * The project to be managed.
     * @type {!Project}
     */
    this.project = project;
    /**
     * The tree which represents the project.
     * @type {!JStree}
     */
    this.tree = tree;
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
   * @param {string} toolboxName Name of the toolbox to add to the project.
   */
  addToolbox(toolboxName) {
    this.project.addToolbox(toolboxName);
    this.tree.addComponentNode('Toolbox', toolbox.name);
  }

  /**
   * Adds new WorkspaceContents to this.project's workspace contents set.
   *
   * @param {string} workspaceContentsName Name of the WorkspaceContents to
   *     add to the project.
   */
  addWorkspaceContents(workspaceContentsName) {
    this.project.addWorkspaceContents(workspaceContentsName);
    this.tree.addComponentNode('WorkspaceContents', workspaceContentsName);
  }

  /**
   * Adds new WorkspaceConfiguration to this.project. Prompts user to select from
   * a list of checkbox options and name the grouping of options.
   *
   * @param {string} workspaceConfigName The name of the Workspaceconfiguration
   *     to add to the project.
   */
  addWorkspaceConfiguration(workspaceConfigName) {
    this.project.addWorkspaceConfiguration(workspaceConfigName);
    this.tree.addComponentNode('WorkspaceConfiguration', workspaceConfigName);
  }

  /**
   * Adds new BlockLibrary to this.project.
   *
   * @param {string} blockLibraryName Name of the BlockLibrary to add to the
   *     project.
   */
  addBlockLibrary(blockLibraryName) {
    this.project.addBlockLibrary(blockLibraryName);
    this.tree.addComponentNode('BlockLibrary', blockLibraryName);
  }

  /**
   * Removes toolbox from this.project's toolbox set.
   *
   * @param {string} toolboxName Name of the toolbox to remove from the project.
   */
  removeToolbox(toolboxName) {
    this.project.addToolbox(toolboxName);
    this.tree.deleteComponentNode('Toolbox', toolboxName);
  }

  /**
   * Removes WorkspaceContents object from this.project's workspace contents set.
   *
   * @param {string} workspaceContentsName Name of the WorkspaceContents to
   *     remove from project.
   */
  removeWorkspaceContents(workspaceContentsName) {
    this.project.removeWorkspaceContents(workspaceContentsName);
    this.tree.deleteComponentNode('WorkspaceContents', workspaceContentsName);
  }

  /**
   * Removes a WorkspaceConfiguration from this.project.
   *
   * @param {string} workspaceConfigName Name of the
   *     WorkspaceConfiguration to remove from the project.
   */
  removeWorkspaceConfiguration(workspaceConfigName) {
    this.project.removeWorkspaceConfiguration(workspaceConfigName);
    this.tree.deleteComponentNode('WorkspaceConfiguration', workspaceConfigName);
  }

  /**
   * Removes a BlockLibrary from the project.
   *
   * @param {string} blockLibraryName the name of the BlockLibrary to remove
   *     from the project.
   */
  removeBlockLibrary(blockLibraryName) {
    this.project.removeBlockLibrary(blockLibraryName);
    this.tree.deleteComponentNode('BlockLibrary', blockLibrary.name);
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
    throw 'Unimplemented: exportXmlFile()';
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
    throw 'Unimplemented: exportJsFile()';
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
    throw 'Unimplemented: importFile()';
  }

  /**
   * Generates a string representation of main inject file necessary to create
   * a Blockly application.
   * Auto-injects added toolbox into the inject function.
   *
   * @return {string} String representation of starter code for inject file.
   */
  generateInjectString() {
    /*
     * TODO: Move in from wfactory_generator.js:generateInjectString(toolboxXml)
     *
     * References:
     * - N/A
     */
    throw 'Unimplemented: generateInjectString()';
  }

  /**
   * Exports the entire project.
   */
  exportProject() {
    throw "unimplemented: exportProject";
  }
}
