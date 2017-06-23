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
 * any number of toolboxes and/or workspaces.
 *
 * @author sagev@google.com (Sage Vouse)
 */

 /**
  * @class Project aggregates libraries, toolboxes, and workspaces to form
  *    a project.
  */
 class Project {
    /**
     * Represents a user's collection of Libraries, toolboxes, and workspaces
     * @param {string} projectName Desired name of project
     * @constructor
     */
    constructor(projectName) {
      this.projectName = projectName;
      this.libraries = new Object();
      this.toolboxes = new Object();
      this.workspaceBlocks = new Object();
      this.currentLibrary = null;
    }

    /**
     * Returns an array of all blocks in the project.
     * @return {!Array.<string>} array of all blockTypes.
     */
    getBlockTypes() {
    	var libraryName;
    	var numLibraries = 0;
    	var libraries = Object.keys(this.libraries);
    	var blockTypes = [];
    	while (libraries[numLibraries]) {
    		libraryName = libraries[numLibraries];
    		libraryController = this.libraries[libraryName];
    		blockTypes = blockTypes.concat(
    			libraryController.getStoredBlockTypes());
    	  }
    	return blockTypes;
    }

    /**
     * Returns an array of all BlockLibraryController names (for storage).
     * @return {!Array.<string>} array of all library names
     */
    getLibraryNames() {
    	return Object.keys(this.libraries);
    }

    /**
     * Returns an array of all toolbox names (for storage).
     * @return {!Array.<string>} array of all toolbox names
     */
    getToolboxNames() {
    	return Object.keys(this.toolboxes);
    }

    /**
     * Returns an array of all workspace names (for storage).
     * @return {!Array.<string>} array of all workspace names
     */
    getWorkspaceNames() {
    	return Object.keys(this.workspaces);
    }

    /**
     * Sets the current library.
     * @param {string} library the library to be set
     */
    setCurrentLibrary(library) {
    	var libraryName = library.name;
    	var libraries = this.getLibraryNames;
    	if (!$.inArray(libraryName, libraries)) {
    		this.currentLibrary = this.libraries[libraryName];
    	}
    	this.currentLibrary = library;
    }

    /**
     * Sets the current toolbox.
     * @param {string} toolboxName the name of the current toolbox
     */
    setCurrentToolbox(toolboxName) {
    	this.currentToolbox = this.toolboxes[toolboxName];
    }

    /**
     * Sets the current workspace.
     * @param {string} workspaceName the name of the current workspace
     */
    setCurrentWorkspace(workspaceName) {
    	this.currentWorkspace = workspaceName;
    }

    /**
     * Adds a block to the project, by adding it to the current library.
     * @param {string} blockType the block to be added
     */
    addBlockToProject(blockType) {
      //TODO: add functionality
    }

    /**
     * Adds a library to the project.
     * @param {!BlockLibraryController} library the library to be added
     */
    addLibrary(library) {
    	var toAdd = { key: library.name, value: library};
    	this.libraries.push(toAdd);
    }

    /**
     * Adds a toolbox to the project.
     * @param {!Toolbox} toolbox the toolbox to be added
     */
    addToolbox(toolbox) {
    	//TODO: add functionality
    }

    /**
     * Adds a workspace to the project.
     * @return {!Workspace} workspace the workspace to be added
     */
    addWorkspace(workspace) {
      //TODO: add functionality
    }

    /**
     * Returns current block library mapping block type to XML.
     * @return {Object} Object mapping block type to XML text.
     */
    getBlockLibraryXmlMap() {
      return this.currentLibrary.storage.getBlockXmlTextMap();
    };

    /**
     * Removes current block from project
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
     * If there are unsaved changes to the project, checks if user wants to
     * proceed, knowing that they will lose their changes.
     * @return {boolean} Whether or not to proceed.
     */
    warnIfUnsaved() {
      return this.currentLibrary.warnIfUnsavedChanges();
    };
 }