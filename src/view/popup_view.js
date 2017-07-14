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

goog.provide('PopupView');

goog.require('PopupController');

/**
 * @fileoverview PopupView is an abstract interface from which any popups will
 * extend.
 *
 * @authors sagev@google.com (Sage Vouse), celinechoo (Celine Choo)
 */

class PopupView {
  /**
   * @constructor
   * @param {!PopupController} controller PopupController currently managing this
   *     view.
   */
  constructor(controller) {
    /**
     * PopupController that manages the currently open popup.
     * @type {!PopupController}
     */
    this.controller = controller;

    /**
     * Contents of the popup which will be presented.
     * @type {string}
     */
    this.htmlContents = `
<div class="bkg"></div>
<div class="box">
  <div id="exit">x</div>
</div>
`;
  }

  /**
   * Injects HTML content into a popup window template.
   *
   * @param {string} html HTML content to go inside of popup window.
   * @return {string} HTML of entire popup window.
   */
  injectPopupContents(html) {
    this.htmlContents = `
<div class="bkg"></div>
<div class="box">
  <div id="exit">x</div>
  ${html}
</div>
`;
    $('.popup').html(this.htmlContents);
    return this.htmlContents;
  }

  /**
   * Hides window of popup view.
   */
  hide() {
    $('.popup').html('');
    $('.popup').css('display', 'none');
  }

  /**
   * Shows window of popup view.
   */
  show() {
    $('.popup').css('display', 'inline');
  }
}
