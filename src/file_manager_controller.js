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
class FileManagerController {
  /* @constructor */
  constructor(fileManagerName, blockLibraryController) {
    // TODO(celinechoo): add constructor.
    this.name = fileManagerName;
    this.view = new FileManagerView();
    this.blockLibraryController = blockLibraryController;
  }

  /**
   * New window to create new block.
   *
   * @param {string} firstLoad Whether new block is the first block upon creating
   * a new project, or not.
   * @returns {boolean} True if successful.
   */
  newBlock(firstLoad) {
    $('#popup').css('display','inline');

    if(!firstLoad) {
      // Show exit button.
      $('#exit').css('display','inline');

      // Listener to close popup.
      $('#exit').click(function(){
        $('#popup').css('display','none');
      });
    }

    // Checks for block name type duplicates.
    $('#block_name').change(() => {
      this.view.checkDuplicates(this.blockLibraryController);
    });

    $('#submit_block').click((event) => {
      // Gathers and renders blocks properly in devtools editor.
      event.preventDefault();
      $('#popup').css('display','none');

      var blockName = $('#block_name').val();
      var inputType = $('input[name="input_type"]:checked').val();
      var blockText = $('#block_text').val();

      BlockFactory.showStarterBlock(inputType, blockText, blockName);

      this.resetPopup();
    });
  }
}