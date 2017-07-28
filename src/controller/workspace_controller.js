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

goog.provide('WorkspaceController');

goog.require('Project');
goog.require('WorkspaceConfiguration');
goog.require('WorkspaceContents');
goog.require('WorkspaceEditorView');

/**
 * @class WorkspaceController manages user interaction with workspace contents
 *     and configurations, which are the blocks pre-loaded onto a developer's
 *     Blockly workspace and the Blockly.Options which configure the settings on
 *     a developer's workspace (e.g. trashcan, RTL/LTR, etc.), respectively.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo), evd2014 (Emma Dauterman)
 */
class WorkspaceController {
  /**
   * @constructor
   * @param {!ProjectController} projectController ProjectController that will
   *     make changes to WorkspaceContents and WorkspaceConfiguration when
   *     edited in the workspace editor.
   * @param {!Blockly.Workspace} hiddenWorkspace Hidden workspace used to generate Blockly objects.
   */
  constructor(projectController, hiddenWorkspace) {
    /**
     * ProjectController which will be used on modification of workspace objects.
     * @type {!ProjectController}
     */
    this.projectController = projectController;

    // Creates first workspace contents and config to add to project.
    const wsContents = this.projectController.createWorkspaceContents('WSContents');
    const wsConfig = this.projectController.createWorkspaceConfiguration('WSConfig');

    /**
     * WorkspaceEditorView associated with this instance of WorkspaceController.
     * @type {!WorkspaceEditorView}
     */
    this.view = new WorkspaceEditorView(wsContents, wsConfig);

    /**
     * True if key events are enabled. False otherwise. Used to enable/disable
     * view elements depending on which Editor is currently being used.
     * @type {boolean}
     */
    this.keyEventsEnabled = true;

    /**
     * Hidden workspace used to generate Blockly objects for export.
     * @type {!Blockly.Workspace}
     */
    this.hiddenWorkspace = hiddenWorkspace;

    // Initializes view's event listeners/handlers.
    this.view.init(this);
  }

  /**
   * Saves the WorkspaceContents currently being edited into the current Project.
   */
  saveState() {
    /*
     * TODO: Move in from wfactory_controller.js:saveStateFromWorkspace()
     *
     * References:
     * - getSelectedXml()
     * - saveFromWorkspace(this.toolboxWorkspace)
     * - getPreloadXml()
     * - savePreloadXml()
     */
    throw 'Unimplemented: saveState()';
  }

  /**
   * Used to completely reinject the contents/config preview. Used only
   * when switching from simple flyout to categories, or categories to simple
   * flyout. More expensive than simply updating flyout or toolbox.
   * @package
   */
  reinjectPreview() {
    // From wfactory_controller.js:reinjectPreview(tree)
    this.view.previewWorkspace.dispose();
    const injectOptions = this.view.workspaceConfig.options;
    injectOptions['toolbox'] = '<xml></xml>';

    this.view.previewWorkspace = Blockly.inject('workspacePreview', injectOptions);
    Blockly.Xml.domToWorkspace(
        this.view.workspaceContents.getExportData(), this.view.previewWorkspace);
  }

  /**
   * Called every time there is a change to the editor workspace. Called from
   * a change listener on the editor workspace.
   * @param {!Event} event The change event which triggered the listener.
   */
  onChange(event) {
    const isCreateEvent = event.type == Blockly.Events.CREATE;
    const isDeleteEvent = event.type == Blockly.Events.DELETE;
    const isChangeEvent = event.type == Blockly.Events.CHANGE;
    const isMoveEvent = event.type == Blockly.Events.MOVE;
    const isUiEvent = event.type == Blockly.Events.UI;

    if (isCreateEvent || isDeleteEvent || isChangeEvent) {
      this.saveStateFromWorkspace();
      this.updatePreview();
    }
  }

  /**
   * Saves blocks on editor workspace into the WorkspaceContents model.
   */
  saveStateFromWorkspace() {
    const workspaceBlocks = Blockly.Xml.workspaceToDom(this.view.editorWorkspace);
    this.view.workspaceContents.setXml(workspaceBlocks);
  }

  /**
   * Clears Workspace editor of all WorkspaceContents blocks. Resets currently
   * active WorkspaceContents object to contain no blocks. Clears view of any
   * WorkspaceContents blocks, and updates preview.
   */
  clear() {
    // REFACTORED: Moved in (partially) from wfactory_controller.js:clearAll()
    // Resets WS Contents
    this.view.editorWorkspace.clear();
    this.saveStateFromWorkspace();
    // Resets WS Configs
    this.view.resetConfigs();
    this.generateNewOptions();

    this.updatePreview();
  }

  /**
   * Updates Workspace preview based on the WorkspaceConfig and WorkspaceContents
   * currently being edited.
   */
  updatePreview() {
    // From wfactory_controller.js:updatePreview()
    this.view.previewWorkspace.clear();
    Blockly.Xml.domToWorkspace(this.view.workspaceContents.getExportData(),
        this.view.previewWorkspace);
  }

  /**
   * Updates the editor toolbox to have categories for user-defined block libraries.
   */
  updateEditorToolbox() {
    const newToolboxXml = FactoryUtils.updateBlockLibCategory(
        this.projectController.getProject(), this.hiddenWorkspace);
    this.view.updateEditorToolbox(newToolboxXml);
  }

  /**
   * Displays imported WorkspaceContents recently added to model onto editor view.
   *
   * @param {string} wsContentsName Name of toolbox that was imported.
   * @param {string} xmlString String representation of XML of recently imported
   *     toolbox.
   */
  loadImportedWorkspaceContents(wsContentsName, xmlString) {
    /*
     * TODO: Move in from wfactory_generator.js:loadXml(jsFileContents, importMode)
     *                    wfactory_generator.js:evaluateMarkedCode(code)
     *       Note: loadXml() is broken into two functions in refactored version.
     *
     * References:
     * - evaluateMarkedCode()
     */
    throw 'Unimplemented: loadImportedWorkspaceContents()';
  }

  /**
   * Given an XML DOM tree, loads it into the workspace contents editing area.
   * Assumes that tree is in valid XML format and that the selected mode is
   * MODE_PRELOAD.
   * @param {!Element} tree XML tree to be loaded to pre-loaded block editing
   *     area.
   */
  importContentsFromTree_(tree) {
    /*
     * TODO: Move in from wfactory_controller.js:importPreloadFromTree_()
     *
     * References:
     * - clearAndLoadXml()
     * - savePreloadXml()
     * - updatePreview()
     */
    throw 'Unimplemented: importContentsFromTree_()';
  }

  /**
   * Loads the given XML to the hidden Blockly.Workspace and sets any user-generated
   * shadow blocks to be actual shadow blocks in the hidden Blockly.Workspace.
   *
   * @param {!Element} xml XML to be loaded to the hidden workspace.
   * @private
   */
  loadToHiddenWorkspace_(xml) {
    /*
     * TODO: Move in from wfactory_generator.js
     *
     * References:
     * - hiddenWorkspace (@type {!Blockly.Workspace})
     * - setShadowBlocksInHiddenWorkspace_()
     */

    // TODO: Investigate if there is a better method than using hidden workspaces
    //       for grabbing Block XML information.

    throw 'Unimplemented: loadToHiddenWorkspace_()';
  }

  /**
   * Encodes blocks in the hidden workspace in a XML DOM element. Very
   * similar to workspaceToDom, but doesn't capture IDs. Uses the top-level
   * blocks loaded in hiddenWorkspace.
   * @private
   * @param {!Element} xmlDom Tree of XML elements to be appended to.
   */
  appendHiddenWorkspaceToDom_(xmlDom) {
    /*
     * TODO: Move in from wfactory_generator.js
     *
     * References:
     * - hiddenWorkspace (@type {!Blockly.Workspace})
     */
    throw 'Unimplemented: appendHiddenWorkspaceToDom_()';
  }

  /**
   * Sets the user-generated shadow blocks loaded into hiddenWorkspace to be
   * actual shadow blocks. This is done so that blockToDom records them as
   * shadow blocks instead of regular blocks.
   * @private
   */
  setShadowBlocksInHiddenWorkspace_() {
    /*
     * TODO: Move in from wfactory_generator.js
     *
     * References:
     * - isShadowBlock()
     */
    throw 'Unimplemented: setShadowBlocksInHiddenWorkspace_()';
  }

  /*
   * Makes the currently selected block a user-generated shadow block. These
   * blocks are not made into real shadow blocks, but recorded in the model
   * and visually marked as shadow blocks, allowing the user to move and edit
   * them (which would be impossible with actual shadow blocks). Updates the
   * preview when done.
   */
  addShadow() {
    /*
     * TODO: Move in from wfactory_controller.js
     *       (Also moved into: toolbox_controller.js)
     *
     * References:
     * - addShadowForBlockAndChildren_()
     * - saveStateFromWorkspace()
     * - updatePreview()
     */
    throw 'Unimplemented: addShadow()';
  }

  /**
   * Clears the toolbox workspace and loads XML to it, marking shadow blocks
   * as necessary.
   * @private
   * @param {!Element} xml The XML to be loaded to the workspace.
   */
  clearAndLoadXml_(xml) {
    /*
     * TODO: Move in from wfactory_controller.js
     *       (Also moved into: toolbox_controller.js)
     *
     * References:
     * - markShadowBlocks()
     * - warnForUndefinedBlocks_()
     */
    throw 'Unimplemented: clearAndLoadXml_()';
  }

  /**
   * Sets standard default options for default WorkspaceConfig, updates
   * the preview workspace. Default values depend on whether certain categories
   * are present.
   */
  setStandardOptionsAndUpdate() {
    // From wfactory_controller.js:setStandardOptionsAndUpdate()
    this.view.resetConfigs();
    this.generateNewOptions();
  }

  /**
   * Generates new WorkspaceConfig object. Creates Blockly.Options to inject into
   * preview Blockly workspace, based upon user input.
   * Called every time a change has been made to an input field. Updates the model
   * and reinjects the preview workspace.
   */
  generateNewOptions() {
    // From wfactory_controller.js:generateNewOptions()

    // TODO (#141): Add popup for workspace config.

    this.view.workspaceConfig.setOptions(this.readOptions_());
    this.reinjectPreview();
  }

  /**
   * Generates a new options object for injecting a Blockly workspace based on
   * user input.
   * @return {!Object} Blockly injection options object.
   * @private
   */
  readOptions_() {
    // From wfactory_controller.js
    const optionsObj = Object.create(null);

    // Add all standard options to the options object.
    // Use parse int to get numbers from value inputs.
    var readonly = document.getElementById('option_readOnly_checkbox').checked;
    if (readonly) {
      optionsObj['readOnly'] = true;
    } else {
      optionsObj['collapse'] =
          document.getElementById('option_collapse_checkbox').checked;
      optionsObj['comments'] =
          document.getElementById('option_comments_checkbox').checked;
      optionsObj['disable'] =
          document.getElementById('option_disable_checkbox').checked;
      if (document.getElementById('option_infiniteBlocks_checkbox').checked) {
        optionsObj['maxBlocks'] = Infinity;
      } else {
        var maxBlocksValue =
            document.getElementById('option_maxBlocks_number').value;
        optionsObj['maxBlocks'] = typeof maxBlocksValue == 'string' ?
            parseInt(maxBlocksValue) : maxBlocksValue;
      }
      optionsObj['trashcan'] =
          document.getElementById('option_trashcan_checkbox').checked;
      optionsObj['horizontalLayout'] =
          document.getElementById('option_horizontalLayout_checkbox').checked;
      optionsObj['toolboxPosition'] =
          document.getElementById('option_toolboxPosition_checkbox').checked ?
          'end' : 'start';
    }

    optionsObj['css'] = document.getElementById('option_css_checkbox').checked;
    optionsObj['media'] = document.getElementById('option_media_text').value;
    optionsObj['rtl'] = document.getElementById('option_rtl_checkbox').checked;
    optionsObj['scrollbars'] =
        document.getElementById('option_scrollbars_checkbox').checked;
    optionsObj['sounds'] =
        document.getElementById('option_sounds_checkbox').checked;
    optionsObj['oneBasedIndex'] =
        document.getElementById('option_oneBasedIndex_checkbox').checked;

    // If using a grid, add all grid options.
    if (document.getElementById('option_grid_checkbox').checked) {
      var grid = Object.create(null);
      var spacingValue =
          document.getElementById('gridOption_spacing_number').value;
      grid['spacing'] = typeof spacingValue == 'string' ?
          parseInt(spacingValue) : spacingValue;
      var lengthValue = document.getElementById('gridOption_length_number').value;
      grid['length'] = typeof lengthValue == 'string' ?
          parseInt(lengthValue) : lengthValue;
      grid['colour'] = document.getElementById('gridOption_colour_text').value;
      if (!readonly) {
        grid['snap'] =
          document.getElementById('gridOption_snap_checkbox').checked;
      }
      optionsObj['grid'] = grid;
    }

    // If using zoom, add all zoom options.
    if (document.getElementById('option_zoom_checkbox').checked) {
      var zoom = Object.create(null);
      zoom['controls'] =
          document.getElementById('zoomOption_controls_checkbox').checked;
      zoom['wheel'] =
          document.getElementById('zoomOption_wheel_checkbox').checked;
      var startScaleValue =
          document.getElementById('zoomOption_startScale_number').value;
      zoom['startScale'] = typeof startScaleValue == 'string' ?
          parseFloat(startScaleValue) : startScaleValue;
      var maxScaleValue =
          document.getElementById('zoomOption_maxScale_number').value;
      zoom['maxScale'] = typeof maxScaleValue == 'string' ?
          parseFloat(maxScaleValue) : maxScaleValue;
      var minScaleValue =
          document.getElementById('zoomOption_minScale_number').value;
      zoom['minScale'] = typeof minScaleValue == 'string' ?
          parseFloat(minScaleValue) : minScaleValue;
      var scaleSpeedValue =
          document.getElementById('zoomOption_scaleSpeed_number').value;
      zoom['scaleSpeed'] = typeof scaleSpeedValue == 'string' ?
          parseFloat(scaleSpeedValue) : scaleSpeedValue;
      optionsObj['zoom'] = zoom;
    }

    return optionsObj;
  }

  /**
   * Return the block types used in the custom toolbox and pre-loaded workspace.
   * @return {!Array.<string>} Block types used in the custom toolbox and
   *     pre-loaded workspace.
   */
  getAllUsedBlockTypes() {
    /*
     * TODO: Move in from wfactory_controller.js
     *       Also move in from wfactory_model.js
     *       (Also moved into: toolbox_controller.js)
     *
     * References:
     * - model.getAllUsedBlockTypes()
     */

    // TODO: Separate getAllUsedBlockTypes() so that it is restricted to just
    //       used block types in a toolbox editor or just used block types in
    //       workspace editor.
    throw 'Unimplemented: getAllUsedBlockTypes()';
  }

  /**
   * Extracts WorkspaceContents XML from user-uploaded file. XML should be between
   * marked comments in uploaded file.
   *
   * @param {string} fileContents String representation of JavaScript code in user-imported
   *     file.
   * @return {!Object.<string, string>} WorkspaceContents name to XML string pair.
   */
  extractWorkspaceContentsXml(fileContents) {
    let extractedWorkspaceContents = {};
    extractedWorkspaceContents.name = '';
    extractedWorkspaceContents.xmlString = '';

    /*
     * TODO: Move in from wfactory_generator.js:loadXml(jsFileContents, importMode)
     *                    wfactory_generator.js:evaluateMarkedCode(code)
     *
     * References:
     * - evaluateMarkedCode()
     */

    throw 'Unimplemented: extractWorkspaceContentsXml()';
  }

  /**
   * Creates file with proper contents (for either WorkspaceContents or
   * WorkspaceConfiguration), prompts user, then downloads onto user's file system.
   * @param {!WorkspaceContents|!WorkspaceConfiguration} resource The Workspace
   *     resource to download. Either contents or configuration.
   * @param {string=} opt_type Type of file to download. For WorkspaceContents,
   *     this parameter is required. Not required for WorkspaceConfiguration.
   * @throws {Error} Will throw an error if the given resource is not of type
   *     WorkspaceContents or WorkspaceConfiguration.
   */
  export(resource, opt_type) {
    let fileContents = '';
    let fileName = '';

    if (resource instanceof WorkspaceContents) {
      // Return if no file type was specified.
      if (!opt_type) {
        return;
      }
      fileName = prompt('File name for workspace blocks:',
          resource.name + '.' + opt_type);

      if (!fileName) {
        return;
      }

      fileContents = Blockly.Xml.domToPrettyText(resource.getExportData());

      if (opt_type == ProjectController.TYPE_JS) {
        fileContents = this.generateWorkspaceContentsFile(this.view.workspaceContents);
      }
    } else if (resource instanceof WorkspaceConfiguration) {
      fileName = prompt('File name for starter workspace code:', 'myBlocklyApp.js');
      if (!fileName) {
        return;
      }

      fileContents = this.generateInjectFile(this.view.workspaceConfig);
      opt_type = ProjectController.TYPE_JS;
    } else if (resource instanceof Resource) {
      throw new Error('This resource, ' + resource.name + ', cannot be exported'
          + ' from the workspace editor.');
    }

    FactoryUtils.createAndDownloadFile(fileContents, fileName, 'text/' + opt_type);
  }

  /**
   * Generates JavaScript string representation of WorkspaceContents for user to
   * download. Does not deal with popups or file system access; just generates content.
   *
   * @param {!WorkspaceContents} workspaceContents The WorkspaceContents object
   *     which is being exported.
   * @returns {string} String representation of JS file to be exported.
   */
  generateWorkspaceContentsFile(workspaceContents) {
    // From wfactory_generator.js:generateJsFromXml(xml, name, mode)
    // Escape for ' when exporting to JS.
    const xmlStorageVariable = 'BLOCKLY_PRELOAD_XML';
    const xmlString = FactoryUtils.concatenateXmlString(
        Blockly.Xml.domToPrettyText(workspaceContents.getExportData()));

    // XML ASSIGNMENT STRING (not to be executed)
    const jsFromXml = `
// If ${xmlStorageVariable} does not exist.
if (!${xmlStorageVariable}) {
  ${xmlStorageVariable} = {};
}

/* BEGINNING ${xmlStorageVariable} ASSIGNMENT. DO NOT EDIT. USE BLOCKLY DEVTOOLS. */
${xmlStorageVariable}['${workspaceContents.name}'] =
    ${xmlString};
/* END ${xmlStorageVariable} ASSIGNMENT. DO NOT EDIT. */
`;
    return jsFromXml;
  }

  /**
   * Creates a string representation of the options, for use in making the string
   * used to inject the workspace.
   * @param {!Object} obj Object representing the options selected in the current
   *     configuration.
   * @param {string} tabChar The tab character.
   * @return {string} String representation of the workspace configuration's
   *     options.
   * @recursive
   * @private
   */
  addAttributes_(obj, tabChar) {
    // REFACTORED from wfactory_generator.js
    if (!obj) {
      return '{}\n';
    }
    var str = '';
    for (var key in obj) {
      if (key == 'grid' || key == 'zoom') {
        var temp = tabChar + key + ' : {\n' + addAttributes(obj[key],
            tabChar + '\t') + tabChar + '}, \n';
      } else if (typeof obj[key] == 'string') {
        var temp = tabChar + key + ' : \'' + obj[key] + '\', \n';
      } else {
        var temp = tabChar + key + ' : ' + obj[key] + ', \n';
      }
      str += temp;
    }
    var lastCommaIndex = str.lastIndexOf(',');
    str = str.slice(0, lastCommaIndex) + '\n';
    return str;
  }

  /**
   * Generates JavaScript string representation of the inject file for a user's
   * sample Blockly app.
   * @param {!WorkspaceConfiguration} workspaceConfig The workspace configuration
   *     which will contains the options for the inject call.
   * @return {string} String representation of starter code for injecting.
   */
  generateInjectFile(workspaceConfig) {
    // REFACTORED from wfactory_generator.js
    var attributes = addAttributes_(workspaceConfig.options, '\t');
    if (!workspaceConfig.options['readOnly']) {
      attributes = 'toolbox : BLOCKLY_TOOLBOX_XML[/* TODO: Insert name of ' +
        'imported toolbox to display here */], \n' + attributes;
    }

    // Initializing toolbox
    var finalStr = `
var BLOCKLY_OPTIONS = {
  ${attributes}
};

document.onload = function() {
  /* Inject your workspace */
  /* TODO: Add ID of div to inject Blockly into */
  var workspace = Blockly.inject(null, BLOCKLY_OPTIONS);
};
`;
    return finalStr;
  }
}
