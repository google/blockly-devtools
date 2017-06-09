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
 * @fileoverview FileManagerController manages the UI for creating new blocks and
 * projects.
 *
 * @author celinechoo (Celine Choo)
 */
class NewBlockDialogController {
  /* @constructor */
  constructor(fileManagerName, blockLibraryController) {
    this.name = fileManagerName;
    this.view = new NewBlockDialogView();
    this.blockLibraryController = blockLibraryController;
  }

  /**
   * New window to create new block.
   *
   * @param {string} firstLoad Whether new block is the first block upon creating
   * a new project, or not.
   *
   * TODO(celinechoo): Make popup in a new window and not as an overlayed div.
   */
  showNewBlockDialog(firstLoad) {
    console.log("Beginning of BlockController, firstLoad: " + firstLoad);
    $('#popup').css('display', 'inline');

    // Checks for block name type duplicates.
    $('#block_name').change(() => {
      this.view.warnDuplicate(this.blockLibraryController);
    });

    $('#exit').click(() => {
      console.log("BlockController level, firstLoad BEFORE: " + firstLoad);
      if(firstLoad) {
        console.log("BlockController level, firstLoad: " + firstLoad);
        BlockFactory.showStarterBlock('input_statement', 'block1', 'block_type');
      }
      this.closeDialog();
      return;
    });

    $('#submit_block').click((event) => {
      // Gathers and renders blocks properly in devtools editor.
      event.preventDefault();
      this.closeDialog();

      var blockName = $('#block_name').val();
      var inputType = $('input[name="input_type"]:checked').val();
      var blockText = $('#block_text').val();

      BlockFactory.showStarterBlock(inputType, blockText, blockName);

      this.view.resetPopup();
    });
  }

  /**
   * Closes new block popup. Currently as a CSS function but will manually close
   * the dialog once the new block popup becomes a new window. (See: above TODO).
   */
  closeDialog() {
    $('#popup').css('display', 'none');
  }
}