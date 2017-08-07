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

goog.provide('NewBlockPopupController');

goog.require('BlockEditorController');
goog.require('PopupController');

/**
 * @fileoverview NewBlockPopupController manages the UI for creating new blocks and
 * projects.
 *
 * @author celinechoo (Celine Choo)
 */
class NewBlockPopupController extends PopupController {
  /**
   * @constructor
   * @param {AppController} appController AppController object which controls
   *     the application currently being used.
   */
  constructor(appController) {
    super(appController);

    /**
     * Block Editor Controller that will dictate changes to application in response
     * to user input in the new block popup.
     * @type {!BlockEditorController}
     */
    this.blockEditorController = appController.editorController.blockEditorController;

    /**
     * The popup view that this popup controller manages.
     * @type {!NewBlockPopupView}
     */
    this.view = new NewBlockPopupView(this);

    // Updates library dropdown to populate with user-created block libraries.
    this.updateLibraryDropdown();

    // Listeners in the popup
    Emitter(this.view);
    this.view.on('exit', () => {
      this.exit();
    });

    const view = this.view;
    const blockEditorController = this.blockEditorController;
    this.view.on('submit', () => {
      blockEditorController.createNewBlock(
          view.inputType, view.blockName, view.libraryName, view.blockText);
      this.exit();
    });

    $('#block_name').on('input', () => {
      this.checkValid();
    });
  }

  /**
   * Checks if user-inputted block type is valid. Checks if block name given by
   * user is empty, is a duplicate, or if it is the default block name,
   * 'block_type'. Gives user proper warning if the block name is not valid.
   */
  checkValid() {
    const input = $('#block_name').val().trim();
    const isDuplicate = this.appController.project.hasBlockDefinition(input);
    const isEmpty = !input;
    const isDefault = input == 'block_type';
    if (isEmpty) {
      this.view.showWarning(false);
      this.view.setEnable(false);
    } else if (isDuplicate) {
      this.view.showWarning(isDuplicate, `This block name is already taken in
          this project.`);
    } else if (isDefault) {
      this.view.showWarning(isDefault, `Please enter something other than <i>block_type</i>.
          No block can be named the default block name.`);
    } else {
      this.view.showWarning(false);
      this.view.setEnable(true);
    }
  }

  /**
   * Sets and generates view, which shows popup to user.
   */
  show() {
    this.view.show();
  }

  /**
   * Updates dropdown options for library to populate with user-created block
   * libraries.
   */
  updateLibraryDropdown() {
    const libList = this.appController.projectController.getProject().getBlockLibraryNames();
    for (let libName of libList) {
      $('#dropdown_libraryList').append(
        $('<option></option>').val(libName).html(libName));
    }
  }
}
