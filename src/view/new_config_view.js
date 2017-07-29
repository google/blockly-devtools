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

  goog.provide('NewConfigView');

  goog.require('NewResourcePopupView');

/**
 * @fileoverview NewConfigView manages the UI for creating new WorkspaceConfigs.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */

class NewConfigView extends NewResourcePopupView {
  constructor() {
    super();

    /**
     * HTML contents of what is inside popup window. Does not include the popup
     * window itself.
     * @type {string}
     */
    this.htmlContents = `
<div id="sample"></div>
`;

    super.injectPopupContents(this.htmlContents);

    // TODO: Insert HTML contents into page, make visible.
  }

  // TODO: Add functions.
}
