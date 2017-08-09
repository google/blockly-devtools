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
class WorkspaceController extends ShadowController {
  /**
   * @constructor
   * @param {!ProjectController} projectController ProjectController that will
   *     make changes to WorkspaceContents and WorkspaceConfiguration when
   *     edited in the workspace editor.
   * @param {!Blockly.Workspace} hiddenWorkspace Hidden workspace used to generate Blockly objects.
   */
  constructor(projectController, hiddenWorkspace) {
    super(projectController, hiddenWorkspace);

    /**
     * WorkspaceEditorView associated with this instance of WorkspaceController.
     * @type {!WorkspaceEditorView}
     */
    this.view = new WorkspaceEditorView(null, null);

    /**
     * True if key events are enabled. False otherwise. Used to enable/disable
     * view elements depending on which Editor is currently being used.
     * @type {boolean}
     */
    this.keyEventsEnabled = true;

    // Sets current resource for shadow block class.
    this.setResource(this.view.workspaceContents);

    // Initializes view's event listeners/handlers.
    this.view.init(this);
  }

  /**
   * Generates XML of currently active WorkspaceContents.
   * @return {!Element} XML of current workspace contents blocks.
   */
  generateContentsXml() {
    const xmlDom = goog.dom.createDom('xml');
    xmlDom.setAttribute('id', this.view.getWorkspaceContents().name);
    xmlDom.setAttribute('style', 'display: none');

    const xml = Blockly.Xml.workspaceToDom(this.view.editorWorkspace);
    this.loadToHiddenWorkspace_(xml);
    this.appendHiddenWorkspaceToDom_(xmlDom);

    return xmlDom;
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
    const injectOptions = this.view.getWorkspaceContents().config.options;
    injectOptions['toolbox'] = '<xml></xml>';

    this.view.previewWorkspace = Blockly.inject('workspacePreview', injectOptions);
    Blockly.Xml.domToWorkspace(
        this.view.getWorkspaceContents().getExportData(), this.view.previewWorkspace);
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

    // Refresh the shadow block buttons only if the state of blocks has changed
    // (i.e. only on move or UI events).
    if (isMoveEvent || isUiEvent) {
      Blockly.Events.disable();
      const selected = this.view.editorWorkspace.getBlockById(event.blockId);
      this.view.selectedBlock = selected;

      if (!selected) {
        // User does not select a block.
        this.view.showAndEnableShadow(false, false, true);
      } else {
        // User selects a block.
        if (selected.getSurroundParent()) {
          for (let block of selected.getSurroundParent().getDescendants()) {
            this.view.selectedBlock = block;
            this.checkShadowStatus();
          }
          this.view.selectedBlock = selected;
        }

        this.checkShadowStatus();
      }
      Blockly.Events.enable();
    } else {
      this.view.selectedBlock = null;
      this.view.showAndEnableShadow(false, false, true);
    }

    if (isCreateEvent) {
      this.createFakeShadowBlocks_(event.blockId);
    }
  }

  /**
   * Saves blocks on editor workspace into the WorkspaceContents model.
   */
  saveStateFromWorkspace() {
    this.view.getWorkspaceContents().setXml(this.generateContentsXml());
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
    this.updateOptions();

    this.updatePreview();
  }

  /**
   * Updates Workspace preview based on the WorkspaceConfig and WorkspaceContents
   * currently being edited.
   */
  updatePreview() {
    // From wfactory_controller.js:updatePreview()
    this.view.previewWorkspace.clear();
    Blockly.Xml.domToWorkspace(this.view.getWorkspaceContents().getExportData(),
        this.view.previewWorkspace);
  }

  /**
   * Updates the editor toolbox to have categories for user-defined block libraries.
   */
  updateEditorToolbox() {
    // TODO(#198): Share function with toolbox controller.
    const libraryXml = [];
    const project = this.projectController.getProject();
    const libMap = project.librarySet.resources;
    for (let libName in libMap) {
      const blocks = FactoryUtils.convertToBlocklyBlocks(
          libMap[libName].getAllBlockDefinitions(), this.hiddenWorkspace);
      const libXml = FactoryUtils.generateCategoryXml(blocks, libName);
      libraryXml.push([libName, libXml]);
    }
    this.view.updateEditorToolbox(libraryXml);
  }

  /**
   * Loads WorkspaceContents onto editor workspace.
   * @param {!WorkspaceContents} wsContents WorkspaceContents to load.
   * @throws If wsContents param is undefined or null.
   */
  loadContents(wsContents) {
    if (!wsContents) {
      console.warn(
          'Cannot load an undefined or null WorkspaceContents onto workspace.');
      return;
    }
    Blockly.Xml.domToWorkspace(this.view.getWorkspaceContents().getExportData(),
        this.view.editorWorkspace);
    this.view.editorWorkspace.cleanUp();
    this.updatePreview();
  }

  /**
   * Loads WorkspaceConfiguration onto editor workspace.
   * @param {!WorkspaceConfiguration} wsConfig WorkspaceConfiguration to load.
   */
  loadConfig(wsConfig) {
    if (!wsConfig) {
      console.warn(
          'Cannot load undefined or null WorkspaceConfiguration onto workspace.');
      return;
    }
    const options = wsConfig ? wsConfig.options : Object.create(null);
    this.writeOptions_(options);
    this.updateOptions();
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
   * Clears the workspace editor and loads XML to it, marking shadow blocks
   * as necessary.
   * @param {!Element} xml The XML to be loaded to the workspace.
   * @private
   */
  clearAndLoadXml_(xml) {
    // From wfactory_controller.js:clearAndLoadXml_(xml)
    this.view.editorWorkspace.clear();
    this.view.editorWorkspace.clearUndo();
    Blockly.Xml.domToWorkspace(xml, this.view.editorWorkspace);
    const blocks = this.view.editorWorkspace.getAllBlocks();
    const shadowBlocks =  this.getShadowBlocksInWorkspace(blocks);
    for (let block of shadowBlocks) {
      FactoryUtils.markShadowBlock(block);
    }
    FactoryUtils.warnForUndefinedBlocks(blocks, this.projectController.getProject());
  }

  /**
   * Sets standard default options for default WorkspaceConfig, updates
   * the preview workspace. Default values depend on whether certain categories
   * are present.
   */
  setStandardOptionsAndUpdate() {
    // From wfactory_controller.js:setStandardOptionsAndUpdate()
    this.view.resetConfigs();
    this.updateOptions();
  }

  /**
   * Generates new WorkspaceConfig object. Creates Blockly.Options to inject into
   * preview Blockly workspace, based upon user input.
   * Called every time a change has been made to an input field. Updates the model
   * and reinjects the preview workspace.
   */
  updateOptions() {
    // From wfactory_controller.js:generateNewOptions()
    // TODO (#141): Add popup for workspace config.
    this.view.getWorkspaceContents().config.setOptions(this.readOptions_());
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
   * Displays a given options object onto WorkspaceConfiguration checkboxes in
   * the Workspace editor.
   * @param {!Object} optionsObj Blockly injection options object.
   * @private
   */
  writeOptions_(optionsObj) {
    // Readonly mode.
    const readonly = optionsObj['readOnly'] ? true : false;
    document.getElementById('option_readOnly_checkbox').checked = readonly;
    FactoryUtils.ifCheckedEnable(!readonly, ['readonly1', 'readonly2']);

    // Set basic options.
    document.getElementById('option_css_checkbox').checked =
        optionsObj['css'] || true;
    document.getElementById('option_media_text').value =
        optionsObj['media'] || 'https://blockly-demo.appspot.com/static/media/';
    document.getElementById('option_rtl_checkbox').checked =
        optionsObj['RTL'] || false;
    document.getElementById('option_sounds_checkbox').checked =
        optionsObj['sounds'] || false;
    document.getElementById('option_oneBasedIndex_checkbox').checked =
        optionsObj['oneBasedIndex'] || true;
    document.getElementById('option_horizontalLayout_checkbox').checked =
        optionsObj['horizontalLayout'] || false;
    document.getElementById('option_toolboxPosition_checkbox').checked =
        optionsObj['toolboxPosition'] == 'end' || false;

    // Check infinite blocks and hide suboption.
    const infinite = optionsObj['maxBlocks'] == Infinity || true;
    document.getElementById('option_maxBlocks_number').value =
        infinite ? '' : optionsObj['maxBlocks'];
    document.getElementById('option_infiniteBlocks_checkbox').checked = infinite;
    document.getElementById('maxBlockNumber_option').style.display =
        infinite ? 'none' : 'block';

    // Set grid options.
    let grid = optionsObj['grid'] || Object.create(null);
    let hasGrid = grid.spacing ? true : false;
    document.getElementById('option_grid_checkbox').checked =
        hasGrid ? true : false;
    document.getElementById('grid_options').style.display =
        hasGrid ? 'block' : 'none';
    document.getElementById('gridOption_spacing_number').value =
        grid['spacing'] || 20;
    document.getElementById('gridOption_length_number').value =
        grid['length'] || 1;
    document.getElementById('gridOption_colour_text').value =
        grid['colour'] || '#888';
    document.getElementById('gridOption_snap_checkbox').checked =
        grid['snap'] || false;

    // Set zoom options.
    let zoom = optionsObj['zoom'] || Object.create(null);
    document.getElementById('option_zoom_checkbox').checked =
        zoom ? true : false;
    document.getElementById('zoom_options').style.display =
        zoom ? 'block' : 'none';
    document.getElementById('zoomOption_controls_checkbox').checked =
        zoom['controls'] || true;
    document.getElementById('zoomOption_wheel_checkbox').checked =
        zoom['wheel'] || true;
    document.getElementById('zoomOption_startScale_number').value =
        zoom['startScale'] || 1.0;
    document.getElementById('zoomOption_maxScale_number').value =
        zoom['maxScale'] || 3;
    document.getElementById('zoomOption_minScale_number').value =
        zoom['minScale'] || 0.3;
    document.getElementById('zoomOption_scaleSpeed_number').value =
        zoom['scaleSpeed'] || 1.2;
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
    let fileName = resource.name;

    if (resource instanceof WorkspaceContents) {
      // Return if no file type was specified.
      if (!opt_type) {
        return;
      }
      fileContents = FactoryUtils.escapeForFileSystem(
          Blockly.Xml.domToPrettyText(resource.getExportData()));

      if (opt_type == ProjectController.TYPE_JS) {
        fileContents = FactoryUtils.generateXmlAsJsFile(this.view.getWorkspaceContents(),
            PREFIXES.WORKSPACE_CONTENTS.toUpperCase());
      }
    } else if (resource instanceof WorkspaceConfiguration) {
      fileContents = this.generateInjectFile(this.view.workspaceConfig);
      opt_type = ProjectController.TYPE_JS;
    } else if (resource instanceof Resource) {
      throw new Error('This resource, ' + resource.name + ', cannot be exported'
          + ' from the workspace editor.');
    }

    FactoryUtils.createAndDownloadFile(fileContents,
        fileName + '.' + opt_type,
        'text/' + opt_type);
  }

  /**
   * Creates a string representation of the options, for use in making the string
   * used to inject the workspace.
   * @param {!Object} obj Object representing the options selected in the current
   *     configuration.
   * @param {string} indent String representation of an indent.
   * @return {string} String representation of the workspace configuration's
   *     options.
   * @recursive
   * @private
   */
  stringifyOptions_(obj, indent) {
    // REFACTORED from wfactory_generator.js:addAttributes_(obj, tabChar)
    if (!obj) {
      return '{}\n';
    }
    var str = '';
    for (var key in obj) {
      if (key == 'grid' || key == 'zoom') {
        var temp = indent + key + ' : {\n' +
            this.stringifyOptions_(obj[key], indent + '\t') +
            indent + '}, \n';
      } else if (typeof obj[key] == 'string') {
        var temp = indent + key + ' : \'' + obj[key] + '\', \n';
      } else {
        var temp = indent + key + ' : ' + obj[key] + ', \n';
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
   * @param {Object=} opt_custom Object which contains custom names for a given
   *     Blockly application. May contain a field such as toolboxName, for the
   *     name of the toolbox to render.
   * @return {string} String representation of starter code for injecting.
   */
  generateInjectFile(workspaceConfig, opt_custom) {
    // REFACTORED from wfactory_generator.js
    let div = 'null';
    let toolboxName =  '/* TODO: Insert name of toolbox to display here */'
    if (opt_custom) {
      div = opt_custom['div'] ? `"${opt_custom['div']}"` : div;
      toolboxName = opt_custom['toolboxName'] ? `"${opt_custom['toolboxName']}"` : toolboxName;
    }
    let workspaceScript = '\n';
    if (opt_custom['workspaceName']) {
      workspaceScript = `var workspaceContents = Blockly.Xml.textToDom(BLOCKLY_WORKSPACE_XML["${opt_custom['workspaceName']}"]);
  Blockly.Xml.domToWorkspace(workspaceContents, workspace);`;
    }

    delete workspaceConfig.options['toolbox'];
    let attributes = this.stringifyOptions_(workspaceConfig.options, '\t');
    if (!workspaceConfig.options['readOnly']) {
      attributes = 'toolbox : BLOCKLY_TOOLBOX_XML[' + toolboxName +
        '], \n' + attributes;
    }

    // Initializing toolbox
    let finalStr = `
var BLOCKLY_OPTIONS = {
  ${attributes}
};

window.onload = function() {
  /* Inject your workspace */
  /* TODO: Add or edit ID of div to inject Blockly into. */
  var workspace = Blockly.inject(${div}, BLOCKLY_OPTIONS);
  ${workspaceScript}
};
`;
    return finalStr;
  }
}
