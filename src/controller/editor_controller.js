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

/**
 * @fileoverview EditorController manages user interaction involving changes in
 *     specific components of a project (Toolbox, Workspace (contents or configs),
 *     or Block Library).
 *
 * @author sagev (Sage Vouse), celinechoo (Celine Choo), evd2014 (Emma Dauterman)
 */
goog.provide('EditorController');

goog.require('BlockEditorController');
goog.require('ToolboxController');
goog.require('WorkspaceController');

class EditorController {
  /**
   * @constructor
   * @param {!Project} project Project object associated with this controller.
   * @param {!Blockly.Workspace} hiddenWorkspace Invisible Blockly Workspace
   *     used to generate Blockly objects for import/export.
   */
  constructor(project, hiddenWorkspace) {
    /**
     * Project object whose components are controlled by EditorController.
     * @type {!Project}
     */
    this.project = project;

    /**
     * Toolbox Controller.
     * @type {!ToolboxController}
     */
    this.toolboxController = new ToolboxController(this.project, hiddenWorkspace);

    /**
     * Workspace Controller.
     * @type {!WorkspaceController}
     */
    this.workspaceController = new WorkspaceController(this.project, hiddenWorkspace);

    /**
     * Block Editor Controller
     * @type {BlockLibraryController}
     */
    this.blockEditorController = new BlockEditorController(this.project, hiddenWorkspace);

    /**
     * Controller object which is currently controlling the developer's application.
     * Keeps track of which editor the user is on.
     * @type {(!ToolboxController|!WorkspaceController|!BlockEditorController)}
     */
    this.currentEditor = this.blockEditorController;
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
    return this.project.hasBlock(blockType);
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
    for (let block of blocks) {
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

  savedBlockChanges(blockLibraryController) {
  if (BlockFactory.isStarterBlock()) {
    return true;
  }
  var blockType = blockLibraryController.getCurrentBlockType();
  var currentXml = Blockly.Xml.workspaceToDom(BlockFactory.mainWorkspace);

  if (blockLibraryController.has(blockType)) {
    // Block is saved in block library.
    var savedXml = blockLibraryController.getBlockXml(blockType);
    return FactoryUtils.sameBlockXml(savedXml, currentXml);
  }
  return false;
};
}
