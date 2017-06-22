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
 * A project can be defined as a collection of one or more libraries along with
 * any number of toolboxes and/or workspaces
 *
 * @author sagev (Sage Vouse)
 */

 /**
  * @class Project aggragates libraries, toolboxes, and workspaces to form
  *    a project.
  */
 class Project {
	 /**
	  * Represents a user's collection of Libraries, toolboxes, and workspaces
	  * @param {string} projectName Desired name of project
	  * @param {Object} opt_libraryControllers optional mapping of
	  *    BlockLibraryController names to BlockLibraryControllers
	  * @param {Object} opt_toolbox optional map of Toolbox names to Toolboxes
	  * @param {Object} opt_workspace_blocks optional map of Workspace names to
	  *    Workspaces
	  * @constructor
	  */
	  constructor(projectName, opt_libraryController, opt_toolbox,
	  	opt_workspace_blocks) {
	  	this.projectName = projectName;
	  	this.libraries = opt_libraryControllers | new Object();
	  	this.toolboxes = opt_toolboxes | new Object();
	  	this.workspaceBlocks = opt_workspace_blocks | new Object();
	  }

	  /**
	   * Returns an array of all blocks in the project.
	   * @return {!Array.<string>} array of all blockTypes.
	   */
	   getBlocks() {
	   	var libraryName;
	   	var numLibraries = 0;
	   	var libraries = Object.keys(this.libraries);
	   	var blockTypes = [];
	   	while(libraries[numLibraries]) {
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
	    * @param {string} libraryName the name of the current library
	    */
	    setCurrentLibraryName(libraryName) {
	    	this.currentLibrary = this.libraries[libraryName];
	    }

	   /**
	    * Sets the current toolbox.
	    * @param {string} toolboxName the name of the current toolbox
	    */
	    setCurrentToolboxName(toolboxName) {
	    	this.currentToolbox = this.toolboxes[toolboxName];
	    }

	   /**
	    * Sets the current workspace.
	    * @param {string} workspaceName the name of the current workspace
	    */
	    setCurrentWorkspaceName(workspaceName) {
	    	this.currentWorkspace = workspaceName;
	    }

	   /**
	    * Adds a library to the project.
	    * @param {!BlockLibraryController} library the library to be added
	    */
	    addLibrary(library) {

	    }

	   /**
	    * Adds a toolbox to the project.
	    * @param {!Toolbox} toolbox the toolbox to be added
	    */
	    addToolbox(toolbox) {
	    	//TODO: fill in action
	    }

	   /**
	    * Adds a workspace to the project.
	    * @return {!Workspace} workspace the workspace to be added
	    */
	    addWorkspace(workspace) {
	    	//TODO: fill in action
	    }



 }