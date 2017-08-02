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
    /**
     * Location where the project directory is saved.
     */
    this.storageLocation = localStorage.getItem('devToolsProjectLocation');

    this.projectDir = this.storageLocation + '/' + this.project.name;
    this.libraryDir = projectDir + '/' + PREFIXES.LIBRARY;
    this.toolboxDir = projectDir + '/' + PREFIXES.TOOLBOX;
    this.workspaceDir = projectDir + '/' + PREFIXES.GENERAL_WORKSPACE;
    this.dirs = [ projectDir, libraryDir, toolboxDir, workspaceDir];
  }
  /**
   * Creates the properly nested directory in which to save the project.
   */
  initProjectDirectory() {
    for (let dir in dirs) {
      if (!fs.existsSync(dirs[dir])) {
        fs.mkdir(dirs[dir]);
      }
    }
  }

  /**
   * Saves entire project to developer's file system.
   */
  saveProject() {
    // Check for viable save location.
    if (!this.storageLocation) {
      this.popupController = new SaveProjectPopupController(this);
      this.popupController.show();
    } else {
      // Create directory in which to save the project if none exists.
      // NOTE: This will be moved/functionalized
      this.initProjectDirectory();
      let data = Object.create(null);
      this.project.buildMetaData(data);
      let dataString = this.project.getDataString(data);
      fs.writeFileSync(
          this.storageLocation + '/' + this.project.name + '/' +  this.project.name,
            dataString);
    }
  }
}
