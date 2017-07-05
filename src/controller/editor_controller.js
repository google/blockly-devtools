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
 * @author sagev (Sage Vouse), celinechoo (Celine Choo)
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
  }

  /**
   * Clears the editing area completely, deleting all categories and all
   * blocks in the model and view and all pre-loaded blocks. Tied to the
   * "Clear" button.
   */
  clearAll() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - clearToolboxList()
     * - savePreloadXml()
     * - savePreloadXml()
     * - addEmptyCategoryMessage()
     * - updateState()
     * - saveStateFromWorkspace()
     * - setCategoryOptions()
     * - generateNewOptions()
     * - updatePreview()
     */
  }

  /**
   * Determines if a block loaded in the workspace has a definition (if it
   * is a standard block, is defined in the block library, or has a definition
   * imported).
   * @param {!Blockly.Block} block The block to examine.
   */
  isDefinedBlock(block) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - this.model.isDefinedBlockType(block.type);
     */
  }

  /**
   * Sets a warning on blocks loaded to the workspace that are not defined.
   * @private
   */
  warnForUndefinedBlocks_() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - isDefinedBlock()
     */
  }
}
