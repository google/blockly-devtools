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

goog.provide('ReadWriteController');

goog.require('SaveProjectPopupView');
goog.require('SaveProjectPopupController');

var BLOCKLY_OPTIONS = {};
/**
 * @fileoverview ReadWriteController manages reading and writing all files
 * pertinent to the project.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */
class ReadWriteController {
  /**
   * @constructor
   * @param {AppController} appController AppController for the session.
   */
  constructor(appController) {

    /**
     * The app controller for the session, used to get the project.
     * @type {AppController}
     */
    this.appController = appController;

    /**
     * Whether or not the user has saved before.
     * @type {boolean}
     */
    this.hasSaved = false;

    /**
     * Array of resource html division ids.
     * Populated by popup.
     * @type {Array<string>}
     */
    this.resourceDivIds = [];
  }

  /**
   * Creates the properly nested directory in which to save the project.
   * @param {!string} directory The resource directory to check.
   */
  initProjectDirectory(directory) {
    if (!fs.existsSync(directory)) {
      fs.mkdir(directory);
    }
  }

  /**
   * Saves entire project to the developer's file system.
   */
  saveProject() {
    if (!this.hasSaved) {
      this.popupController = new SaveProjectPopupController(this.appController,
          this);
      this.popupController.show();
    } else {
      this.writeAllFiles();
    }
  }

  /**
   * Saves a library to the developer's file system.
   * @param {!BlockLibrary} library the block library to be saved.
   */
  saveLibrary(library) {
    let blockData = [];
    for (let blockType of library.getBlockTypes()) {
      // Issue #190
      let block = library.getBlockDefinition(blockType);
      let item = '\n\n\t// BlockType: ' + block.type() + '\n' + block.json;
      blockData.push(item);
    }
    const location = library.webFilepath;
    const filename = this.getDivName(library) + '.js';
    let fileData = 'Blockly.defineBlocksWithJsonArray( // BEGIN JSON EXTRACT \n' +
        blockData + ');  // END JSON EXTRACT (Do not delete this comment.)';
    fs.writeFileSync(location + path.sep + filename, fileData);
  }

  /**
   * Saves a toolbox to the developer's file system.
   * @param {!Toolbox} toolbox The toolbox to be saved.
   */
  saveToolbox(toolbox) {
    let data = this.appController.editorController.toolboxController.generateToolboxJsFile(toolbox);
    const location = toolbox.webFilepath;
    const filename = this.getDivName(toolbox) + '.js';
    fs.writeFileSync(location + path.sep + filename, data);
  }

  /**
   * Saves workspace contents to the developer's file system.
   * @param {!WorkspaceContents} workspaceContents The workspace contents to be
   *     saved.
   */
  saveWorkspaceContents(workspaceContents) {
    let xml = Blockly.Xml.domToPrettyText(workspaceContents.xml);
    var xmlStorageVariable = 'WORKSPACE_CONTENTS_XML';
    let data = `
/* BEGINNING ${xmlStorageVariable} ASSIGNMENT. DO NOT EDIT. USE BLOCKLY DEVTOOLS. */
var ${xmlStorageVariable} = ${xmlStorageVariable} || null;

${xmlStorageVariable}['${workspaceContents.name}'] =
    ${FactoryUtils.concatenateXmlString(xml)};
/* END ${xmlStorageVariable} ASSIGNMENT. DO NOT EDIT. */
`;
    const location = workspaceContents.webFilepath;
    const filename = this.getDivName(workspaceContents) + '.js';
    fs.writeFileSync(location + path.sep + filename, data);
  }

  /**
   * Saves workspace configuration to the developer's file system.
   * @param {!WorkspaceConfiguration} workspaceConfig The workspace configuration
   *     to be saved.
<<<<<<< HEAD
   */
  saveWorkspaceConfiguration(workspaceConfig) {
    var attributes = this.stringifyOptions_(workspaceConfig.options, '\t');
    if (!workspaceConfig.options['readOnly']) {
      attributes = 'toolbox : BLOCKLY_TOOLBOX_XML[/* TODO: Insert name of ' +
        'imported toolbox to display here */], \n' + attributes;
    }

    var data = `
/* BEGINNING BLOCKLY_OPTIONS ASSIGNMENT. DO NOT EDIT. USE BLOCKLY DEVTOOLS. */
var BLOCKLY_OPTIONS = BLOCKLY_OPTIONS || Object.create(null);

BLOCKLY_OPTIONS['${workspaceConfig.name}'] = ${attributes};
/* END BLOCKLY_OPTIONS ASSIGNMENT. DO NOT EDIT. */

document.onload = function() {
  /* Inject your workspace */
  /* TODO: Add ID of div to inject Blockly into */
  var workspace = Blockly.inject(null, BLOCKLY_OPTIONS);
};
`;
    const location = workspaceConfig.webFilepath;
    const filename = this.getDivName(workspaceConfig) + '.js';
    fs.writeFileSync(location + path.sep + filename, data);
  }

  /**
   * Returns an HTML division (based on the save project popup) name for a given
   * resource. Used in directory map keys.
   * @param {!Resource} resource The resource to get the division name for.
   * @return {string} HTML division name for the resource.
   */
  getDivName(resource) {
    return resource.resourceType + '_' + resource.name;
  }

  /**
   * Save all necessary data files.
   */
  saveAllFiles() {
    for (let divId of this.resourceDivIds) {
      let typeAndName = divId.split("_");
      let type = typeAndName[0];
      let name = typeAndName[1];
      if (type == PREFIXES.LIBRARY) {
        let library = this.appController.project.getBlockLibrary(name);
        this.saveLibrary(library);
      } else if (type == PREFIXES.TOOLBOX) {
        let toolbox = this.appController.project.getToolbox(name);
        this.saveToolbox(toolbox);
      } else if (type == PREFIXES.WORKSPACE_CONTENTS) {
        let workspaceContents =
            this.appController.project.getWorkspaceContents(name);
        this.saveWorkspaceContents(workspaceContents);
      } else if (type == PREFIXES.WORKSPACE_CONFIG) {
        let workspaceConfig =
            this.appController.project.getWorkspaceConfiguration(name);
        this.saveWorkspaceConfiguration(workspaceConfig);
      }
    }
    this.saveProjectMetadataFile();
  }

  /**
   * Save the project's metadata file.
   */
  saveWorkspaceConfiguration(workspaceConfig) {
    var attributes = this.stringifyOptions_(workspaceConfig.options, '\t');
    if (!workspaceConfig.options['readOnly']) {
      attributes = 'toolbox : BLOCKLY_TOOLBOX_XML[/* TODO: Insert name of ' +
        'imported toolbox to display here */], \n' + attributes;
    }

    var data = `
/* BEGINNING BLOCKLY_OPTIONS ASSIGNMENT. DO NOT EDIT. USE BLOCKLY DEVTOOLS. */
var BLOCKLY_OPTIONS = BLOCKLY_OPTIONS || Object.create(null);

BLOCKLY_OPTIONS['${workspaceConfig.name}'] = ${attributes};
/* END BLOCKLY_OPTIONS ASSIGNMENT. DO NOT EDIT. */

document.onload = function() {
  /* Inject your workspace */
  /* TODO: Add ID of div to inject Blockly into */
  var workspace = Blockly.inject(null, BLOCKLY_OPTIONS);
};
`;
    const location = workspaceConfig.webFilepath;
    const filename = this.getDivName(workspaceConfig) + '.js';
    fs.writeFileSync(location + path.sep + filename, data);
  }

  /**
   * Returns an HTML division (based on the save project popup) name for a given
   * resource. Used in directory map keys.
   * @param {!Resource} resource The resource to get the division name for.
   * @return {string} HTML division name for the resource.
   */
  getDivName(resource) {
    return resource.resourceType + '_' + resource.name;
  }

  /**
   * Save all necessary data files.
   */
  saveAllFiles() {
    for (let divId of this.resourceDivIds) {
      let typeAndName = divId.split("_");
      let type = typeAndName[0];
      let name = typeAndName[1];
      if (type == PREFIXES.LIBRARY) {
        let library = this.appController.project.getBlockLibrary(name);
        this.saveLibrary(library);
      } else if (type == PREFIXES.TOOLBOX) {
        let toolbox = this.appController.project.getToolbox(name);
        this.saveToolbox(toolbox);
      } else if (type == PREFIXES.WORKSPACE_CONTENTS) {
        let workspaceContents =
            this.appController.project.getWorkspaceContents(name);
        this.saveWorkspaceContents(workspaceContents);
      } else if (type == PREFIXES.WORKSPACE_CONFIG) {
        let workspaceConfig =
            this.appController.project.getWorkspaceConfiguration(name);
        this.saveWorkspaceConfiguration(workspaceConfig);
      }
    }
    this.saveProjectMetadataFile();
  }

  /**
   * Save the project's metadata file.
   */
  // TODO #205:  Pass in list of platforms ids (strings) for this save/export pass.
  saveProjectMetadataFile() {
    const project = this.appController.project;
    let data = Object.create(null);
    const location = this.appController.project.webFilepath;
    project.buildMetadata(data);
    let dataString = JSON.stringify(data, null, '\t');
    fs.writeFileSync(location + path.sep + 'metadata', dataString);
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
   * Initialize a Project based off of its metadata.
   * @param {string} projectMetaPath An absolute path to the project's metadata.
   * @param {string} platform The platform being uploaded.
   * @return {!Project} The reconstructed project.
   */
  constructProject(projectMetaPath, platform) {
    const dataString = fs.readFileSync(projectMetaPath, 'utf8');
    let data = JSON.parse(dataString);
    let project = new Project(data.name);
    for (let resource of data.resources) {
      if (resource.resourceType == PREFIXES.LIBRARY) {
        this.constructLibrary(resource.name, resource[platform].filepath);
      } else if (resource.resourceType == PREFIXES.TOOLBOX) {
        this.constructToolbox(resource.name, resource[platform].filepath);
      } else if (resource.resourceType == PREFIXES.WORKSPACE_CONTENTS) {
          this.constructWorkspaceContents(resource.name, resource[platform].filepath);
      } else if (resource.resourceType == PREFIXES.WORKSPACE_CONFIG) {
          this.constructWorkspaceConfig(resource.name, resource[platform].filepath);
      }
    }
    return project;
  }

  /**
   * Construct a library based off of its metadata, and add it to the project.
   * @param {string} libraryName The name of the library.
   * @param {string} path The absolute filepath to the library data.
   */
  constructLibrary(libraryName, path) {
    const dataString = fs.readFileSync(path, 'utf8');
    let data = JSON.parse(this.processLibraryDataString(dataString));
  }

  /**
   * Construct a toolbox based off of its metadata, and add it to the project.
   * @param {string} toolboxName The name of the toolbox.
   * @param {string} path The absolute filepath to the toolbox data.
   */
  constructToolbox(toolboxName, path) {
    const dataString = fs.readFileSync(path, 'utf8');
    let refinedString = processToolboxDataString(dataString);
  }

  /**
   * Construct workspace contents based off of metadata and add to project.
   * @param {string} contentsName The name of the workspace contents.
   * @param {string} path The absolute filepath to the workspace contents data.
   */
  constructWorkspaceContents(contentsName, path) {
    const dataString = fs.readFileSync(path, 'utf8');
    let refinedString = processWorkspaceContentsDataString(dataString);
  }

  /**
   * Construct a workspace configuration based off of metadata and add to project.
   * @param {string} workspaceConfigName The name of the workspace configuration.
   * @param {string} path The absolute filepath to the workspace config's data.
   */
  constructWorkspaceConfig(workspaceConfigName, path) {
    const dataString = fs.readFileSync(path, 'utf8');
    let refinedString = processWorkspaceConfigDataString(dataString);
  }

  /**
   * Processes a string of library metadata so that it can be parsed into JSON.
   * @param {string} dataString The string of the library's metadata.
   * @return {string} The refined string, ready to be parsed.
   */
  processLibraryDataString(dataString) {
    let refinedString = dataString.replace(/\/\/\ (.*)$/gm, '');
    refinedString = refinedString.replace('Blockly.defineBlocksWithJsonArray(', '');
    refinedString = refinedString.replace(');', '');
    refinedString = refinedString + ',';
    let refinedArray = refinedString.split('},');
    for (let blockString of refinedArray) {
      if (blockString) {
        blockString = blockString + '}';
      }
    }
    return blockString;
  }

  /**
   * Processes a string of toolbox metadata to properly extract xml.
   * @param {string} dataString The string of the toolbox's metadata.
   * @return {string} The xml string.
   */
  processToolboxDataString(dataString) {
    let refinedString = dataString.replace(/\/\*(.*)\*\/(.*)$/gm, '');
    // grab xml from now uncommented file
    return '';
  }

  /**
   * Processes a string of workspace contents metadata to properly extract xml.
   * @param {string} dataString The string of the workspace contents metadata.
   * @return {string} The xml string.
   */
  processWorkspaceContentsDataString(dataString) {
    let refinedString = dataString.replace(/\/\*(.*)\*\/(.*)$/gm, '');
    // grab xml from now uncommented file
    return '';
  }

  /**
   * Processes a string of workspace configuration metadata to extract options.
   * @param {string} dataString The string of the workspace configuration's metadata.
   * @return {string} The options string.
   */
  processWorkspaceConfigDataString(dataString) {
    let refinedString = dataString.replace(/\/\*(.*)\*\/(.*)$/gm, '');
    // grab options from now uncommented file
    return '';
  }
}
