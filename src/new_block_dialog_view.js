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
 * @fileoverview NewBlockDialogView deals with the UI for creating new blocks and
 * projects.
 *
 * @author celinechoo (Celine Choo)
 */
class NewBlockDialogView {
  constructor() { }

  /**
   * Opens new block dialog popup.
   */
  openDialog() {
    $('#popup').css('display', 'inline');
  }

  /**
   * Closes new block popup after user input (either submit or close).
   */
  closeDialog(firstLoad) {
    $('#exit').click(() => {
      // See above TODO for note about logs.
      // console.log("BlockController level, firstLoad BEFORE: " + firstLoad);
      if (firstLoad) {
        // console.log("BlockController level, firstLoad: " + firstLoad);
        BlockFactory.showStarterBlock('input_statement', 'block1', 'block_type');
      }
      $('#popup').css('display', 'none');
    });

    $('#submit_block').click((event) => {
      // Gathers and renders blocks properly in devtools editor.
      event.preventDefault();
      $('#popup').css('display', 'none');

      var blockName = $('#block_name').val();
      var inputType = $('input[name="input_type"]:checked').val();
      var blockText = $('#block_text').val();

      BlockFactory.showStarterBlock(inputType, blockText, blockName);
    });
  }

  /**
   * Checks if user is trying to create a block under a name that is
   * already taken. Shows error and disables submit if taken.
   */
  warnDuplicate(blockLibraryController) {
    $('#block_name').change(() => {
      if(blockLibraryController.has($("#block_name").val())) {
        $("#block_name").css('border','1px solid red');
        $('#warning_text').css('display', 'inline');
        $('#submit_block').attr('disabled','disabled');
      } else {
        $("#block_name").css('border', '1px solid gray');
        $('#warning_text').css('display', 'none');
        $('#submit_block').removeAttr('disabled');
      }
    });
  }

  /**
   * Resets popup form fields to be empty upon creating another block.
   */
  resetPopup() {
    $('#block_name').val('');
    $('#block_text').val('');
    $('input[name="input_type"]').attr('checked','checked');
  };
}
