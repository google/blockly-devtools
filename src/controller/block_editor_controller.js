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
   * @param {!Project} project Project object associated with this controller.
   * @param {!Blockly.Workspace} hiddenWorkspace Invisible Blockly Workspace
   *     used to generate Blockly objects for import/export.
   */
  constructor(project, hiddenWorkspace) {
    /**
     * Project whose library is controlled by this BlockEditorController instance.
     * @type {!Project}
     */
    this.project = project;

    // Creates a default library. Adds a sample block to library.
    const firstLibrary = new BlockLibrary('MyFirstLibrary');
    this.project.addBlockLibrary(firstLibrary);
    const firstBlock = new BlockDefinition('block_type');
    firstLibrary.addBlockDefinition(firstBlock);

    /**
     * View object in charge of visible elements of DevTools Block Library editor.
     * @type {!BlockEditorView}
     */
    this.view = new BlockEditorView(firstBlock);

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

    this.refreshPreviews();
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
  static get FORMAT_GENERAL() {
    return 'General';
  }

  /**
   * Refreshes all three previews (block preview, block definition view, and
   * generator stub) at once.
   */
  refreshPreviews() {
    this.updateBlockDefinitionView($('#format').val());
    this.updatePreview();
    this.updateGenerator(this.getPreviewBlock());
  }

  /**
   * Change the language code format.
   */
  formatChange() {
    // TODO: Move in from factory.js
    throw 'Unimplemented: formatChange()';
  }

  /**
   * Update the language code based on constructs made in Blockly.
   */
  updateLanguage() {
    // TODO: Move in from factory.js
    throw 'Unimplemented: updateLanguage()';
  }

  /**
   * Update the generator code.
   * @param {!Blockly.Block} block Rendered block in preview workspace.
   */
  updateGenerator(block) {
    // REFACTORED: Moved in from factory.js:updateGenerator()
    const language = $('#language').val();
    const generatorStub = FactoryUtils.getGeneratorStub(block, language);
    this.view.updateGenStub(generatorStub);
  }

  /**
   * Updates the Block Definition textarea with proper JSON or JavaScript.
   * @param {string} format Format of block definition. Either 'JSON' or 'JavaScript'.
   */
  updateBlockDefinitionView(format) {
    const currentBlock = this.view.blockDefinition;
    const defCode = FactoryUtils.getBlockDefinition(currentBlock.type(),
        format, this.view.editorWorkspace);
    this.view.updateBlockDefinitionView(defCode);
  }

  /**
   * Retrieves Blockly.Block given in preview.
   * @return {!Blockly.Block} Block object in preview workspace.
   */
  getPreviewBlock() {
    return this.view.previewWorkspace.getTopBlocks(false)[0];
  }

  /**
   * Update the preview display.
   */
  updatePreview() {
    // REFACTORED: Moved in from factory.js:updatePreview()
    const newDir = $('#direction').val();
    this.view.updateDirection(newDir);

    const blockDef = this.getDefinitionFormat_();
    const format = blockDef[0];
    const code = blockDef[1];

    if (!code.trim()) {
      // Nothing to render.  Happens while cloud storage is loading.
      return;
    }

    const backupBlocks = Blockly.Blocks;
    try {
      // Evaluates block definition (temporarily) for preview.
      this.evaluateBlock_(format, code);

      const blockType = this.view.blockDefinition.type();
      // Render preview block in preview workspace.
      this.renderPreviewBlock_(blockType);
      // Warn user if block type is invalid.
      this.maybeWarnUser_(blockType);
    } finally {
      Blockly.Blocks = backupBlocks;
    }
  }

  /**
   * Determines what format the user-defined block definition is in.
   * @return {!Array.<string>} Two-element array. First element is format of code,
   *     and second is the block definition code.
   * @private
   */
  getDefinitionFormat_() {
    // REFACTORED: Moved in from factory.js:updatePreview()
    const blockDef = [];

    // Fetch the code and determine its format (JSON or JavaScript).
    const format = $('#format').val();
    if (format == BlockEditorController.FORMAT_GENERAL) {
      var code = $('#languageTA').val();
      // If the code is JSON, it will parse, otherwise treat as JS.
      try {
        JSON.parse(code);
        format = BlockEditorController.FORMAT_JSON;
      } catch (e) {
        format = BlockEditorController.FORMAT_JAVASCRIPT;
      }
    } else {
      var code = $('#languagePre').text();
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
   * it is otherwise invalid.
   * @param {string} blockType Name of block type rendered in preview.
   * @private
   */
  maybeWarnUser_(blockType) {
    // Warn user only if their block type is already exists in Blockly's
    // standard library.
    const rootBlock = FactoryUtils.getRootBlock(this.view.editorWorkspace);
    if (StandardCategories.coreBlockTypes.indexOf(blockType) != -1) {
      rootBlock.setWarningText('A core Blockly block already exists ' +
          'under this name.');
    } else if (blockType == 'block_type') {
      // Warn user to let them know they can't save a block under the default
      // name 'block_type'
      rootBlock.setWarningText('You cannot save a block with the default ' +
          'name, "block_type"');
    } else {
      rootBlock.setWarningText(null);
    }
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
     *
     * References:
     * - formatBlockLibraryForExport_()
     * - FactoryUtils.createAndDownloadFile()
     */

    // TODO(#87): Remove XML's from block library import/export. Download block
    //            definitions and generator stubs, and parse definition JSONs when
    //            importing.

    throw 'Unimplemented: exportBlockLibraryToFile()';
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
