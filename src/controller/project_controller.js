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

goog.provide('ProjectController');

goog.require('Project');
goog.require('WorkspaceContents');

/**
 * @fileoverview The ProjectController Class controls the management of the
 *   information contained within projects (libraries, toolboxes, workspaces);
 *   when blocks are opened, storage, warning behavior, importing and exporting.
 *
 * @author sagev (Sage Vouse), celinechoo (Celine Choo), evd2014 (Emma Dauterman)
 */

// TODO(#50): Manage project metadata
class ProjectController {
  /**
   * ProjectController class
   * @param {!Project} project The project from which the data to be managed
   *     comes from.
   * @param {!NavigationTree} tree The tree which represents that project, to be
   *     updated by the controller alongside it.
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
     * @type {!NavigationTree}
     */
    this.tree = tree;
  }

  /**
   * Static constant used to determine the export type of a resource as JavaScript.
   * @return {string} String constant to represent JavaScript.
   */
  static get TYPE_JS() {
    return 'js';
  }

  /**
   * Static constant used to determine the export type of a resource as XML.
   * @return {string} String constant to represent XML.
   */
  static get TYPE_XML() {
    return 'xml';
  }

  /**
   * Given the name of a block, returs the BlockLibrary that it belongs to.
   * Returns null if it does not exist within the project.
   * @param {string} blockType Block name of a BlockDefinition.
   * @return {?BlockLibrary} BlockLibrary to which the given block type belongs,
   *     or null if it DNE.
   */
  getLibrary(blockType) {
    return this.project.librarySet.getLibrary(blockType);
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
   * Creates and adds new block definition to the project.
   *
   * @param {string} blockType Name of the block to add to the project.
   * @param {!string} libraryName The library to add it to.
   * @return {!BlockDefinition} The new block definition added to the project.
   */
  createBlockDefinition(blockType, libraryName) {
    //TODO #105: check for valid name, throw error upon conflict
    const block = new BlockDefinition(blockType);
    this.addBlockDefinition(block, libraryName);
    return block;
  }

  /**
   * Creates and adds new BlockLibrary to this.project.
   *
   * @param {string} blockLibraryName Name of the BlockLibrary to add to the
   *     project.
   * @return {!BlockLibrary} The new library added to the project.
   */
  createBlockLibrary(blockLibraryName) {
    //TODO #105: check for valid name, throw error upon conflict
    const blockLibrary = new BlockLibrary(blockLibraryName);
    this.addBlockLibrary(blockLibrary);
    return blockLibrary;
  }

  /**
   * Creates and adds new toolbox to this.project's toolbox set.
   *
   * @param {string} toolboxName Name of the toolbox to add to the project.
   * @return {!Toolbox} The new toolbox added to the project.
   */
  createToolbox(toolboxName) {
    //TODO #105: check for valid name, throw error upon conflict
    const toolbox = new Toolbox(toolboxName);
    this.addToolbox(toolbox);
    return toolbox;
  }

  /**
   * Creates and adds new WorkspaceContents to the workspace contents set.
   *
   * @param {string} workspaceContentsName Name of the WorkspaceContents to
   *     add to the project.
   * @return {!WorkspaceContents} The new workspace contents added to the project.
   */
  createWorkspaceContents(workspaceContentsName) {
    //TODO #105: check for valid name, throw error upon conflict
    const workspaceContents = new WorkspaceContents(workspaceContentsName);
    this.addWorkspaceContents(workspaceContents);
    return workspaceContents;
  }

  /**
   * Creates and adds new WorkspaceConfiguration to this.project.
   *
   * @param {string} workspaceConfigName The name of the WorkspaceConfiguration
   *     to add to the project.
   * @return {!WorkspaceConfiguration} The new workspace configuration added to
   *     the project.
   */
  createWorkspaceConfiguration(workspaceConfigName) {
    //TODO #105: check for valid name, throw error upon conflict
    const workspaceConfig = new WorkspaceConfiguration(workspaceConfigName);
    this.addWorkspaceConfiguration(workspaceConfig);
    return workspaceConfig;
  }

  /**
   * Adds a block definition to the project.
   *
   * @param {!BlockDefinition} blockDef Block definition to add to the project.
   * @param {string} libraryName The library to add it to.
   */
  addBlockDefinition(blockDef, libraryName) {
    const lib = this.project.getBlockLibrary(libraryName);
    if (lib) {
      lib.add(blockDef);
      this.tree.addBlockNode(blockDef.type(), libraryName);
    }
  }

  /**
   * Adds toolbox to this.project's toolbox set.
   *
   * @param {!Toolbox} toolbox Toolbox object to add to project
   */
  addToolbox(toolbox) {
    this.project.addToolbox(toolbox);
    this.tree.addToolboxNode(toolbox.name);
  }

  /**
   * Adds WorkspaceContents to this.project's workspace contents set.
   *
   * @param {!WorkspaceContents} workspaceContents The WorkspaceContents to
   *     add to the project.
   */
  addWorkspaceContents(workspaceContents) {
    this.project.addWorkspaceContents(workspaceContents);
    this.tree.addWorkspaceContentsNode(workspaceContents.name);
  }

  /**
   * Adds WorkspaceConfiguration to this.project.
   *
   * @param {!WorkspaceConfiguration} workspaceConfig The WorkspaceConfiguration
   *     to add to the project.
   */
  addWorkspaceConfiguration(workspaceConfig) {
    this.project.addWorkspaceConfiguration(workspaceConfig);
    this.tree.addWorkspaceConfigurationNode(workspaceConfig.name);
  }

  /**
   * Adds BlockLibrary to this.project.
   *
   * @param {!BlockLibrary} blockLibrary The BlockLibrary to add to the project.
   */
  addBlockLibrary(blockLibrary) {
    this.project.addBlockLibrary(blockLibrary);
    this.tree.addBlockLibraryNode(blockLibrary.name);
  }

  /**
   * Removes a block from the project.
   *
   * @param {string} blockType The name of the block to remove.
   */
  removeBlock(blockType) {
    this.project.removeBlock(blockType);
    this.tree.deleteBlockNode(blockType);
  }

  /**
   * Removes toolbox from this.project's toolbox set.
   *
   * @param {string} toolboxName Name of the toolbox to remove from the project.
   */
  removeToolbox(toolboxName) {
    this.project.removeToolbox(toolboxName);
    this.tree.deleteToolboxtNode(toolboxName);
  }

  /**
   * Removes WorkspaceContents object from this.project's workspace contents set.
   *
   * @param {string} workspaceContentsName Name of the WorkspaceContents to
   *     remove from project.
   */
  removeWorkspaceContents(workspaceContentsName) {
    this.project.removeWorkspaceContents(workspaceContentsName);
    this.tree.deleteWorkspaceContentsNode(workspaceContentsName);
  }

  /**
   * Removes a WorkspaceConfiguration from this.project.
   *
   * @param {string} workspaceConfigName Name of the
   *     WorkspaceConfiguration to remove from the project.
   */
  removeWorkspaceConfiguration(workspaceConfigName) {
    this.project.removeWorkspaceConfiguration(workspaceConfigName);
    this.tree.deleteWorkspaceConfigurationNode(workspaceConfigName);
  }

  /**
   * Removes a BlockLibrary from the project.
   *
   * @param {string} blockLibraryName The name of the BlockLibrary to remove
   *     from the project.
   */
  removeBlockLibrary(blockLibraryName) {
    this.project.removeBlockLibrary(blockLibraryName);
    this.tree.deleteBlockLibraryNode(blockLibraryName);
  }

  /**
   * Renames a resource.
   * @param {Resource} resource The resource to be named.
   * @param {string} newName The new name for the resource.
   */
  rename(resource, newName) {
    //TODO: restrict names.
    resource.setName(newName);
  }

  /**
   * Renames block definition to a new name. Returns block, or null if name
   * already exists.
   * @param {!BlockDefinition} block BlockDefinition object to change.
   * @param {string} newName New name of block.
   * @param {boolean=} opt_suppress Whether to suppress changes in the tree (to
   *     avoid overloading JSTree with commands for every workspace change).
   */
  renameBlockDefinition(block, newName, opt_suppress) {
    if (!opt_suppress) {
      const id = this.tree.getTree().get_selected()[0];
      this.tree.renameNode(id, newName);
    }
    this.project.renameBlockDefinition(block.name, newName);
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
    // From wfactory_generator.js:generateInjectString(toolboxXml)
    let div = 'blocklyWorkspace';
    let fileInfo = Object.create(null);

    // TODO: Allow user to configure which resources to export.

    // Grabs first toolbox.
    const toolboxName = Object.keys(this.project.toolboxSet.resources)[0];
    const toolbox = this.project.getToolbox(toolboxName);
    const toolboxScript = FactoryUtils.generateXmlAsJsFile(toolbox, 'TOOLBOX');
    fileInfo['toolbox'] = toolboxScript;

    // Grabs first WorkspaceContents.
    const workspaceName = Object.keys(this.project.workspaceContentsSet.resources)[0];
    const workspace = this.project.getWorkspaceContents(workspaceName);
    const workspaceScript = FactoryUtils.generateXmlAsJsFile(workspace, 'WORKSPACE');
    fileInfo['workspace'] = workspaceScript;

    // Grabs first WorkspaceConfiguration (from WorkspaceContents).
    let customInjectInfo = Object.create(null);
    customInjectInfo.toolboxName = toolboxName;
    customInjectInfo.div = div;
    customInjectInfo.workspaceName = workspaceName;
    const injectScript = this.tree.appController.editorController.
        workspaceController.generateInjectFile(
          workspace.config, customInjectInfo);
    fileInfo['inject'] = injectScript;

    // Grabs all BlockDefinitions.
    const blockDefScript = this.tree.appController.editorController.
        blockEditorController.getLibraryJsFile();
    fileInfo['blocks'] = blockDefScript;

    return this.generateInjectFileContents(fileInfo);
  }

  /**
   * Returns file contents necessary for creating a sample working Blockly
   * application based off of resources in the user's current project.
   * @param {!Object} injectInfo Object which contains the scripts necessary
   *     to load components of the application (broken down into a toolbox field,
   *     workspace field, blocks field, and inject field). Each is loaded into
   *     a script tag, and is necessary to load that resource into the application.
   */
  generateInjectFileContents(injectInfo) {
    const toolboxScript = injectInfo.toolbox || '';
    const workspaceScript = injectInfo.workspace || '';
    const blockDefScript = injectInfo.blocks || '';
    const injectScript = injectInfo.inject || '';
    // TODO: Replace blockly imports with web files.
    let fileContents = `
<html>
<head>
  <title>Sample Application: ${this.project.name}</title>
  <!-- Necessary Blockly Imports -->
  <script src="https://blockly-demo.appspot.com/static/blockly_compressed.js"></script>
  <script src="https://blockly-demo.appspot.com/static/blocks_compressed.js"></script>
  <script src="https://blockly-demo.appspot.com/static/javascript_compressed.js"></script>
  <script src="https://blockly-demo.appspot.com/static/msg/js/en.js"></script>
  <!-- Blocks -->
  <script>
  ${blockDefScript}</script>

  <!-- Toolboxes -->
  <script>${toolboxScript}</script>

  <!-- Workspace -->
  <script>${workspaceScript}</script>

  <!-- Inject -->
  <script>${injectScript}</script>
</head>
<body>
  <h1>My Blockly Application: ${this.project.name}</h1>
  <div id="blocklyWorkspace" style="width:80%; min-width:200px; height:60%; min-height:300px;">
    <!-- Your workspace will be auto-injected here. Make sure the ID of this div
         matches the ID specified in your inject function. -->
  </div>
</body>
</html>
`;
    return fileContents;
  }

  /**
   * Exports the entire project.
   */
  exportProject() {
    throw "unimplemented: exportProject";
  }
}
