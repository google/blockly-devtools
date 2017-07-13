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
 * @fileoverview The AppView Class deals with the visual parts of the main
 * devtools application, such as the menubar.
 *
 * @author celinechoo (Celine Choo)
 */

goog.require('BlockFactory');
goog.require('FactoryUtils');
goog.require('BlockLibraryController');
goog.require('BlockExporterController');
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

    // Inserts divs with proper IDs for all Blockly Workspaces used in DevTools.
    this.insertWorkspaces_();

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
        ['Save', [
          ['Save All', () => { this.saveProject(); }],
          ['Save as Web Only', () => { this.saveForWeb(); }],
          ['Save as iOS Only', () => { this.saveForIos(); }],
          ['Save as Android Only', () => { this.saveForAndroid(); }]
        ]],
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
      ]],
      ['Edit', []],
      ['Help', []]
    ];

    /**
     * Dictionary with all MenuItems. Keys are the labels, values are the
     *     nw.MenuItem's. Values are added in initMenuTree().
     * @type {!Object<string, !HtmlElement>}
     */
    this.menuItems = {};

    // Initializes menubar.
    this.mainMenu = new nw.Menu({type: 'menubar'});
    this.initMenuTree(this.mainMenu, menuTree);
    /**
     * The Menubar of the main window of the application.
     * @type {!HtmlElement}
     */
    this.win.menu = this.mainMenu;

    /**
     * The tree for the DevTools session.
     * @type {?JSTree}
     */
    this.navTree = null;

    /**
     * Div ID of currently open modal. Modals are usually dropdown elements.
     * @type {?string}
     * @private
     * Moved in from app_controller.js
     */
    // TODO: Separate modal management into each editor (block definition editor,
    //       toolbox editor, workspace editor) instead of managing/tracking all
    //       dropdowns in AppView.
    this.modalName_ = null;

    /**
     * The block editor view for the session.
     * @type {!BlockEditorView}
     */
    this.blockEditorView = new BlockEditorView();

    /**
     * The toolbox view for the session.
     * @type {!ToolboxEditorView}
     */
    this.toolboxEditorView = new ToolboxEditorView();

    /**
     * The workspace view for the session.
     * @type {!WorkspaceEditorView}
     */
    this.workspaceEditorView = new WorkspaceEditorView();
  }

  /**
   * Inserts divs with workspace IDs into DOM.
   */
  insertWorkspaces_() {
    const toolboxDiv = document.createElement('div');
    toolboxDiv.id = 'toolboxDiv';
    toolboxDiv.style.display = 'none';
    document.body.appendChild(toolboxDiv);

    const toolboxPreview = document.createElement('div');
    toolboxPreview.id = 'toolboxPreview';
    toolboxPreview.style.display = 'none';
    document.body.appendChild(toolboxPreview);

    const wContentsDiv = document.createElement('div');
    wContentsDiv.id = 'wContentsDiv';
    wContentsDiv.style.display = 'none';
    document.body.appendChild(wContentsDiv);

    const workspacePreview = document.createElement('div');
    workspacePreview.id = 'workspacePreview';
    workspacePreview.style.display = 'none';
    document.body.appendChild(workspacePreview);
  }

  /**
   * Initializes the tree for the session.
   * @param {!Project} project The project the tree represents.
   */
  setLibraryTree(project) {
    //initializes navigation tree with blocks in the project
    this.navTree = new NavigationTree(project);
    this.makeTreeListener();
  }

  /**
   * Opens popup when clicking on New Block in menubar.
   */
  showNewBlock() {
    this.appController.createBlocklyInitPopup(false);
  }

  /**
   * Action taken when new project is created.
   */
  showNewProject() {
    // TODO: Fill in action.
  }

  /**
   * Action taken when new library is created.
   */
  showNewLibrary() {
    // TODO: Fill in action.
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
    // TODO: Fill in action.
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
    // TODO: Fill in action.
  }

  /**
   * Action taken when importing library.
   */
  importLibrary() {
    // TODO: Fill in action.
  }

  /**
   * Action taken when importing toolbox.
   */
  importToolbox() {
    // TODO: Fill in action.
  }

  /**
   * Action taken when importing workspace.
   */
  importWorkspace() {
    // TODO: Fill in action.
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
   * Initializes menu tree based off of a given menu tree
   *
   * @param {!nw.Menu} menu Menu to add nodes to.
   * @param {Array} tree An array of name/value pairs for each child
                         (each represented as a length 2 array).
   */
  initMenuTree(menu, tree) {
    // If menu is null, it means that we are at the end of the tree.
    if (menu === null) {
      return tree;
    }

    tree.forEach((pair) => {
      if (pair.length != 2) {
        throw `Invalid name/value pair in menu tree: ${pair}`;
      }
      let name = pair[0];
      if (typeof pair[1] !== 'function') {
        // If next node is not leaf, must create subMenu.
        let subMenu = new nw.Menu();
        this.menuItems[name] = this.addMenuItem(
            menu, name, subMenu, this.initMenuTree(subMenu, pair[1]));
      } else {
        // When the child node is a function, no subMenu is necessary.
        // Replace node with MenuItem.
        this.menuItems[name] = this.addMenuItem(
            menu, name, null, this.initMenuTree(null, pair[1]));
      }

    });
    return null;
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
   * to enable).
   */
  enableMenuItem(label, enable) {
    this.menuItems[label].enabled = enable;
  }

  /**
   * Given a tab and a ID to be associated to that tab, adds a listener to
   * that tab so that when the user clicks on the tab, it switches to the
   * element associated with that ID.
   * @param {!Element} tab The DOM element to add the listener to.
   * @param {string} id The ID of the element to switch to when tab is clicked.
   */
  addClickToSwitch(tab, id) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - switchElement()
     * - bindClick()
     */
  }

  /**
   * Updates the workspace to show the block user selected from library
   * @param {string} blockType Block to edit on block factory.
   */
  openBlock(blockType) {
    this.blockEditorView.openBlock(blockType);
   }

  /**
   * Called on each tab click. Styles the tabs to reflect which tab is selected.
   * @private
   */
  styleTabs_() {
    // TODO: Move in from app_controller.js
    throw 'Unimplemented: styleTabs_()';
  }

  /**
   * Assign button click handlers for the exporter.
   */
  assignExporterClickHandlers() {
    /*
     * TODO: Move in from app_controller.js
     */
    // TODO(#7): Remove after exporter is consolidated into save/open project.
    throw 'Unimplemented: assignExporterClickHandlers()';
  }

  /**
   * Assign change listeners for the exporter. These allow for the dynamic update
   * of the exporter preview.
   */
  assignExporterChangeListeners() {
    // TODO: Move in from app_controller.js
    // TODO(#7): Remove after exporter is consolidated into save/open project.
    throw 'Unimplemented: assignExporterChangeListeners()';
  }

  /**
   * Assign button click handlers for the block library.
   */
  assignLibraryClickHandlers() {
    // TODO: Move in from app_controller.js
    throw 'Unimplemented: assignLibraryClickHandlers()';
  }

  /**
   * Assign button click handlers for the block factory.
   */
  assignBlockFactoryClickHandlers() {
    // TODO: Move in from app_controller.js
    throw 'Unimplemented: assignBlockFactoryClickHandlers()';
  }

  /**
   * Add event listeners for the block factory.
   */
  addBlockFactoryEventListeners() {
    // TODO: Move in from app_controller.js
    throw 'Unimplemented: addBlockFactoryEventListeners()';
  }

  /**
   * Handle resizing of elements.
   * @param {Event} event onresize event.
   */
  onresize(event) {
    // Move in from app_controller.js
    throw 'Unimplemented: onresize()';
  }

  /**
   * Handler for the window's 'beforeunload' event. When a user has unsaved
   * changes and refreshes or leaves the page, confirm that they want to do so
   * before actually refreshing.
   * @param {Event} event beforeunload event.
   */
  confirmLeavePage(event) {
    // TODO: Move in from app_controller.js'
    throw 'Unimplemented: confirmLeavePage()';
  }

  /**
   * Show a modal element, usually a dropdown list.
   * @param {string} id ID of element to show.
   */
  openModal(id) {
    // TODO: Move in from app_controller.js
    throw 'Unimplemented: openModal()';
  }

  /**
   * Hide a previously shown modal element.
   */
  closeModal() {
    // TODO: Move in from app_controller.js
    throw 'Unimplemented: closeModal()';
  }

  /**
   * Creates modal popup for populating inputs into block definition starter
   * block in Block Definition Editor.
   *
   * @param {boolean} firstLoad Whether the popup is generated upon first loading
   *     the application.
   */
  createBlocklyInitPopup(firstLoad) {
    /*
     * TODO: Move in from app_controller.js
     *
     * References:
     * - this.newBlockDialogController.showNewBlockDiaog(firstLoad)
     */
    throw 'Unimplemented: createBlocklyInitPopup()';
  }
}
