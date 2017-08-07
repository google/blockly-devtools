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
     * Filled in by this.makeProjectPopupContents().
     * @type {Array.<string>}
     */
    this.viewDivs = [];

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
      // Save location for each division, or, if none chosen, set a default.
      for (let div of this.viewDivs) {
          // The user has chosen a location, indicated by the existence of the
          // appropriate view variable (the name of this variable is the lower
          // case version of the matching directory map key.
          if (this.view[div]) {
            localStorage.setItem(div,this.view[div]);
            this.readWriteController.directoryMap.set(div, this.view[div]);
          } else {
            // No location has been chosen, so default to the same directory as
            // the project.
            const projectDiv =
                this.readWriteController.getDivName(this.appController.project);
            const projectLocation =
                this.readWriteController.directoryMap.get(projectDiv)
            localStorage.setItem(div, projectLocation);
             this.readWriteController.directoryMap.set(div, projectLocation);
          }
      }
      // Save the project.
      this.readWriteController.writeAllFiles();
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
    let divName = this.readWriteController.getDivName(this.appController.project);
    let htmlContents = `
<header align="center">Choose File Locations</header>
    <h3>Project<span class="red">*</span></h3>
      <input type="file" nwdirectory id=
`;
    htmlContents = htmlContents + divName + '></input>' +
      '<span id="warning_text"></span><br><br>' +
          '<h3>Project Resources </h3><span>(default location is in the same ' +
            'directory as the project)</span><div id="projectResources">';
    this.viewDivs.push(divName);
    let object = Object.create(null);
    this.appController.project.buildMetadata(object);
    for (let resource of object.resources) {
      divName = this.readWriteController.getDivName(resource);
      this.viewDivs.push(divName);
      htmlContents = htmlContents +  resource.name +
          '<input type="file" nwdirectory id=' + '\"' + divName + '"></input><br><br>';
    }
    htmlContents = htmlContents + '</div><br><br>' +
        '<input type="button" value="Submit" id="submit">';
    return htmlContents;
  }
}
