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
 * @fileoverview WorkspacePreviewView is the view of the preview workspace popup. This popup
 * is presented to the user when they want to test the combinations of their Blockly
 * elements in a complete workspace. Users can choose a Toolbox, WorkspaceContents,
 * and WorkspaceConfig and preview it as a Blockly.Workspace in this window, and
 * export it as a sample application if they like.
 *
 * @authors sagev@google.com (Sage Vouse), celinechoo (Celine Choo)
 */

'use strict';

goog.provide('WorkspacePreviewView');

class WorkspacePreviewView extends PopupView {
  constructor() {
    super();

    /**
     * HTML contents of what is inside popup window. Does not include the popup
     * window itself.
     * @type {string}
     */
    this.htmlContents = `
<div class="sample"></div>
`;

    super.injectPopupContents(this.htmlContents);
    // TODO: Show popup.

    // TODO: Set up event listener for when popup is exited.

    // TODO: Set up event listener for submitting information. Pass it on
    //       to project_controller.js to export.
  }
}
