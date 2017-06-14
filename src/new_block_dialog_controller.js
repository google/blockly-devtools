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
 * @fileoverview NewBlockDialogController manages the UI for creating new blocks and
 * projects.
 *
 * @author celinechoo (Celine Choo)
 */
class NewBlockDialogController {
  constructor(dialogName, blockLibraryController) {
    this.name = dialogName;
    this.view = new NewBlockDialogView();
    this.blockLibraryController = blockLibraryController;

    $('#block_name').change(() => {
      this.checkDuplicate();
    });

    this.view.on('exit', () => {
      BlockFactory.showStarterBlock(this.view.inputType, this.view.blockText,
          this.view.blockName);
    });
  }

  /**
   * This shows a dialog to create a new block.
   *
   * @param {string} firstLoad Whether new block is the first block upon creating
   * a new project, or not.
   */
  showNewBlockDialog(firstLoad) {
    this.view.openDialog(firstLoad);
  }

  /**
   * Checks for duplicate block type. If user is trying to create a block under a type name
   * that already exists in the library, warn user.
   */
  checkDuplicate() {
    let hasDuplicate = this.blockLibraryController.has($("#block_name").val());
    this.view.showWarning(hasDuplicate);
  }
}
