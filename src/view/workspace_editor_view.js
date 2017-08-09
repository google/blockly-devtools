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
     * @private
     */
    this.workspaceContents_ = workspaceContents;

    /**
     * WorkspaceConfig associated with this instance of WorkspaceView.
     * @type {!WorkspaceConfig}
     */
    // this.workspaceConfig = workspaceConfig;

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
    this.editorWorkspace = Blockly.inject('wsContentsDiv',
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
        media: 'media/'
      });

    /**
     * Currently selected block in the editor workspace. Null if no block is
     * selected.
     * @type {?Blockly.Block}
     */
    this.selectedBlock = null;

    /*
     * Button elements used in workspace editor.
     * @type {!Element}
     */
    this.addShadowButton = $('#button_addShadowWorkspace').get(0);
    this.removeShadowButton = $('#button_removeShadowWorkspace').get(0);

    /**
     * ID of currently open modal element. Null if nothing is open.
     * @type {?string}
     * @private
     */
    this.openModal_ = null;
  }

  /**
   * Returns the current workspace contents being edited.
   * @return {!WorkspaceContents} WorkspaceContents object shown in editor view.
   * @throws {Error} If WorkspaceContents object is null.
   */
  getWorkspaceContents() {
    if (!this.workspaceContents_) {
      throw new Error(
          'Trying to get WorkspaceContents object, but is null or undefined.');
      return;
    }
    return this.workspaceContents_;
  }

  /**
   * Removes contents of this editor view from application view. Used when switching
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
   * Shows contents of this editor to application view. Used when switching editors.
   * @param {!WorkspaceContents} wsElement Workspace element to display in
   *     workspace editor view when shown.
   * @throws If wsElement is WorkspaceConfiguration object, state that this is
   *     not supported.
   */
  show(wsElement) {
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

    if (!wsElement) {
      throw 'Workspace element is null or undefined.';
      return;
    } else if (wsElement instanceof WorkspaceContents) {
      this.editorWorkspace.clear();
      this.workspaceContents_ = wsElement;
      this.refreshWorkspaceInfo();
      this.selectedBlock = null;
    } else if (wsElement instanceof WorkspaceConfiguration) {
      throw 'Loading only WorkspaceConfiguration objects is not supported. Config ' +
          'objects are now a field of WorkspaceContents objects.';
    }
  }

  /**
   * Initializes event handlers and listeners for the workspace editor.
   * @param {!WorkspaceController} controller WorkspaceController that makes
   *     changes to editor based upon user interaction with application.
   * @package
   */
  init(controller) {
    this.editorWorkspace.addChangeListener((event) => {
      Blockly.Events.disable();
      controller.onChange(event);
      Blockly.Events.enable();
    });
    $('form#workspace_options :input').change(() => {
      controller.updateOptions();
    });
    this.initConfigListeners_(controller);
    this.initClickHandlers_(controller);
    this.resetConfigs();
  }

  /**
   * Assign click handlers for Workspace editor.
   * @param {!WorkspaceController} controller WorkspaceController that manages
   *     workspace resource elements on user input.
   * @private
   */
  initClickHandlers_(controller) {
    // From wfactory_init.js:assignWorkspaceFactoryClickHandlers_()
    $('#modalShadow').click(() => {
      FactoryUtils.closeModal(this.openModal_);
      this.openModal_ = null;
    });

    $('#button_standardOptions').click(() => {
      controller.setStandardOptionsAndUpdate();
    });
    $('#button_optionsHelp').click(() => {
      open('https://developers.google.com/blockly/guides/get-started/web#configuration');
    });

    // TODO(#222): Re-add "Clear" button, calling the following:
    //   this.editorWorkspace.clear();
    //   if (confirm('Are you sure you would like to clear your workspace' +
    //       ' contents and configurations?')) {
    //     controller.clear();
    //   }

    this.addShadowButton.addEventListener('click', () => {
      controller.setSelectedAsShadowBlock();
    });
    this.removeShadowButton.addEventListener('click', () => {
      controller.unsetSelectedAsShadowBlock();
    });
  }

  /**
   * Add listeners for Workspace editor input elements. Used for creating/editing
   * WorkspaceConfig objects.
   * @param {!WorkspaceController} controller WorkspaceController that manages
   *     workspace resource elements on user input.
   * @private
   */
  initConfigListeners_(controller) {
    // From wfactory_init.js:addWorkspaceFactoryOptionsListeners_()
    // Checking the grid checkbox displays grid options.
    document.getElementById('option_grid_checkbox').addEventListener('change',
        function(e) {
          document.getElementById('grid_options').style.display =
              document.getElementById('option_grid_checkbox').checked ?
              'block' : 'none';
        });

    // Checking the zoom checkbox displays zoom options.
    document.getElementById('option_zoom_checkbox').addEventListener('change',
        function(e) {
          document.getElementById('zoom_options').style.display =
              document.getElementById('option_zoom_checkbox').checked ?
              'block' : 'none';
        });

    // Checking the readonly checkbox enables/disables other options.
    document.getElementById('option_readOnly_checkbox').addEventListener('change',
      function(e) {
        const checkbox = document.getElementById('option_readOnly_checkbox');
        FactoryUtils.ifCheckedEnable(!checkbox.checked,
            ['readonly1', 'readonly2']);
      });

      document.getElementById('option_infiniteBlocks_checkbox').addEventListener('change',
      function(e) {
        document.getElementById('maxBlockNumber_option').style.display =
            document.getElementById('option_infiniteBlocks_checkbox').checked ?
              'none' : 'block';
      });

    // Generate new options every time an options input is updated.
    const div = document.getElementById('workspace_options');
    const options = div.getElementsByTagName('input');
    for (let option of options) {
      option.addEventListener('change', () => {
        controller.updateOptions();
      });
    }
  }

  /**
   * Resets WorkspaceConfig checkboxes to default settings. Does not edit the
   * model-side.
   */
  resetConfigs() {
    // From wfactory_view.js:setBaseOptions()
    // Readonly mode.
    document.getElementById('option_readOnly_checkbox').checked = false;
    FactoryUtils.ifCheckedEnable(true, ['readonly1', 'readonly2']);

    // Set basic options.
    document.getElementById('option_css_checkbox').checked = true;
    document.getElementById('option_maxBlocks_number').value = 100;
    document.getElementById('option_media_text').value =
        'https://blockly-demo.appspot.com/static/media/';
    document.getElementById('option_rtl_checkbox').checked = false;
    document.getElementById('option_sounds_checkbox').checked = true;
    document.getElementById('option_oneBasedIndex_checkbox').checked = true;
    document.getElementById('option_horizontalLayout_checkbox').checked = false;
    document.getElementById('option_toolboxPosition_checkbox').checked = false;

    // Check infinite blocks and hide suboption.
    document.getElementById('option_infiniteBlocks_checkbox').checked = true;
    document.getElementById('maxBlockNumber_option').style.display =
        'none';

    // Uncheck grid and zoom options and hide suboptions.
    document.getElementById('option_grid_checkbox').checked = false;
    document.getElementById('grid_options').style.display = 'none';
    document.getElementById('option_zoom_checkbox').checked = false;
    document.getElementById('zoom_options').style.display = 'none';

    // Set grid options.
    document.getElementById('gridOption_spacing_number').value = 20;
    document.getElementById('gridOption_length_number').value = 1;
    document.getElementById('gridOption_colour_text').value = '#888';
    document.getElementById('gridOption_snap_checkbox').checked = false;

    // Set zoom options.
    document.getElementById('zoomOption_controls_checkbox').checked = true;
    document.getElementById('zoomOption_wheel_checkbox').checked = true;
    document.getElementById('zoomOption_startScale_number').value = 1.0;
    document.getElementById('zoomOption_maxScale_number').value = 3;
    document.getElementById('zoomOption_minScale_number').value = 0.3;
    document.getElementById('zoomOption_scaleSpeed_number').value = 1.2;
  }

  /**
   * Updates the toolbox used in the toolbox editor workspace.
   * @param {string} libString String representation of user-created block
   *     libraries to append to categories in the editor.
   */
  updateEditorToolbox(libString) {
    const toolboxString = DevToolsToolboxes.toolboxEditor(libString);
    this.editorWorkspace.updateToolbox(toolboxString);
  }

  /**
   * Shows and enables shadow buttons.
   * @param {boolean} ifAdd Whether to show the add button. Shows remove button
   *     if false.
   * @param {boolean} ifEnable Whether to enable the add or remove button that
   *     is shown.
   * @param {boolean=} opt_disableAll Whether to hide both buttons entirely.
   */
  showAndEnableShadow(ifAdd, ifEnable, opt_disableAll) {
    if (opt_disableAll) {
      this.displayAddShadow(false);
      this.displayRemoveShadow(false);
      return;
    }
    this.displayAddShadow(ifAdd);
    this.displayRemoveShadow(!ifAdd);
    const button = ifAdd ? this.addShadowButton : this.removeShadowButton;
    button.disabled = ifEnable ? false : true;
  }

  /**
   * Enables or disables the add/remove shadow block buttons depending on whether
   * the selected block (1) is already marked as a shadow block, and (2) is in
   * a valid shadow block position.
   * @param {boolean} isShadow Whether the selected block is already marked as
   *     a shadow block.
   * @param {boolean} isValid Whether the selected block is in a valid shadow
   *     block position.
   */
  enableShadowButtons(isShadow, isValid) {
    if (isShadow) {
      // Is a shadow block
      this.showAndEnableShadow(false, true);
    } else if (!isShadow && isValid) {
      // Is not a shadow block but can be a valid shadow block.
      this.showAndEnableShadow(true, true);
    } else {
      // Is not a shadow block and is not in a valid shadow block position.
      this.showAndEnableShadow(true, false);
    }
  }

  /**
   * Display or hide the add shadow button.
   * @param {boolean} show True if the add shadow button should be shown, false
   *     otherwise.
   */
  displayAddShadow(show) {
    // REFACTOR: Moved in from wfactory_init.js:displayAddShadow_(show)
    this.addShadowButton.style.display = show ? 'inline-block' : 'none';
  }

  /**
   * Display or hide the remove shadow button.
   * @param {boolean} show True if the remove shadow button should be shown, false
   *     otherwise.
   */
  displayRemoveShadow(show) {
    // TODO: Move in from wfactory_model.js:displayRemoveShadow_(show)
    this.removeShadowButton.style.display = show ? 'inline-block' : 'none';
  }

  /**
   * Refreshes any information in the view (such as the name of the currently
   * edited workspace contents) to match any changes in the WorkspaceContents
   * model object.
   */
  refreshWorkspaceInfo() {
    if (!this.getWorkspaceContents()) {
      $('#currentWorkspace').text(this.getWorkspaceContents().name);
    }
  }
}

/**
 * Workspace editor HTML contents. Injected into div on page load, then hidden.
 * @type {string}
 */
WorkspaceEditorView.html = `
<!-- Workspace Factory tab -->
<section id="createDiv">
  <div id="createHeader">
    <h3>Edit Workspace elements</h3>
    <p id="editHelpText">Drag blocks into the workspace to configure your custom workspace.</p>
  </div>
  <section id="workspace_section">
    <div style="float: right">
      <button id="button_addShadowWorkspace" style="display: none">Make Shadow</button>
      <button id="button_removeShadowWorkspace" style="display: none">Remove Shadow</button>
    </div>
    <p><b>Current workspace:</b> <span id="currentWorkspace"></span></p>
    <div id="wsContentsDiv" style="clear: both"></div>
  </section>

  <aside id="preload_div">
    <div id="preloadHelp">
      <p>Configure the options for your Blockly inject call.</p>
      <button id="button_optionsHelp">Help</button>
      <button class="small" id="button_standardOptions">Reset to Default</button>
    </div>
    <form id="workspace_options">
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
    </form>
  </aside>

</section>

<aside id="previewDiv">
  <div id="previewBorder">
    <div id="previewHelp">
      <h3>Workspace Preview</h3>
      <p>This is what your custom workspace will look like without your toolbox.</p>
    </div>
    <div id="workspacePreview" class="content"></div>
  </div>
</aside>
`;
