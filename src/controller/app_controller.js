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
goog.require('NewBlockPopupController');
goog.require('NewLibraryPopupController');
goog.require('NewProjectPopupController');
goog.require('PopupController');
goog.require('SaveProjectPopupController');
goog.require('Project');
goog.require('ProjectController');

goog.require('goog.dom.classlist');
goog.require('goog.dom.xml');
goog.require('goog.ui.PopupColorPicker');
goog.require('goog.ui.ColorPicker');


'use strict';

var Emitter = require('component-emitter');
var fs = require('graceful-fs');
var path = require('path');

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

    /**
     * Stores currently loaded project that user will edit.
     * @type {Project}
     */
    this.project = null;

    /**
     * The tree for the DevTools session.
     * @type {NavigationTree}
     */
    this.tree = null;

    /**
     * ProjectController object associated with application.
     * @type {ProjectController}
     */
    this.projectController = null;

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
     * EditorController object which encapsulates all editor controllers
     * @type {EditorController}
     */
    this.editorController = null;

    /**
     * Main View class which manages view portion of application.
     * @type {AppView}
     */
    this.view = null;

    /**
     * PopupController object which controls any popups that may appear throughout
     * the course of using DevTools. Null if no popup is open.
     * @type {?PopupController}
     */
    this.popupController = null;

    /**
     * ReadWriteController, which controls reading/writing project data.
     */
    this.readWriteController = new ReadWriteController(this);

    // Creates project.
    this.initProject('MyProject');
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
    console.warn('Unimplemented: openProject()');
  }

  /**
   * Creates new project with the proper user-given name, then initializes
   * controllers and components of application dependent on the project.
   * @param {string} projectName Name of project (user-given).
   */
  initProject(projectName) {
    this.project = new Project(projectName);
    this.tree = new NavigationTree(this);
    this.projectController = new ProjectController(this.project, this.tree);
    this.editorController = new EditorController(this.projectController,
        this.hiddenWorkspace);
    this.view = new AppView(this);
  }

  /**
   * Top-level function which is first called in order to save a project to
   * developer's file system.
   */
  saveProject() {
    this.readWriteController.saveProject();
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
    // Exit last popup if exists.
    if (this.popupController) {
      this.popupController.exit();
    }
    // Create popup.
    if (popupMode === PopupController.NEW_BLOCK) {
      if (this.project.librarySet.isEmpty()) {
        this.popupController = new NewLibraryPopupController(this, true);
      } else {
        this.popupController = new NewBlockPopupController(this);
      }
    } else if (popupMode === PopupController.PREVIEW) {
      // TODO: Preview popup view
    } else if (popupMode == PopupController.NEW_CONFIG) {
      // TODO: New config popup view
    } else if (popupMode === PopupController.NEW_PROJECT) {
      this.popupController = new NewProjectPopupController(this);
    } else if (popupMode === PopupController.NEW_LIBRARY) {
      this.popupController = new NewLibraryPopupController(this);
    } else {
      throw new Error('Popup type ' + popupMode + ' not found.');
      return;
    }
    this.popupController.show();
  }

  /**
   * Handler for the window's 'beforeunload' event. When a user has unsaved
   * changes and refreshes or leaves the page, confirm that they want to do so
   * before actually refreshing.
   * @param {Event} event The beforeunload event.
   */
  confirmLeavePage(event) {
    // TODO: Move in from app_controller.js
    console.warn('Unimplemented: confirmLeavePage()');
  }

  /**
   * Top-level function for block creation. Updates views, editors, and model.
   */
  createBlockDefinition() {
    this.createPopup(PopupController.NEW_BLOCK);
    this.view.closeModal_();
  }

  /**
   * Top-level function for library creation. Updates views, editors, and model.
   */
  createLibrary() {
    this.createPopup(PopupController.NEW_LIBRARY);
    this.view.closeModal_();
  }

  /**
   * Top-level function for toolbox creation. Updates views, editors, and model.
   */
  createToolbox() {
    let errorText = '';
    let name, isDuplicate, isEmpty;
    do {
      name = window.prompt(errorText + 'Enter new toolbox name.', 'MyToolbox');
      isDuplicate = this.project.getToolbox(name);
      isEmpty = name && name.trim() ? false : true;
      if (isDuplicate) {
        errorText = 'This toolbox already exists.\n';
      } else if (isEmpty) {
        return;
      }
    } while (isDuplicate);
    const toolbox = this.projectController.createToolbox(name);
    this.switchEnvironment(AppController.TOOLBOX_EDITOR, toolbox);
  }

  /**
   * Top-level function for workspace contents creation. Updates views, editors,
   * and model.
   */
  createWorkspaceContents() {
    // TODO: prompt for name
    const workspaceContents =
      this.projectController.createWorkspaceContents('test_contents');
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
   * @param {string} editor The editor to switch to.
   * @param {!Resource} resource The resource to display upon switching the view.
   * @throws When the given resource is null or undefined, there is no resource
   *     to display.
   */
  switchEnvironment(editor, resource) {
    if (!resource) {
      throw 'switchEnvironment() trying to load a ' + resource + ' object into' +
          ' an editor (' + editor + ').';
    }
    var view = 'EditorView';
    var controller = 'Controller';

    if (editor == AppController.BLOCK_EDITOR) {
      view = PREFIXES.VARIABLE_BLOCK + view;
      controller = PREFIXES.VARIABLE_BLOCK + controller;
    } else if (editor == AppController.TOOLBOX_EDITOR) {
      view = PREFIXES.VARIABLE_TOOLBOX + view;
      controller = PREFIXES.VARIABLE_TOOLBOX + controller;
      resource = this.project.getToolbox(resource.name);
    } else if (editor == AppController.WORKSPACE_EDITOR) {
      view = 'workspace' + view;
      controller = 'workspace' + controller;
    }

    // Switch view.
    this.view.switchView(this.view[view], resource);

    // Switch editor.
    this.editorController.switchEditor(this.editorController[controller]);

    // Close flyout if open.
    this.view.closeModal_();
  }
}
