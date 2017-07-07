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

goog.require('FactoryUtils');
goog.require('StandardCategories');

class BlockEditorController {
  constructor(project) {
    /**
     * Project whose library is controlled by this BlockLibraryController instance.
     * @type {!Project}
     */
    this.project = project;

    /**
     * Keeps track of which block is currently being edited in this.project.
     * @type {!BlockDefinition}
     */
    this.currentBlockDefinition = null;

    /**
     * View object in charge of visible elements of DevTools Block Library editor.
     * @type {!BlockEditorView}
     */
    this.view = new BlockEditorView(this.currentBlockDefinition);

    /**
     * Existing direction ('ltr' vs 'rtl') of preview.
     * @type {string}
     */
    this.previewDirection = null;
  }

  /*
   * The starting XML for the Block Editor main workspace. Contains the
   * unmovable, undeletable factory_base block. Allows user input to change XML
   * starter block.
   *
   * @param {string} inputType Type of input (statement, value, dummy).
   * @param {string} blockTypeName Name of block, given by user.
   * @param {string} opt_blockStarterText Starter text to place on block, given by
   *     user (optional).
  */
  buildStartXml(inputType, blockTypeName, opt_blockStarterText) {
    // TODO: Move in from factory.js
  }

  /**
   * Change the language code format.
   */
  formatChange() {
    // TODO: Move in from factory.js
  }

  /**
   * Update the language code based on constructs made in Blockly.
   */
  updateLanguage() {
    // TODO: Move in from factory.js
  }

  /**
   * Update the generator code.
   * @param {!Blockly.Block} block Rendered block in preview workspace.
   */
  updateGenerator(block) {
    // TODO: Move in from factory.js
  }

  /**
   * Update the preview display.
   */
  updatePreview() {
    // TODO: Move in from factory.js
  }

  /**
   * Render starter block.
   * @param {string} inputType Type of input (statement, value, dummy).
   * @param {string} blockTypeName Name of block, given by user.
   * @param {string} opt_blockStarterText Starter text to place on block, given by
   *     user (optional).
   */
  disableEnableLink(inputType, blockTypeName, opt_blockStarterText) {
    // TODO: Move in from factory.js
  }

  /**
   * Returns whether or not the current block open is the starter block.
   */
  isStarterBlock() {
    // TODO: Move in from factory.js
  }
}
