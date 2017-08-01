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
 * @fileoverview NewLibraryPopupView deals with the UI for creating new projects.
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
    // TODO: Implement
    super(controller);
    super.injectPopupContents(NewProjectPopupView.html);
    this.init();
  }

  init() {

    $('#new_project').click((event) => {
      this.newProject(event);
    });
  }

  newProject(event) {
    event.preventDefault();
    super.injectPopupContents(NewProjectPopupView.html2);

    $('#sample_block').click((event) => {
      console.log($('#input_library').val());
      this.controller.appController.projectController.createBlockLibrary($('#input_library').val());
      console.log(this.controller.appController.projectController.getProject());
      this.newBlock(event);
    });
  }

  newBlock(event) {
    event.preventDefault();
    this.controller.appController.createPopup(PopupController.NEW_BLOCK);
  }
}

NewProjectPopupView.html = `
<header>Blockly Developer Tools</header>
<form>
<span style="float:right;">
<button>Open a pre-existing project</button>
<button class="create" id="new_project">Create new project</button>
</span>
</form>
`;

NewProjectPopupView.html2 = `
<header>New Project</header>
<form>
  Project name<span class="red">*</span><br>
    <input type="text" id="block_name" value="MyProject" placeholder="MyProject" style="width:100%"></input><br><br>
  Library name<span class="red">*</span><br>
    <input type="text" id="input_library" value="MyLibrary" placeholder="MyLibrary"></input>
    <span id="no_library_warning">No library by that name exists.</span><br><br>
  <button>Back</button>
  <span style="float: right;">
  <button type="submit">Configure First Block</button>
  <button type="submit" id="sample_block" class="create">Start with Sample Block</button>
  </span>
</form>
`;