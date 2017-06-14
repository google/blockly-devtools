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

goog.require('BlockFactory');
goog.require('FactoryUtils');
goog.require('BlockLibraryController');
goog.require('BlockExporterController');
goog.require('goog.dom.classlist');
goog.require('goog.ui.PopupColorPicker');
goog.require('goog.ui.ColorPicker');

/**
 * @fileoverview The AppView Class deals with the visual parts of the main
 * devtools application, such as the menubar.
 *
 * @author celinechoo (Celine Choo)
 */
class AppView {
  constructor(appController) {
    this.controller = appController;
    console.log('Init name: ' + this.controller.name);

    // Main window of application.
    this.win = nw.Window.get();

    // this.showNewBlock = function() { console.log("New Block."); };

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

    this.mainMenu = new nw.Menu({type: 'menubar'});
    // Initializes menubar.
    this.initMenuTree(this.mainMenu, this.menuTree);
    this.win.menu = this.mainMenu;

    console.log("Disabling New Block.");
    this.enableMenuItem(['File','New','New Block'], false);
  }

  /**
   * Opens popup when clicking on New Block in menubar.
   */
  showNewBlock() {
    this.controller.createBlocklyInitPopup(false);
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
   * Initializes menu tree based off of menu tree written into
   * this.menuTree.
   */
  initMenuTree(menu, tree) {
    // If menu is null, it means that we are at the end of the tree.
    if (menu === null) {
      return tree;
    }

    let subMenu;
    for (let key in tree) {
      if (typeof tree[key] !== 'function') {
        // If next node is not leaf, must create subMenu.
        subMenu = new nw.Menu();
      } else {
        // When the child node is a function, no subMenu is necessary.
        subMenu = null;
      }
      this.addMenuItem(menu, key, subMenu, this.initMenuTree(subMenu, tree[key]));
    }
    return null;
  }

  /**
   * Helper function to add menu items to the main menubar.
   *
   * @param {!nw.Menu} menu Menu object from NW.js to which we are adding an element.
   * @param {string} name Name of element being added to menu.
   * @param {!nw.Menu} subMenu Menu object to be added if the added element will also
   *      have its own sub-dropdown. Optional (if unused, will be null).
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
   * Given an array of the click path to a desired menu item, this returns the
   * MenuItem object that the path leads to.
   *
   * @param {string[]} pathToMenuItem Click path to desired menu item.
   *
   * @returns {!nw.MenuItem} MenuItem that the path leads to.
   */
  getMenuItem(pathToMenuItem) {
    let menuItem = this.menuTree;
    for (let i = 0; i < pathToMenuItem.length; i++) {
      if (menuItem[pathToMenuItem[i]] === undefined) {
        console.log("Undefined found: " + pathToMenuItem[i]);
        menuItem.submenu = new nw.Menu();
        menuItem = addMenuItem(menuItem, pathToMenuItem[i], null, null);
        throw new Error('Trying to find path to a MenuItem that does not exist.');
      } else {
        console.log("Found: " + pathToMenuItem[i]);
        menuItem = menuItem[pathToMenuItem[i]];
      }
    }
    console.log("Menuitem: "+ menuItem.enabled);
    return menuItem;
  }

  /**
   * Given a path to a menu item, this enables or disables the item so that
   * users cannot click on it to activate the associated action/function.
   *
   * @param {string[]} pathToMenuItem Click path to desired menu item to toggle.
   * @param {boolean} enable Whether to enable or disable the MenuItem (true is
   * to enable).
   */
  enableMenuItem(pathToMenuItem, enable) {
    this.getMenuItem(pathToMenuItem).enabled = enable;
  }
}
