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

/**
 * @class Project is a collection of one or more libraries along with
 *    any number of toolboxes and/or workspace contents and configurations. It
 *    organizes all potential elements of a single development cycle.
 *
 * @author sagev@google.com (Sage Vouse)
 */
class Project extends Resource {
  /**
   * Project Class.
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
    this.librarySet = new BlockLibrarySet();
    /**
     * The toolboxes in the project.
     * @type {!ToolboxSet}
     */
    this.toolboxSet = new ToolboxSet();
    /**
     * The workspace contents in the project.
     * @type {!WorkspaceContentsSet}
     */
    this.workspaceContentsSet = new WorkspaceContentsSet();
    /**
     * The workspace configurations in the project.
     * @type {!WorkspaceConfigurationsSet}
     */
    this.workspaceConfigSet = new WorkspaceConfigurationsSet();
  }

  /**
   * Returns an array of all blocks types in the project.
   * @return {!Array.<string>} Array of all block types in the project.
   */
  getBlockTypes() {
    return this.librarySet.getAllBlockTypes();
  }

  /**
   * Returns an array of all BlockLibraryController names (for storage).
   * @return {!Array.<string>} Array of all library names.
   */
  getLibraryNames() {
    return this.librarySet.getLibraryNames();
  }

  /**
   * Returns an array of all toolbox names (for storage).
   * @return {!Array.<string>} Array of all toolbox names.
   */
  getToolboxNames() {
    return this.toolboxSet.getToolboxNames();
  }

  /**
   * Returns an array of all workspace contents names (for storage).
   * @return {!Array.<string>} Array of all workspace contents names.
   */
  getWorkspaceContentsNames() {
    return this.workspaceContentsSet.getWorkspaceNames();
  }

  /**
   * Returns an array of all workspace configuration names (for storage).
   * @return {!Array.<string>} Array of all workspace configuration names.
   */
  getWorkspaceConfigurationNames() {
    return this.workspaceConfigSet.getWorkspaceConfigurationNames();
  }

  /**
   * Adds a block to the project by adding it to the named block library.
   * @param {!BlockDefinition} blockDefinition The block definition to add to
   *     the project.
   * @param {string} libraryName The name of the library to add the block to.
   */
  addBlockToProject(libraryName, blockDefinition) {
    this.librarySet.addBlockToLibrary(libraryName, blockDefinition);
  }

  /**
   * Adds a library to the project.
   * @param {string} libraryName The name of the library to be added.
   */
  addLibrary(libraryName) {
    this.librarySet.addLibrary(libraryName);
  }

  /**
   * Adds a toolbox to the project.
   * @param {string} toolboxName The name of the toolbox to be added.
   */
  addToolbox(toolboxName) {
    this.toolboxSet.addToolbox(toolbox);
  }

  /**
   * Adds named workspace contents to the project.
   * @param {string} workspaceContentsName The name of the workspace contents to
   *     be added.
   */
  addWorkspaceContents(workspaceContentsName) {
    this.workspaceContentsSet.addWorkspaceContents(workspaceContentsName);
  }

  /**
   * Adds a workspace configuration to the project.
   * @param {string} workspaceConfigName The workspace configuration to be added.
   */
  addWorkspaceConfiguration(workspaceConfigName) {
    this.workspaceConfigSet.addWorkspaceConfiguration(workspaceConfigName);
  }

  /**
   * Returns a map of all block types in the project to their definitions.
   * @return {!Object<string, !BlockDefinition>} Map of all block types to their
   *     definitions.
   */
  getAllBlockDefinitionsMap() {
    return this.librarySet.getAllBlockDefinitionsMap();
  }

  /**
   * Returns a map of all block types in a named library in the project to their
   *     definitions.
   * @param {string} libraryName The name of the library to get the map from.
   * @return {!Object<string, !BlockDefinition>} Map of the library's block types
   *     to their definitions, or null if the library is not in the project.
   */
  getLibraryBlockDefinitionMap(libraryName) {
    return this.librarySet.getBlockDefinitionMap(libraryName);
  }

  /**
   * Removes a block definition from project.
   * @param {string} blockType The name of the block to be removed.
   */
  //TODO #89: determine specifics of deletion from a project
  //TODO #90: sort out specifics of deletion for descendants
  removeBlockFromProject(blockType) {
    this.librarySet.removeBlockFromSet(blockType);
    this.toolboxSet.removeBlockFromSet(blockType);
    this.workspaceContentsSet.removeBlockFromSet(blockType);
  }

  /**
   * Clears a named library in the project.
   * @param {string} libraryName The name of the library to be cleared.
   */
  clearLibrary(libraryName) {
    this.librarySet.clearLibrary(libraryName);
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
    this.name = newName;
  }

  /**
   * Returns boolean of whether or not a given blockType is defined in a block
   *     library in this Project.
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
    throw 'unimplemented: has';
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
    throw 'unimplemented: getToolbox';
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
    throw 'unimplemented: getLibrary';
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
    throw 'unimplemented: getWorkspaceContents';
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
    throw 'unimplemented: getWorkspaceConfiguration';
  }

  /**
   * Gets the data necessary to export the project.
   * @return {!Object} The data needed to export the project.
   */
  getExportData() {
    //TODO: implement
    throw 'unimplemented: getExportData';
  }

  /**
   * Gets the JSON object necessary to represent the project in the navigation
   *     tree.
   * @return {!Object} The tree-specific JSON representation of the project.
   */
  getTreeJson() {
    throw 'unimplemented: getTreeJson';
  }
}
