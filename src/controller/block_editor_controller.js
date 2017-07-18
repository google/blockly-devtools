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

    /**
     * Keeps track of which library is currently being edited. Used to know where
     * to 'automatically' add a block when a user creates a new block.
     * @type {!BlockLibrary}
     */
    this.currentLibrary = new BlockLibrary('MyFirstLibrary');

    // Creating a default library, adds a sample block to library
    this.project.addBlockLibrary(this.currentLibrary);
    const firstBlock = new BlockDefinition('block_type');
    this.currentLibrary.addBlockDefinition(firstBlock);

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

    // Opens block in workspace when first creating the BlockEditorController.
    // this.openBlock(this.view.blockDefinition);
    // The above was commented out because it depends on not yet implemented
    // model functions.

    this.refreshPreviews();
  }

  /**
   * Refreshes all three previews (block preview, block definition view, and
   * generator stub) at once.
   */
  refreshPreviews() {
    console.log('refreshPreviews() called!');
    this.updateBlockDefinitionView($('#format').val());
    this.updatePreview();
    console.log(this.getPreviewBlock());
    this.updateGenerator(this.getPreviewBlock());
  }

  /**
   * Opens a given BlockDefinition to be edited in Block Editor view. If the
   * given BlockDefinition does not exist, creates a new BlockDefinition under
   * that name and then displays it.
   * @param {BlockDefinition} blockDefinition BlockDefinition object
   *     that will be rendered onto page.
   */
  openBlock(blockDefinition) {
    // If blockDefinition hasn't yet been added, add to the currently active
    // block library.
    if (!this.project.hasBlock(blockDefinition.name)) {
      this.currentLibrary.addBlockDefinition(blockDefinition);
    }
    // Shows block at the view level.
    this.view.showBlock(blockDefinition);
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
    // REFACTORED: Moved in from factory.js
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
    // REFACTORED: Moved in from factory.js
    const newDir = $('#direction').val();
    this.view.updateDirection(newDir);

    // Fetch the code and determine its format (JSON or JavaScript).
    var format = document.getElementById('format').value;
    if (format == 'Manual') {
      var code = document.getElementById('languageTA').value;
      // If the code is JSON, it will parse, otherwise treat as JS.
      try {
        JSON.parse(code);
        format = 'JSON';
      } catch (e) {
        format = 'JavaScript';
      }
    } else {
      var code = document.getElementById('languagePre').textContent;
    }
    if (!code.trim()) {
      // Nothing to render.  Happens while cloud storage is loading.
      return;
    }
    const backupBlocks = Blockly.Blocks;
    try {
      Blockly.Blocks = Object.create(null);
      for (let prop in backupBlocks) {
        Blockly.Blocks[prop] = backupBlocks[prop];
      }

      if (format == 'JSON') {
        var json = JSON.parse(code);
        Blockly.Blocks[json.type || 'unnamed'] = {
          init: function() {
            this.jsonInit(json);
          }
        };
      } else if (format == 'JavaScript') {
        eval(code);
      } else {
        throw 'Unknown format: ' + format;
      }

      // Look for a block on Blockly.Blocks that does not match the backup.
      // var blockType = null;
      // for (var type in Blockly.Blocks) {
      //   if (typeof Blockly.Blocks[type].init == 'function' &&
      //       Blockly.Blocks[type] != backupBlocks[type]) {
      //     blockType = type;
      //     break;
      //   }
      // }
      // if (!blockType) {
      //   return;
      // }
      const blockType = this.view.blockDefinition.type();
      // Create the preview block.
      var previewBlock = this.view.previewWorkspace.newBlock(blockType);
      previewBlock.initSvg();
      previewBlock.render();
      previewBlock.setMovable(false);
      previewBlock.setDeletable(false);
      previewBlock.moveBy(15, 10);
      this.view.previewWorkspace.clearUndo();
      this.updateGenerator(previewBlock);

      // Warn user only if their block type is already exists in Blockly's
      // standard library.
      var rootBlock = FactoryUtils.getRootBlock(this.view.editorWorkspace);
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

    } finally {
      Blockly.Blocks = backupBlocks;
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
