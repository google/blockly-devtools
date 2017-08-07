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
    this.hasSaved = null;//localStorage.getItem('hasSavedProjectBefore');

    /**
     * Map of resource type to locally stored directory location.
     * @type {Map}
     */
    this.directoryMap = new Map();
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
      localStorage.setItem('hasSavedProjectBefore', true);
    } else {
      this.writeProjectMetadataFile();
    }
  }

  /**
   * Saves a block to the developer's file system.
   * @param
   * @return
   */
  makeBlockData(block) {
    let data = Object.create(null);
    fs.writeFileSync(location + path.sep + 'metadata', dataString);
  }

  /**
   * Saves a library to the developer's file system.
   * @param
   */
  saveLibrary(library) {
    let data = Object.create(null);
    library.
    fs.writeFileSync(location + path.sep + 'metadata', dataString);
  }

  /**
   * Saves a toolbox to the developer's file system.
   * @param
   */
  saveToolbox(getToolbox) {
    let data = Object.create(null);
    fs.writeFileSync(location + path.sep + 'metadata', dataString);
  }

  /**
   * Saves workspace contents to the developer's file system.
   * @param
   */
  saveWorkspaceContents(workspaceContents) {
    let data = Object.create(null);
    fs.writeFileSync(location + path.sep + 'metadata', dataString);
  }

  /**
   * Saves workspace configuration to the developer's file system.
   * @param
   */
  saveWorkspaceConfiguration(workspaceConfig) {
    let data = Object.create(null);
    fs.writeFileSync(location + path.sep + 'metadata', dataString);
  }

  /**
   * Returns an HTML division (based on the save project popup) name for a given
   * resource. Used in directory map keys.
   * @return {string} HTML division name
   */
  getDivName(resource) {
    return resource.resourceType + '_' + resource.name;
  }

  /**
   * Write all necessary data files.
   */
  writeAllFiles() {
    for (let directory of this.directoryMap.keys()) {
      let typeAndName = directory.split("_");
      let type = typeAndName[0];
      let name = typeAndName[1];
      if (type == PREFIXES.LIBRARY) {
        let library = this.appController.project.getBlockLibrary(name);
        this.saveLibrary(library);
      } else if (type = PREFIXES.TOOLBOX) {
        let toolbox == this.appController.project.getToolbox(name);
        this.saveToolbox(toolbox);
      } else if (type == PREFIXES.WORKSPACE_CONTENTS) {
        let workspaceContents =
            this.appController.project.getWorkspaceContents(name);
        this.saveWorkspaceContents(workspaceContents);
      } else if (type == PREFIXES.WORKSPACE_CONFIG) {
        let workspaceConfig =
            this.appController.project.getworkspaceConfiguration(name);
        this.saveWorkspaceConfiguration(workspaceConfig);
      }
    }
  }

  /**
   * Write the project's metadata file.
   */
  writeProjectMetadataFile() {
    this.writeAllFiles();
    const project = this.appController.project;
    let data = Object.create(null);
    project.buildMetadata(data);
    let dataString = JSON.stringify(data, null, '\t');
    const location = this.directoryMap.get(this.getDivName(project));
    fs.writeFileSync(location + path.sep + 'metadata', dataString);
  }
}
