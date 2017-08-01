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

/**
 * @fileoverview SaveProjectPopup deals with the UI for saving projects.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */
class SaveProjectPopupController extends PopupController {
  /**
   * @constructor
   * @param {AppController} appController AppController object which controls
   *     the application currently being used.
   */
  constructor(appController) {
    super(appController);

    /**
     * The popup view that this popup controller manages.
     * @type {!NewBlockPopupView}
     */
    this.view = new SaveProjectPopupView(this);

    // Listeners in the popup
    Emitter(this.view);
    this.view.on('exit', () => {
      this.exit();
    });

    const view = this.view;
    const blockEditorController = this.blockEditorController;
    this.view.on('submit', () => {
      this.appController.storageLocation = this.view.storageLocation;
      console.log('AY ' + this.appController.storageLocation);
      localStorage.setItem('devToolsProjectLocation', this.storageLocation);
      this.exit();
    });
  }

  /**
   * Checks for duplicate block type. If user is trying to create a block under a type name
   * that already exists in the library, warn user.
   */
  checkDuplicate() {
    const hasDuplicate = this.appController.project.hasBlockDefinition($('#block_name').val());
    this.view.showWarning(hasDuplicate);
  }

  /**
   * Sets and generates view, which shows popup to user.
   */
  show() {
    this.view.show();
  }
}