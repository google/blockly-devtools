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
 * Class containing static getters for the keys used to locally store directory
 * locatons.
 */
class DIRECTORY_LOCAL_STORAGE_KEYS {
  static get PROJECT() {
    return PREFIXES.PROJECT;
  }
  static get LIBRARY() {
    return PREFIXES.LIBRARY;
  }
  static get TOOLBOX() {
    return PREFIXES.TOOLBOX;
  }
  static get GENERAL_WORKSPACE() {
    return PREFIXES.GENERAL_WORKSPACE;
  }
}

/**
 * Class containing static getters for directory locations of each resource.
 */
class DIRECTORIES {
  static get PROJECT() {
    return localStorage.getItem(DIRECTORY_LOCAL_STORAGE_KEYS.PROJECT);
  }
  static get LIBRARY() {
    return localStorage.getItem(DIRECTORY_LOCAL_STORAGE_KEYS.LIBRARY);
  }
  static get TOOLBOX() {
    return localStorage.getItem(DIRECTORY_LOCAL_STORAGE_KEYS.TOOLBOX);
  }
  static get GENERAL_WORKSPACE() {
    return localStorage.getItem(DIRECTORY_LOCAL_STORAGE_KEYS.GENERAL_WORKSPACE);
  }
}

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

    /*
     * Remove unused attributes of the DIRECTORIES and
     * DIRECTORY_LOCAL_STORAGE_KEYS classes.
     */
    delete DIRECTORIES.length;
    delete DIRECTORIES.name;
    delete DIRECTORY_LOCAL_STORAGE_KEYS.length;
    delete DIRECTORY_LOCAL_STORAGE_KEYS.name;
  }

  /**
   * Creates the properly nested directory in which to save the project.
   * @param {!string} directory The resource directory to check (must be one of
   * the get methods in DIRECTORIES)
   */
  initProjectDirectory(directory) {
    if (!fs.existsSync(directory)) {
      fs.mkdir(dirs[dir]);
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
      this.writeDataFile(this.appController.project, DIRECTORIES.PROJECT);
    }
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
  writeDataFile(resource, directory) {
    this.initProjectDirectory(directory);
    let data = Object.create(null);
    resource.buildMetadata(data);
    let dataString = JSON.stringify(data, null, '\t');
    fs.writeFileSync(directory + path.sep + 'metadata', dataString);
    localStorage.setItem('hasSavedProjectBefore', 'yes');
  }
}
