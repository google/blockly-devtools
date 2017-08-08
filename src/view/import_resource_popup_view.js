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
 * @fileoverview ImportFilePopupView deals with the UI for importing resources
 * from data files.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */
class ImportResourcePopupView extends PopupView {
  /**
   * @constructor
   * @param {!NewBlockPopupController} controller NewBlockPopupController currently
   *     managing this view.
   * @param {Array.<string>} divIdList List of html division ids.
   * @param {string} htmlContents The html contents of the popup, based on the
   *     current project.
   */
  constructor(controller, htmlContents) {
    super(controller);

    /**
     * HTML contents of what is inside popup window. Does not include the popup
     * window itself.
     * @type {string}
     */
    this.htmlContents = htmlContents;

    // Stores HTML to display popup.
    super.injectPopupContents(this.htmlContents);

    this.showWarning(false);

    this.initListeners_();

    /**
     * Path to resource data.
     * @type {string}
     */
    this.importLocation;
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
      const location = $('#location').val();
      if(location) {
        this.importLocation = location;
        this.hide();
        this.emit('submit');
      } else {
        this.showWarning(true);
      }
    });
  }

  /**
   * Displays warning message for missing project directory selection.
   * @param {boolean} show Whether to show or hide the warning. True if show.
   */
  showWarning(show) {
    if (show) {
      $('#warning_text').css('display', 'block');
    } else {
      $('#warning_text').css('display', 'none');
    }
  }
}
