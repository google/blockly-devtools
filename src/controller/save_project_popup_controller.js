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

goog.provide('SaveProjectPopupController');

goog.require('SaveProjectPopupView');
goog.require('PopupController');


/**
 * @fileoverview SaveProjectPopup manages app response to the UI for saving projects.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */
class SaveProjectPopupController extends PopupController {
  /**
   * @constructor
   * @param {!AppController} appController AppController for the session.
   * @param {ReadWriteController} readWriteController ReadWriteController for
   * the session, used to write files.
   */
  constructor(appController, readWriteController) {
    super(appController);

    /**
     * The ReadWriteController for the session, used to write files.
     * @type {!ReadWriteController}
     */
    this.readWriteController = readWriteController;

    /**
     * The popup view that this popup controller manages.
     * @type {!SaveProjectPopupView}
     */
    this.view = new SaveProjectPopupView(this);

    // Listeners in the popup
    Emitter(this.view);
    this.view.on('exit', () => {
      this.exit();
    });

    this.view.on('submit', () => {
      // Save location for each directory, or, if none chosen, set a default.
      for (let directory of Object.getOwnPropertyNames(DIRECTORIES)) {
        /*
         * Set locations for all properties of the DIRECTORIES class except for
         * prototype, which only remains because it cannot be deleted.
         */
        if (directory != 'prototype') {
          /*
           * The user has chosen a location, indicated by the existence of the
           * appropriate view variable (the name of this variable is the lower
           * case version of the matching DIRECTORIES attribute, which conveniently
           * shares a name with the matching DIRECTORY_LOCAL_STORAGE_TAG attribute).
           */
          if (this.view[directory.toLowerCase()]) {
            localStorage.setItem(DIRECTORY_LOCAL_STORAGE_TAGS[directory],
              this.view[directory.toLowerCase()]);
          } else {
          /*
           * No location has been chosen, leading to the creation of a default
           * directory of the same name as the local storage tag.
           */
            localStorage.setItem(DIRECTORY_LOCAL_STORAGE_TAGS[directory],
              DIRECTORY_LOCAL_STORAGE_TAGS[directory]);
          }
        }
      }
      // Save the project.
      this.readWriteController.writeDataFile(this.appController.project,
          DIRECTORIES.PROJECT);
      this.exit();
    });
  }

  /**
   * Generates view, which shows popup to user.
   */
  show() {
    this.view.show();
  }
}
