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

goog.provide('Project');

goog.require('BlockLibrarySet');
goog.require('Resource');
goog.require('ToolboxSet');
goog.require('WorkspaceContentsSet');
goog.require('WorkspaceConfigurationSet');

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
    super(projectName, PREFIXES.PROJECT);

    /**
     * The libraries in the project.
     * @type {!BlockLibrarySet}
     */
    this.librarySet = new BlockLibrarySet('Library Set', this.name);
    /**
     * The toolboxes in the project.
     * @type {!ToolboxSet}
     */
    this.toolboxSet = new ToolboxSet('Toolbox Set', this.name);
    /**
     * The workspace contents in the project.
     * @type {!WorkspaceContentsSet}
     */
    this.workspaceContentsSet = new WorkspaceContentsSet('Contents', this.name);
    /**
     * The workspace configurations in the project.
     * @type {!WorkspaceConfigurationSet}
     */
    this.workspaceConfigSet = new WorkspaceConfigurationSet('Configs', this.name);
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
  getBlockLibraryNames() {
    return this.librarySet.getNames();
  }

  /**
   * Returns an array of all toolbox names (for storage).
   * @return {!Array.<string>} Array of all toolbox names.
   */
  getToolboxNames() {
    return this.toolboxSet.getNames();
  }

  /**
   * Returns an array of all workspace contents names (for storage).
   * @return {!Array.<string>} Array of all workspace contents names.
   */
  getWorkspaceContentsNames() {
    return this.workspaceContentsSet.getNames();
  }

  /**
   * Returns an array of all workspace configuration names (for storage).
   * @return {!Array.<string>} Array of all workspace configuration names.
   */
  getWorkspaceConfigurationNames() {
    return this.workspaceConfigSet.getNames();
  }

  /**
   * Adds a library to the library set.
   *
   * @param {!BlockLibrary} blockLibrary The BlockLibrary to add to the
   *     project.
   */
  addBlockLibrary(blockLibrary) {
    this.librarySet.add(blockLibrary);
  }

  /**
   * Adds new toolbox to the toolbox set.
   *
   * @param {!Toolbox} toolbox The toolbox to add to the project.
   */
  addToolbox(toolbox) {
    this.toolboxSet.add(toolbox);
  }

  /**
   * Adds named workspace contents to the project.
   * @param {!WorkspaceContents} workspaceContents The WorkspaceContents to
   *     add to the project.
   */
  addWorkspaceContents(workspaceContents) {
    this.workspaceContentsSet.add(workspaceContents);
  }

  /**
   * Adds a workspace configuration to the project.
   * @param {!WorkspaceConfiguration} workspaceConfig The WorkspaceConfiguration
   *     to add to the project.
   */
  addWorkspaceConfiguration(workspaceConfig) {
    this.workspaceConfigSet.add(workspaceConfig);
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
   * Removes a library from the library set.
   *
   * @param {string} blockLibraryName The name of the BlockLibrary to remove
   *     from the project.
   */
  removeBlockLibrary(blockLibraryName) {
    this.librarySet.remove(blockLibraryName);
  }

  /**
   * Removes a toolbox from the toolbox set.
   *
   * @param {string} toolboxName Name of the toolbox to remove from project.
   */
  removeToolbox(toolboxName) {
    this.toolboxSet.remove(toolboxName);
  }

  /**
   * Removes a workspace contents object from the project.
   * @param {string} workspaceContentsName The name of the workspace contents to
   *     remove.
   */
  removeWorkspaceContents(workspaceContentsName) {
    this.workspaceContentsSet.remove(workspaceContentsName);
  }

  /**
   * Removes a workspace configuration from the project.
   * @param {string} workspaceConfigName The workspace configuration to remove.
   */
  removeWorkspaceConfiguration(workspaceConfigName) {
    this.workspaceConfigSet.remove(workspaceConfigName);
  }

  /**
   * Removes a block from the project.
   *
   * @param {string} blockType The name of the block to remove.
   */
  removeBlock(blockType) {
    const library = this.librarySet.getLibrary(blockType);
    if (library != null) {
      library.remove(blockType);
    }
  }

  /**
   * Returns boolean of whether or not a given blockType is defined in a block
   *     library in this Project.
   * @param {string} blockType Type of block.
   * @return {boolean} Whether or not blockType is stored in block library.
   */
  hasBlockDefinition(blockType) {
    return this.librarySet.has(blockType);
  }

  /**
   * Gets a named BlockDefinition object within the project.
   * @param {string} blockName Name of the block definition to be found.
   * @return {?Toolbox} The found BlockDefinition or null.
   */
  getBlockDefinition(blockName) {
    return this.librarySet.getAllBlockDefinitionsMap()[blockName];
  }

  /**
   * Gets a named toolbox contained within the project.
   * @param {string} toolboxName The name of the toolbox to be found.
   * @return {?Toolbox} The found toolbox or null.
   */
  getToolbox(toolboxName) {
    return this.toolboxSet.get(toolboxName);
  }

  /**
   * Gets a named library contained within the project.
   * @param {string} libraryName The name of the library to be found.
   * @return {?BlockLibrary} The found library or null.
   */
  getBlockLibrary(libraryName) {
    return this.librarySet.get(libraryName);
  }

  /**
   * Gets a named workspace contents object contained within the project.
   * @param {string} workspaceContentsName The name of the workspace contents
   *     to be found.
   * @return {?WorkspaceContents} The found workspace contents or null.
   */
  getWorkspaceContents(workspaceContentsName) {
    return this.workspaceContentsSet.get(workspaceContentsName);
  }

  /**
   * Gets a named workspace configuration object contained within the project.
   * @param {string} workspaceConfigsName Name of the workspace configuration
   *     to be found.
   * @return {?WorkspaceConfiguration} The found workspace configuration or null.
   */
  getWorkspaceConfiguration(workspaceConfigName) {
    return this.workspaceConfigSet.get(workspaceConfigName);
  }

  /**
   * Renames BlockDefinition of a given name to a new name. Assumes that the new
   * name is not already taken.
   * @param {string} oldName Name of BlockDefinition to change.
   * @param {string} newName New name of BlockDefinition object.
   */
  renameBlockDefinition(oldName, newName) {
    this.librarySet.renameBlock(oldName, newName);
  }

  /**
   * Gets the JSON object necessary to represent the project in the navigation
   *     tree.
   * @return {!Object} The tree-specific JSON representation of the project.
   */
  // TODO(#219): Move this code to NavigationTree
  getNavTreeJson() {
    const projectJson = $.extend(true, super.getNavTreeJson(),
      { 'id': PREFIXES.PROJECT, 'text': this.name,
        'children': [ this.librarySet.getNavTreeJson(),
          this.toolboxSet.getNavTreeJson(),
          this.workspaceContentsSet.getNavTreeJson()]}
    );
    return projectJson;
  }

  /**
   * Gets a flat list of objects containing the data for all resources in the
   * project.
   * @return {Array.<Object>} Flat list of data for all resources in the project.
   */
  getFullResourceList() {
    let resourceList = [];
    resourceList = resourceList.concat(this.librarySet.getMetadata());
    resourceList = resourceList.concat(this.toolboxSet.getMetadata());
    resourceList = resourceList.concat(this.workspaceContentsSet.getMetadata());
    resourceList = resourceList.concat(this.workspaceConfigSet.getMetadata());
    return resourceList;
  }

  /**
   * Modifies the JSON object that comprises the project's metadata.
   * @param {!Object} obj Object to extend with necessary data.
   * @return {!Object} The project metadata.
   */
  buildMetadata(obj) {
    super.buildMetadata(obj);
    delete obj.web;
    obj.resources = this.getFullResourceList();
    obj.platform = 'web';
  }
}
