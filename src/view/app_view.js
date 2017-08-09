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

/**
 * @fileoverview The AppView Class deals with the visual parts of the main
 * devtools application, such as the menubar.
 *
 * @author celinechoo (Celine Choo)
 */
goog.provide('AppView');

goog.require('BlockDefinition');
goog.require('NavigationTree');
goog.require('FactoryUtils');

goog.require('goog.dom.classlist');
goog.require('goog.ui.PopupColorPicker');
goog.require('goog.ui.ColorPicker');

/**
 * @class AppView manages all UI elements for the DevTools Application.
 */
class AppView {
  constructor(appController) {
    /**
     * The AppController for the DevTools session.
     * @type {!AppController}
     */
    this.appController = appController;

    /**
     * The main window of the application.
     * @type {!HtmlElement}
     */
    this.win = nw.Window.get();

    /**
     * The block editor view for the session.
     * @type {!BlockEditorView}
     */
    this.blockEditorView =
        this.appController.editorController.blockEditorController.view;

    /**
     * The toolbox view for the session.
     * @type {!ToolboxEditorView}
     */
    this.toolboxEditorView =
        this.appController.editorController.toolboxController.view;

    /**
     * The workspace view for the session.
     * @type {!WorkspaceEditorView}
     */
    this.workspaceEditorView =
        this.appController.editorController.workspaceController.view;

    // Initializes menu structure. Leaf nodes are actionable MenuItems.
    const menuTree = [
      ['File', [
        ['New', [
          ['New Block', () => { this.showNewBlock(); }],
          ['New Project', () => { this.showNewProject(); }],
          ['New Library', () => { this.showNewLibrary(); }],
          ['New Toolbox', () => { this.showNewToolbox(); }]
        ]],
        ['Open Project', () => { this.openProject(); }],
        ['Save All', () => { this.appController.saveProject(); }],
        ['Import', [
          ['Blocks', () => { this.importBlocks(); }],
          ['Library', () => { this.importLibrary(); }],
          ['Toolbox', () => { this.importToolbox(); }],
          ['Workspace', () => { this.importWorkspace(); }]
        ]],
        ['Export', [
          ['Project', () => { this.exportProject(); }],
          ['Current', [
            ['Library', () => { this.exportCurrentLibrary(); }],
            ['Toolbox', () => { this.exportCurrentToolbox(); }],
            ['Workspace Contents',
              () => { this.exportCurrentWorkspaceContents(); }],
            ['Workspace Configuration',
              () => { this.exportCurrentWorkspaceConfiguration(); }]
            ]]
        ]],
        ['Create Application for Web', () => { this.createWeb(); }]
      ]]
    ];

    /**
     * Dictionary with all MenuItems. Keys are the labels, values are the
     *     nw.MenuItem's. Values are added in initMenuTree().
     * @type {!Object<string, !HtmlElement>}
     */
    this.menuItems = {};

    // Initializes menubar.
    this.mainMenu = new nw.Menu({type: 'menubar'});
    if (process.platform === "darwin") {
      this.initMacMenubar(this.mainMenu, menuTree);
    } else {
      this.initMenuTree(this.mainMenu, menuTree);
    }
    /**
     * The Menubar of the main window of the application.
     * @type {!HtmlElement}
     */
    this.win.menu = this.mainMenu;

    /**
     * Keeps track of which view is currently active.
     * @type {!BlockEditorView|!ToolboxEditorView|!WorkspaceEditorView}
     */
    this.currentView = this.blockEditorView;

    /**
     * Whether or not the flyout for the add button is open.
     * @type {boolean}
     */
    this.addFlyoutOpen = false;

    /**
     * ID of currently open modal element. Null if no element is open.
     * {?string}
     */
    this.modalId_ = null;

    // Assigning event handlers and listeners for application.
    this.init();
  }

  /**
   * Opens popup when clicking on New Block in menubar.
   */
  showNewBlock() {
    this.appController.createPopup(PopupController.NEW_BLOCK);
  }

  /**
   * Action taken when new project is created.
   */
  showNewProject() {
    this.appController.createPopup(PopupController.NEW_PROJECT);
  }

  /**
   * Action taken when new library is created.
   */
  showNewLibrary() {
    this.appController.createPopup(PopupController.NEW_LIBRARY);
  }

  /**
   * Action taken when new toolbox is created.
   */
  showNewToolbox() {
    // TODO: Fill in action.
  }

  /**
   * Action taken when opening a project.
   */
  openProject() {
    this.appController.readWriteController.openProject();
  }

  /**
   * Action taken when saving a project for Web only.
   */
  saveForWeb() {
    // TODO: Fill in action.
  }

  /**
   * Action taken when saving a project for iOS only.
   */
  saveForIos() {
    // TODO: Fill in action.
  }

  /**
   * Action taken when saving a project for Android only.
   */
  saveForAndroid() {
    // TODO: Fill in action.
  }

  /**
   * Action taken when importing blocks.
   */
  importBlocks() {
     // TODO #228: Fill in action.
     console.warn('unimplemented: importBlocks');
  }

  /**
   * Action taken when importing library.
   */
  importLibrary() {
     // TODO #228: Fill in action.
     console.warn('unimplemented: importLibrary');
  }

  /**
   * Action taken when importing toolbox.
   */
  importToolbox() {
    // TODO #228: Fill in action.
    console.warn('unimplemented: importToolbox');
  }

  /**
   * Action taken when importing workspace.
   */
  importWorkspace() {
     // TODO #228: Fill in action.
     console.warn('unimplemented: importWorkspace');
  }
  /**
   * Action taken when creating sample Blockly web application.
   */
  createWeb() {
    // TODO: Fill in action.
  }

  /**
   * Calls response to selecting export project in menu.
   */
  exportProject() {
    console.warn('unimplemented: AppView.exportProject()');
  }

  /**
   * Calls response to selecting export current library in menu.
   */
  exportCurrentLibrary() {
    console.warn('unimplemented: AppView.exportCurrentLibrary()');
  }

  /**
   * Calls response to selecting export current toolbox in menu.
   */
  exportCurrentToolbox() {
    console.warn('unimplemented: AppView.exportCurrentToolbox()');
  }

  /**
   * Calls response to selecting export current workspace contents in menu.
   */
  exportCurrentWorkspaceContents() {
    console.warn('unimplemented: AppView.exportCurrentWorkspaceContents()');
  }

  /**
   * Calls response to selecting export current workspace configuration in menu.
   */
  exportCurrentWorkspaceConfiguration() {
    console.warn('unimplemented: AppView.exportCurrentWorkspaceConfiguration()');
  }

  /**
   * Creates and initializes a menu or menubar (Windows & Linux only),
   * based off of the given menu metadata in tree.
   *
   * @param {!nw.Menu} menu Menu to add nodes to.
   * @param {Array} tree An array of name/value pairs for each child
   *                     (each represented as a length 2 array).
   */
  initMenuTree(menu, tree) {
    tree.forEach((pair) => {
      if (pair.length != 2) {
        throw `Invalid name/value pair in menu tree: ${pair}`;
      }
      let label = pair[0];
      if (typeof pair[1] !== 'function') {
        // If next node is not leaf, must create subMenu.
        let subMenu = new nw.Menu();
        this.initMenuTree(subMenu, /* children */ pair[1]);
        this.menuItems[label] = this.addMenuItem(menu, label, subMenu, null);
      } else {
        // When the child node is a function, no subMenu is necessary.
        // Replace node with MenuItem.
        this.menuItems[label] = this.addMenuItem(
            menu, label, /* submenu */ null, /* callback */ pair[1]);
      }
    });
  }

  /**
   * Initializes MenuBar for running on OS X.
   *
   * @param {!nw.Menu} menubar The Menu representing the Mac menubar.
   * @param {Array} tree An array of name/value pairs for each child
   *                     (each represented as a length 2 array).
   */
  initMacMenubar(menubar, tree) {
    this.mainMenu.createMacBuiltin('Blockly DevTools');

    var insertionIndex = 1;
    tree.forEach((pair) => {
      if (pair.length != 2) {
        throw `Invalid name/value pair in menu tree: ${pair}`;
      }
      let label = pair[0];
      let submenuTree = pair[1];

      let subMenu = new nw.Menu();
      // TODO: Determine if a menu/menuitem with the label already exists.
      this.initMenuTree(subMenu, submenuTree);

      this.menuItems[label] = new nw.MenuItem({
        label: label,
        enabled: true,
        submenu: subMenu
      });
      menubar.insert(this.menuItems[label], insertionIndex++);
    });

  }

  /**
   * Helper function to add menu items to the main menubar.
   *
   * @param {!nw.Menu} menu Menu object from NW.js to which we are adding an
   *     element.
   * @param {string} name Name of element being added to menu.
   * @param {!nw.Menu} subMenu Menu object to be added if the added element will
   *      also have its own sub-dropdown. Optional (if unused, will be null).
   * @param {function} onclick Function defining what actions to take upon click.
   *      Optional (if unused, will be null).
   *
   * @returns {!nw.MenuItem} MenuItem created by method.
   */
  addMenuItem(menu, name, subMenu, onclick) {
    let menuDetails = {
      label: name,
      enabled: true
    }
    if (onclick !== null) {
      menuDetails.click = onclick;
    }
    if (subMenu !== null) {
      menuDetails.submenu = subMenu;
    }
    let menuItem = new nw.MenuItem(menuDetails);
    menu.append(menuItem);
    return menuItem;
  }

  /**
   * Given a path to a menu item, this enables or disables the item so that
   * users cannot click on it to activate the associated action/function.
   *
   * @param {string} label Name of MenuItem to enable/disable.
   * @param {boolean} enable Whether to enable or disable the MenuItem (true is
   *     to enable).
   */
  enableMenuItem(label, enable) {
    this.menuItems[label].enabled = enable;
  }

  /**
   * Switches editor views in application.
   * @param {string} editorView EditorView object to show.
   * @param {string} resource Resource object to display in view.
   */
  switchView(editorView, resource) {
    this.currentView.hide();
    this.currentView = editorView;
    this.currentView.show(resource);
  }

  /**
   * Initializes event listeners/handlers for application.
   */
  init() {
    // TODO: reorganize/change listeners to reflect new DevTools
    this.tabClickHandlers_();
    // Assign general app button click handlers
    this.assignClickHandlers();
    this.addBlockFactoryEventListeners();
  }

  /**
   * Adds click handlers for switching views.
   * @private
   */
  tabClickHandlers_() {
    $('.tab').unbind('click').click((event) => {
      const clickedTab = event.currentTarget;
      const editorName = event.currentTarget.id;
      let editorView, editorContr, resource;

      if (editorName == AppController.BLOCK_EDITOR) {
        editorView = this.blockEditorView;
        editorContr = this.appController.editorController.blockEditorController;
        resource = PREFIXES.VARIABLE_BLOCK + 'Definition';
      } else if (editorName == AppController.TOOLBOX_EDITOR) {
        editorView = this.toolboxEditorView;
        editorContr = this.appController.editorController.toolboxController;
        resource = PREFIXES.VARIABLE_TOOLBOX;
      } else if (editorName == AppController.WORKSPACE_EDITOR) {
        editorView = this.workspaceEditorView;
        editorContr = this.appController.editorController.workspaceController;
        resource = PREFIXES.VARIABLE_WORKSPACECONTENTS;
      }

      // Switches editor.
      this.appController.switchEnvironment(editorName, editorView[resource]);
    });
  }

  /**
   * Assigns button click handlers for the general app interface.
   */
  assignClickHandlers() {
    $('#helpButton').click(() => {
      open('https://developers.google.com/blockly/custom-blocks/block-factory',
          'BlockFactoryHelp');
    });

    $('#addButton').click(() => {
      if (this.addFlyoutOpen) {
        this.closeModal_();
      } else {
        FactoryUtils.openModal('addOptions');
        this.modalId_ = 'addOptions';
        this.addFlyoutOpen = true;
      }
    });
    this.assignAddFlyoutClickHandlers();

    $('#modalShadow').click(() => {
      this.closeModal_();
    });
  }

  /**
   * Closes all modal elements and sets this.modalId_ to null.
   * @private
   */
  closeModal_() {
    FactoryUtils.closeModal(this.modalId_);
    this.modalId_ = null;
    this.addFlyoutOpen = false;
  }

  /**
   * Assigns button click handlers for add button flyout.
   */
  assignAddFlyoutClickHandlers() {
    $('#addBlock').click(() => {
      this.closeModal_();
      this.appController.createBlockDefinition();
    });

    $('#addLibrary').click(() => {
      this.closeModal_();
      this.appController.createLibrary();
    });

    $('#addToolbox').unbind('click').click(() => {
      this.closeModal_();
      this.appController.createToolbox();
    });

    $('#addWorkspaceContents').unbind('click').click(() => {
      this.closeModal_();
      this.appController.createWorkspaceContents();
    });

    $('#addWorkspaceConfig').click(() => {
      this.closeModal_();
      this.appController.createWorkspaceConfiguration();
    });

    $('#createNewBlockButton').click(() => {
      this.closeModal_();
      this.appController.createPopup(PopupController.NEW_BLOCK);
    });
  }

  /**
   * Add event listeners for the block factory.
   */
  addBlockFactoryEventListeners() {
    // REFACTORED: Moved in from app_controller.js
    // Update code on changes to block being edited.
    this.blockEditorView.editorWorkspace.addChangeListener(
        this.appController.editorController.updateLanguage);

    // Disable blocks not attached to the factory_base block.
    this.blockEditorView.editorWorkspace.addChangeListener(Blockly.Events.disableOrphans);

    const controller = this.appController.editorController.blockEditorController;

    // Update preview on every change.
    this.blockEditorView.editorWorkspace.addChangeListener(
        controller.refreshPreviews);

    $('#direction').change(controller.updatePreview);
    $('#languageTA').change(controller.updatePreview);
    $('#languageTA').keyup(controller.updatePreview);
    $('#format').change(controller.formatChange);
    $('#language').change(controller.updatePreview);
  }

  /**
   * Handle resizing of elements.
   * @param {Event} event onresize event.
   */
  onresize(event) {
    // Move in from app_controller.js
    throw 'Unimplemented: onresize()';
  }
}
