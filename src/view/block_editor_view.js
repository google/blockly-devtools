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

class BlockEditorView {
  /**
   * @constructor
   * @param {!BlockDefinition} blockDefinition BlockDefinition object currently
   *      shown in view.
   */
  constructor(blockDefinition) {
    /**
     * BlockDefinition currently being edited within the view.
     * @type {!BlockDefinition}
     */
    // TODO: Move to BlockEditorController
    this.blockDefinition = blockDefinition;

    /**
     * JQuery container of block editor view.
     * @type {!JQuery}
     */
    this.container = $('#blockEditor');

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

    /**
     * Drop down selector to pick the code format.
     * @type {!JQuery}
     */
    this.formatSelector_ = $('#format');

    /**
     * Pretty-printed &lt;pre&gt; that displays the JSON or JavaScript code for
     * the block defined in the workspace.
     * @type {!JQuery}
     */
    this.blockDefPre_ = $('#blockDefPre');

    /**
     * The textarea to edit the block definition in manual mode.
     * @type {!JQuery}
     */
    this.manualBlockDefTA_ = $('#manualBlockDefTA');

    /**
     * The overlay to show over the editor workspace to prevent interaction.
     * @type {!JQuery}
     */
    this.editorMask_ = $('#blockEditorWorkspaceMask');

    /**
     * Whether user is creating RTL or LTR blocks.
     * @type {boolean}
     */
    this.rtl = true;

    /**
     * Blockly workspace of main block defining workspace.
     * @type {!Blockly.Workspace}
     */
    this.editorWorkspace = Blockly.inject('blockEditorWorkspace',
      {
        collapse: false,
        toolbox: DevToolsToolboxes.blockFactory,
        media: 'media/'
      });

    // Initialize preview workspace.
    this.previewWorkspace = Blockly.inject('preview',
      {
        rtl: this.rtl,
        media: 'media/',
        scrollbars: true
      });
  }

  /**
   * Removes contents of this editor view from application view. Used when switching
   * editors.
   */
  hide() {
    // Deselect the tab.
    const tab = $('#' + AppController.BLOCK_EDITOR);
    tab.removeClass('tabon');
    tab.addClass('taboff');
    // Hide this view.
    this.container.hide();
  }

  /**
   * Shows contents of this editor to application view. Used when switching editors.
   * @param {!BlockDefinition} block BlockDefinition to populate into block editor view.
   */
  show(block) {
    // Select the tab.
    const tab = $('#' + AppController.BLOCK_EDITOR);
    tab.removeClass('taboff');
    tab.addClass('tabon');
    // Show this view.
    this.container.show();
    Blockly.svgResize(this.editorWorkspace);
    Blockly.svgResize(this.previewWorkspace);

    // TODO: Make editor show the @param block (when user clicks
    //       on a specific block in the navtree to edit.
    if (!block) {
      console.warn('Incorrect type: Trying to show a ' + block + ' in BlockEditorView');
      return;
    }
    this.blockDefinition = block;

    this.editorWorkspace.clear();
    Blockly.Xml.domToWorkspace(block.getXml(), this.editorWorkspace);
  }

  /**
   * Initializes all event handlers and listeners for buttons/etc. in this view.
   * @param {!BlockEditorController} controller BlockEditorController which will
   *     manage changes within event listeners.
   * @package
   */
  init(controller) {
    // Update code on changes to block being edited.
    this.editorWorkspace.addChangeListener((event) => {
      // Disable blocks not attached to the factory_base block.
      // Must do first so newly attached blocks are enabled when they
      // are processed by the controller code.
      Blockly.Events.disableOrphans(event);

      controller.onWorkspaceChange(event);
    });

    $('#direction').change(() => {
      this.updateDirection($('#direction').val());
      controller.updatePreview();
    });

    // Update preview as user manually defines block.
    this.manualBlockDefTA_.on('input', () => {
      controller.attemptUpdateFromManualCode();
    });
    this.manualBlockDefTA_.on('keyup', () => {
      controller.attemptUpdateFromManualCode();
    });

    // JSON/JS/Manual editing of the block definition
    this.formatSelector_.change(() => {
      controller.onChangeFormat();
    });

    // Update code generator
    $('#language').change(() => {
      controller.updateGenerator();
    });
  }

  /**
   * Decodes the format value selected in the UI.
   * @return {format: string, isInManualMode: boolean} The format ('JSON' or
   *     'JavaScript') and the manual mode flag.
   */
  getSelectedEditFormat() {
    let rawFormat = this.formatSelector_.val();
    let isInManualMode = rawFormat.startsWith('Manual-');
    let format =
        isInManualMode ? rawFormat.substring('Manual-'.length) : rawFormat;
    return {format, isInManualMode};
  }

  // TODO: Generalize the following two as getBlockDefinitionCode()?

  /**
   * @return {string} The code in the manual block definition.
   */
  getManualBlockDefinition() {
    return this.manualBlockDefTA_.val();
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
   * @param {boolean=} opt_manual Whether the block definition view should be
   *     an editable textarea for manual edit.
   */
  updateBlockDefinitionCodeView(blockDefCode, opt_manual) {
    if (opt_manual) {
      // If manual edit.
      Blockly.hideChaff();
      this.blockDefPre_.hide();
      this.editorMask_.show();

      // Don't use .show(). That set this to inline-block, which won't size
      // correctly.
      this.manualBlockDefTA_.css('display', 'block');
      this.manualBlockDefTA_.val(blockDefCode);
      this.manualBlockDefTA_.focus();
    } else {
      this.editorMask_.hide();
      this.manualBlockDefTA_.hide();

      this.blockDefPre_.show();
      FactoryUtils.injectCode(blockDefCode, 'blockDefPre');
    }
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

  /**
   * Renders preview block in preview workspace. Assumes block definition has
   * already been evaluated.
   * @param {string} blockType Name of block type to render in preview.
   * @private
   */
  renderPreviewBlock(blockType) {
    // Create the preview block.
    const previewBlock = this.previewWorkspace.newBlock(blockType);
    previewBlock.initSvg();
    previewBlock.render();
    previewBlock.setMovable(false);
    previewBlock.setDeletable(false);
    previewBlock.moveBy(15, 10);
    this.previewWorkspace.clearUndo();
  }
}

/**
 * Block editor HTML contents. Injected into div on page load.
 * @type {string}
 */
BlockEditorView.html = `
<!-- Blockly Factory Tab -->
<table id="blockEditor">
  <tr height="100%">
    <td id="blocklyWorkspaceContainer">
      <div id="blockEditorWorkspace"></div>
      <div id="blockEditorWorkspaceMask"></div>
    </td>
    <td width="50%">
      <table id="blocklyPreviewContainer">
        <tr>
          <td height="5%">
            <h3 class="preview-header">Preview:
              <select id="direction">
                <option value="ltr">LTR</option>
                <option value="rtl">RTL</option>
              </select>
            </h3>
          </td>
        </tr>
        <tr>
          <td height="30%">
            <div id="preview"></div>
          </td>
        </tr>
        <tr>
          <td height="5%">
            <h3>Block Definition:
                <!-- TODO(#270): Separate concerns of format and editable.
                  -              Add "Editable" state toggle button? -->              <select id="format">
                <option value="JSON">JSON</option>
                <option value="JS">JavaScript</option>
                <option value="Manual-JSON">Manual JSON&hellip;</option>
                <option value="Manual-JS">Manual JavaScript&hellip;</option>
              </select>
            </h3>
          </td>
        </tr>
        <tr>
          <td height="30%">
            <pre id="blockDefPre"></pre>
            <textarea id="manualBlockDefTA"></textarea>
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
          <td height="25%">
            <pre id="generatorPre"></pre>
          </td>
        </tr>
      </table>
    </td>
    </tr>
</table>
`;
