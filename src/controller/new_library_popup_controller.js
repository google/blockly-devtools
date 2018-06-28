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

goog.provide('NewLibraryPopupController');

/**
 * @fileoverview NewLibraryPopupController manages the UI for creating new libraries.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */
class NewLibraryPopupController extends PopupController {
  /**
   * Manages popup for creating a new library.
   * @param {!AppController} appController Controller which manages application
   *     and reflects changes after user interacts with this popup.
   * @param {boolean=} opt_newBlock Whether to generate new block popup after
   *     user successfully creates a new library.
   */
  constructor(appController, opt_newBlock) {
    super(appController);

    /**
     * Manages view part of new library popup.
     * @type {!NewLibraryPopupView}
     */
    this.view = new NewLibraryPopupView(this);

    /**
     * Whether to generate new block popup after creating a new library.
     * @type {boolean}
     */
    this.newBlock = opt_newBlock || false;
  }

  /**
   * Creates library object and adds to current project if the given library
   * name is valid.
   */
  createLibraryIfValid() {
    const libName = FactoryUtils.cleanResourceName($('#new_library_name').val());
    const projectController = this.appController.projectController;
    if (!libName.trim()) {
      // If library name is empty, give warning.
      $('#new_library_warning').html('Please enter a valid library name.');
      return;
    } else if (projectController.getProject().getBlockLibrary(libName)) {
      // If library name already exists.
      $('#new_library_warning').html('This library name already exists.');
      return;
    } else {
      projectController.createBlockLibrary(libName);
    }

    if (this.newBlock) {
      this.appController.createPopup(PopupController.NEW_BLOCK);
    } else {
      this.exit();
    }
  }
}
