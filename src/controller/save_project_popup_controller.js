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
   * @param {AppController} appController AppController for the session.
   */
  constructor(appController) {
    super(appController);

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

    const view = this.view;
    const blockEditorController = this.blockEditorController;
    this.view.on('submit', () => {
      this.appController.storageLocation = this.view.storageLocation;
      localStorage.setItem('devToolsProjectLocation', this.appController.storageLocation);
      // NOTE: This will be moved/functionalized
      this.appController.initProjectDirectory();
      let data = Object.create(null);
      this.appController.project.buildMetaData(data);
      let dataString = this.appController.project.getDataString(data);
      fs.writeFileSync(
          this.appController.storageLocation + '/' + this.appController.project.name +
            '/' +  this.appController.project.name, dataString);
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
