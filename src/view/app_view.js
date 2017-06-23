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

class AppView {
  constructor(appController) {
    // AppController
    this.appController = appController;

    // Main window of application.
    this.win = nw.Window.get();

    // Initializes menu structure. Leaf nodes are actionable MenuItems.
    this.menuTree = {
      'File': {
        'New': {
          'New Block': () => { this.showNewBlock(); },
          'New Project': () => { this.showNewProject(); },
          'New Library': () => { this.showNewLibrary()(); },
          'New Toolbox': () => { this.showNewToolbox(); }
        },
        'Open Project': () => { this.openProject(); },
        'Save': {
          'Save All': () => { this.saveProject(); },
          'Save as Web Only': () => { this.saveForWeb(); },
          'Save as iOS Only': () => { this.saveForIos(); },
          'Save as Android Only': () => { this.saveForAndroid(); }
        },
        'Import': {
          'Blocks': () => { this.importBlocks(); },
          'Library': () => { this.importLibrary(); },
          'Toolbox': () => { this.importToolbox(); },
          'Workspace': () => { this.importWorkspace(); }
        },
        'Create Application for Web': () => { this.createWeb(); }
      },
      'Edit': {},
      'Help': {}
    };

    // Dictionary with all MenuItems. Keys are the labels, values are the
    // nw.MenuItem's. Values are added in initMenuTree().
    this.menuItems = {};

    // Initializes menubar.
    this.mainMenu = new nw.Menu({type: 'menubar'});
    this.initMenuTree(this.mainMenu, this.menuTree);
    this.win.menu = this.mainMenu;
  }

  /**
   * Initializes the tree for the session.
   * @param {! BlockLibraryController} the libraryController for the session
   */
  setLibraryTree(libraryController) {
    //initializes navigation tree with blocks in the library
    this.navTree = new NavigationTree(libraryController);
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
    this.appController.workspaceFactoryController.newToolbox();
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
   * Initializes menu tree based off of menu tree written into
   * this.menuTree.
   *
   * @param {!nw.Menu} menu Menu to add nodes to.
   * @param {Object.<string,Object>} tree Dictionary representation of menu tree.
   */
  initMenuTree(menu, tree) {
    // If menu is null, it means that we are at the end of the tree.
    if (menu === null) {
      return tree;
    }

    for (let key in tree) {
      if (typeof tree[key] !== 'function') {
        // If next node is not leaf, must create subMenu.
        let subMenu = new nw.Menu();
        this.menuItems[key] = this.addMenuItem(menu, key, subMenu, this.initMenuTree(subMenu, tree[key]));
      } else {
        // When the child node is a function, no subMenu is necessary.
        // Replace node with MenuItem.
        this.menuItems[key] = this.addMenuItem(menu, key, null, this.initMenuTree(null, tree[key]));
      }

    }
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
}
