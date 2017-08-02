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

goog.require('PopupController');

/**
 * @fileoverview NewLibraryPopupView deals with the UI for creating new libraries.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */
class NewLibraryPopupController extends PopupController {
  constructor(appController) {
    super(appController);

    this.view = new NewLibraryPopupView(this);
  }

  /**
   * Creates library object and adds to current project if the given library
   * name is valid.
   */
  createLibraryIfValid() {
    const libName = FactoryUtils.cleanResourceName($('#new_library_name').val());
    const projectController = this.appController.projectController;
    if (libName.trim() && !projectController.getProject().getBlockLibrary(libName)) {
      projectController.createBlockLibrary(libName);
      this.exit();
    } else {
      // If library name is empty, give warning.
      $('#new_library_warning').html('Please enter a valid library name.');
    }
  }
}
