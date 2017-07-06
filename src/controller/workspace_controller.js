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
 * @class WorkspaceController manages user interaction with workspace contents
 *     and configurations, which are the blocks pre-loaded onto a developer's
 *     Blockly workspace and the Blockly.Options which configure the settings on
 *     a developer's workspace (e.g. trashcan, RTL/LTR, etc.), respectively.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo), evd2014 (Emma Dauterman)
 */
class WorkspaceController {
  constructor(project) {
    /**
     * Project whose library is controlled by this BlockLibraryController instance.
     * @type {!Project}
     */
    this.project = project;

    /**
     * Keeps track of what WorkspaceContents is currently being edited.
     * @type {!WorkspaceContents}
     */
    this.currentWorkspaceContents = null;

    /**
     * Keeps track of what WorkspaceConfig is currently being edited.
     * @type {!WorkspaceContents}
     */
    this.currentWorkspaceConfig = null;


    /**
     * WorkspaceEditorView associated with this instance of WorkspaceController.
     * @type {!WorkspaceView}
     */
    this.view = new WorkspaceEditorView(this.currentWorkspaceContents);
  }

  /**
   * Saves the WorkspaceContents currently being edited into the current Project.
   */
  saveState() {
    /*
     * TODO: Move in from wfactory_controller.js:saveStateFromWorkspace()
     *
     * References:
     * - getSelectedXml()
     * - saveFromWorkspace(this.toolboxWorkspace)
     * - getPreloadXml()
     * - savePreloadXml()
     */
  }

  /**
   * Used to completely reinject the contents/config preview. Used only
   * when switching from simple flyout to categories, or categories to simple
   * flyout. More expensive than simply updating flyout or toolbox.
   *
   * @param {!Element} Tree of XML elements
   * @package
   */
  reinjectPreview(tree) {
    /*
     * TODO: Move in from wfactory_controller.js
     *       (Also moved into: toolbox_controller.js)
     *
     * References:
     * - readOptions_()
     * - generateWorkspaceXml()
     */
  }

  /**
   * Given an XML DOM tree, loads it into the workspace contents editing area.
   * Assumes that tree is in valid XML format and that the selected mode is
   * MODE_PRELOAD.
   * @param {!Element} tree XML tree to be loaded to pre-loaded block editing
   *     area.
   */
  importContentsFromTree_(tree) {
    /*
     * TODO: Move in from wfactory_controller.js:importPreloadFromTree_()
     *
     * References:
     * - clearAndLoadXml()
     * - savePreloadXml()
     * - updatePreview()
     */
  }

  /*
   * Makes the currently selected block a user-generated shadow block. These
   * blocks are not made into real shadow blocks, but recorded in the model
   * and visually marked as shadow blocks, allowing the user to move and edit
   * them (which would be impossible with actual shadow blocks). Updates the
   * preview when done.
   */
  addShadow() {
    /*
     * TODO: Move in from wfactory_controller.js
     *       (Also moved into: toolbox_controller.js)
     *
     * References:
     * - addShadowForBlockAndChildren_()
     * - saveStateFromWorkspace()
     * - updatePreview()
     */
  }

  /**
   * Clears the toolbox workspace and loads XML to it, marking shadow blocks
   * as necessary.
   * @private
   * @param {!Element} xml The XML to be loaded to the workspace.
   */
  clearAndLoadXml_(xml) {
    /*
     * TODO: Move in from wfactory_controller.js
     *       (Also moved into: toolbox_controller.js)
     *
     * References:
     * - markShadowBlocks()
     * - warnForUndefinedBlocks_()
     */
  }

  /**
   * Sets standard default options for default WorkspaceConfig, updates
   * the preview workspace. Default values depend on whether certain categories
   * are present.
   */
  setStandardOptionsAndUpdate() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - setBaseOptions()
     * - setCategoryOptions()
     * - hasElements()
     * - generateNewOptions()
     */
  }

  /**
   * Generates new WorkspaceConfig object. Creates Blockly.Options to inject into
   * preview Blockly workspace, based upon user input.
   * Called every time a change has been made to an input field. Updates the model
   * and reinjects the preview workspace.
   */
  generateNewOptions() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - setOptions()
     * - readOptions_()
     * - reinjectPreview()
     * - generateToolboxXml()
     */

    // TODO: Add popup for workspace config so that preview is updated only when
    //       creating a new WorkspaceConfig object in completion, or when user
    //       clicks on an already defined WorkspaceConfig object in list.
    //       See Design Doc for more info.
  }

  /**
   * Generates a new options object for injecting a Blockly workspace based on
   * user input.
   * @return {!Object} Blockly injection options object.
   * @private
   */
  readOptions_() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - user input (no other relevant DevTools fcn's)
     */
  }

  /*
   * Updates the block library category in the toolbox workspace toolbox.
   * @param {!Element} categoryXml XML for the block library category.
   * @param {!Array.<string>} libBlockTypes Array of block types from the block
   *     library.
   */
  setBlockLibCategory(categoryXml, libBlockTypes) {
    /*
     * TODO: Move in from wfactory_controller.js
     *       (Also moved into: toolbox_controller.js)
     *
     * References:
     * - updateLibBlockTypes()
     * - clearAndLoadXml_()
     */
  }

  /**
   * Return the block types used in the custom toolbox and pre-loaded workspace.
   * @return {!Array.<string>} Block types used in the custom toolbox and
   *     pre-loaded workspace.
   */
  getAllUsedBlockTypes() {
    /*
     * TODO: Move in from wfactory_controller.js
     *       Also move in from wfactory_model.js
     *       (Also moved into: toolbox_controller.js)
     *
     * References:
     * - model.getAllUsedBlockTypes()
     */

    // TODO: Separate getAllUsedBlockTypes() so that it is restricted to just
    //       used block types in a toolbox editor or just used block types in
    //       workspace editor.
  }
}
