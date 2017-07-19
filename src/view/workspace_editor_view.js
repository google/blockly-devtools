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

goog.provide('WorkspaceEditorView');

goog.require('WorkspaceContents');
goog.require('WorkspaceConfiguration');

/**
 * @fileoverview WorkspaceEditorView deals with the view elements of Blockly workspaces
 * that are used to generate block libraries, toolboxes, and preload-workspaces.
 * This includes EventHandlers, EventListeners, tab switching functions, etc.
 *
 * @authors celinechoo (Celine Choo), sagev (Sage Vouse)
 */

class WorkspaceEditorView {
  /**
   * @constructor
   * @param {!WorkspaceContents} workspaceContents WorkspaceContents currently
   *     being edited by the view.
   * @param {!WorkspaceConfig} workspaceConfig WorkspaceConfiguration currently
   *     being edited by the view.
   */
  constructor(workspaceContents, workspaceConfig) {
    /**
     * WorkspaceContents associated with this instance of WorkspaceView.
     * @type {!WorkspaceContents}
     */
    this.workspaceContents = workspaceContents;

    /**
     * WorkspaceConfig associated with this instance of WorkspaceView.
     * @type {!WorkspaceConfig}
     */
    this.workspaceConfig = workspaceConfig;

    /**
     * JQuery container of workspace editor view.
     * @type {!JQuery}
     */
    this.container = $('#workspaceEditor');

    // Inserts HTML into toolbox editor container. Keeps hidden.
    this.container.html(WorkspaceEditorView.html);
    this.container.hide();

    /**
     * Blockly workspace where users define a group of WorkspaceContents.
     * @type {!Blockly.Workspace}
     */
    this.editorWorkspace = Blockly.inject('wContentsDiv',
      {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        media: 'media/',
        toolbox: DevToolsToolboxes.toolboxEditor([])
      });

    /**
     * Blockly workspace where users can preview a defined WorkspaceContents.
     * @type {!Blockly.Workspace}
     */
    this.previewWorkspace = Blockly.inject('workspacePreview',
      {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        media: 'media/',
        toolbox: '<xml></xml>'
      });
  }

  /**
   * Removes elements of this editor view from application view. Used when switching
   * editors.
   */
  hide() {
    // Deselect tab.
    const tab = $('#' + AppController.WORKSPACE_EDITOR);
    tab.removeClass('tabon');
    tab.addClass('taboff');

    this.container.hide();
  }

  /**
   * Shows elements of this editor to application view. Used when switching editors.
   * @param {string} wsContentsName Name of WorkspaceContents to populate in
   *     workspace editor view when shown.
   */
  show(wsContentsName) {
    // TODO: Add functionality for showing WorkspaceConfiguration object.
    // Select tab.
    const tab = $('#' + AppController.WORKSPACE_EDITOR);
    tab.removeClass('taboff');
    tab.addClass('tabon');

    // Show this view.
    this.container.show();

    // Resizes workspace to fit container.
    Blockly.svgResize(this.editorWorkspace);
    Blockly.svgResize(this.previewWorkspace);

    // TODO: Make editor show WorkspaceContents with name wsContentsName when
    //       user clicks on that element in the navtree.
  }

  /**
   * Assign click handlers for Workspace editor.
   * @private
   */
  initClickHandlers_() {
    /*
     * TODO: Move in from wfactory_init.js:assignWorkspaceFactoryClickHandlers_()
     *       (Also moved into toolbox_editor_view.js)
     */
     console.warn('Unimplemented: initClickHandlers_()');
  }

  /**
   * Add event listeners for Workspace editor.
   * @private
   */
  initEventListeners_() {
    /*
     * TODO: Move in from wfactory_init.js:addWorkspaceFactoryEventListeners_()
     *       (Also moved into toolbox_editor_view.js)
     */
    console.warn('Unimplemented: initEventListeners_()');
  }

  /**
   * Add listeners for Workspace editor input elements. Used for creating/editing
   * WorkspaceConfig objects.
   * @private
   */
  initConfigListeners_() {
    /*
     * TODO: Move in from wfactory_init.js:addWorkspaceFactoryOptionsListeners_()
     */
    console.warn('Unimplemented: initConfigListeners_()');
  }

  /**
   * Resets WorkspaceConfig checkboxes to default settings.
   */
  resetConfigs() {
    /*
     * TODO: Move in from wfactory_view.js:setBaseOptions()
     */
    console.warn('Unimplemented: resetConfigs()');
  }

  /**
   * Updates the toolbox used in the toolbox editor workspace.
   * @param {!string} toolbox String representation of toolbox XML to display.
   */
  updateEditorToolbox(toolbox) {
    this.editorWorkspace.updateToolbox(toolbox);
  }
}

/**
 * Workspace editor HTML contents. Injected into div on page load, then hidden.
 * @type {string}
 */
WorkspaceEditorView.html = `
<!-- Workspace Factory tab -->
<div id="factoryHeader">
  <p>
    <div class="dropdown">
      <button id="button_importBlocks">Import Custom Blocks</button>
      <div id="dropdownDiv_importBlocks" class="dropdown-content">
        <input type="file" id="input_importBlocksJson" accept=".js, .json, .txt" class="inputfile"</input>
        <label for="input_importBlocksJson">From JSON</label>
        <input type="file" id="input_importBlocksJs" accept=".js, .txt" class="inputfile"</input>
        <label for="input_importBlocksJs">From Javascript</label>
      </div>
    </div>

    <div class="dropdown">
      <button id="button_load">Load to Edit</button>
      <div id="dropdownDiv_load" class="dropdown-content">
        <input type="file" id="input_loadToolboxXML" accept=".xml" class="inputfile"></input>
        <label for="input_loadToolboxXML">Toolbox as XML</label>
        <input type="file" id="input_loadToolboxJS" accept=".js" class="inputfile"></input>
        <label for="input_loadToolboxJS">Toolbox as JS</label>
        <input type="file" id="input_loadPreloadXML" accept=".xml" class="inputfile"</input>
        <label for="input_loadPreloadXML">Workspace Blocks as XML</label>
        <input type="file" id="input_loadPreloadJS" accept=".js" class="inputfile"</input>
        <label for="input_loadPreloadJS">Workspace Blocks as JS</label>
      </div>
    </div>

    <div class="dropdown">
      <button id="button_export">Export</button>
      <div id="dropdownDiv_export" class="dropdown-content">
        <a id="dropdown_exportOptions">Starter Code</a>
        <a id="dropdown_exportToolboxXML">Toolbox as XML</a>
        <a id="dropdown_exportToolboxJS">Toolbox as JS</a>
        <a id="dropdown_exportPreloadXML">Workspace Blocks as XML</a>
        <a id="dropdown_exportPreloadJS">Workspace Blocks as JS</a>
        <a id="dropdown_exportAll">All</a>
      </div>
    </div>

    <button id="button_clear">Clear</button>

    <span id="saved_message"></span>
  </p>
</div>

<section id="createDiv">
  <div id="createHeader">
    <h3>Edit Workspace elements</h3>
    <p id="editHelpText">Drag blocks into the workspace to configure the toolbox in your custom workspace.</p>
  </div>
  <section id="toolbox_section">
    <div id="wContentsDiv"></div>
  </section>

  <button id="button_addShadow" style="display: none">Make Shadow</button>
  <button id="button_removeShadow" style="display: none">Remove Shadow</button>

  <aside id="preload_div">
    <div id="preloadHelp">
      <p>Configure the options for your Blockly inject call.</p>
      <button id="button_optionsHelp">Help</button>
      <button class="small" id="button_standardOptions">Reset to Default</button>
    </div>
    <div id="workspace_options">
      <label><input type="checkbox" id="option_readOnly_checkbox">Read Only</label><br>
      <label><input type="checkbox" id="option_grid_checkbox">Use Grid</label><br>
      <div id="grid_options" style="display: none">
        <label>Spacing <input type="number" id="gridOption_spacing_number" style="width: 3em"></label><br>
        <label>Length <input type="number" id="gridOption_length_number" style="width: 3em"></label><br>
        <label>Colour <input type="text" id="gridOption_colour_text" style="width: 8em"></label><br>
        <div id="readonly1">
          <label><input type="checkbox" id="gridOption_snap_checkbox">Snap</label><br>
        </div>
      </div>
      <label>Path to Blockly Media <input type="text" id="option_media_text" style="width: 90%"></label><br>
      <label><input type="checkbox" id="option_rtl_checkbox">Layout with RTL</label><br>
      <label><input type="checkbox" id="option_scrollbars_checkbox">Scrollbars</label><br>
      <label><input type="checkbox" id="option_zoom_checkbox">Zoom</label><br>
      <div id="zoom_options" style="display: none">
        <label><input type="checkbox" id="zoomOption_controls_checkbox">Zoom Controls</label><br>
        <label><input type="checkbox" id="zoomOption_wheel_checkbox">Zoom Wheel</label><br>
        <label>Start Scale <input type="number" id="zoomOption_startScale_number" style="width: 4em"></label><br>
        <label>Max Scale <input type="number" id="zoomOption_maxScale_number" style="width: 4em"></label><br>
        <label>Min Scale <input type="number" id="zoomOption_minScale_number" style="width: 4em"></label><br>
        <label>Scale Speed <input type="number" id="zoomOption_scaleSpeed_number" style="width: 4em"></label><br>
      </div>
      <label><input type="checkbox" id="option_css_checkbox">Use Blockly CSS</label><br>
      <div id="readonly2">
        <label><input type="checkbox" id="option_collapse_checkbox">Collapsible Blocks</label><br>
        <label><input type="checkbox" id="option_comments_checkbox">Comments for Blocks</label><br>
        <label><input type="checkbox" id="option_disable_checkbox">Disabled Blocks</label><br>
        <label><input type="checkbox" id="option_infiniteBlocks_checkbox">Infinite Blocks</label><br>
        <div id="maxBlockNumber_option" style="display: none">
          <label>Max Blocks <input type="number" id="option_maxBlocks_number" style="width: 5em"></label><br>
        </div>
        <label><input type="checkbox" id="option_horizontalLayout_checkbox">Horizontal Toolbox</label><br>
        <label><input type="checkbox" id="option_toolboxPosition_checkbox">Toolbox End</label><br>
        <label><input type="checkbox" id="option_oneBasedIndex_checkbox">One-based index</label><br>
        <label><input type="checkbox" id="option_sounds_checkbox">Sounds<br>
        <label><input type="checkbox" id="option_trashcan_checkbox">Trashcan</label><br>
      </div>
    </div>
  </aside>

</section>

<aside id="previewDiv">
  <div id="previewBorder">
    <div id="previewHelp">
      <h3>Preview</h3>
      <p>This is what your custom workspace will look like.</p>
    </div>
    <div id="workspacePreview" class="content"></div>
  </div>
</aside>
`;
