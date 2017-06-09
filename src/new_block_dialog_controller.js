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

/**
 * @fileoverview NewBlockDialogrController manages the UI for creating new blocks and
 * projects.
 *
 * @author celinechoo (Celine Choo)
 */
class NewBlockDialogController {
  constructor(dialogName, blockLibraryController) {
    // TODO(celinechoo): add constructor.
    this.name = dialogName;
    this.view = new NewBlockDialogView();
    this.blockLibraryController = blockLibraryController;
  }

  /**
   * This shows a dialog to create a new block.
   *
   * @param {string} firstLoad Whether new block is the first block upon creating
   * a new project, or not.
   */
  showNewBlockDialog(firstLoad) {
    // TODO(celinechoo): Fix bug regarding new blocks on !firstLoad. Will remove
    // logs once this bug is fixed.
    // console.log("Beginning of BlockController, firstLoad: " + firstLoad);
    this.view.openDialog();

    // Checks for block name type duplicates.
    this.view.warnDuplicate(this.blockLibraryController);

    // Closes dialog after user input.
    this.view.closeDialog(firstLoad);
  }
}
