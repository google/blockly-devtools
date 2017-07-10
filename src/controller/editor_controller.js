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
 * @fileoverview EditorController manages user interaction involving changes in
 *     specific components of a project (Toolbox, Workspace (contents or configs),
 *     or Block Library).
 *
 * @author sagev (Sage Vouse), celinechoo (Celine Choo), evd2014 (Emma Dauterman)
 */

class EditorController {
  constructor(project) {
    /**
     * Project object whose components are controlled by EditorController.
     * @type {!Project}
     */
    this.project = project;

    /**
     * Toolbox Controller.
     * @type {!ToolboxController}
     */
    this.toolboxController = new ToolboxController(this.project);

    /**
     * Workspace Controller.
     * @type {!WorkspaceController}
     */
    this.workspaceController = new WorkspaceController(this.project);

    /**
     * Block Editor Controller
     * @type {BlockLibraryController}
     */
    this.blockEditorController = new BlockEditorController(this.project);

    /**
     * Controller object which is currently controlling the developer's application.
     * Keeps track of which editor the user is on.
     * @type {(!ToolboxController|!WorkspaceController|!BlockEditorController)}
     */
    this.currentEditor = null;

    /**
     * Blockly Workspaces of hidden workspaces used to generate Blockly XML for
     * import and export. Exporter workspace is used for generating Block XML's
     * from definitions and generator workspace is used for generating hidden
     * blocks in the toolbox editor. Initialized in AppView.
     * @type {!Object.<string, Blockly.Workspace}
     */
    this.hiddenWorkspaces = {
      exporter: Blockly.inject('blockExporterTools_hiddenWorkspace'),
      generator: Blockly.inject('hiddenBlocksWorkspace')
    };
  }

  /**
   * Clears the editing area completely, deleting all categories and all
   * blocks in the model and view and all pre-loaded blocks. Tied to the
   * "Clear" button.
   *
   * TODO: Decouple the pairing of toolbox and workspace editor so that there is
   *       a function to clear one at a time and not both with one call (since
   *       they will be in separate views).
   */
  clearAll() {
    // REFACTORED: from wfactory_controller.js:clearAll()
    this.toolboxController.clear();
    this.workspaceController.clear();
  }

  /**
   * Determines if a block loaded in the workspace has a definition (if it
   * is a standard block, is defined in the block library, or has a definition
   * imported). Assumes that block types are unique in a given project.
   * @param {!Blockly.Block} block The block to examine.
   * @return {boolean} Whether block has been defined in project.
   */
  isDefinedBlock(block) {
    // REFACTORED: from wfactory_controller.js
    const blockType = block.type;
    return this.project.has(blockType);
  }

  /**
   * Sets a warning on undefined blocks loaded to the current editor workspace.
   * Either in ToolboxController or WorkspaceController.
   * @private
   */
  warnForUndefinedBlocks_() {
    // REFACTORED: from wfactory_controller.js:warnForUndefinedBlocks_()

    // Quit function if in block definition editor, since undefined is irrelevant.
    if (typeof this.currentEditor === BlockEditorController) {
      return;
    }
    const blocks = this.currentEditor.view.editorWorkspace.getAllBlocks();
    for (const i = 0, block; block = blocks[i]; i++) {
      if (!this.isDefinedBlock(block)) {
        block.setWarningText(block.type + ' is not defined (it is not a standard '
            + 'block, \nin your block library, or an imported block)');
      }
    }
  }

  /**
   * Given a set of block types, gets the Blockly.Block objects for each block
   * type.
   * @param {!Array.<!Element>} blockTypes Array of blocks that have been defined.
   * @return {!Array.<!Blockly.Block>} Array of Blockly.Block objects corresponding
   *     to the array of blockTypes.
   */
  getDefinedBlocks(blockTypes) {
    // REFACTORED: from wfactory_generator.js:getDefinedBlocks()

    // TODO: Remove this function, since block definitions should only be imported
    //       via the block library.

    const blockList = [];
    const blockDefMap = this.project.getAllBlockDefinitionsMap();

    for (const blockType in blockDefMap) {
      // TODO: Once BlockDefinition is defined, replace BlockDefinition.block to
      //       correct field reference to the Blockly.Block.
      blockList.push(blockDefMap[blockType].block);
    }

    return blockList;
  }

  /*
   * Updates the block library category in the Toolbox and Workspace Editor
   * toolboxes.
   */
  updateBlockLibCategory() {
    /*
     * REFACTORED: Moved in from wfactory_controller.js
     *       (Also moved into: workspace_controller.js)
     */
    const libraryXmls = {};
    // User-ordered array of block library names.
    const libraryNames = this.project.getLibraryNames();

    libraryNames.forEach((element) => {
      const libraryName = element;
      const library = this.project.getLibrary(libraryName);
      libraryXmls[libraryName] = this.getCategoryXml(library);
    });

    // Update editor toolboxes with new libraries.
    const newToolboxXml = DevToolsToolboxes.toolboxEditor(libraryXmls);
    this.toolboxController.view.updateEditorToolbox(newToolboxXml);
    this.workspaceController.view.updateEditorToolbox(newToolboxXml);
  }

  /**
   * Creates XML toolbox category of all blocks in this block library. Used in
   * toolbox and workspace editor.
   * @param {!BlockLibrary} library Library object to be created into an editor
   *     toolbox category.
   * @return {!Element} XML representation of the block library category.
   */
  getCategoryXml(library) {
    // Moved in from block_exporter_tools.js:generateCategoryFromBlockLib(blockLibStorage)
    const allBlockTypes = library.getBlockTypes();
    const blockXmlMap = library.getBlockXmlMap(allBlockTypes);

    const blocks = [];
    for (const blockType in blockXmlMap) {
      const block = FactoryUtils.getDefinedBlock(
          blockType, this.hiddenWorkspaces.exporter);
      blocks.push(block);
    }

    return FactoryUtils.generateCategoryXml(blocks, 'Block Library');
  }
}
