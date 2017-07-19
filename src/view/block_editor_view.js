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

    /**
     * JQuery container of block editor view.
     * @type {!JQuery}
     */
    this.container = $('#blockFactoryContent');

    // Inserts HTML into container.
    this.container.html(BlockEditorView.html);
    this.container.show();

    /**
     * Save button in block editor view.
     * @type {!JQuery}
     */
    this.saveButton = $('#saveToBlockLibraryButton');

    /**
     * Delete button in block editor view.
     * @type {!JQuery}
     */
    this.deleteButton = $('#removeBlockFromLibraryButton');

    // Disable delete button by default.
    this.deleteButton.disabled = true;

    /**
     * Whether user is creating rtl or ltr blocks.
     * @type {boolean}
     */
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
    const starterXml = FactoryUtils.buildBlockEditorStarterXml(
        '', this.blockDefinition.type(), '');
    this.showStarterBlock(starterXml);
    this.blockDefinition.setXml(Blockly.Xml.textToDom(starterXml));

    // Update buttons for save/delete/etc.
    this.updateButtons(false, false);

    // Initialize preview workspace.
    this.previewWorkspace = Blockly.inject('preview',
      {
        rtl: this.rtl,
        media: 'media/',
        scrollbars: true
      });
  }

  /**
   * Removes elements of this editor view from application view. Used when switching
   * editors.
   */
  hide() {
    // Deselect the tab.
    const tab = $('#' + AppController.BLOCK_FACTORY);
    tab.removeClass('tabon');
    tab.addClass('taboff');
    // Hide this view.
    this.container.hide();
  }

  /**
   * Shows elements of this editor to application view. Used when switching editors.
   * @param {string} blockName Name of block to populate into block editor view.
   */
  show(blockName) {
    // Select the tab.
    const tab = $('#' + AppController.BLOCK_FACTORY);
    tab.removeClass('taboff');
    tab.addClass('tabon');
    // Show this view.
    this.container.show();
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
   * @param {!BlockDefinition} blockDef BlockDefinition object to show on block
   *     editor workspace.
   */
  showBlock(blockDef) {
    this.blockDefinition = blockDef;
    const blockXml = this.blockDefinition.getXml();

    this.editorWorkspace.clear();
    Blockly.Xml.domToWorkspace(blockXml, this.editorWorkspace);
  }

  /**
   * Updates the block definition textarea preview.
   * @param {string} blockDefCode String representation of JSON or JavaScript
   *     block definition. (Not to be confused with the BlockDefinition object
   *     used only within DevTools.)
   */
  updateBlockDefinitionView(blockDefCode) {
    FactoryUtils.injectCode(blockDefCode, 'languagePre');
  }

  /**
   * Updates the generator stub textarea preview.
   * @param {string} genStubCode String representation of JavaScript generator
   *     stub for block that is currently being edited in the view.
   */
  updateGenStub(genStubCode) {
    FactoryUtils.injectCode(genStubCode, 'generatorPre');
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
      if (this.previewWorkspace) {
        this.previewWorkspace.dispose();
      }
      this.rtl = newDir;
      this.previewWorkspace = Blockly.inject('preview',
        {
          rtl: this.rtl,
          media: 'media/',
          scrollbars: true
        });
    }
    this.previewWorkspace.clear();
  }
}

BlockEditorView.html = `
<!-- Blockly Factory Tab -->
<table>
  <tr width="100%" height="10%">
    <td width="50%" height="5%">
      <table>
        <tr id="blockLibrary">
          <td id="blockLibraryControls">
          <button id="createNewBlockButton" title="Create Block.">
            Create New Block
          </button>
          <button id="saveToBlockLibraryButton" title="Save block to Block Library.">
            Save "block_type"
          </button>
          <button id="removeBlockFromLibraryButton" title="Remove block from Block Library.">
            Delete "block_type"
          </button>
          </td>
        </tr>
      </table>
    </td>
    <td height="5%">
      <table id="blockFactoryPreview">
        <tr>
          <td id="previewContainer">
            <h3>Preview:
              <select id="direction">
                <option value="ltr">LTR</option>
                <option value="rtl">RTL</option>
              </select>
            </h3>
          </td>
          <td id="buttonContainer">
            <button id="linkButton" title="Save and link to blocks.">
              <img src="media/link.png" height="21" width="21">
            </button>
            <button id="clearBlockLibraryButton" title="Clear Block Library.">
              <span>Clear Library</span>
            </button>
            <label for="files" class="buttonStyle">
              <span class=>Import Block Library</span>
            </label>
            <input id="files" type="file" name="files"
                accept="application/xml">
            <button id="localSaveButton" title="Save block library XML to a local file.">
              <span>Download Block Library</span>
            </button>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr height="80%">
    <td id="blocklyWorkspaceContainer">
      <div id="blockly"></div>
      <div id="blocklyMask"></div>
    </td>
    <td width="50%">
      <table id="blocklyPreviewContainer">
        <tr>
          <td height="30%">
            <div id="preview"></div>
          </td>
        </tr>
        <tr>
          <td height="5%">
            <h3>Block Definition:
              <select id="format">
                <option value="JSON">JSON</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Manual">Manual edit&hellip;</option>
              </select>
            </h3>
          </td>
        </tr>
        <tr>
          <td height="30%">
            <pre id="languagePre"></pre>
            <textarea id="languageTA"></textarea>
          </td>
        </tr>
        <tr>
          <td height="5%">
            <h3>Generator stub:
              <select id="language">
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="PHP">PHP</option>
                <option value="Lua">Lua</option>
                <option value="Dart">Dart</option>
              </select>
            </h3>
          </td>
        </tr>
        <tr>
          <td height="30%">
            <pre id="generatorPre"></pre>
          </td>
        </tr>
      </table>
    </td>
    </tr>
</table>
`;