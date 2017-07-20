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

goog.provide('AppController');

goog.require('AppView');
goog.require('EditorController');
goog.require('FactoryUtils');
goog.require('goog.dom.classlist');
goog.require('goog.dom.xml');
goog.require('goog.ui.PopupColorPicker');
goog.require('goog.ui.ColorPicker');
goog.require('PopupController');
goog.require('Project');
goog.require('ProjectController');

'use strict';

var Emitter = require('component-emitter');

/*
 * Global constants for organizing different node types, used when giving them
 *     ids. Given with the assumption that the name of each object in a
 *     project is unique across that project.
 */
const PROJECT_PREFIX = "Project";
const BLOCK_PREFIX = 'Block';
const LIBRARY_PREFIX = "BlockLibrary";
const TOOLBOX_PREFIX = 'Toolbox';
const WORKSPACE_CONTENTS_PREFIX = 'WorkspaceContents';
const WORKSPACE_CONFIG_PREFIX = 'WorkspaceConfiguration';
/**
 * A list of all prefixes, for easier passing.
 */
const prefixList =
  [PROJECT_PREFIX, BLOCK_PREFIX, LIBRARY_PREFIX, TOOLBOX_PREFIX,
    WORKSPACE_CONFIG_PREFIX, WORKSPACE_CONTENTS_PREFIX];

// TODO(#44): Rename to AppController once refactor is finished. Temporarily named
// to AppController to avoid overlapping namespaces with current AppController,
// which will be refactored into this (and other) files.
class AppController {
  /**
   * Initializes AppController, creates project object, associated controllers
   * and views.
   * @constructor
   */
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
    this.project = new Project('A Project', prefixList);

    /**
     * The tree for the DevTools session.
     * @type {!NavigationTree}
     */
    this.tree = new NavigationTree(this, this.project);

    // Create div elements to insert hidden workspaces used in I/O. Hidden
    // workspaces stored in EditorController.
    this.insertHiddenWorkspace_();

    /**
     * Hidden Blockly workspace used to generate Blockly objects by using
     * core Blockly functions.
     * @type {!Blockly.Workspace}
     */
    this.hiddenWorkspace = Blockly.inject('hiddenWorkspace');

    /**
     * ProjectController object associated with application.
     * @type {!ProjectController}
     */
    this.projectController = new ProjectController(this.project, this.tree,
      prefixList);

    /**
     * EditorController object which encapsulates all editor controllers
     * @type {!EditorController}
     */
    this.editorController = new EditorController(
        this.projectController, this.hiddenWorkspace);

    /**
     * Main View class which manages view portion of application.
     * @type {!AppView}
     */
    this.view = new AppView(this);

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

  /**
   * Static get function for constant TOOLBOX_EDITOR.
   * @return {!string}
   */
  static get TOOLBOX_EDITOR() {
    return 'TOOLBOX_EDITOR';
  }

  /**
   * Static get function for constant TOOLBOX_EDITOR.
   * @return {!string}
   */
  static get WORKSPACE_EDITOR() {
    return 'WORKSPACE_EDITOR';
  }

  // ========================= VIEW-CONTROLLER ==========================

  /**
   * Set the selected tab.
   * @param {string} tabName AppController.BLOCK_FACTORY,
   *     AppController.WORKSPACE_FACTORY, or AppController.EXPORTER
   */
  setSelectedTab(tabName) {
    // REFACTORED: from app_controller.js:setSelected_(tabName)
    this.view.lastSelectedTab = this.view.selectedTab;
    this.view.selectedTab = tabName;
  }

  /**
   * Called on each tab click. Hides and shows specific content based on which tab
   * (Block Factory, Workspace Factory, or Exporter) is selected.
   */
  //TODO #99: have changed by tree, not tabs
  onTab() {
    // REFACTORED: Moved in from app_controller.js=
    // Get tab div elements
    const blockFactoryTab = this.tabMap[AppController.BLOCK_FACTORY];
    const exporterTab = this.tabMap[AppController.EXPORTER];
    const workspaceFactoryTab = this.tabMap[AppController.WORKSPACE_FACTORY];
    const currentTab = this.view.selectedTab;

    // Only enable key events in Editors if its tab is selected.
    this.editorController.toolboxController.keyEventsEnabled =
        currentTab == AppController.TOOLBOX_EDITOR;
    this.editorController.workspaceController.keyEventsEnabled =
        currentTab == AppController.WORKSPACE_EDITOR;

    // Turn selected tab on and other tabs off.
    this.view.styleTabs_();

    if (currentTab == AppController.BLOCK_FACTORY) {
      this.showTab_('blockFactoryContent');
      this.editorController.currentEditor = this.editorController.blockEditorController;
    } else if (currentTab == AppController.WORKSPACE_FACTORY) {
      // TODO(#95): Deprecate workspace factory tab. Split into two views,
      //            toolbox editor and workspace editor view.

      this.showTab_('workspaceFactoryContent');

      // Update block library categories.
      this.editorController.toolboxController.updateBlockLibCategory();
    } else if (currentTab == AppController.EXPORTER) {
      // TODO: Deprecate exporter tab. Keep for now to keep view in tact. Will
      //       remove completely after #95 is resolved.
      this.showTab_('blockLibraryExporter');

      // Note: Removed exporter and usedBlockTypes() references because exporting
      // will be done through the menubar and the block exporter tab will be
      // deprecated.
    } else if (currentTab == AppController.TOOLBOX_EDITOR) {
      this.showTab_('toolboxEditor');

      this.editorController.toolboxController.updateBlockLibCategory();
      this.editorController.currentEditor = this.editorController.toolboxController;
    } else if (currentTab == AppController.WORKSPACE_EDITOR) {
      this.showTab_('workspaceEditor');

      this.editorController.workspaceController.updateBlockLibCategory();
      this.editorController.currentEditor = this.editorController.workspaceController;
    }

    // Resize to render workspaces' toolboxes correctly for all tabs.
    window.dispatchEvent(new Event('resize'));
  }

  /**
   * Given a tab name, shows the view corresponding to that tab and hides all others.
   * Helper function of onTab().
   * @param {string} tabName Name of tab to be shown.
   * @private
   */
  showTab_(tabName) {
    const tabNames = ['workspaceFactoryContent', 'blockFactoryContent',
        'blockLibraryExporter', 'toolboxEditor', 'workspaceEditor'];
    tabNames.forEach((name) => {
      if (name === tabName) {
        FactoryUtils.show(name);
      } else {
        FactoryUtils.hide(name);
      }
    });
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
    // Note: Not implemented because it is in the exporter tab, which will be
    // deprecated. May implement later if necessary.
    throw 'Unimplemented: ifCheckedEnable()';
  }

  // ========================= MODEL-CONTROLLER ==========================

  /**
   * Handle Blockly Storage with App Engine.
   */
  initializeBlocklyStorage() {
    // REFACTORED: Moved in from app_controller.js
    // TODO: Possibly remove method if unnecessary.
    BlocklyStorage.HTTPREQUEST_ERROR =
        'There was a problem with the request.\n';
    BlocklyStorage.LINK_ALERT =
        'Share your blocks with this link:\n\n%1';
    BlocklyStorage.HASH_ERROR =
        'Sorry, "%1" doesn\'t correspond with any saved Blockly file.';
    BlocklyStorage.XML_ERROR = 'Could not load your saved file.\n' +
        'Perhaps it was created with a different version of Blockly?';
    const linkButton = document.getElementById('linkButton');
    linkButton.style.display = 'inline-block';
    linkButton.addEventListener('click', () => {
        BlocklyStorage.link(
          this.editorController.blockEditorController.view.blockDefinitionWorkspace);
      });
    this.editorController.blockEditorController.view.disableEnableLink();
  }

  /**
   * Creates invisible/hidden Blockly workspace that is used as a tool in
   * generating XML of blocks.
   * @private
   */
  insertHiddenWorkspace_() {
    const hiddenDiv = document.createElement('div');
    hiddenDiv.id = 'hiddenWorkspace';
    hiddenDiv.style.display = 'none';
    document.body.appendChild(hiddenDiv);
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
    // REFACTORED: Moved in from wfactory_controller.js:exportInjectFile()

    // Generate file contents for inject file.
    const injectFileContents = this.projectController.generateInjectString();
    // Get file name from user.
    const fileName = prompt('File name for starter Blockly workspace code:',
                            'workspace.js');
    if (!fileName) {
      return;
    }

    FactoryUtils.createAndDownloadFile(injectFileContents, fileName, 'text/javascript');

    // TODO: Generate file contents for sample HTML page to create a "complete"
    //       sample blockly app, with instructions in the comments.
  }

  /**
   * Generates popup. Param must be either this.popupController.MODE.PREVIEW,
   * this.popupController.MODE.NEW_BLOCK, or this.popupController.MODE.NEW_CONFIG.
   *
   * @param {string} popupMode Type of popup to be shown.
   */
  createPopup(popupMode) {
    if (popupMode === PopupController.NEW_BLOCK) {
      this.popupController.exit();
      this.popupController = new NewBlockPopupController(this);
      this.popupController.show();
    } else if (popupMode === PopupController.PREVIEW) {
      // TODO: Preview popup view
    } else if (popupMode === PopupController.NEW_CONFIG) {
      // TODO: New config popup view
    } else {
      throw new Error('Popup type ' + popupMode + ' not found.');
    }
  }

  /**
   * Handler for the window's 'beforeunload' event. When a user has unsaved
   * changes and refreshes or leaves the page, confirm that they want to do so
   * before actually refreshing.
   * @param {Event} event The beforeunload event.
   */
  confirmLeavePage(event) {
    // TODO: Move in from app_controller.js'
    console.warn('Unimplemented: confirmLeavePage()');
  }

  /**
   * Handler for the window's 'beforeunload' event. When a user has unsaved
   * changes and refreshes or leaves the page, confirm that they want to do so
   * before actually refreshing.
   * @param {Event} event The beforeunload event.
   */
  confirmLeavePage(event) {
    // TODO: Move in from app_controller.js'
    console.warn('Unimplemented: confirmLeavePage()');
  }
}
