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

    this.updateLibraryDropdown();

    // Listeners in the popup
    Emitter(this.view);
    this.view.on('exit', () => {
      // If there are no blocks in any library
      const project = this.appController.project;
      const noBlocks = project.getBlockTypes().length == 0;
      if (noBlocks) {
        // Creates empty starter block.
        const starterXml = FactoryUtils.buildBlockEditorStarterXml(
            '', '', 'My First Block');
        this.blockEditorController.view.showStarterBlock(starterXml);
      }
      this.exit();
    });

    const view = this.view;
    const blockEditorController = this.blockEditorController;
    this.view.on('submit', () => {
      blockEditorController.createNewBlock(
          view.inputType, view.blockName, view.libraryName, view.blockText);
      this.exit();
    });

    $('#block_name').change(() => {
      this.checkDuplicate();
    });
  }

  /**
   * Checks for duplicate block type. If user is trying to create a block under a type name
   * that already exists in the library, warn user.
   */
  checkDuplicate() {
    const hasDuplicate = this.appController.project.hasBlockDefinition($('#block_name').val());
    this.view.showWarning(hasDuplicate);
  }

  /**
   * Sets and generates view, which shows popup to user.
   */
  show() {
    this.view.show();
  }

  /**
   *
   */
  updateLibraryDropdown() {
    const libList = this.appController.projectController.getProject().getBlockLibraryNames();
    for (let libName of libList) {
      $('#dropdown_libraryList').append(
        $('<option></option>').val(libName).html(libName));
    }
  }
}
