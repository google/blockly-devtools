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
  /**
   * Manages visual elements of new library popup.
   * @param {!NewLibraryPopupController} controller Controller which manages
   *     user interaction with popup.
   * @constructor
   */
  constructor(controller) {
    super(controller);
    super.injectPopupContents(NewLibraryPopupView.html);

    // Creates library.
    $('#button_createLibrary').click((event) => {
      event.preventDefault();

      this.controller.createLibraryIfValid();
    });

    // Resets warning on library name.
    $('#new_library_name').change(() => {
      $('#new_library_warning').html('');
    });
  }
}

/**
 * HTML to go within popup.
 * @type {string}
 */
NewLibraryPopupView.html = `
<header>New Library</header>
<form>
  <input type="text" id="new_library_name" placeholder="Library Name" value="MyLibrary"></input><br>
  <span id="new_library_warning" class="red"></span><br>
  <button class="create" id="button_createLibrary" style="float: right;">Create Library</button>

</form>
`;
