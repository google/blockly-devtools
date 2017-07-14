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

goog.provide('PopupController');

goog.require('ProjectController');

class PopupController {
  constructor(projectController) {
    /**
     * ProjectController associated with currently edited project. Used to make
     * changes to project from information from popup.
     * @type {!ProjectController}
     */
    this.projectController = projectController;

    /**
     * Popup view that is currently visible in application. Default is null when
     * no popup is open. Either null, PreviewView, NewBlockPopupView, or NewConfigView.
     * @type {!Object}
     */
    this.view = null;
  }

  /**
   * One of three possible popup types. Constant used in parameters for specifying
   * between popups. Preview popup is the popup of a developer's sample application
   * before export.
   * @return {!string}
   */
  static get PREVIEW() {
    return 'PREVIEW';
  }

  /**
   * One of three possible popup types. Constant used in parameters for specifying
   * between popups. The New Block popup allows developers to initialize their
   * block before going right into the Block Editor.
   * @return {!string}
   */
  static get NEW_BLOCK() {
    return 'NEW_BLOCK';
  }

  /**
   * One of three possible popup types. Constant used in parameters for specifying
   * between popups. The new config popup allows developers to click through
   * a checkbox to configure their WorkspaceConfiguration.
   * @return {!string}
   */
  static get NEW_CONFIG() {
    return 'NEW_CONFIG';
  }

  /**
   * Exits popup. Resets view to be null.
   */
  exit() {
    // TODO: Implement.
  }

  /**
   * Sets and generates view, which shows popup to user.
   * @param {string} popupMode Mode of popup which will be generated.
   */
  show(popupMode) {
    if (popupMode === PopupController.NEW_BLOCK) {
      this.view = new NewBlockPopupView(this.projectController.project);
      this.view.show();
    } else if (popupMode === PopupController.PREVIEW) {
      // TODO: Preview popup view
    } else if (popupMode === PopupController.NEW_CONFIG) {
      // TODO: New config popup view
    } else {
      throw new Error('Popup type ' + popupMode + ' not found.');
    }
  }
}
