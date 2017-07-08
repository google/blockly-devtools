/**
 * @license
 * Blockly Demos: Block Factory
 *
 * Copyright 2016 Google Inc.
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
 * @fileoverview Generates the configuration XML used to update the preview
 * workspace or print to the console or download to a file. Leverages
 * Blockly.Xml and depends on information in the model (holds a reference).
 * Depends on a hidden workspace created in the generator to load saved XML in
 * order to generate toolbox XML.
 *
 * @author Emma Dauterman (evd2014)
 */

goog.require('FactoryUtils');

/**
 * Class for a WorkspaceFactoryGenerator
 * @constructor
 */
WorkspaceFactoryGenerator = function(model) {
  // Model to share information about categories and shadow blocks.
  this.model = model;
  // Create hidden workspace to load saved XML to generate toolbox XML.
  var hiddenBlocks = document.createElement('div');
  // Generate a globally unique ID for the hidden div element to avoid
  // collisions.
  var hiddenBlocksId = Blockly.utils.genUid();
  hiddenBlocks.id = hiddenBlocksId;
  hiddenBlocks.style.display = 'none';
  document.body.appendChild(hiddenBlocks);
  this.hiddenWorkspace = Blockly.inject(hiddenBlocksId);
  // Stores XML strings of all imported and loaded toolboxes. Keys are toolbox
  // names given by user.
  this.BLOCKLY_TOOLBOX_XML = {};
  // Stores XML strings of all imported and loaded pre-load workspace blocks.
  // Keys are preload workspace names given by user.
  this.BLOCKLY_PRELOAD_XML = {};
};

/**
 * Generates the XML for the toolbox or flyout with information from
 * toolboxWorkspace and the model. Uses the hiddenWorkspace to generate XML.
 * Save state of workspace in model (saveFromWorkspace) before calling if
 * changes might have been made to the selected category.
 * @param {!Blockly.workspace} toolboxWorkspace Toolbox editing workspace where
 * blocks are added by user to be part of the toolbox.
 * @return {!Element} XML element representing toolbox or flyout corresponding
 * to toolbox workspace.
 */
WorkspaceFactoryGenerator.prototype.generateToolboxXml = function() {
  // Create DOM for XML.
  var xmlDom = goog.dom.createDom('xml',
      {
        'id' : 'toolbox',
        'style' : 'display:none'
      });
  if (!this.model.hasElements()) {
    // Toolbox has no categories. Use XML directly from workspace.
    this.loadToHiddenWorkspace_(this.model.getSelectedXml());
    this.appendHiddenWorkspaceToDom_(xmlDom);
  } else {
    // Toolbox has categories.
    // Assert that selected != null
    if (!this.model.getSelected()) {
      throw new Error('Selected is null when the toolbox is empty.');
    }

    var xml = this.model.getSelectedXml();
    var toolboxList = this.model.getToolboxList();

    // Iterate through each category to generate XML for each using the
    // hidden workspace. Load each category to the hidden workspace to make sure
    // that all the blocks that are not top blocks are also captured as block
    // groups in the flyout.
    for (var i = 0; i < toolboxList.length; i++) {
      var element = toolboxList[i];
      if (element.type == ListElement.TYPE_SEPARATOR) {
        // If the next element is a separator.
        var nextElement = goog.dom.createDom('sep');
      } else if (element.type == ListElement.TYPE_CATEGORY) {
        // If the next element is a category.
        var nextElement = goog.dom.createDom('category');
        nextElement.setAttribute('name', element.name);
        // Add a colour attribute if one exists.
        if (element.color != null) {
          nextElement.setAttribute('colour', element.color);
        }
        // Add a custom attribute if one exists.
        if (element.custom != null) {
          nextElement.setAttribute('custom', element.custom);
        }
        // Load that category to hidden workspace, setting user-generated shadow
        // blocks as real shadow blocks.
        this.loadToHiddenWorkspace_(element.xml);
        this.appendHiddenWorkspaceToDom_(nextElement);
      }
      xmlDom.appendChild(nextElement);
    }
  }
  return xmlDom;
 };

 /**
  * Generates XML for the workspace (different from generateConfigXml in that
  * it includes XY and ID attributes). Uses a workspace and converts user
  * generated shadow blocks to actual shadow blocks.
  * @return {!Element} XML element representing toolbox or flyout corresponding
  * to toolbox workspace.
  */
WorkspaceFactoryGenerator.prototype.generateWorkspaceXml = function() {
  // Load workspace XML to hidden workspace with user-generated shadow blocks
  // as actual shadow blocks.
  this.hiddenWorkspace.clear();
  Blockly.Xml.domToWorkspace(this.model.getPreloadXml(), this.hiddenWorkspace);
  this.setShadowBlocksInHiddenWorkspace_();

  // Generate XML and set attributes.
  var generatedXml = Blockly.Xml.workspaceToDom(this.hiddenWorkspace);
  generatedXml.setAttribute('id', 'workspaceBlocks');
  generatedXml.setAttribute('style', 'display:none');
  return generatedXml;
};

/**
 * Generates a string representation of XML in JavaScript for toolbox or
 * pre-loaded workspace blocks. Used for exporting.
 *
 * @param {string} xml String representation of XML to be converted to JS.
 * @param {string} name Name of toolbox or preloaded-workspace.
 * @param {string} mode Editing mode information. Either
 *     WorkspaceFactoryController.MODE_TOOLBOX or
 *     WorkspaceFactoryController.MODE_PRELOAD.
 * @returns {string} String representation of JavaScript file for export.
 */
WorkspaceFactoryGenerator.prototype.generateJsFromXml = function(xml, name, mode) {
  // Escape for ' when exporting to JS.
  let groupName = name;
  let xmlStorageVariable = 'BLOCKLY_' + mode + '_XML';

  // XML ASSIGNMENT STRING (not to be executed)
  let jsFromXml = `
// If ${xmlStorageVariable} does not exist.
if (!${xmlStorageVariable}) {
  ${xmlStorageVariable} = {};
}

/* BEGINNING ${xmlStorageVariable} ASSIGNMENT. DO NOT EDIT. USE BLOCKLY DEVTOOLS. */
${xmlStorageVariable}['${groupName}'] =
    ${FactoryUtils.concatenateXmlString(xml)};
/* END ${xmlStorageVariable} ASSIGNMENT. DO NOT EDIT. */
`;
  return jsFromXml;
};

/**
 * Evaluates and runs extracted JS script which contains XML string. Adds XML
 * string to corresponding dictionary (either BLOCKLY_TOOLBOX_XML or
 * BLOCKLY_PRELOAD_XML), depending on file type.
 *
 * @param {string} jsFileContents String representation of JS file. Contains
 *    assignment of XML string to corresponding dictionary in
 *    WorkspaceFactoryGenerator.
 * @param {string} importMode Importing mode information. Either
 *    WorkspaceFactoryController.MODE_TOOLBOX or
 *    WorkspaceFactoryController.MODE_PRELOAD.
 * @returns {string} Name of toolbox or preload workspace.
 */
WorkspaceFactoryGenerator.prototype.loadXml =
    function(jsFileContents, importMode) {
  // Add "this." to access generator's this.BLOCKLY_TOOLBOX_XML or
  //   this.BLOCKLY_PRELOAD_XML field when evaluating.
  if (importMode == WorkspaceFactoryController.MODE_TOOLBOX) {
    var scriptToRun = jsFileContents.replace(/BLOCKLY_TOOLBOX_XML/g,
        'this.BLOCKLY_TOOLBOX_XML');
  } else {
    var scriptToRun = jsFileContents.replace(/BLOCKLY_PRELOAD_XML/g,
        'this.BLOCKLY_PRELOAD_XML');
  }

  // Stores the XML string.
  scriptToRun = this.evaluateMarkedCode(scriptToRun);

  // Find toolbox name and return name.
  var xmlToJsName = scriptToRun.replace(/(.|\n)*XML\[\'/g, '');
  xmlToJsName = xmlToJsName.replace(/\'\](.|\n)*/g, '');

  // Removes extra escapes by evaluating.
  eval('xmlToJsName = \'' + xmlToJsName + '\';');
  return xmlToJsName;
};

/**
 * Strips any unnecessary code from given script and evaluates only code between
 * commented part of JavaScript file.
 *
 * @param {string} code String representation of JavaScript code to run.
 * @returns {string} JavaScript code between comments.
 */
WorkspaceFactoryGenerator.prototype.evaluateMarkedCode = function(code) {
  // Removes code before beginning comment.
  let esc = code.replace(/(.|\n)*\/\* *BEGINNING.*DEVTOOLS\. *\*\/( |\n)*/g, '');
  // Removes code after end comment.
  esc = esc.replace(/( |\n)*\/\* *END(.|\n)*/g, '');

  // TODO: Write test/update code to make sure evaluateMarkedCode() runs only
  //   code between comments.
  eval(esc);
  return esc;
};

/**
 * Generates a string representation of the options object for injecting the
 * workspace and starter code. Auto-injects added toolbox into the inject function.
 * @return {string} String representation of starter code for injecting.
 */
WorkspaceFactoryGenerator.prototype.generateInjectString = function(toolboxXml) {
  var addAttributes = function(obj, tabChar) {
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
  };

  var attributes = addAttributes(this.model.options, '\t');
  if (!this.model.options['readOnly']) {
    attributes = 'toolbox : BLOCKLY_TOOLBOX_XML[/* TODO: Insert name of ' +
      'imported toolbox to display here */], \n' + attributes;
  }

  // Initializing toolbox
  var finalStr = `
if(!BLOCKLY_TOOLBOX_XML) {
  var BLOCKLY_TOOLBOX_XML = {};
}

var BLOCKLY_OPTIONS = {
  ${attributes}
};

document.onload = function() {
  /* Inject your workspace */
  var workspace = Blockly.inject(/* TODO: Add ID of div to inject Blockly into */, BLOCKLY_OPTIONS);
};
`;
  return finalStr;
};

/**
 * Loads the given XML to the hidden workspace and sets any user-generated
 * shadow blocks to be actual shadow blocks.
 * @param {!Element} xml The XML to be loaded to the hidden workspace.
 * @private
 */
WorkspaceFactoryGenerator.prototype.loadToHiddenWorkspace_ = function(xml) {
  this.hiddenWorkspace.clear();
  Blockly.Xml.domToWorkspace(xml, this.hiddenWorkspace);
  this.setShadowBlocksInHiddenWorkspace_();
};

/**
 * Encodes blocks in the hidden workspace in a XML DOM element. Very
 * similar to workspaceToDom, but doesn't capture IDs. Uses the top-level
 * blocks loaded in hiddenWorkspace.
 * @private
 * @param {!Element} xmlDom Tree of XML elements to be appended to.
 */
WorkspaceFactoryGenerator.prototype.appendHiddenWorkspaceToDom_ =
    function(xmlDom) {
  var blocks = this.hiddenWorkspace.getTopBlocks();
  for (var i = 0, block; block = blocks[i]; i++) {
    var blockChild = Blockly.Xml.blockToDom(block, /* opt_noId */ true);
    xmlDom.appendChild(blockChild);
  }
};

/**
 * Sets the user-generated shadow blocks loaded into hiddenWorkspace to be
 * actual shadow blocks. This is done so that blockToDom records them as
 * shadow blocks instead of regular blocks.
 * @private
 */
WorkspaceFactoryGenerator.prototype.setShadowBlocksInHiddenWorkspace_ =
    function() {
  var blocks = this.hiddenWorkspace.getAllBlocks();
  for (var i = 0; i < blocks.length; i++) {
    if (this.model.isShadowBlock(blocks[i].id)) {
      blocks[i].setShadow(true);
    }
  }
};
