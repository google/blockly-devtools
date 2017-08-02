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

goog.provide('NewProjectPopupController');

goog.require('PopupController');

/**
 * @fileoverview NewProjectPopupController manages the UI for creating new
 * projects.
 */
class NewProjectPopupController extends PopupController {
  /**
   * Manages popup which allows users to create or open new projects.
   * @param {!AppController} appController Controller which manages application
   *     and makes proper changes after the user interacts with popup.
   */
  constructor(appController) {
    super(appController);

    /**
     * View portion of new project popup.
     * @type {!NewProjectPopupView}
     */
    this.view = new NewProjectPopupView(this);
  }
}
