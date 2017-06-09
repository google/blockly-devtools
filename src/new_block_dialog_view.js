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

var Emitter = require('component-emitter');

/**
 * @fileoverview NewBlockDialogView deals with the UI for creating new blocks and
 * projects.
 *
 * @author celinechoo (Celine Choo)
 */
class NewBlockDialogView {
  constructor() {
    this.firstLoad = true;
    this.blockName = 'block_type';
    this.inputType = 'input_statement';
    this.blockText = 'MY_BLOCK';
    Emitter(NewBlockDialogView.prototype);

    $('#exit').click(() => {
      if (this.firstLoad) {
        BlockFactory.showStarterBlock(this.inputType, this.blockText, this.blockName);
      }
      this.closeDialog();
    });

    $('#submit_block').click((event) => {
      // Gathers and renders blocks properly in devtools editor.
      event.preventDefault();

      this.blockName = $('#block_name').val();
      this.inputType = $('input[name="input_type"]:checked').val();
      this.blockText = $('#block_text').val();

      this.emit('exit', this);

      this.closeDialog();
    });
  }

  /**
   * Opens new block dialog popup.
   * @param {boolean} firstLoad Whether dialog is opening upon the first launch
   * of the application.
   */
  openDialog(firstLoad) {
    this.firstLoad = firstLoad;
    $('#popup').css('display', 'inline');
  }

  /**
   * Closes new block popup, resets fields in form.
   */
  closeDialog() {
    $('#popup').css('display', 'none');
    this.resetPopup();
  }

  /**
   * Displays warning message for duplicate block type.
   */
  showWarning() {
    $('#block_name').css('border', '1px solid red');
    $('#warning_text').css('display', 'inline');
    $('#submit_block').attr('disabled','disabled');
  }

  /**
   * Hides warning message for duplicate block type.
   */
  hideWarning() {
    $('#block_name').css('border', '1px solid gray');
    $('#warning_text').css('display', 'none');
    $('#submit_block').removeAttr('disabled');
  }

  /**
   * Resets popup form fields to be empty upon creating another block.
   */
  resetPopup() {
    $('#block_name').val('');
    $('#block_text').val('');
    $('input[name="input_type"]').attr('checked','checked');

    this.blockName = 'block_type';
    this.inputType = 'input_statement';
    this.blockText = 'MY_BLOCK';

    this.hideWarning();
  };
}
