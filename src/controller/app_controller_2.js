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

goog.provide('AppController2');

goog.require('FactoryUtils');
goog.require('goog.dom.classlist');
goog.require('goog.dom.xml');
goog.require('goog.ui.PopupColorPicker');
goog.require('goog.ui.ColorPicker');

'use strict';

// TODO(#44): Rename to AppController once refactor is finished. Temporarily named
// to AppController2 to avoid overlapping namespaces with current AppController,
// which will be refactored into this (and other) files.
class AppController2 {
  constructor() {
    // Block Factory has a dependency on bits of Closure that core Blockly
    // doesn't have. When you run this from file:// without a copy of Closure,
    // it breaks it non-obvious ways.  Warning about this for now until the
    // dependency is broken.
    // TODO: #668.
    if (!window.goog.dom.xml) {
      alert('Sorry: Closure dependency not found. We are working on removing ' +
        'this dependency.  In the meantime, you can use our hosted demo\n ' +
        'https://blockly-demo.appspot.com/static/demos/blockfactory/index.html' +
        '\nor use these instructions to continue running locally:\n' +
        'https://developers.google.com/blockly/guides/modify/web/closure');
      return;
    }

    // TODO: Move in functions from AppController.init().

    /**
     * Stores currently loaded project that user will edit.
     * @type {!Project}
     */
    this.project = new Project('');

    this.view = new AppView(this);

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

    /**
     * Map of tab type to div element for the tab.
     * @type {!Object.<string, !Element>}
     */
    this.tabMap = {};
    this.tabMap[this.BLOCK_FACTORY] = $('#blockFactory_tab');
    this.tabMap[this.WORKSPACE_FACTORY] = $('#workspaceFactory_tab');
    this.tabMap[this.EXPORTER] = $('#blocklibraryExporter_tab');

    /**
     * Keeps track of name of last selected tab.
     * @type {string}
     */
    this.lastSelectedTab = null;

    /**
     * Keeps track of name of currently selected tab.
     * @type {string}
     */
    this.selectedTab = this.BLOCK_FACTORY;
  }

  // ======================== CONSTANTS ===========================
  // TODO: Remove/add tabs to fit new DevTools model.
  /**
   * Static get function for constant BLOCK_FACTORY. Represents one of the
   * three tabs in the controller.
   * @return {!string}
   */
  static get BLOCK_FACTORY() {
    return 'BLOCK_FACTORY';
  }

  /**
   * Static get function for constant WORKSPACE_FACTORY. Represents one of the
   * three tabs in the controller.
   * @return {!string}
   */
  static get WORKSPACE_FACTORY() {
    return 'WORKSPACE_FACTORY';
  }

  /**
   * Static get function for constant EXPORTER. Represents one of the three tabs
   * in the controller.
   * @return {!string}
   */
  static get EXPORTER() {
    return 'EXPORTER';
  }

  // ========================= VIEW-CONTROLLER ==========================

  /**
   * Set the selected tab.
   * @param {string} tabName AppController.BLOCK_FACTORY,
   *     AppController.WORKSPACE_FACTORY, or AppController.EXPORTER
   */
  setSelectedTab(tabName) {
    /*
     * TODO: Move in from app_controller.js
     *
     * References:
     * - this.lastSelectedTab
     * - this.selectedTab
     */
    throw 'Unimplemented: setSelectedTab()';
  }

  /**
   * Called on each tab click. Hides and shows specific content based on which tab
   * (Block Factory, Workspace Factory, or Exporter) is selected.
   */
  onTab() {
    /*
     * TODO: Move in from app_controller.js
     *
     * References:
     * - this.tabMap
     * - this.lastSelectedTab
     * - FactoryUtils.savedBlockChanges()
     */
    throw 'Unimplemented: onTab()';
  }

  /**
   * If given checkbox is checked, enable the given elements.  Otherwise, disable.
   * @param {boolean} enabled True if enabled, false otherwise.
   * @param {!Array.<string>} idArray Array of element IDs to enable when
   *     checkbox is checked.
   */
  ifCheckedEnable(enabled, idArray) {
    /*
     * TODO: Move in from app_controller.js
     */
    throw 'Unimplemented: ifCheckedEnable()';
  }

  // ========================= MODEL-CONTROLLER ==========================

  /**
   * Handle Blockly Storage with App Engine.
   */
  initializeBlocklyStorage() {
    // TODO: Move in from app_controller.js
    throw 'Unimplemented: initializeBlocklyStorage()';
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
    /*
     * TODO: Move in from wfactory_controller.js:exportInjectFile()
     *
     * References:
     * - generateNewOptions()
     * - generateInjectString()
     * - createAndDownloadFile(fileName, data)
     */
  }

  /**
   * Generates popup. Param must be either this.popupController.MODE.PREVIEW,
   * this.popupController.MODE.NEW_BLOCK, or this.popupController.MODE.NEW_CONFIG.
   *
   * @param {string} popupType Type of popup.
   */
  createPopup(popupType) {
    this.popupController.show(popupType);
  }

  /**
   * Handler for the window's 'beforeunload' event. When a user has unsaved
   * changes and refreshes or leaves the page, confirm that they want to do so
   * before actually refreshing.
   * @param {Event} event beforeunload event.
   */
  confirmLeavePage(event) {
    // TODO: Move in from app_controller.js'
    console.warn('Unimplemented: confirmLeavePage()');
  }
}
