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

goog.require('BlockLibrary');

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
     * The currently selected format for editing the block definition.
     * @type {format: string, isInManualMode: boolean}
     */
    this.editFormat_ = this.view.getSelectedEditFormat();

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
        if (!this.editFormat_.isInManualMode) {
          // Update the block editor view.
          const code = this.getBlockDefinitionCodeFromBlocks_(
              this.editFormat_.format);
          this.view.updateBlockDefinitionCodeView(code);
          this.refreshPreviews();
        }
      }
    }
  }

  /**
   * Refreshes the block preview and the generator stub from the current
   * definition.
   */
  refreshPreviews() {
    const format = this.view.formatSelector_.val();
    const code = this.updateBlockDefinitionViewAndReturnCode_(format);
    this.updatePreview_(format, code);

    this.updateGenerator();
  }

  /**
   * Change the language code format.
   * @param format {string} FORMAT_JSON or FORMAT_JAVASCRIPT
   * @param isInManualMode {boolean} True if the user can manually edit the
   *     definition.
   */
  // TODO(#294): Rename as onAttemptChangeFormat(). Async callback. Revert
  //     view change if manual code cannot be parsed.
  onChangeFormat() {
    const oldEditFormat = this.editFormat_;
    const newEditFormat = this.view.getSelectedEditFormat();

    if (newEditFormat.format === BlockDefinition.FORMAT_JAVASCRIPT
        && newEditFormat.isInManualMode) {
      // TODO(#295): Popup warning when first running Manual JavaScript mode.
    }

    // TODO: Prompt to abort if manual defintion did not previously parse.

    const code = this.getBlockDefinitionCodeFromBlocks_(newEditFormat.format);
    this.view.updateBlockDefinitionCodeView(
        code, newEditFormat.isInManualMode);
    this.editFormat_ = newEditFormat;
  }

  /**
   * Get the block definition code based on the blocks-based editor.
   * @return {string} The definition code.
   * @private
   */
  getBlockDefinitionCodeFromBlocks_(format) {
    var blockType = this.getBlockTypeName_();
    if (!blockType || blockType.length === 0) {
      blockType = 'unnamed';
    }
    return FactoryUtils.getBlockDefinition(format, this.view.editorWorkspace);
  }

  /**
   * Updates the BlockDefinition with the latest values from the
   * block-representation editor.
   */
  // TODO(#291): Make this private after moving call out of EditorController.
  updateBlockDefinition() {
    // TODO(#190): Store and generate block definition JSONs more efficiently to
    // avoid repeatedly using JSON.parse().
    let [format, code] = this.getBlockFormatCode_();
    if (this.editFormat_.isInManualMode) {
      format = 'JSON';
      code = FactoryUtils.getBlockDefinition(
          format, this.view.editorWorkspace);
    }

    if (code != this.lastBlockJson_) {
      this.lastBlockJson_ = code;

      let blockXml = undefined;  // TODO(#87): Remove
      if (this.editFormat_.isInManualMode) {
        const rootEditorBlock = FactoryUtils.getRootBlock(this.view.editorWorkspace);
        const blockXml = Blockly.Xml.blockToDom(rootEditorBlock);
      }

      this.view.blockDefinition.update(format, code, blockXml);
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
  // TODO: Refactor negative boolean first param
  updateBlockName(suppressTreeChange, isSelected) {
    const currentBlock = this.view.blockDefinition;
    const rootBlock = FactoryUtils.getRootBlock(this.view.editorWorkspace);

    const newName = this.getBlockTypeName_();
    let oldName = NavigationTree.getName(isSelected ?
        this.projectController.tree.getSelected() :
        this.projectController.tree.getLastSelected());

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
  // TODO: Split into two methods, explicitly naming the source of the code.
  updateBlockDefinitionViewAndReturnCode_(format) {
    let defCode;
    if (this.editFormat_.isInManualMode) {
      defCode = this.view.blockDefPre_.val();
      this.view.updateBlockDefinitionView(defCode, /* opt_manual */ true);
    } else {
      const currentBlock = this.view.blockDefinition;
      defCode = FactoryUtils.getBlockDefinition(
          format, this.view.editorWorkspace);
      this.view.updateBlockDefinitionCodeView(defCode);
    }
    return defCode;
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
   * Attempt to update the block definition (model, view, and preview), from a
   * code string.
   *
   * @return {boolean} True if successful. Otherwise false.
   */
  attemptUpdateFromManualCode() {
    const [format, code] = this.getBlockFormatCode_();
    if (this.updatePreview_(format, code)) {
      // Update block-based definition from the preview.
      const previewBlock = this.view.previewWorkspace.getAllBlocks()[0];
      const editorWorkspace = this.view.editorWorkspace;
      editorWorkspace.clear();
      var xml = BlockDefinitionExtractor.buildBlockFactoryWorkspace(previewBlock);
      Blockly.Xml.domToWorkspace(xml, editorWorkspace);

      this.updateGenerator();
      this.updateBlockName(
          /* suppressTreeChange */ false,
          /* isSelected */ true);
    }
  }

  /**
   * Update the preview workspace with the the code in the block definition's
   * code view.
   */
  updatePreview() {
    const [format, code] = this.getBlockFormatCode_();
    this.updatePreview_(format, code);
  }

  /**
   * Attempt to update the preview workspace with the the provided code.
   * @param format {string} Either 'JSON' or 'JavaScript'.
   * @param code {string} The code for the block definition.
   * @return True if successful. Otherwise false.
   * @private
   */
  updatePreview_(format, code) {
    const newDir = $('#direction').val();
    this.view.updateDirection(newDir);

    if (!code.trim()) {
      // Nothing to render.  Happens while cloud storage is loading.
      return false;
    }

    // Backup Blockly.Blocks object so that main workspace and preview don't
    // collide if user creates a 'factory_base' block, for instance.
    const backupBlocks = Blockly.Blocks;
    const blockTypeName = this.getBlockTypeName_();
    if (!blockTypeName) {
      return false;
    }
    const tempDefinition = new BlockDefinition(blockTypeName, format, code);
    try {
      // Make a shallow copy.
      Blockly.Blocks = Object.create(null);
      for (var prop in backupBlocks) {
        Blockly.Blocks[prop] = backupBlocks[prop];
      }

      tempDefinition.define();
      this.view.renderPreviewBlock(blockTypeName);
    } catch(err) {
      // TODO(#293): Option to show the error in the UI?
      console.error(err);
      return false;
    } finally {
      Blockly.Blocks = backupBlocks;
      tempDefinition.undefine();
    }
    return true;
  }

  /**
   * Retrieves the current block's format and code, regardless of whether it is
   * defined via blocks or manual code, whether it is defined in JSON or
   * JavaScript.
   * @return {!Array.<string>} Two-element array. First element is format of
   *                           code, and second is the block definition code.
   * @private
   */
  getBlockFormatCode_() {
    // Fetch the code and determine its format (JSON or JavaScript).
    let format = this.editFormat_.format;
    if (this.editFormat_.isInManualMode) {
      // The UI is the autority for the code.
      return [format, this.view.getManualBlockDefinition()];
    } else {
      // The model is the authority.
      return this.view.blockDefinition.getBlockFormatCode();
    }
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

    if (format == BlockDefinition.FORMAT_JSON) {
      var json = JSON.parse(code);
      Blockly.Blocks[json.type || 'unnamed'] = {
        init: function() {
          this.jsonInit(json);
        }
      };
    } else if (format == BlockDefinition.FORMAT_JAVASCRIPT) {
      // TODO(#114): Remove use of eval() for security reasons.
      eval(code);
    } else {
      throw 'Unknown format: ' + format;
    }
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
   * Get the 'live' / authorative Block type name from the active editor.
   * @return {?string} The block type name, or null if not found / defined.
   */
  getBlockTypeName_() {
    if (!this.editFormat_.isInManualMode) {
      const rootEditorBlock =
          FactoryUtils.getRootBlock(this.view.editorWorkspace);
      return rootEditorBlock.getFieldValue('NAME');
    } else {
      switch (this.editFormat_.format) {
        case BlockDefinition.FORMAT_JSON:
          return this.getBlockTypeNameFromJson_();
        case BlockDefinition.FORMAT_JAVASCRIPT:
          return this.getBlockTypeNameFromJavaScript_();
        default:
          throw new Error('Unknown edit format: ' + this.editFormat_.format);
      }
    }
  }

  /**
   * Get the Block type name from manual JSON code.
   * @return {?string} The block type name, or null if not found / defined.
   */
  getBlockTypeNameFromJson_() {
    const [_, code] = this.getBlockFormatCode_();
    try {
      const json = JSON.parse(code);
      return json['type'];
    } catch(e) {
      console.warn('Invalid/incomplete JSON: ' + e);  //  No stack trace.
    }
  }

  /**
   * Get the Block type name from manual JavaScript code.
   * @return {?string} The block type name, or null if not found / defined.
   */
  getBlockTypeNameFromJavaScript_() {
    const [_, code] = this.getBlockFormatCode_();

    // Find line with...
    //    Blockly.Blocks['block_type_name'] = {
    // capturing the actual block type name.
    let regex = /^Blockly\.Blocks\s*\[\s*['"]([^'"]+)['"]\s*\]\s*=\s*\{/g;

    let match = regex.exec(code);
    if (!match) {
      // TODO: Maybe show in the UI?
      console.error(
          'No Blockly.Blocks assignment found in the JavaScript.');
      return false;
    }
    let second = regex.exec(code);  // starts at lastIndex.
    if (second) {
      console.warn(
          'Multiple Blockly.Blocks assignments in the code. Trimming...');
      code = code.subsring(0, second.index);
    }
    // TODO: Unescape the JavaScript string.
    return match[1];
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
}
