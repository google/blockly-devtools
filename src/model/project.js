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
   * Adds a library to the library set.
   *
   * @param {!BlockLibrary} blockLibrary BlockLibrary object to add to the
   *     project.
   */
  addBlockLibrary(blockLibrary) {
    this.librarySet.addLibrary(blockLibrary);
  }

  /**
   * Adds new toolbox to the toolbox set.
   *
   * @param {!Toolbox} toolbox Toolbox object to add to the project.
   */
  addToolbox(toolbox) {
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
   * Removes a library from the library set.
   *
   * @param {!BlockLibrary} blockLibrary BlockLibrary object to remove from the
   *     project.
   */
  removeBlockLibrary(blockLibrary) {
    this.librarySet.addLibrary(blockLibrary);
  }

  /**
   * Removes a toolbox from the toolbox set.
   *
   * @param {!Toolbox} toolbox Toolbox object to remove from the project.
   */
  removeToolbox(toolbox) {
    this.toolboxSet.addToolbox(toolbox);
  }

  /**
   * Removes a workspace contents object from the project.
   * @param {string} workspaceContentsName The name of the workspace contents to
   *     remove.
   */
  removeWorkspaceContents(workspaceContentsName) {
    this.workspaceContentsSet.addWorkspaceContents(workspaceContentsName);
  }

  /**
   * Removes a workspace configuration from the project.
   * @param {string} workspaceConfigName The workspace configuration to remove.
   */
  removeWorkspaceConfiguration(workspaceConfigName) {
    this.workspaceConfigSet.addWorkspaceConfiguration(workspaceConfigName);
  }

  /**
   * Clears a named library in the project.
   * @param {string} libraryName The name of the library to be cleared.
   */
  clearLibrary(libraryName) {
    this.librarySet.clearLibrary(libraryName);
  }

  /**
   * Clears a named toolbox in the project.
   * @param {string} toolboxName The name of the toolbox to be cleared.
   */
  clearToolbox(toolboxName) {
    this.toolboxSet.clearToolbox(toolboxName);
  }

  /**
   * Clears a named workspace contents in the project.
   * @param {string} workspaceContentsName The name of the contents to clear.
   */
  clearWorkspaceContents(workspaceContentsName) {
    this.workspaceContentsSet.clearWorkspaceContents(workspaceContentsName);
  }

  /**
   * Returns a named workspace configuration in the project to default settings.
   * @param {string} workspaceConfigName The name of the workspace configuration
   *     to be reset.
   */
  resetWorkspaceConfiguration(workspaceConfigName) {
    this.workspaceConfigSet.resetWorkspaceConfiguration(workspaceConfigName);
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
    return this.librarySet.hasBlock(blockType);
  }

  /**
   * Gets a named toolbox contained within the project.
   * @param {string} toolboxName The name of the toolbox to be found.
   * @return {!Toolbox} The found toolbox or null.
   */
  getToolbox(toolboxName) {
    return this.toolboxSet.getToolbox(toolboxName);
  }

  /**
   * Gets a named library contained within the project.
   * @param {string} libraryName The name of the library to be found.
   * @return {!BlockLibrary} The found library or null.
   */
  getLibrary(libraryName) {
    return this.librarySet.getLibrary(libraryName);
  }

  /**
   * Gets a named workspace contents object contained within the project.
   * @param {string} workspaceContentsName The name of the workspace contents
   *     to be found.
   * @return {!WorkspaceContents} The found workspace contents or null.
   */
  getWorkspaceContents(workspaceContentsName) {
    return this.workspaceContentsSet.getWorkspaceContents(workspaceContentsName);
  }

  /**
   * Gets a named workspace configuration object contained within the project.
   * @param {string} workspaceConfigsName Name of the workspace configuration
   *     to be found.
   * @return {!WorkspaceContents} The found workspace configuration or null.
   */
  getWorkspaceConfiguration(workspaceConfigName) {
    return this.workspaceConfigSet.getWorkspaceConfiguration(workspaceConfigName);
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
   * Produces the JSON for needed to organize libraries in the tree.
   * @return {!Object} The JSON for the tree's library section.
   */
  librarySetJson() {
    const projectTree = [
    {'id': 'BlockLibrary', 'text': 'Libraries'},
    {'children': [ this.librarySet.getTreeJson()]}
    ];
  }

  /**
   * Produces the JSON for needed to organize toolboxes in the tree.
   * @return {!Object} The JSON for the tree's toolbox section.
   */
  toolboxSetJson() {
    const projectTree = [
    {'id': 'Toolbox', 'text': 'Toolboxes'},
    {'children': this.toolboxSet.getTreeJson()}
    ];
  }

  /**
   * Produces the JSON for needed to organize workspace contents in the tree.
   * @return {!Object} The JSON for the tree's workspace contents section.
   */
  workspaceContentsSetJson() {
    const projectTree = [
    {'id': 'WorkspaceContents', 'text': 'Workspace Contents'},
    {'children': [ this.librarySetJson(), this.toolboxSetJson(),
      this.workspaceContentsSetJson(), this.workspaceConfigSetJson()]
    };
  }

  /**
   * Produces the JSON for needed to organize workspace configurations in the tree.
   * @return {!Object} The JSON for the tree's workspace configuration section.
   */
  workspaceConfigSetJson() {
    const projectTree = [
    {'id': 'WorkspaceConfiguration', 'text': 'Workspace Configurations'},
    {'children': [ this.librarySetJson(), this.toolboxSetJson(),
      this.workspaceContentsSetJson(), this.workspaceConfigSetJson()]
    };
  }
  /**
   * Gets the JSON object necessary to represent the project in the navigation
   *     tree.
   * @return {!Object} The tree-specific JSON representation of the project.
   */
  getTreeJson() {
    const projectTree = [
    {'id': this.name, 'text': this.name},
    {'children': [ this.librarySetJson(), this.toolboxSetJson(),
      this.workspaceContentsSetJson(), this.workspaceConfigSetJson()]
    };
    //  this.librarySet.getTreeJson(), this.workspaceConfigSet.getTreeJson(),
    //  this.workspaceContentsSet.getTreeJson(), this.toolboxSet.getTreeJson()
    ];
    return projectTree;
  }
}
