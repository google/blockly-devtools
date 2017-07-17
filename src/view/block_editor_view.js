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
 * @fileoverview BlockEditorView deals with the visual components of defining a
 * custom block.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo)
 */

goog.provide('BlockEditorView');

goog.require('BlockDefinition');
goog.require('goog.dom');
goog.require('goog.dom.classlist');

class BlockEditorView {
  /**
   * @constructor
   * @param {BlockDefinition} blockDefinition BlockDefinition object currently
   *      shown in view.
   */
  constructor(blockDefinition) {
    /**
     * BlockDefinition currently being edited within the view.
     * @type {!BlockDefinition}
     */
    this.blockDefinition = blockDefinition;

    this.saveButton = $('#saveToBlockLibraryButton');
    this.deleteButton = $('#removeBlockFromLibraryButton');
    this.deleteButton.disabled = true;
    this.rtl = true;

    /**
     * Blockly workspace of main block defining workspace.
     * @type {!Blockly.Workspace}
     */
    this.editorWorkspace = Blockly.inject('blockly',
      {
        collapse: false,
        toolbox: DevToolsToolboxes.blockFactory,
        media: 'media/'
      });

    // Render starter block.
    this.showStarterBlock(FactoryUtils.buildBlockEditorStarterXml(
        '', '', ''));
    this.updateButtons(false, false);

    this.previewPane = Blockly.inject('preview',
      {
        rtl: this.rtl,
        media: 'media/',
        scrollbars: true
      });
  }

  /**
   * Add click handlers to each tab to allow switching between the Block Factory,
   * Workspace Factory, and Block Exporter tab.
   * @param {!Object} tabMap Map of tab name to div element that is the tab.
   */
  addTabHandlers(tabMap) {
    /*
     * TODO: Move in from app_controller.js
     *
     * References:
     * - makeTabClickHandler_()
     */
    throw 'Unimplemented: addTabHandlers()';
  }

  /**
   * Creates the tab click handler specific to the tab specified.
   * @param {string} tabName AppController.BLOCK_FACTORY,
   *     AppController.WORKSPACE_FACTORY, or AppController.EXPORTER
   * @return {!Function} The tab click handler.
   */
  makeTabClickHandler(tabName) {
    /*
     * TODO: Move in from app_controller.js
     *
     * References:
     * - this.setSelected_()
     * - this.onTab()
     */
    throw 'Unimplemented: makeTabClickHandler()';
  }

  /**
   * Render starter block.
   * @param {string} starterXml XML string of block editing Blocks to pre-load
   *     onto Block Editor workspace.
   */
  showStarterBlock(starterXml) {
    // REFACTORED: Moved in from
    // factory.js:showStarterBlock(inputType, blockTypeName, opt_blockStarterText)
    this.editorWorkspace.clear();
    const xml = Blockly.Xml.textToDom(starterXml);
    Blockly.Xml.domToWorkspace(xml, this.editorWorkspace);
  }

  /**
   * Disable link and save buttons if the format is 'Manual', enable otherwise.
   */
  disableEnableLink() {
    // TODO: Move in from factory.js
    throw 'Unimplemented: disableEnableLink()';
  }

  /**
   * Updates the workspace to show the block user selected from library
   * @param {!Element} blockXml XML of blocks to display on Block Editor workspace.
   */
  showBlock(blockXml) {
    this.editorWorkspace.clear();
    Blockly.Xml.domToWorkspace(blockXml, this.editorWorkspace);
  }

  /**
   * Updates save and delete buttons. Includes block type name in button. Changes
   * color depending on whether already saved or unsaved.
   * @param {boolean} isInLibrary Whether the block type is in the library.
   * @param {boolean} savedChanges Whether changes to block have been saved.
   */
  updateButtons(isInLibrary, savedChanges) {
    // REFACTORED: From block_library_view.js:updateButtons(blockType, isInLibrary, savedChanges)
    const rootBlock = FactoryUtils.getRootBlock(this.editorWorkspace);
    let blockType = rootBlock.getFieldValue('NAME').trim().toLowerCase();
    blockType = FactoryUtils.cleanBlockType(blockType);

    if (!isInLibrary) {
      // Block type has not been saved to library yet. Disable the delete button
      // and allow user to save.
      this.saveButton.text('Save "' + blockType + '"');
      this.saveButton.disabled = false;
      this.deleteButton.disabled = true;
    } else {
      // Block type has already been saved. Disable the save button unless the
      // there are unsaved changes (checked below).
      this.saveButton.text('Update "' + blockType + '"');
      this.saveButton.disabled = true;
      this.deleteButton.disabled = false;
    }
    this.deleteButton.text('Delete "' + blockType + '"');

    // If changes to block have been made and are not saved, make button
    // green to encourage user to save the block.
    if (!savedChanges) {
      var buttonFormatClass = 'button_warn';

      // If block type is the default, 'block_type', make button red to alert
      // user.
      if (blockType == 'block_type') {
        buttonFormatClass = 'button_alert';
      }
      goog.dom.classlist.add(this.saveButton.get(0), buttonFormatClass);
      this.saveButton.disabled = false;
    } else {
      // No changes to save.
      var classesToRemove = ['button_alert', 'button_warn'];
      goog.dom.classlist.removeAll(this.saveButton.get(0), classesToRemove);
      this.saveButton.disabled = true;
    }
  }

  /**
   * Re-injects the workspace if user switches between rtl and ltr.
   * @param {string} rtl Input value, either 'rtl' or 'ltr', of which direction
   *     Blocks should be in.
   */
  updateDirection(rtl) {
    const newDir = (rtl == 'rtl');
    if (this.rtl !== newDir) {
      this.rtl = newDir;
      this.previewPane = Blockly.inject('preview',
        {
          rtl: this.rtl,
          media: 'media/',
          scrollbars: true
        });
    }
    this.previewPane.clear();
  }
}
