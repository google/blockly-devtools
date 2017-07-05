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

 //TODO #50: change methods for metadata
 //TODO #44: differentiate Project and ProjectController for refactor

/**
 * @class Project is a collection of one or more libraries along with
 *    any number of toolboxes and/or workspace contents and configurations. It
 *    organizes all potential elements of a single development cycle.
 *
 * @author sagev@google.com (Sage Vouse)
 */
class Project extends Resource {
  /**
   * Represents a user's collection of Libraries, toolboxes, and workspaces.
   * @param {string} projectName The desired name of project.
   * @constructor
   */
  constructor(projectName) {
    /**
     * The name of the project.
     * @type {string}
     */
    super(projectName);
    /**
     * The libraries in the project.
     * @type {!BlockLibrarySet}
     */
    this.libraries = new BlockLibrarySet();
    /**
     * The toolboxes in the project.
     * @type {!ToolboxSet}
     */
    this.toolboxes = new ToolboxSet;
    /**
     * The workspace contents objects in the project.
     * @type {!WorkspaceContentsSet}
     */
    this.workspaceContents = new WorkspaceContents;
    /**
     * The workspace configurations in the project.
     * @type {!WorkspaceConfigurationsSet}
     */
    this.workspaceConfigs = new WorkspaceConfigurationsSet;
  }

  /**
   * Returns an array of all blocks in the project.
   * @return {!Array.<string>} Array of all blockTypes.
   */
  getBlockTypes() {
    return this.libraries.getAllBlockTypes();
  }

  /**
   * Returns an array of all BlockLibraryController names (for storage).
   * @return {!Array.<string>} Array of all library names
   */
  getLibraryNames() {
    return Object.keys(this.libraries);
  }

  /**
   * Returns an array of all toolbox names (for storage).
   * @return {!Array.<string>} Array of all toolbox names
   */
  getToolboxNames() {
    return Object.keys(this.toolboxes);
  }

  /**
   * Returns an array of all workspace names (for storage).
   * @return {!Array.<string>} Array of all workspace names
   */
  getWorkspaceNames() {
    return Object.keys(this.workspaces);
  }

  /**
   * Checks whether or not a given Toolbox, Workspace, or Library is contained
   *   in the project.
   * @param {!Object} component The Toolbox, Workspace, or
   *    BlockLibraryController which may or may not be in the project.
   * @param {!Array.<string>} componentArray The array of Library, Toolbox, or
   *    Workspace names to check.
   */
  hasComponent(component, componentArray) {
    var componentName = component.name;
    return componentArray.includes(component.name);
  }

  /**
   * Sets the current library.
   * @param {!BlockLibraryController} library The library to be set.
   */
  setCurrentLibrary(library) {
    if (this.hasComponent(library, this.getLibraryNames())) {
      this.currentLibrary = this.libraries[library.name];
    } else {
      this.addLibrary(library);
      this.currentLibrary = library;
    }
  }

  /**
   * Sets the current toolbox.
   * @param {!Toolbox} toolbox The toolbox to be set.
   */
  setCurrentToolbox(toolbox) {
    if (this.hasComponent(toolbox, this.getToolboxNames())) {
      this.currentToolbox = this.toolboxes[toolbox.name];
    } else {
      this.addToolbox(toolbox);
      this.currentToolbox = toolbox;
    }
  }

  /**
   * Sets the current workspace.
   * @param {!Workspace} workspace The workspace to be set.
   */
  setCurrentWorkspace(workspace) {
    if (this.hasComponent(workspace, this.getWorkspaceNames())) {
      this.currentWorkspace = this.workspaces[workspace.name];
    } else {
      this.addWorkspace(workspace);
      this.currentWorkspace = workspace;
    }
  }

  /**
   * Adds a block to the project, by adding it to the current library.
   * @param {string} blockType The name of the block to be added.
   */
  addBlockToProject(blockType) {
    throw "unimplemented: addBlockToProject";
  }

  /**
   * Adds a library to the project.
   * @param {!BlockLibraryController} library The library to be added.
   */
  addLibrary(library) {
    this.libraries[library.name] = library;
  }

  /**
   * Adds a toolbox to the project.
   * @param {!Toolbox} toolbox The toolbox to be added.
   */
  addToolbox(toolbox) {
    this.toolboxes[toolbox.name] = toolbox;
  }

  /**
   * Adds a workspace to the project.
   * @return {!Workspace} workspace The workspace to be added.
   */
  addWorkspace(workspace) {
    this.workspaces[workspace.name] = workspace;
  }

  /**
   * Returns current block library mapping block type to XML.
   * @return {!Object<string, Element>} Object mapping block type to XML text.
   */
  getBlockLibraryXmlMap() {
    return this.currentLibrary.storage.getBlockXmlTextMap();
  }

  /**
   * Removes block currently being edited from project.
   *
   */
  removeBlockFromProject() {
    this.currentLibrary.removeFromBlockLibrary();
  }

  /**
   * Clears the current library.
   */
  clearLibrary() {
    this.currentLibrary.clearBlockLibrary();
  }

  /**
   * Saves block currently being edited.
   */
  saveBlock() {
    this.currentLibrary.saveToBlockLibrary();
  }

  /**
   * Returns whether or not there are unsaved elements in the project.
   * @return {boolean} Whether or not unsaved elements exist.
   */
  //TODO #52: move warning from BlockLibraryController to ProjectController.
  isDirty() {
    return this.currentLibrary.warnIfUnsavedChanges();
  }

  /**
   * Renames the project.
   * @param {string} newName New name of the project.
   */
  setName(newName) {
    /*
     * TODO: implement
     *
     * References: N/A
     */
    throw "unimplemented: setName";
  }

  /**
   * Returns boolean of whether or not a given blockType is stored in the
   *     project.
   * @param {string} blockType Type of block.
   * @return {boolean} Whether or not blockType is stored in block library.
   */
  has(blockType) {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - has(blockType)
     *
     * Additional reference: src/block_library_controller.js
     * - has(blockType)
     *
     */
    throw "unimplemented: has";
  }

  /**
   * Gets a named toolbox contained within the project.
   * @param {string} toolboxName The name of the toolbox to be found.
   * @return {!Toolbox} The found toolbox or null.
   */
  getToolbox(toolboxName) {
    /*
     * TODO: implement
     *
     * References: N/A
     */
    throw "unimplemented: getToolbox";
  }

  /**
   * Gets a named library contained within the project.
   * @param {string} libraryName The name of the library to be found.
   * @return {!BlockLibrary} The found library or null.
   */
  getLibrary(libraryName) {
    /*
     * TODO: implement
     *
     * References: N/A
     */
    throw "unimplemented: getLibrary";
  }

  /**
   * Gets a named workspace contents object contained within the project.
   * @param {string} workspaceContentsName The name of the workspace contents
   *     to be found.
   * @return {!WorkspaceContents} The found workspace contents or null.
   */
  getWorkspaceContents(workspaceContentsName) {
    /*
     * TODO: implement
     *
     * References: N/A
     */
    throw "unimplemented: getWorkspaceContents";
  }

  /**
   * Gets a named workspace configuration object contained within the project.
   * @param {string} workspaceConfigsName Name of the workspace configuration
   *     to be found.
   * @return {!WorkspaceContents} The found workspace configuration or null.
   */
  getWorkspaceConfiguration(workspaceConfigName) {
    /*
     * TODO: implement
     *
     * References: N/A
     */
    throw "unimplemented: getWorkspaceConfiguration";
  }

  /**
   * Gets the data necessary to export the project.
   * @return {!Object} The data needed to export the project.
   */
  getExportData() {
    //TODO: implement
    throw "unimplemented: getExportData";
  }
}
