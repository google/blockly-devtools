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

    /**
     * True if key events are enabled. False otherwise. Used to enable/disable
     * view elements depending on which Editor is currently being used.
     * @type {boolean}
     */
    this.keyEventsEnabled = true;
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
    throw 'Unimplemented: saveState()';
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
    throw 'Unimplemented: reinjectPreview()';
  }

  /**
   * Displays imported WorkspaceContents recently added to model onto editor view.
   *
   * @param {string} wsContentsName Name of toolbox that was imported.
   * @param {string} xmlString String representation of XML of recently imported
   *     toolbox.
   */
  loadImportedWorkspaceContents(wsContentsName, xmlString) {
    /*
     * TODO: Move in from wfactory_generator.js:loadXml(jsFileContents, importMode)
     *                    wfactory_generator.js:evaluateMarkedCode(code)
     *       Note: loadXml() is broken into two functions in refactored version.
     *
     * References:
     * - evaluateMarkedCode()
     */
    throw 'Unimplemented: loadImportedWorkspaceContents()';
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
    throw 'Unimplemented: importContentsFromTree_()';
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
    throw 'Unimplemented: addShadow()';
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
    throw 'Unimplemented: clearAndLoadXml_()';
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
    throw 'Unimplemented: setStandardOptionsAndUpdate()';
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
    throw 'Unimplemented: generateNewOptions()';
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
    throw 'Unimplemented: readOptions_()';
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
    throw 'Unimplemented: setBlockLibCategory()';
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
    throw 'Unimplemented: getAllUsedBlockTypes()';
  }

  /**
   * Extracts WorkspaceContents XML from user-uploaded file. XML should be between
   * marked comments in uploaded file.
   *
   * @param {string} fileContents String representation of JavaScript code in user-imported
   *     file.
   * @return {!Object.<string, string>} WorkspaceContents name to XML string pair.
   */
  extractWorkspaceContentsXml(fileContents) {
    let extractedWorkspaceContents = {};
    extractedWorkspaceContents.name = '';
    extractedWorkspaceContents.xmlString = '';

    /*
     * TODO: Move in from wfactory_generator.js:loadXml(jsFileContents, importMode)
     *                    wfactory_generator.js:evaluateMarkedCode(code)
     *
     * References:
     * - evaluateMarkedCode()
     */

    throw 'Unimplemented: extractWorkspaceContentsXml()';
  }

  /**
   * Generates JavaScript string representation of WorkspaceContents for user to
   * download. Does not deal with popups or file system access; just generates content.
   *
   * @returns {string} String representation of JS file to be exported.
   */
  generateJsFileContents() {
    /*
     * TODO: Move in from wfactory_generator.js:generateJsFromXml(xml, name, mode)
     *       (Also moved into: toolbox.js)
     *
     * References:
     * [NEW] this.generateXml()
     * [NEW] this.name
     */
    throw 'Unimplemented: generateJsFileContents()';
  }
}
