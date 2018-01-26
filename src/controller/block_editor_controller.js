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
 * @fileoverview BlockEditorController controls user interaction with the
 * block editor, which is where developers can define and edit new blocks.
 * New blocks are updated into the NavTreeView upon creation.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo), fraser (Neil Fraser),
 *     quachtina96 (Tina Quach)
 */
'use strict';

goog.provide('BlockEditorController');

goog.require('BlockDefinition');
goog.require('BlockEditorView');
goog.require('BlockLibrary');
goog.require('FactoryUtils');
goog.require('StandardCategories');

class BlockEditorController {
  /**
   * @constructor
   * @param {!ProjectController} projectController ProjectController used to
   *     make changes to project after user interacts with editor.
   * @param {!Blockly.Workspace} hiddenWorkspace Invisible Blockly Workspace
   *     used to generate Blockly objects for import/export.
   */
  constructor(projectController, hiddenWorkspace) {
    /**
     * ProjectController to make changes to libraries when edited in the block
     *     editor.
     * @type {!ProjectController}
     */
    this.projectController = projectController;

    /**
     * View object in charge of visible elements of DevTools Block Library editor.
     * @type {!BlockEditorView}
     */
    this.view = new BlockEditorView(null);

    /**
     * Whether the controller is operating in manual mode.
     * @type {boolean}
     */
    this.inManualMode_ = this.view.isInManualMode();

    /**
     * Existing direction ('ltr' vs 'rtl') of preview.
     * @type {string}
     */
    this.previewDirection = null;

    /**
     * Hidden Blockly workspace used to generate Blockly XML for import and
     * export. Used for generating Block XMLs from definitions. Initialized in
     * AppView.
     * @type {!Blockly.Workspace}
     */
    this.hiddenWorkspace = hiddenWorkspace;

    // Initialize event listeners/handlers specific to block editor.
    this.view.init(this);
  }

  /**
   * Static constants for block definition editing modes.
   */
  static get FORMAT_JSON() {
    return 'JSON';
  }
  static get FORMAT_JAVASCRIPT() {
    return 'JavaScript';
  }
  static get FORMAT_MANUAL() {
    return 'Manual';
  }

  /**
   * Creates new block, adds to Project model, and renders onto block editor view.
   * @param {string} inputType Type of input (statement, value, dummy).
   * @param {string} blockTypeName Name of block, given by user.
   * @param {string} libraryName The name of the library to add the block to.
   * @param {string=} opt_blockStarterText Starter text to place on block, given
   *     by user (optional).
   */
  createNewBlock(inputType, blockTypeName, libraryName, opt_blockStarterText) {
    // Creates new BlockDefinition object.
    const newBlock = new BlockDefinition(blockTypeName, 'JSON');

    // Sets XML in BlockDefinition model object.
    const starterXml = Blockly.Xml.textToDom(
        FactoryUtils.buildBlockEditorStarterXml(
          inputType, blockTypeName, opt_blockStarterText));
    newBlock.setXml(starterXml);

    // Adds block definition to project.
    this.projectController.addBlockDefinition(newBlock, libraryName);
    newBlock.define();

    // Shows onto view.
    this.view.show(newBlock);
    this.refreshPreviews();
  }

  /**
   * Handles response to block-based block definition editor change events.
   * @param {!Event} event Change event in editor workspace.
   */
  onWorkspaceChange(event) {
    // TODO: BLOCK_CHANGE, BLOCK_CREATE, BLOCK_DELETE, BLOCK_MOVE
    const isEditEvent =
        event.type == Blockly.Events.CHANGE ||
        event.type == Blockly.Events.CREATE ||
        event.type == Blockly.Events.DELETE ||
        event.type == Blockly.Events.MOVE;
    const isUiEvent = event.type == Blockly.Events.UI;

    // Update model only when user creates a new block or somehow interacts
    // with blocks (i.e. create and UI events).
    if (isEditEvent || isUiEvent) {
      // Only update the name on the nav tree during a UI event, which might
      // be a focus change away from the name field.
      this.updateBlockName(
          /* suppressTreeChange */ !isUiEvent,
          /* isSelected */ true);

      if (isEditEvent) {
        // Save block's changes into BlockDefinition model object.
        this.updateBlockDefinition();

        // In Manual Mode, the Editor Workspace is updated from the preview.
        if (!this.inManualMode_) {
          // Update the block editor view.
          this.refreshPreviews();
        }
      }
    }
    // Disable orphans.
    Blockly.Events.disableOrphans(event);
  }

  /**
   * Refreshes previews in view and updates model.
   */
  refreshPreviews() {
    const format = this.view.formatSelector_.val();
    this.updateBlockDefinitionView_(format);
    this.updatePreview();
    this.updateGenerator();
  }

  /**
   * Change the language code format.
   */
  changeFormat() {
    // From factory.js:formatChange()
    // TODO(#168): Move to view class and fix references.
    const editorMask = this.view.editorMask_;
    const blockDefPre = this.view.blockDefPre_;
    const manualBlockDefTA = this.view.manualBlockDefTA_;

    // TODO(#168): Avoid view reference by passing in inManualMode arugment.
    this.inManualMode_ = this.view.isInManualMode();
    if (this.inManualMode_) {
      Blockly.hideChaff();
      editorMask.show();
      blockDefPre.hide();
      // .show() will set this to inline-block, which won't size correctly.
      manualBlockDefTA.css('display', 'block');
      const code = blockDefPre.text().trim();
      manualBlockDefTA.val(code);
      manualBlockDefTA.focus();
      this.updatePreview();
    } else {
      editorMask.hide();
      manualBlockDefTA.hide();
      blockDefPre.show();
      this.updateBlockDefPre();
      this.updatePreview();
    }
  }

  /**
   * Update the block definition code based on constructs made in Blockly.
   */
  updateBlockDefPre() {
    var rootBlock = FactoryUtils.getRootBlock(this.view.editorWorkspace);
    if (!rootBlock) {
      return;
    }
    var blockType = rootBlock.getFieldValue('NAME').trim().toLowerCase();
    if (!blockType) {
      blockType = 'unnamed';
    }
    var format = document.getElementById('format').value;
    var code = FactoryUtils.getBlockDefinition(format,
        this.view.editorWorkspace);
    FactoryUtils.injectCode(code, 'blockDefPre');
  }

  /**
   * Updates the BlockDefinition with the latest values from the editor.
   */
  updateBlockDefinition() {
    // TODO(#190): Store and generate block definition JSONs more efficiently to
    // avoid repeatedly using JSON.parse().
    const blockJson = FactoryUtils.getBlockDefinition(
          'JSON', this.view.editorWorkspace);

    if (blockJson != this.lastBlockJson_) {
      this.lastBlockJson_ = blockJson;

      const rootEditorBlock = FactoryUtils.getRootBlock(this.view.editorWorkspace);
      const blockXml = Blockly.Xml.blockToDom(rootEditorBlock);

      this.view.blockDefinition.update('JSON', blockJson, blockXml);
    }
  }

  /**
   * Checks if new name is a valid name, then renames current BlockDefinition
   * object if valid. Updates navtree with new name.
   * @param {boolean} suppressTreeChange Whether to suppress reflecting name
   *     change in the navtree.
   * @param {boolean} isSelected Whether the currently selected node in the navtree
   *     is the BlockDefinition that will be updated. Used to determine whether
   *     to get the 'old name' of the block (pre-rename) from the currently selected
   *     node or the previously selected node. This is because sometimes rename
   *     can happen after a user switches views (and thus the selected node may
   *     be a different resource object).
   */
  updateBlockName(suppressTreeChange, isSelected) {
    const currentBlock = this.view.blockDefinition;
    const rootBlock = FactoryUtils.getRootBlock(this.view.editorWorkspace);

    const newName = rootBlock.getFieldValue('NAME');
    let oldName = '';
    if (isSelected) {
      oldName = NavigationTree.getName(this.projectController.tree.getSelected());
    } else {
      oldName = NavigationTree.getName(this.projectController.tree.getLastSelected());
    }

    const changedName = currentBlock.name != newName;
    const warning = this.getNameWarning_(newName); // Warning text or null

    if (!suppressTreeChange && changedName && warning) {
      // Warn user if name is invalid (is 'block_type' or a duplicate).
      Blockly.WidgetDiv.hide();
      this.view.editorWorkspace.cancelCurrentGesture();
      rootBlock.setFieldValue(oldName, 'NAME');
      window.alert(warning);
    } else {
      this.projectController.renameBlockDefinition(currentBlock,
          newName, suppressTreeChange);
    }
  }

  /**
   * Update the generator code.
   */
  updateGenerator() {
    const language = $('#language').val();  // Output code language
    const generatorStub = FactoryUtils.getGeneratorStub(
        this.getPreviewBlock_(), language);
    this.view.updateGenStub(generatorStub);
  }

  /**
   * Updates the Block Definition textarea with proper JSON or JavaScript.
   * @param {string} format Format of block definition. Either 'JSON' or 'JavaScript'.
   * @private
   */
  updateBlockDefinitionView_(format) {
    if (format == BlockEditorController.FORMAT_MANUAL) {
      const defCode = this.view.blockDefPre_.val();
      this.view.updateBlockDefinitionView(defCode, /* opt_manual */ true);
    } else {
      const currentBlock = this.view.blockDefinition;
      const defCode = FactoryUtils.getBlockDefinition(
          format, this.view.editorWorkspace);
      this.view.updateBlockDefinitionView(defCode);
    }
  }

  /**
   * Retrieves Blockly.Block given in preview.
   * @return {!Blockly.Block} Block object in preview workspace.
   * @private
   */
  getPreviewBlock_() {
    return this.view.previewWorkspace.getTopBlocks(false)[0];
  }

  /**
   * Update the preview workspace with the updated block.
   */
  updatePreview() {
    const newDir = $('#direction').val();
    this.view.updateDirection(newDir);

    const blockFormatCode = this.getBlockFormatCode_();
    const format = blockFormatCode[0];
    const code = blockFormatCode[1];

    if (!code.trim()) {
      // Nothing to render.  Happens while cloud storage is loading.
      return;
    }

    // Backup Blockly.Blocks object so that main workspace and preview don't
    // collide if user creates a 'factory_base' block, for instance.
    const backupBlocks = Blockly.Blocks;
    try {
      // Make a shallow copy.
      Blockly.Blocks = Object.create(null);
      for (var prop in backupBlocks) {
        Blockly.Blocks[prop] = backupBlocks[prop];
      }

      // Evaluates block definition (temporarily) for preview.
      this.view.blockDefinition.define();

      const blockType = this.view.blockDefinition.type();
      // Render preview block in preview workspace.
      this.renderPreviewBlock_(blockType);
    } catch(err) {
      // TODO: Show error on the UI
      console.error(err);
    } finally {
      Blockly.Blocks = backupBlocks;
      this.view.blockDefinition.undefine();
    }
  }

  /**
   * Attempt to update the block definition (model, view, and preview), from a
   * code string.
   *
   * @return {boolean} True if successful. Otherwise false.
   */
  attemptUpdateFromManualCode() {
    // TODO
    this.updatePreview();
  }

  /**
   * Retrieves the current block's format and code.
   * @return {!Array.<string>} Two-element array. First element is format of code,
   *     and second is the block definition code.
   * @private
   */
  getBlockFormatCode_() {
    const blockDef = [];

    // Fetch the code and determine its format (JSON or JavaScript).
    let format = this.view.formatSelector_.val();
    if (format == BlockEditorController.FORMAT_MANUAL) {
      var code = this.view.manualBlockDefTA_.val();
      // If the code is JSON, it will parse, otherwise treat as JS.
      try {
        JSON.parse(code);
        format = BlockEditorController.FORMAT_JSON;
      } catch (e) {
        format = BlockEditorController.FORMAT_JAVASCRIPT;
      }
    } else {
      var code = this.view.blockDefPre_.text();
    }

    blockDef.push(format);
    blockDef.push(code);

    return blockDef;
  }

  /**
   * Evaluates block definitions in block editor by adding user's definition to
   * Blockly.Blocks. Used to display preview in block editor.
   * @param {string} format Format of block definition, either 'JSON' or 'JavaScript'.
   * @param {string} code Block defintion code to evaluate.
   * @private
   */
  evaluateBlock_(format, code) {
    // REFACTORED: Moved in from factory.js:updatePreview()
    const backupBlocks = Blockly.Blocks;

    Blockly.Blocks = Object.create(null);
    for (let prop in backupBlocks) {
      Blockly.Blocks[prop] = backupBlocks[prop];
    }

    if (format == BlockEditorController.FORMAT_JSON) {
      var json = JSON.parse(code);
      Blockly.Blocks[json.type || 'unnamed'] = {
        init: function() {
          this.jsonInit(json);
        }
      };
    } else if (format == BlockEditorController.FORMAT_JAVASCRIPT) {
      // TODO(#114): Remove use of eval() for security reasons.
      eval(code);
    } else {
      throw 'Unknown format: ' + format;
    }
  }

  /**
   * Renders preview block in preview workspace. Assumes block definition has
   * already been evaluated.
   * @param {string} blockType Name of block type to render in preview.
   * @private
   */
  renderPreviewBlock_(blockType) {
    // TODO(#168): Move to view class and fix references.
    // Create the preview block.
    const previewBlock = this.view.previewWorkspace.newBlock(blockType);
    previewBlock.initSvg();
    previewBlock.render();
    previewBlock.setMovable(false);
    previewBlock.setDeletable(false);
    previewBlock.moveBy(15, 10);
    this.view.previewWorkspace.clearUndo();
  }

  /**
   * Warns user if their block type already exists in standard library or if
   * it is otherwise invalid. Returns null if blockType is a valid type name
   * and no warning is necessary.
   * @param {string} blockType Name of block type rendered in preview.
   * @return {?string} The warning string to display on the block.
   * @private
   */
  getNameWarning_(blockType) {
    // Warn user only if their block type is already exists in Blockly's
    // standard library.
    const rootBlock = FactoryUtils.getRootBlock(this.view.editorWorkspace);
    if (StandardCategories.coreBlockTypes.indexOf(blockType) != -1) {
      return 'A core Blockly block already exists under this name.';
    } else if (blockType == 'block_type') {
      // Warn user to let them know they can't save a block under the default
      // name 'block_type'
      return 'You cannot save a block with the default name, "block_type"';
    } else {
      let existingBlock =
          this.projectController.getProject().getBlockDefinition(blockType);
      if (existingBlock !== this.view.blockDefinition) {
        // TODO(#286): Fix false positive error matches here.
        //     (Low priority, not showing to user, which may be its own bug.)
        return 'There is already a block under this name.';
      } else {
        return null;
      }
    }
  }

  /**
   * Gets the block type that is currently being edited. Extracts type from
   * field input in 'factory_base' block.
   * @return {string} Block type of currently edited block.
   * @private
   */
  getType_() {
    const rootBlock = FactoryUtils.getRootBlock(this.view.editorWorkspace);
    return rootBlock.getFieldValue('NAME');
  }

  /**
   * Returns whether or not the current block open is the starter block.
   */
  isStarterBlock() {
    // TODO: Move in from factory.js
    throw 'Unimplemented: isStarterBlock()';
  }

  /**
   * Imports block library from file to Block Factory. Expects user to upload a
   * single file of JSON mapping each block type to its XML text representation.
   */
  importBlockLibraryFromFile() {
    /**
     * TODO: Move in from app_controller.js
     *          Also from app_controller.js:formatBlockLibraryForImport_(xmlText)
     *
     * References:
     * - formatBlockLibraryForImport_()
     * - setBlockLibraryStorage()
     */

    // TODO(#87): Remove XML's from block library import/export. Download block
    //            definitions and generator stubs, and parse definition JSONs when
    //            importing.

    throw 'Unimplemented: importBlockLibraryFromFile';
  }

  /**
   * Exports block library to file that contains JSON mapping each block type to
   * its XML text representation.
   */
  exportBlockLibraryToFile() {
    /**
     * TODO: Move in from app_controller.js
     *          Also from app_controller.js:formatBlockLibraryForExport_(blockXmlMap)
     */

    // TODO(#87): Remove XML's from block library import/export. Download block
    //            definitions and generator stubs, and parse definition JSONs when
    //            importing.

    throw 'Unimplemented: exportBlockLibraryToFile()';
  }

  /**
   * Returns JavaScript scripts necessary for loading block definitions of all
   * user-defined blocks within the project.
   * @return {string} JavaScript block definitions of blocks within the project.
   */
  getLibraryJsFile() {
    let fileContents = '';
    const allBlocks = this.projectController.getProject().
        librarySet.getAllBlockDefinitionsMap();
    for (let blockName in allBlocks) {
      const block = allBlocks[blockName];
      fileContents += '// Block definition: ' + blockName;
      fileContents += `
Blockly.Blocks['${blockName}'] = {
  init: function() {
    var blockJson = ${block.json};
    this.jsonInit(blockJson);
  }
};
`;
      fileContents += '\n';
    }
    return fileContents;
  }

  /**
   * Extracts out block type from XML text, the kind that is saved in block
   * library storage.
   * @param {string} xmlText A block's XML text.
   * @return {string} The block type that corresponds to the provided XML text.
   * @private
   *
   * TODO(#87): Replace this function with getting block type from JSON block definition.
   */
  getBlockTypeFromXml_(xmlText) {
    /**
     * TODO: Move in from app_controller.js
     */

    throw 'Unimplemented: getBlockTypeFromXml_()';
  }
}
