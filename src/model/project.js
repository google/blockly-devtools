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
 * @fileoverview The Project class represents the project data structure.
 * A project is a collection of one or more libraries along with
 *    any number of toolboxes and/or workspaces. In the course of designing an
 *    application, a developer may want to work on any number of the
 *    aforementioned groupings (library, workspace, toolbox) in various ways.
 *    A project, by providing a structure in which those elements and the blocks
 *    within them are linked, seeks to manage this cycle in a more organized
 *    manner, allowing developers to import and export a structure created based
 *    upon their workflow.
 *
 * @author sagev@google.com (Sage Vouse)
 */
 //TODO #50: change methods for metadata
 //TODO #44: differentiate Project and ProjectController for refactor

/**
 * @class Project aggregates libraries, toolboxes, and workspaces to form
 *    a project.
 */
class Project {
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
    this.projectName = projectName;
    /**
     * Dictionary mapping libary names to library controllers.
     * @type {!Object<string, !BlockLibraryController>}
     */
    this.libraries = {};
    /**
     * Dictionary mapping toolbox names to toolbox controllers.
     * @type {!Object<string, !Toolbox>}
     */
    this.toolboxes = {};
    /**
     * Dictionary mapping workspace names to workspace controllers.
     * @type {!Object<string, !Workspace>}
     */
    this.workspaceBlocks = {};
    /**
     * The current BlockLibraryController being accessed.
     * @type {!BlockLibraryController}
     */
    this.currentLibrary = null;
    /**
     * The current Toolbox being accessed.
     * @type {!Toolbox}
     */
    this.currentToolbox = null;
    // TODO #54: rename this structure
    /**
     * The current Workspace being accessed.
     * @type {!Workspace}
     */
    this.currentWorkspace = null;
  }

  /**
   * Returns an array of all blocks in the project.
   * @return {!Array.<string>} Array of all blockTypes.
   */
  getBlockTypes() {
    var libraryController;
    var libraries = Object.keys(this.libraries);
    var blockTypes = [];
    for (const libraryName of libraries) {
      libraryController = this.libraries[libraryName];
      blockTypes = blockTypes.concat(
        libraryController.getStoredBlockTypes());
    }
    return blockTypes;
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
   * @return {Object} Object mapping block type to XML text.
   */
  getBlockLibraryXmlMap() {
    return this.currentLibrary.storage.getBlockXmlTextMap();
  };

  /**
   * Removes current block from project.
   */
  removeBlockFromProject() {
    this.currentLibrary.removeFromBlockLibrary();
  };

  /**
   * Clears the current library.
   */
  clearLibrary() {
    this.currentLibrary.clearBlockLibrary();
  };

  /**
   * Saves current block.
   */
  saveBlock() {
    this.currentLibrary.saveToBlockLibrary();
  };

  /**
   * Returns whether or not there are unsaved elements in the project.
   * @return {boolean} Whether or not unsaved elements exist.
   */
   //TODO #52: move warning from BlockLibrayrController to ProjectController.
   isDirty() {
    return this.currentLibrary.warnIfUnsavedChanges();
  }
}
