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
     * @type {?string}
     */
    this.hasSaved = localStorage.getItem('hasSavedProjectBefore');


    this.directoryMap = new Map();

    this.initDirectoryMap();
  }

  /**
   * Creates the properly nested directory in which to save the project.
   * @param {!string} directory The resource directory to check (must be one of
   * the get methods in DIRECTORIES)
   */
  initProjectDirectory(directory) {
    for (let directoryKey of this.directoryMap.keys()) {
      if (!fs.existsSync(directory)) {
        fs.mkdir(directoryKey);
      }
    }
  }

  /**
   *Initializes the directory map.
   * @return {Map} Map of resource type to locally stored directory locattion.
   */
  initDirectoryMap() {
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
   // if (!this.hasSaved) {
      this.popupController = new SaveProjectPopupController(this.appController,
          this);
      this.popupController.show();
    //} else {
    //  this.writeDataFile(this.appController.project,
   //       this.directoryMap.get(PREFIXES.PROJECT));
   // }
  }

  /**
   * Saves a block to the developer's file system.
   */
  saveBlock() {
    //TODO: fill in
  }

  /**
   * Saves a library to the developer's file system.
   */
  saveLibrary() {
    //TODO: fill in
  }

  /**
   * Saves a toolbox to the developer's file system.
   */
  saveToolbox() {
    //TODO: fill in
  }

  /**
   * Saves workspace contents to the developer's file system.
   */
  saveWorkspaceContents() {
    //TODO: fill in
  }

  /**
   * Saves workspace configuration to the developer's file system.
   */
  saveWorkspaceConfiguration() {
    //TODO: fill in
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
    localStorage.setItem('hasSavedProjectBefore', 'yes');
  }
}
