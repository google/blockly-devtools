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

/**
 * @fileoverview FileManagerView deals with the UI for creating new blocks and
 * projects.
 *
 * @author celinechoo (Celine Choo)
 */

'use strict';

/* FileManagerView class. */
class NewBlockDialogView {
  /* @constructor */
  constructor() {
    // TODO(celinechoo): Complete FileManagerView constructor.
    // For now, nothing is necessary here.
  }

  /**
   * Checks if user is trying to create a block under a name that is
   * already taken. Shows error and disables submit if taken.
   */
  warnDuplicate(blockLibraryController) {
    if(blockLibraryController.has($("#block_name").val())) {
      $("#block_name").css('border','1px solid red');
      $('#warning_text').css('display', 'inline');
      $('#submit_block').attr('disabled','disabled');
    } else {
      $("#block_name").css('border', '1px solid gray');
      $('#warning_text').css('display', 'none');
      $('#submit_block').removeAttr('disabled');
    }
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