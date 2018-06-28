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
 * @fileoverview NewBlockPopupView deals with the UI for creating new blocks.
 *
 * @author celinechoo (Celine Choo)
 */
class NewBlockPopupView extends NewResourcePopupView {
  /**
   * @constructor
   * @param {!NewBlockPopupController} controller NewBlockPopupController currently
   *     managing this view.
   */
  constructor(controller) {
    super(controller);

    /**
     * HTML contents of what is inside popup window. Does not include the popup
     * window itself.
     * @type {string}
     */
    this.htmlContents = `
<header>Create a New Block</header>
<form>
  Block name<span class="red">*</span><br>
    <input type="text" id="block_name" placeholder="block_type"></input>
    <span id="warning_text"></span><br><br>
  Library<span class="red">*</span><br>
    <select id="dropdown_libraryList"></select><br><br>
  Block type<span class="red">*</span><br>
    <input type="radio" name="input_type" value="input_statement" checked>statement input</input>
    <input type="radio" name="input_type" value="input_value">value input</input>
    <input type="radio" name="input_type" value="input_dummy">dummy input</input>
    <br><br>
  Starter text<br>
    <input type="text" id="block_text" placeholder="Optional"><br><br>
  <button type="submit" class="create" id="submit_block" style="float: right" disabled="disabled">Create Block</button>
</form>
<br>
<!-- TODO(#28): Replace with uneditable Blockly workspace -->
`;

    // Stores HTML to display new block popup.
    super.injectPopupContents(this.htmlContents);

    this.initListeners_();
  }

  /**
   * Sets up event listeners and handlers for components of this popup.
   * @private
   */
  initListeners_() {
    $('#exit').click(() => {
      Emitter(this);
      this.emit('exit');
    });

    $('#submit_block').unbind('click').click((event) => {
      // Gathers and renders blocks properly in devtools editor.
      event.preventDefault();

      this.blockName = $('#block_name').val();
      this.libraryName = $('#dropdown_libraryList').val();
      this.inputType = $('input[name="input_type"]:checked').val();
      this.blockText = $('#block_text').val();
      this.emit('submit', this);
    });
  }

  /**
   * Displays warning message for duplicate block type, only if there is a
   * duplicate.
   * @param {boolean} show Whether to show or hide the warning. True if show.
   * @param {string} warningMessage Message to present to user if warning
   *     is shown.
   */
  showWarning(show, warningMessage) {
    if (show) {
      $('#block_name').css('border', '1px solid red');
      $('#warning_text').html(warningMessage);
      this.setEnabled(true);
    } else {
      $('#block_name').css('border', '1px solid gray');
      $('#warning_text').html('');
      this.setEnabled(false);
    }
  }

  /**
   * Enables or disables submit button for creating a new block.
   * @param {boolean} ifEnable Whether to enable the submit button. Disables if
   *     false.
   */
  setEnabled(ifEnable) {
    if (ifEnable) {
      $('#submit_block').removeAttr('disabled');
    } else {
      $('#submit_block').attr('disabled', 'disabled');
    }
  }

  /**
   * Shows popup, then adds listeners specific to this popup.
   */
  show() {
    super.show();
    this.initListeners_();
  }
}
