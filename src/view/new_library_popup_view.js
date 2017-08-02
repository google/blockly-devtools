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

goog.provide('NewLibraryPopupView');

goog.require('NewResourcePopupView');

/**
 * @fileoverview NewLibraryPopupView deals with the UI for creating new libraries.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */
class NewLibraryPopupView extends NewResourcePopupView {
  constructor(controller) {
    super(controller);
    super.injectPopupContents(NewLibraryPopupView.html);

    $('#button_createLibrary').click((event) => {
      event.preventDefault();

      this.createLibraryIfValid(false);
    });

    $('#new_library_name').change(() => {
      $('#new_library_warning').html('');
    });
  }

  createLibraryIfValid(ifSample) {
    const libName = FactoryUtils.cleanResourceName($('#new_library_name').val());
    if (libName.trim()) {
      this.controller.appController.projectController.createBlockLibrary(libName);
      this.controller.exit();
    } else {
      $('#new_library_warning').html('Please enter a valid library name.');
    }
  }

  newBlock() {
  }
}

NewLibraryPopupView.html = `
<header>New Library</header>
<form>
  <input type="text" id="new_library_name" placeholder="Library Name" value="MyLibrary"></input><br>
  <span id="new_library_warning" class="red"></span><br>
  <button class="create" id="button_createLibrary" style="float: right;">Create Library</button>

</form>
`;
