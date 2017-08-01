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
goog.require('PopupController');
goog.require('NewProjectPopupView');
goog.require('Project');
goog.require('ProjectController');

goog.require('goog.dom.classlist');
goog.require('goog.dom.xml');
goog.require('goog.ui.PopupColorPicker');
goog.require('goog.ui.ColorPicker');


'use strict';

var Emitter = require('component-emitter');
var fs = require('graceful-fs');

/**
 * Class containing static getters for the prefixes of all node types. Given
 * with the assumption that the name of each object in a project is unique
 * across that project.
 */
class PREFIXES {
  static get PROJECT() {
    return 'Project';
  }
  static get BLOCK() {
    return 'Block';
  }
  static get LIBRARY() {
    return 'BlockLibrary';
  }
  static get TOOLBOX() {
    return 'Toolbox';
  }
  static get GENERAL_WORKSPACE() {
    return 'Workspace';
  }
  static get WORKSPACE_CONTENTS() {
    return 'WorkspaceContents';
  }
  static get WORKSPACE_CONFIG() {
    return 'WorkspaceConfiguration';
  }

  /* prefixes for classes when used in variable names */
  static get VARIABLE_BLOCK() {
    return 'block';
  }
  static get VARIABLE_TOOLBOX() {
    return 'toolbox';
  }
  static get VARIABLE_WORKSPACECONTENTS() {
    return 'workspaceContents';
  }
  static get VARIABLE_WORKSPACECONFIGURATION() {
    return 'workspaceConfig';
  }
}

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
    this.project = new Project('A Project');

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
    this.projectController = new ProjectController(this.project, this.tree);

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
     * Location where the project directory is saved.
     */
    this.storageLocation = localStorage.getItem('devToolsProjectLocation') ||
        this.getNewStorageLocation();
  }

  // ======================== CONSTANTS ===========================
  // TODO: Remove/add tabs to fit new DevTools model.
  /**
   * Static get function for constant BLOCK_EDITOR. Represents one of the
   * three tabs in the controller.
   * @return {!string}
   */
  static get BLOCK_EDITOR() {
    return 'BLOCK_EDITOR';
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
   * Static get function for constant WORKSPACE_EDITOR.
   * @return {!string}
   */
  static get WORKSPACE_EDITOR() {
    return 'WORKSPACE_EDITOR';
  }

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
   * Prompts the user for a new location to store the project, stores and
   * returns the result.
   */
  getNewStorageLocation() {
    const projectPop = new NewProjectPopupView(this);
  }

  /**
   * Creates the properly nested directory in which to save the project.
   */
  initProjectDirectory() {
    const projectDir = storageLocation + this.project.name;
    const libraryDir = projectDir + '/' + PREFIXES.LIBRARY;
    const toolboxDir = projectDir + '/' + PREFIXES.TOOLBOX;
    const workspaceDir = projectDir + '/' + PREFIXES.GENERAL_WORKSPACE;
    const dirs = [ projectDir, libraryDir, toolboxDir, workspaceDir];
    for (let dir in dirs) {
      if (!fs.existsSync(dirs[dir])) {
        fs.mkdir(dirs[dir]);
        console.log('made directory ' + dirs[dir]);
      }
    }
  }

  /**
   * Top-level function which is first called in order to save a project to
   * developer's file system.
   */
  saveProject() {
    // Create directory in which to save the project.
    this.initProjectDirectory();

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
   * Top-level function for block creation. Updates views, editors, and model.
   */
  createBlockDefinition() {
    this.switchEnvironment('block', null);
    this.createPopup(PopupController.NEW_BLOCK);
  }

  /**
   * Top-level function for library creation. Updates views, editors, and model.
   */
  createLibrary() {
    // TODO: prompt for name, define behavior
    const library = this.projectController.createBlockLibrary(
        'test_library');
    this.switchEnvironment(PREFIXES.VARIABLE_BLOCK, library);
  }

  /**
   * Top-level function for toolbox creation. Updates views, editors, and model.
   */
  createToolbox() {
    // TODO: prompt for name
    const toolbox = this.projectController.createToolbox(
        'test_toolbox');
    this.switchEnvironment(PREFIXES.VARIABLE_TOOLBOX, toolbox);
  }

  /**
   * Top-level function for workspace contents creation. Updates views, editors,
   * and model.
   */
  createWorkspaceContents() {
    // TODO: prompt for name
    const workspaceContents =
      this.projectController.createWorkspaceContents(
          'test_contents');
    this.switchEnvironment(PREFIXES.VARIABLE_WORKSPACECONTENTS, workspaceContents);
  }

  /**
   * Top-level function for workspace configuration creation. Updates views,
   * editors, and model.
   */
  createWorkspaceConfiguration() {
    // TODO: prompt for name
    const workspaceConfig =
      this.projectController.createWorkspaceConfiguration(
          'test_config');
    this.switchEnvironment(PREFIXES.VARIABLE_WORKSPACECONFIGURATION, workspaceConfig);
  }

  /**
   * Switches view and editor, closes any open modal elements.
   * @param {string} element The type of element to switch the view and editor
   *     based off of, in camel case (but beginning with a lower case letter).
   * @param {?Resource} resource The resource to display upon switching the view.
   */
  switchEnvironment(element, resource) {
    var resourceReference;
    if (element == PREFIXES.VARIABLE_WORKSPACECONTENTS ||
        element == PREFIXES.VARIABLE_WORKSPACECONFIGURATION) {
      resourceReference = element;
      element = 'workspace';
    } else {
      resourceReference = element;
    }
    const controller = element + 'EditorController';
    const view = element + 'EditorView';
    this.editorController.switchEditor(
          this.editorController[controller]);
    if (resource) {
      this.view[view][resourceReference] = resource;
    }
    this.view.switchView(this.view[view], resource);
    FactoryUtils.closeModal(this.modalId_);
    this.modalId_ = null;
    this.addFlyoutOpen = false;
  }
}
