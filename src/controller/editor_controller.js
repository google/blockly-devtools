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
   * @param {!ProjectController} projectController ProjectController used to
   *     update the project upon changes in any editor.
   * @param {!Blockly.Workspace} hiddenWorkspace Invisible Blockly Workspace
   *     used to generate Blockly objects for import/export.
   */
  constructor(projectController, hiddenWorkspace) {
    /**
     * ProjectController which controls changes to the Project.
     * @type {!ProjectController}
     */
    this.projectController = projectController;

    /**
     * Controls the block editor. Manages updates to model and view within
     * block editor.
     * @type {BlockLibraryController}
     */
    this.blockEditorController = new BlockEditorController(
        this.projectController, hiddenWorkspace);

    /**
     * Controls the toolbox editor. Manages updates to model and view within
     * toolbox editor.
     * @type {!ToolboxController}
     */
    this.toolboxController = new ToolboxController(
        this.projectController, hiddenWorkspace);

    /**
     * Controls the workspace editor. Manages updates to model and view within
     * workspace editor.
     * @type {!WorkspaceController}
     */
    this.workspaceController = new WorkspaceController(
        this.projectController, hiddenWorkspace);

    /**
     * Controller object which is currently controlling the developer's application.
     * Keeps track of which editor the user is on.
     * @type {(!ToolboxController|!WorkspaceController|!BlockEditorController)}
     */
    this.currentEditor = null;
  }

  /**
   * Switches editors.
   * @param {!BlockEditorController|!ToolboxController|!WorkspaceController}
   *     editor Editor controller object that user switches to.
   * @return {string} Prefix constant that represents the type of object which
   *     is being edited.
   */
  switchEditor(editor) {
    this.currentEditor = editor;
    let type = '';

    if (editor instanceof BlockEditorController) {
      this.currentEditor.refreshPreviews();
      type = PREFIXES.BLOCK;
    } else if (editor instanceof ToolboxController) {
      this.currentEditor.loadToolbox(this.currentEditor.view.toolbox);
      this.currentEditor.setResource(this.currentEditor.view.toolbox);
      this.currentEditor.updateEditorToolbox();
      type = PREFIXES.TOOLBOX;
    } else if (editor instanceof WorkspaceController) {
      this.currentEditor.loadContents(this.currentEditor.view.getWorkspaceContents());
      this.currentEditor.loadConfig(this.currentEditor.view.workspaceConfig);
      this.currentEditor.setResource(this.currentEditor.view.getWorkspaceContents());
      this.currentEditor.updateEditorToolbox();
      if (this.currentEditor.view.current instanceof WorkspaceContents) {
        type = PREFIXES.WORKSPACE_CONTENTS;
      } else if (this.currentEditor.view.current instanceof WorkspaceConfiguration) {
        type = PREFIXES.WORKSPACE_CONFIG;
      }
    }
    return type;
  }

  /**
   * Saves changes in previous editor before switching views to another.
   */
  saveChanges() {
    if (!this.currentEditor) {
      return;
    }

    if (this.currentEditor instanceof BlockEditorController) {
      Blockly.WidgetDiv.hide();
      if (Blockly.selected) {
        Blockly.selected.unselect();
      }
      this.currentEditor.updateBlockName(false, false);
      this.currentEditor.updateBlockDefinition();
    }
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
    const project = this.projectController.getProject();
    for (let block of blocks) {
      if (!project.hasBlockDefinition(block.type)) {
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

  /**
   * Deletes the currently selected resource (block, toolbox, etc.) from the
   * project.
   */
  delete() {
    const editor = this.currentEditor;
    if (editor instanceof BlockEditorController) {
      const currentBlockName = this.blockEditorController.view.blockDefinition.name;
      this.projectController.removeBlock(currentBlockName);
    } else if (editor instanceof ToolboxController) {
      const currentToolboxName = this.toolboxController.view.toolbox.name;
      this.projectController.removeToolbox(currentToolboxName);
    } else if (editor instanceof WorkspaceController) {
      const currentContentsName = this.workspaceController.view.getWorkspaceContents().name;
      this.projectController.removeWorkspaceContents(currentContentsName);
    }
  }

  /**
   * Renames a resource in the project. If the new name does not have any conflicts
   * and is a valid name, calls respective editors and model classes to rename the
   * resource.
   * @param {string} type Type of resource to rename.
   */
  rename() {
    const newName = window.prompt('What would you like to rename the current object?');
    // TODO: Implement renaming resources.
  }
}
