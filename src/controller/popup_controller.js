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
  constructor(projectController) {
    /**
     * ProjectController associated with currently edited project. Used to make
     * changes to project from information from popup.
     * @type {!ProjectController}
     */
    this.projectController = projectController;

    /**
     * Controller that is currently active. Default is 'NONE' when no popup is
     * visible in application.
     * @type {!Object}
     */
    this.active = 'NONE';

    /**
     * Possible popup types. Constants used in parameters for passing in which
     * popup is active.
     * @type {!Object.<string, string>}
     */
    this.MODE = {
      PREVIEW: 'PREVIEW',
      NEW_BLOCK: 'NEW_BLOCK',
      NEW_CONFIG: 'NEW_CONFIG'
    };

    /**
     * Popup view that is currently visible in application. Default is null when
     * no popup is open.
     * @type {!Object}
     */
    this.view = null;
  }

  /**
   * Exits popup.
   */
  exit() {
    // TODO: Implement.
  }

  /**
   * Generates view, which creates popup for user.
   * @param {string} popupMode Mode of popup which will be generated.
   */
  setPopup(popupMode) {
    if (popupMode == this.popupController.MODE.NEW_BLOCK) {
      // TODO: New Block Popup view
    } else if (popupMode == this.popupController.MODE.PREVIEW) {
      // TODO: Preview popup view
    } else if (popupMode == this.popupController.MODE.NEW_CONFIG) {
      // TODO: New config popup view
    } else {
      throw new Error('Popup type not found.');
    }
  }


}
