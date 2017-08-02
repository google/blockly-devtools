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


  class DIRECTORY_LOCAL_STORAGE_TAGS {
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

  class DIRECTORIES {
    static get PROJECT() {
      return localStorage.getItem(DIRECTORY_LOCAL_STORAGE_TAGS.PROJECT);
    }
    static get LIBRARY() {
      return localStorage.getItem(DIRECTORY_LOCAL_STORAGE_TAGS.LIBRARY);
    }
    static get TOOLBOX() {
      return localStorage.getItem(DIRECTORY_LOCAL_STORAGE_TAGS.TOOLBOX);
    }
    static get GENERAL_WORKSPACE() {
      return localStorage.getItem(DIRECTORY_LOCAL_STORAGE_TAGS.GENERAL_WORKSPACE);
    }
  }

/**
 * @fileoverview ReadWriteController manages reading/writing all files
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

    this.appController = appController;

    /**
     * Whether or not the user has saved before.
     * @type {string}
     */
    this.hasSaved = null;//localStorage.getItem('hasSavedProjectBefore');

    delete DIRECTORIES.length;

    delete DIRECTORIES.name;

    delete DIRECTORY_LOCAL_STORAGE_TAGS.length;

    delete DIRECTORY_LOCAL_STORAGE_TAGS.name;
  }

  /**
   * Creates the properly nested directory in which to save the project.
   */
  initProjectDirectory() {
    for (let directory in DIRECTORIES) {
      if (directory) {
        console.log('THIS IS PASSING: '+ directory);
      //  if (!fs.existsSync(dirs[dir])) {
      //    fs.mkdir(dirs[dir]);
      //  }
      }
    }
  }

  /**
   * Stores previous save locations in local storage.
   */
  storeLocations() {
  //  const dirs = this.getDirs();
 //   for (let dir in dirs) {
 //     if (dirs[dir]) {
  //      localStorage.setItem()
 //     } else {
 //       console.log('THIS IS NOT PASSING: '+ dirs[dir]);
 //     }
 //   }
  }

  /**
   * Saves entire project to the developer's file system.
   */
  saveProject() {
    // Check for viable save location.
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
    if (this.canSave())
    this.writeDataFile(this.appController.project, DIRECTORIES.PROJECT);
  }

  /**
   * Saves a library to the developer's file system.
   */
  saveLibrary() {
    if (!this.hasSaved) {
      this.popupController = new SaveProjectPopupController(this.appController,
          this);
      this.popupController.show();
    } else {
      this.writeDataFile(this.appController.project, DIRECTORIES.PROJECT);
    }
  }

  /**
   * Saves a toolbox to the developer's file system.
   */
  saveToolbox() {
    if (!this.hasSaved) {
      this.popupController = new SaveProjectPopupController(this.appController,
          this);
      this.popupController.show();
    } else {
      this.writeDataFile(this.appController.project, DIRECTORIES.PROJECT);
    }
  }

  /**
   * Saves workspace contents to the developer's file system.
   */
  saveWorkspaceContents() {
    if (!this.hasSaved) {
      this.popupController = new SaveProjectPopupController(this.appController,
          this);
      this.popupController.show();
    } else {
      this.writeDataFile(this.appController.project, DIRECTORIES.PROJECT);
    }
  }

  /**
   * Saves workspace configuration to the developer's file system.
   */
  saveWorkspaceConfiguration() {
    if (!this.hasSaved) {
      this.popupController = new SaveProjectPopupController(this.appController,
          this);
      this.popupController.show();
    } else {
      this.writeDataFile(this.appController.project, DIRECTORIES.PROJECT);
    }
  }

  /**
   * Write a new data file.
   * @param {!Resource} resource The resource to get the data from.
   */
  writeDataFile(resource, directory) {
    this.initProjectDirectory();
    let data = Object.create(null);
    resource.buildMetadata(data);
    let dataString = JSON.stringify(data, null, '\t');
    fs.writeFileSync(directory + path.sep + 'metadata', dataString);
    this.storeLocations();
  }
}
