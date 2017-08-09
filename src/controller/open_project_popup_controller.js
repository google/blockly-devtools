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

goog.provide('OpenProjectPopupController');

goog.require('OpenProjectPopupView');
goog.require('PopupController');

/**
 * @fileoverview OpenProjectPopupController manages app response to the UI
 * for opening a project.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */
class OpenProjectPopupController extends PopupController {
  /**
   * @constructor
   * @param {!AppController} appController AppController for the session.
   * @param {ReadWriteController} readWriteController ReadWriteController for
   *    the session, used to read files.
   */
  constructor(appController, readWriteController) {
    super(appController);

    /**
     * The ReadWriteController for the session, used to read files.
     * @type {!ReadWriteController}
     */
    this.readWriteController = readWriteController;


    const viewContents = this.makeImportPopupContents();

    /**
     * The popup view that this popup controller manages.
     * @type {!OpenProjectPopupView}
     */
    this.view = new OpenProjectPopupView(this, viewContents);

    // Listeners in the popup
    Emitter(this.view);
    this.view.on('exit', () => {
      this.exit();
    });

    this.view.on('submit', () => {
      this.readWriteController.constructProject(this.view.importLocation, 'web');
    });
  }

  /**
   * Generates view, which shows popup to user.
   */
  show() {
    this.view.show();
  }

  /**
   * Returns the html contents for the import popup.
   * @return {string} The html contents for the import popup.
   */
  makeImportPopupContents() {
    let htmlContents = `
<header align="center">Choose a Project File to Open</header>
      <input type="file"  id="location"></input>
      <span id="warning_text">Please select a file.</span><br><br>
      <input type="button" value="Submit" id="submit">
`;
    return htmlContents;
  }
}
