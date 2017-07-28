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

goog.provide('WorkspaceController');

goog.require('Project');
goog.require('WorkspaceConfiguration');
goog.require('WorkspaceContents');
goog.require('WorkspaceEditorView');

/**
 * @class WorkspaceController manages user interaction with workspace contents
 *     and configurations, which are the blocks pre-loaded onto a developer's
 *     Blockly workspace and the Blockly.Options which configure the settings on
 *     a developer's workspace (e.g. trashcan, RTL/LTR, etc.), respectively.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo), evd2014 (Emma Dauterman)
 */
class WorkspaceController {
  /**
   * @constructor
   * @param {!ProjectController} projectController ProjectController that will
   *     make changes to WorkspaceContents and WorkspaceConfiguration when
   *     edited in the workspace editor.
   * @param {!Blockly.Workspace} hiddenWorkspace Hidden workspace used to generate Blockly objects.
   */
  constructor(projectController, hiddenWorkspace) {
    /**
     * ProjectController which will be used on modification of workspace objects.
     * @type {!ProjectController}
     */
    this.projectController = projectController;

    // Creates first workspace contents and config to add to project.
    const wsContents = this.projectController.createWorkspaceContents('WSContents');
    const wsConfig = this.projectController.createWorkspaceConfiguration('WSConfig');

    /**
     * WorkspaceEditorView associated with this instance of WorkspaceController.
     * @type {!WorkspaceEditorView}
     */
    this.view = new WorkspaceEditorView(wsContents, wsConfig);

    /**
     * True if key events are enabled. False otherwise. Used to enable/disable
     * view elements depending on which Editor is currently being used.
     * @type {boolean}
     */
    this.keyEventsEnabled = true;

    /**
     * Hidden workspace used to generate Blockly objects for export.
     * @type {!Blockly.Workspace}
     */
    this.hiddenWorkspace = hiddenWorkspace;

    // Initializes view's event listeners/handlers.
    this.view.init(this);
  }

  /**
   * Generates XML of currently active WorkspaceContents.
   * @return {!Element} XML of current workspace contents blocks.
   */
  generateContentsXml() {
    const xmlDom = goog.dom.createDom('xml');
    xmlDom.setAttribute('id', this.view.workspaceContents.name);
    xmlDom.setAttribute('style', 'display: none');

    const xml = Blockly.Xml.workspaceToDom(this.view.editorWorkspace);
    this.loadToHiddenWorkspace_(xml);
    this.appendHiddenWorkspaceToDom_(xmlDom);

    return xmlDom;
  }

  /**
   * Used to completely reinject the contents/config preview. Used only
   * when switching from simple flyout to categories, or categories to simple
   * flyout. More expensive than simply updating flyout or toolbox.
   * @package
   */
  reinjectPreview() {
    // From wfactory_controller.js:reinjectPreview(tree)
    this.view.previewWorkspace.dispose();
    const injectOptions = this.view.workspaceConfig.options;
    injectOptions['toolbox'] = '<xml></xml>';

    this.view.previewWorkspace = Blockly.inject('workspacePreview', injectOptions);
    Blockly.Xml.domToWorkspace(
        this.view.workspaceContents.getXml(), this.view.previewWorkspace);
  }

  /**
   * Called every time there is a change to the editor workspace. Called from
   * a change listener on the editor workspace.
   * @param {!Event} event The change event which triggered the listener.
   */
  onChange(event) {
    const isCreateEvent = event.type == Blockly.Events.CREATE;
    const isDeleteEvent = event.type == Blockly.Events.DELETE;
    const isChangeEvent = event.type == Blockly.Events.CHANGE;
    const isMoveEvent = event.type == Blockly.Events.MOVE;
    const isUiEvent = event.type == Blockly.Events.UI;

    if (isCreateEvent || isDeleteEvent || isChangeEvent) {
      this.saveStateFromWorkspace();
      this.updatePreview();
    }

    // Refresh the shadow block buttons only if the state of blocks has changed
    // (i.e. only on move or UI events).
    if (isMoveEvent || isUiEvent) {
      Blockly.Events.disable();
      const selected = this.view.editorWorkspace.getBlockById(event.blockId);
      this.view.selectedBlock = selected;

      if (!selected) {
        // User does not select a block.
        this.view.showAndEnableShadow(false, false, true);
      } else {
        // User selects a block.
        if (selected.getSurroundParent()) {
          for (let block of selected.getSurroundParent().getDescendants()) {
            this.view.selectedBlock = block;
            this.checkShadowStatus();
          }
          this.view.selectedBlock = selected;
        }

        this.checkShadowStatus();
      }
      Blockly.Events.enable();
    } else {
      this.view.selectedBlock = null;
      this.view.showAndEnableShadow(false, false, true);
    }

    if (isCreateEvent) {
      this.makeShadowishBlocks_(event.blockId);
    }
  }

  /**
   * Saves blocks on editor workspace into the WorkspaceContents model.
   */
  saveStateFromWorkspace() {
    this.view.workspaceContents.setXml(this.generateContentsXml());
  }

  /**
   * Clears Workspace editor of all WorkspaceContents blocks. Resets currently
   * active WorkspaceContents object to contain no blocks. Clears view of any
   * WorkspaceContents blocks, and updates preview.
   */
  clear() {
    // REFACTORED: Moved in (partially) from wfactory_controller.js:clearAll()
    // Resets WS Contents
    this.view.editorWorkspace.clear();
    this.saveStateFromWorkspace();
    // Resets WS Configs
    this.view.resetConfigs();
    this.generateNewOptions();

    this.updatePreview();
  }

  /**
   * Updates Workspace preview based on the WorkspaceConfig and WorkspaceContents
   * currently being edited.
   */
  updatePreview() {
    // From wfactory_controller.js:updatePreview()
    this.view.previewWorkspace.clear();
    Blockly.Xml.domToWorkspace(this.view.workspaceContents.getXml(),
        this.view.previewWorkspace);
  }

  /**
   * Updates the editor toolbox to have categories for user-defined block libraries.
   */
  updateEditorToolbox() {
    const newToolboxXml = FactoryUtils.updateBlockLibCategory(
        this.projectController.getProject(), this.hiddenWorkspace);
    this.view.updateEditorToolbox(newToolboxXml);
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

  /**
   * Loads the given XML to the hidden Blockly.Workspace and sets any user-generated
   * shadow blocks to be actual shadow blocks in the hidden Blockly.Workspace.
   *
   * @param {!Element} xml XML to be loaded to the hidden workspace.
   * @private
   */
  loadToHiddenWorkspace_(xml) {
    // From wfactory_generator.js:loadToHiddenWorkspace_(xml)
    this.hiddenWorkspace.clear();
    Blockly.Xml.domToWorkspace(xml, this.hiddenWorkspace);
    this.setShadowBlocksInHiddenWorkspace_();
  }

  /**
   * Encodes blocks in the hidden workspace in a XML DOM element. Very
   * similar to workspaceToDom, but doesn't capture IDs. Uses the top-level
   * blocks loaded in hiddenWorkspace.
   * @private
   * @param {!Element} xmlDom Tree of XML elements to be appended to.
   */
  appendHiddenWorkspaceToDom_(xmlDom) {
    // From wfactory_generator.js:appendHiddenWorkspaceToDom_(xmlDom)
    const blocks = this.hiddenWorkspace.getTopBlocks();
    blocks.forEach((block) => {
      let blockChild = Blockly.Xml.blockToDom(block, /* opt_noId */ true);
      xmlDom.appendChild(blockChild);
    });
  }

  /**
   * Sets the user-generated shadow blocks loaded into hiddenWorkspace to be
   * actual shadow blocks. This is done so that blockToDom records them as
   * shadow blocks instead of regular blocks.
   * @private
   */
  setShadowBlocksInHiddenWorkspace_() {
    // REFACTOR: Moved in from wfactory_generator.js
    const blocks = this.hiddenWorkspace.getAllBlocks();
    blocks.forEach((block) => {
      if (this.view.workspaceContents.isShadowBlock(block.id)) {
        block.setShadow(true);
      }
    });
  }

  /**
   * Checks the currently selected block if it is breaking any shadow block rules.
   * Sets warning text to user if it is breaking a rule, and removes warning
   * text if it not.
   * Shadow blocks must be nested within another block, and cannot have any
   * non-shadow blocks as children.
   * @recursive Checks children and connected blocks for their status as well.
   */
  checkShadowStatus() {
    const selected = this.view.selectedBlock;
    if (!selected) {
      // Return if no block is selected.
      return;
    }

    // Check if shadow block.
    const isShadow = FactoryUtils.isUserGenShadowBlock(selected.id,
        this.view.workspaceContents) ||
        $(selected.svgGroup_).hasClass('shadowBlock');

    // Check if valid shadow block position.
    const isValid = FactoryUtils.isValidShadowBlock(selected, isShadow);

    // Check if block has variables (variable blocks cannot be shadow blocks).
    const hasVar = FactoryUtils.hasVariableField(selected);
    this.view.enableShadowButtons(isShadow, isValid);

    // Checks various states of the selected block to make the warning text
    // more helpful/descriptive. Removes warning text if no rules are broken.
    if (isShadow && !isValid) {
      selected.setWarningText('Shadow blocks must be nested inside\n'
          + 'other shadow blocks or regular blocks.');
    } else if (isShadow && hasVar) {
      selected.setWarningText('Shadow blocks must be nested inside other'
          + ' blocks.');
    } else if (!isShadow && selected.getSurroundParent() &&
        $(selected.getSurroundParent().svgGroup_).hasClass('shadowBlock')) {
      selected.setWarningText('Regular blocks cannot be children\nof shadow '
          + 'blocks.');
    } else {
      selected.setWarningText(null);
    }

    if (selected.getNextBlock()) {
      // Recursively check next block in connection for its status.
      this.view.selectedBlock = selected.getNextBlock();
      this.checkShadowStatus();
      this.view.selectedBlock = selected;
    }
  }

  /*
   * Makes the currently selected block a user-generated shadow block. These
   * blocks are not made into real shadow blocks, but recorded in the model
   * and visually marked as shadow blocks, allowing the user to move and edit
   * them (which would be impossible with actual shadow blocks). Updates the
   * preview when done.
   */
  addShadow() {
    // From wfactory_controller.js:addShadow()
    // No block selected to make a shadow block.
    if (!this.view.selectedBlock) {
      return;
    }
    FactoryUtils.markShadowBlock(this.view.selectedBlock);
    this.view.workspaceContents.addShadowBlock(this.view.selectedBlock.id);

    // Apply shadow block to the children as well.
    for (let block of this.view.selectedBlock.getDescendants()) {
      FactoryUtils.markShadowBlock(block);
      this.view.workspaceContents.addShadowBlock(block.id);
    }

    this.view.showAndEnableShadow(false,
        FactoryUtils.isValidShadowBlock(this.view.selectedBlock, true));
    this.checkShadowStatus();
    // Save and update the preview.
    this.saveStateFromWorkspace();
    this.updatePreview();
  }

  /**
   * If the currently selected block is a user-generated shadow block, this
   * function makes it a normal block again, removing it from the list of
   * shadow blocks and loading the workspace again. Updates the preview again.
   */
  removeShadow() {
    // From wfactory_controller.js
    if (!this.view.selectedBlock) {
      return;
    }
    this.view.unmarkShadowBlock(this.view.selectedBlock);
    this.view.workspaceContents.removeShadowBlock(this.view.selectedBlock.id);
    this.checkShadowStatus();
    this.view.showAndEnableShadow(true,
        FactoryUtils.isValidShadowBlock(this.view.selectedBlock, true));

    // Save and update the preview.
    this.saveStateFromWorkspace();
    this.updatePreview();
  }

  /**
   * Convert actual shadow blocks added from the toolbox to user-generated shadow
   * blocks.
   * @param {boolean} blockId ID of the selected block.
   * @private
   */
  makeShadowishBlocks_(blockId) {
    // Converts actual shadow blocks to shadow-looking blocks in editor.
    this.convertShadowBlocks();

    // TODO(#147): Warn user that if they use a block that has variables or functions,
    // they should have a variable/function category in the corresponding toolbox.
  }

  /**
   * Call when importing XML containing real shadow blocks. This function turns
   * all real shadow blocks loaded in the workspace into user-generated shadow
   * blocks, meaning they are marked as shadow blocks by the model and appear as
   * shadow blocks in the view but are still editable and movable.
   */
  convertShadowBlocks() {
    // REFACTORED: Moved in from wfactory_controller.js
    const blocks = this.view.editorWorkspace.getAllBlocks();
    blocks.forEach((block) => {
      if (block.isShadow()) {
        block.setShadow(false);
        // Delete the shadow DOM attached to the block so that the shadow block
        // does not respawn. Dependent on implementation details.
        const parentConnection = block.outputConnection ?
            block.outputConnection.targetConnection :
            block.previousConnection.targetConnection;
        if (parentConnection) {
          parentConnection.setShadowDom(null);
        }
        this.view.workspaceContents.addShadowBlock(block.id);
        FactoryUtils.markShadowBlock(block);
      }
    });
  }

  /**
   * Clears the workspace editor and loads XML to it, marking shadow blocks
   * as necessary.
   * @param {!Element} xml The XML to be loaded to the workspace.
   * @private
   */
  clearAndLoadXml_(xml) {
    // From wfactory_controller.js:clearAndLoadXml_(xml)
    this.view.editorWorkspace.clear();
    this.view.editorWorkspace.clearUndo();
    Blockly.Xml.domToWorkspace(xml, this.view.editorWorkspace);
    const blocks = this.view.editorWorkspace.getAllBlocks();
    FactoryUtils.markShadowBlocks(this.getShadowBlocksInWorkspace(blocks));
    FactoryUtils.warnForUndefinedBlocks(blocks, this.projectController.getProject());
  }

  /**
   * Given a set of blocks currently loaded, returns all blocks in the workspace
   * that are user generated shadow blocks.
   * @param {Array.<!Blockly.Block>} blocks Array of blocks currently loaded.
   * @return {Array.<!Blockly.Block>} Array of user-generated shadow blocks currently
   *     loaded.
   */
  getShadowBlocksInWorkspace(blocks) {
    // From wfactory_model.js:getShadowBlocksInWorkspace()
    let shadowsInWorkspace = [];
    blocks.forEach((block) => {
      if (this.view.workspaceContents.isShadowBlock(block.id)) {
        shadowsInWorkspace.push(block);
      }
    });
    return shadowsInWorkspace;
  }

  /**
   * Sets a warning on blocks loaded to the workspace that are not defined.
   * @private
   */
  warnForUndefinedBlocks_() {
    const blocks = this.view.editorWorkspace.getAllBlocks();
    const project = this.projectController.getProject();
    blocks.forEach((block) => {
      if (!project.hasBlockDefinition(block.type)) {
        block.setWarningText(block.type + ' is not defined (it is not a standard '
            + 'block, \nin your block library, or an imported block).');
      }
    });
  }

  /**
   * Sets standard default options for default WorkspaceConfig, updates
   * the preview workspace. Default values depend on whether certain categories
   * are present.
   */
  setStandardOptionsAndUpdate() {
    // From wfactory_controller.js:setStandardOptionsAndUpdate()
    this.view.resetConfigs();
    this.generateNewOptions();
  }

  /**
   * Generates new WorkspaceConfig object. Creates Blockly.Options to inject into
   * preview Blockly workspace, based upon user input.
   * Called every time a change has been made to an input field. Updates the model
   * and reinjects the preview workspace.
   */
  generateNewOptions() {
    // From wfactory_controller.js:generateNewOptions()

    // TODO (#141): Add popup for workspace config.

    this.view.workspaceConfig.setOptions(this.readOptions_());
    this.reinjectPreview();
  }

  /**
   * Generates a new options object for injecting a Blockly workspace based on
   * user input.
   * @return {!Object} Blockly injection options object.
   * @private
   */
  readOptions_() {
    // From wfactory_controller.js
    const optionsObj = Object.create(null);

    // Add all standard options to the options object.
    // Use parse int to get numbers from value inputs.
    var readonly = document.getElementById('option_readOnly_checkbox').checked;
    if (readonly) {
      optionsObj['readOnly'] = true;
    } else {
      optionsObj['collapse'] =
          document.getElementById('option_collapse_checkbox').checked;
      optionsObj['comments'] =
          document.getElementById('option_comments_checkbox').checked;
      optionsObj['disable'] =
          document.getElementById('option_disable_checkbox').checked;
      if (document.getElementById('option_infiniteBlocks_checkbox').checked) {
        optionsObj['maxBlocks'] = Infinity;
      } else {
        var maxBlocksValue =
            document.getElementById('option_maxBlocks_number').value;
        optionsObj['maxBlocks'] = typeof maxBlocksValue == 'string' ?
            parseInt(maxBlocksValue) : maxBlocksValue;
      }
      optionsObj['trashcan'] =
          document.getElementById('option_trashcan_checkbox').checked;
      optionsObj['horizontalLayout'] =
          document.getElementById('option_horizontalLayout_checkbox').checked;
      optionsObj['toolboxPosition'] =
          document.getElementById('option_toolboxPosition_checkbox').checked ?
          'end' : 'start';
    }

    optionsObj['css'] = document.getElementById('option_css_checkbox').checked;
    optionsObj['media'] = document.getElementById('option_media_text').value;
    optionsObj['rtl'] = document.getElementById('option_rtl_checkbox').checked;
    optionsObj['scrollbars'] =
        document.getElementById('option_scrollbars_checkbox').checked;
    optionsObj['sounds'] =
        document.getElementById('option_sounds_checkbox').checked;
    optionsObj['oneBasedIndex'] =
        document.getElementById('option_oneBasedIndex_checkbox').checked;

    // If using a grid, add all grid options.
    if (document.getElementById('option_grid_checkbox').checked) {
      var grid = Object.create(null);
      var spacingValue =
          document.getElementById('gridOption_spacing_number').value;
      grid['spacing'] = typeof spacingValue == 'string' ?
          parseInt(spacingValue) : spacingValue;
      var lengthValue = document.getElementById('gridOption_length_number').value;
      grid['length'] = typeof lengthValue == 'string' ?
          parseInt(lengthValue) : lengthValue;
      grid['colour'] = document.getElementById('gridOption_colour_text').value;
      if (!readonly) {
        grid['snap'] =
          document.getElementById('gridOption_snap_checkbox').checked;
      }
      optionsObj['grid'] = grid;
    }

    // If using zoom, add all zoom options.
    if (document.getElementById('option_zoom_checkbox').checked) {
      var zoom = Object.create(null);
      zoom['controls'] =
          document.getElementById('zoomOption_controls_checkbox').checked;
      zoom['wheel'] =
          document.getElementById('zoomOption_wheel_checkbox').checked;
      var startScaleValue =
          document.getElementById('zoomOption_startScale_number').value;
      zoom['startScale'] = typeof startScaleValue == 'string' ?
          parseFloat(startScaleValue) : startScaleValue;
      var maxScaleValue =
          document.getElementById('zoomOption_maxScale_number').value;
      zoom['maxScale'] = typeof maxScaleValue == 'string' ?
          parseFloat(maxScaleValue) : maxScaleValue;
      var minScaleValue =
          document.getElementById('zoomOption_minScale_number').value;
      zoom['minScale'] = typeof minScaleValue == 'string' ?
          parseFloat(minScaleValue) : minScaleValue;
      var scaleSpeedValue =
          document.getElementById('zoomOption_scaleSpeed_number').value;
      zoom['scaleSpeed'] = typeof scaleSpeedValue == 'string' ?
          parseFloat(scaleSpeedValue) : scaleSpeedValue;
      optionsObj['zoom'] = zoom;
    }

    return optionsObj;
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
