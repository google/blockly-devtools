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
 * @fileoverview AppController controls all parts of the application by creating
 * sub-controllers (ProjectController, WorkspaceController) which individually
 * control specific parts of application. AppController is the central part of
 * DevTools which initializes all other parts of the application.
 *
 * @authors sagev@google.com (Sage Vouse), celinechoo (Celine Choo)
 */

'use strict';

// TODO(#44): Rename to AppController once refactor is finished. Temporarily named
// to AppController2 to avoid overlapping namespaces with current AppController,
// which will be refactored into this (and other) files.
class AppController2 {
  constructor() {
    /**
     * Stores currently loaded project that user will edit.
     * @type {!Project}
     */
    this.project = new Project('');

    /**
     * ProjectController object associated with application.
     * @type {!ProjectController}
     */
    this.projectController = new ProjectController(this.project);

    /**
     * EditorController object which encapsulates all editor controllers
     * @type {!EditorController}
     */
    this.editorController = new EditorController(this.project);

    /**
     * PopupController object which controls any popups that may appear throughout
     * the course of using DevTools.
     * @type {!PopupController}
     */
    this.popupController = new PopupController(this.projectController);
  }

  /**
   * Prompts user to either open a preexisting project or create a new project.
   */
  openProject() {
    // TODO: Implement.
  }

  /**
   * Top-level function which is first called in order to save a project to
   * developer's file system.
   */
  saveProject() {
    // TODO: Implement.
  }

  /**
   * Top-level function which is first called in order to create a sample
   * Blockly application with user-defined workspace, toolbox, and blocks.
   */
  createSampleApplication() {
    // TODO: Implement.
  }

  /**
   * Generates popup. Param must be either this.popupController.MODE.PREVIEW,
   * this.popupController.MODE.NEW_BLOCK, or this.popupController.MODE,NEW_CONFIG.
   *
   * @param {string} popupType Type of popup.
   */
  createPopup(popupType) {
    this.popupController.show(popupType);
  }
}
