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
 * @fileoverview NewBlockPopupView deals with the UI for creating new blocks and
 * projects.
 *
 * @author celinechoo (Celine Choo)
 */
class NewBlockPopupView extends PopupView {
  constructor() {
    super();

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
    <span id="warning_text">This block already exists!</span><br><br>
  Block type<span class="red">*</span><br>
    <input type="radio" name="input_type" value="input_statement" checked>statement input</input>
    <input type="radio" name="input_type" value="input_value">value input</input>
    <input type="radio" name="input_type" value="input_dummy">dummy input</input>
    <br><br>
  Starter text<br>
    <input type="text" id="block_text" placeholder="Optional"><br><br>
  <button type="submit" id="submit_block">Start Blockly</button>
</form>
<br>
<hr>
<!-- TODO(#28): Replace with uneditable Blockly workspace -->
<h3>Examples</h3>
Statement input:<br>
<img src="media/input_statement.png" width="30%" height="auto"/><br>
Value input:<br>
<img src="media/input_value.png" width="30%" height="auto"/><br>
Dummy input:<br>
<img src="media/input_dummy.png" width="30%" height="auto"/><br>
`;

    super.injectPopupContents(this.htmlContents);

    // TODO: Insert HTML contents into page, make visible.
  }

  // TODO: Add functions.
}
