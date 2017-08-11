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

goog.provide('NewProjectPopupView');

goog.require('NewResourcePopupView');

/**
 * @fileoverview NewProjectPopupView deals with the UI for creating new projects.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */
class NewProjectPopupView extends NewResourcePopupView {
  /**
   * View portion of new project popup.
   * @param {!NewProjectPopupController} controller Controller object which
   *     manages the new project popup and the information passed on to the rest
   *     of the application.
   * @constructor
   */
  constructor(controller) {
    super(controller);

    /**
     * Determines whether to allow user to exit the popup. When loading the app
     * for the first time, the user must choose between opening or starting a new
     * project.
     * @type {boolean}
     */
    this.allowExit = false;

    $('#modalShadow').show();
    $('#modalShadow').click(() => {
      if (this.allowExit) {
        controller.exit();
      } else {
        $('#modalShadow').show();
      }
    });

    // Generate popup to let user choose between opening and creating new project.
    this.projectOptions();
  }

  /**
   * Manages popup which allows user to open or create a project.
   */
  projectOptions() {
    super.injectPopupContents(NewProjectPopupView.openOrCreate);

    $('#new_project').click((event) => {
      event.preventDefault();
      this.newProject();
    });
    $('#open_project').click((event) => {
      event.preventDefault();
      this.controller.appController.openProject();
    });
  }

  /**
   * Manages popup which allows user to enter a new project name.
   */
  newProject() {
    super.injectPopupContents(NewProjectPopupView.newProjectName);

    $('#button_newLibrary').click((event) => {
      event.preventDefault();
      const projName = FactoryUtils.cleanResourceName($('#new_project_name').val());

      this.controller.appController.initProject(projName);
      this.controller.appController.createPopup(PopupController.NEW_LIBRARY);
      this.controller.appController.clearAll();
    });

    $('#project_back').click((event) => {
      event.preventDefault();
      this.projectOptions();
    });
  }
}

/**
 * HTML for popup from which users either create or open a project.
 * @type {string}
 */
NewProjectPopupView.openOrCreate = `
<header>Blockly Developer Tools</header>
<form>
<span style="float:right;">
<button id="open_project">Open a pre-existing project</button>
<button class="create" id="new_project">Create new project</button>
</span>
</form>
`;

/**
 * HTML for popup from which users name their new project.
 * @type {string}
 */
NewProjectPopupView.newProjectName = `
<header>New Project</header>
<form>
  Project name<br>
  <input type="text" id="new_project_name" value="MyProject" placeholder="MyProject" style="width:100%"></input><br><br>
  <span style="float: right;">
  <button id="project_back">Back</button>
  <button type="submit" id="button_newLibrary" class="action">Next</button>
  </span>
</form>
`;
