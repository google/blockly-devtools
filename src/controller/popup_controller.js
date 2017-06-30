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
 * @fileoverview PopupController controls all popups. There can only be one popup
 * at a time.
 *
 * @authors sagev@google.com (Sage Vouse), celinechoo (Celine Choo)
 */

'use strict';

class PopupController {
  constructor(project) {
    /**
     * Project associated with current popup.
     * @type {!Project}
     */
    this.project = project;

    /**
     * Controller that is currently active. Default is null when no popup is
     * visible in application.
     * @type {!Object}
     */
    this.popup = null;
  }

  /**
   * Exits popup.
   */
  exit() {
    // TODO: Implement.
  }

  /**
   * Generates view, which creates popup for user.
   * @param {!}
   */
  setPopup(controller) {
    this.popup = controller;
  }
}
