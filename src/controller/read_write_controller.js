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
    this.hasSaved = localStorage.getItem('hasSavedProjectBefore');

    /**
     * Map of resource type to locally stored directory location.
     * @type {Map}
     */
    this.directoryMap = new Map();
    // Initialize the directory map.
    this.initDirectoryMap_();
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
   * Initializes the directory map.
   * @return {Map} Map of resource type to locally stored directory location.
   * @private
   */
  initDirectoryMap_() {
    this.directoryMap.set(PREFIXES.PROJECT,
        localStorage.getItem(PREFIXES.PROJECT));
    this.directoryMap.set(PREFIXES.LIBRARY,
        localStorage.getItem(PREFIXES.LIBRARY));
    this.directoryMap.set(PREFIXES.TOOLBOX,
        localStorage.getItem(PREFIXES.TOOLBOX));
    this.directoryMap.set(PREFIXES.GENERAL_WORKSPACE,
        localStorage.getItem(PREFIXES.GENERAL_WORKSPACE));
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
      this.writeDataFile(this.appController.project,
          this.directoryMap.get(PREFIXES.PROJECT));
    }
  }

  /**
   * Saves a block to the developer's file system.
   */
  saveBlock() {
    //TODO: fill in
    console.warn('unimplimented: saveBlock');
  }

  /**
   * Saves a library to the developer's file system.
   */
  saveLibrary() {
    //TODO: fill in
    console.warn('unimplimented: saveLibrary');
  }

  /**
   * Saves a toolbox to the developer's file system.
   */
  saveToolbox() {
    //TODO: fill in
    console.warn('unimplimented: saveToolbox');
  }

  /**
   * Saves workspace contents to the developer's file system.
   */
  saveWorkspaceContents() {
    //TODO: fill in
    console.warn('unimplimented: saveWorkspaceContents');
  }

  /**
   * Saves workspace configuration to the developer's file system.
   */
  saveWorkspaceConfiguration() {
    //TODO: fill in
    console.warn('unimplimented: saveWorkspaceConfiguration');
  }

  /**
   * Write a new data file.
   * @param {!Resource} resource The resource to get the data from.
   */
  writeDataFile(resource) {
    let data = Object.create(null);
    resource.buildMetadata(data);
    let dataString = JSON.stringify(data, null, '\t');
    const location = this.directoryMap.get(resource.resourceType);
    fs.writeFileSync(location + path.sep + 'metadata', dataString);
    localStorage.setItem('hasSavedProjectBefore', true);
  }
}
