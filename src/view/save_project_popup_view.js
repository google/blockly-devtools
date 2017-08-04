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

goog.provide('SaveProjectPopupView');

goog.require('PopupView');

/**
 * @fileoverview SaveProjectPopup deals with the UI for saving projects.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */
class SaveProjectPopupView extends PopupView {
  /**
   * @constructor
   * @param {!NewBlockPopupController} controller NewBlockPopupController currently
   *     managing this view.
   * @param {Array.<string>} List of html division tags.
   * @param {string} htmlContents The html contents of the popup, based on the
   *     current project.
   */
  constructor(controller, divList, htmlContents) {
    super(controller);

    /**
     * List of division tags, for variable assignment.
     * @type {Array.<string>}
     */
    this.divList = divList;

    /**
     * HTML contents of what is inside popup window. Does not include the popup
     * window itself.
     * @type {string}
     */
    this.htmlContents = htmlContents;

    // Stores HTML to display new block popup.
    super.injectPopupContents(this.htmlContents);

    this.initListeners_();

    /**
     * Path to location to store the project.
     * @type {string}
     */
    this.storageLocation;
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
    $('#submit').click(() => {
      this.assignVariables();
      this.hide();
      this.emit('submit');
    });
  }

  /**
   * Assings the values of all html divisions to variables of the same name.
   */
  assignVariables() {
    for (let division of this.divList) {
      this[division] = $("\'#" + division + "\'").val();
    }
  }
}
