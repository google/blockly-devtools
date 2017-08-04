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
   * @param {Array.<Object>} toWrite Array of project elements to be written.
   */
  constructor(appController, readWriteController, toWrite) {
    super(appController);

    /**
     * The ReadWriteController for the session, used to write files.
     * @type {!ReadWriteController}
     */
    this.readWriteController = readWriteController;

    /**
     * Array of project elements to be written.
     * @type {Array.<Object>}
     */
    this.toWrite = toWrite;

    /**
     * List of html divisions in the view, used to assign variables to the view
     * and update the ReadWriteController's directory map with the appropriate
     * keys.
     * @type {}
     */
    const viewContents = this.makeProjectPopupContents();

    /**
     * The popup view that this popup controller manages.
     * @type {!SaveProjectPopupView}
     */
    this.view = new SaveProjectPopupView(this, this.viewDivs, viewContents);

    // Listeners in the popup
    Emitter(this.view);
    this.view.on('exit', () => {
      this.exit();
    });

    this.view.on('submit', () => {
      // Save location for each directory, or, if none chosen, set a default.
      for (let directoryKey of this.readWriteController.directoryMap.keys()) {
          // The user has chosen a location, indicated by the existence of the
          // appropriate view variable (the name of this variable is the lower
          // case version of the matching directory map key.
          if (this.view[directoryKey.toLowerCase()]) {
            localStorage.setItem(directoryKey,
                this.view[directoryKey.toLowerCase()]);
          } else {
            // No location has been chosen, leading to the creation of a default
            // directory of the same name as the local storage tag under the
            // directory specified for the project.
            localStorage.setItem(directoryKey,
                this.readWriteController.directoryMap.get(PREFIXES.PROJECT) +
                  directoryKey);
          }
      }
      // Save the project.
      this.readWriteController.writeDataFile(this.appController.project,
          PREFIXES.PROJECT);
      this.exit();
    });
  }

  /**
   * Generates view, which shows popup to user.
   */
  show() {
    this.view.show();
  }

  /**
   * Creates the html contents for the project saving popup, based upon the
   * resources currently in the project.
   * @return {string} The html contents for the project saving popup.
   */
  makeProjectPopupContents() {
    let htmlContents = `
<header>Choose Project File Locations</header>
  <form>
    Project<span class="red">*</span>
      <input type="file" nwdirectory id="projectDirectory"></input><br><br>
`;
    let object = Object.create(null);
    this.appController.project.buildMetadata(object);
    for (let resource of object.resources) {
      this.viewDivs.push(resource.name + 'Directory');
      htmlContents = htmlContents + resource.name +
        '<input type="file" nwdirectory id=' + '\"' + resource.name +
          'Directory"></input><br><br>';
    }
    htmlContents = htmlContents +
      '<input type="button" value="Submit" id="submit"></form>';
    return htmlContents;
  }
}
