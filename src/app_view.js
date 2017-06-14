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
  constructor() {
    // Main window of application.
    this.win = nw.Window.get();

    // Initializes menu structure. Leaf nodes are actionable MenuItems.
    this.menuTree = {
      'File': {
        'New': {
          'New Project': null,
          'New Block': null,
          'New Library': null,
          'New Toolbox': null
        },
        'Open Project': null,
        'Save': null,
        'Save Only': {
          'Save as Web Only': null,
          'Save as iOS Only': null,
          'Save as Android Only': null
        },
        'Import': {
          'Blocks': null,
          'Library': null,
          'Toolbox': null,
          'Workspace': null
        },
        'Create Application': {
          'All Applications': null,
          'Blockly Web': null,
          'Blockly iOS': null,
          'Blockly Android': null
        }
      },
      'Edit': {},
      'Help': {}
    }

    // Initializes menubar.
    this.setMenu();
  }

  /**
   * Initializes menubar for application. Contains File, Edit, Help with
   * dropdowns to more options such as save, export, etc.
   */
  setMenu() {
    let menu = new nw.Menu({type: 'menubar'});
    let file = new nw.Menu();
    let edit = new nw.Menu();
    let help = new nw.Menu();

    // FILE > NEW dropdown.
    let file_new = new nw.Menu();
    // this.menuTree['File']['New']['New Project'] =
    //     this.addMenuItem(file_new, 'New Project', null, () => {
    //       // TODO: Action for new project.
    // });
    this.addMenuAction(file_new, ['File','New','New Project'], () => {
        // TODO: Action for new project.
        console.log("New project clicked!");
    })
    this.menuTree['File']['New']['New Block'] =
        this.addMenuItem(file_new, 'New Block', null, () => {
          this.createBlocklyInitPopup(false);
    });
    this.menuTree['File']['New']['New Library'] =
        this.addMenuItem(file_new, 'New Library', null, () => {
          // TODO: Action for new library.
    });
    this.menuTree['File']['New']['New Toolbox'] =
        this.addMenuItem(file_new, 'New Toolbox', null, () => {
          // TODO: Action for new toolbox.
    });

    // FILE > SAVE ONLY dropdown.
    let file_saveonly = new nw.Menu();
    this.menuTree['File']['Save Only']['Save as Web Only'] =
        this.addMenuItem(file_saveonly, 'Save as Web Only', null, () => {
          // TODO: Action for saving for ONLY WEB.
    });
    this.menuTree['File']['Save Only']['Save as iOS Only'] =
        this.addMenuItem(file_saveonly, 'Save as iOS Only', null, () => {
          // TODO: Action for saving for ONLY iOS.
    });
    this.menuTree['File']['Save Only']['Save as Android Only'] =
        this.addMenuItem(file_saveonly, 'Save as Android Only', null, () => {
          // TODO: Action for saving for ONLY ANDROID.
    });

    // FILE > IMPORT dropdown.
    let file_import = new nw.Menu();
    this.menuTree['File']['Import']['Blocks'] =
        this.addMenuItem(file_import, 'Blocks', null, () => {
          // TODO: Action for importing blocks.
    });
    this.menuTree['File']['Import']['Library'] =
        this.addMenuItem(file_import, 'Library', null, () => {
          // TODO: Action for importing library.
    });
    this.menuTree['File']['Import']['Toolbox'] =
        this.addMenuItem(file_import, 'Toolbox', null, () => {
          // TODO: Action for importing toolbox.
    });
    this.menuTree['File']['Import']['Workspace'] =
        this.addMenuItem(file_import, 'Workspace', null, () => {
          // TODO: Action for importing workspace.
    });

    // FILE > CREATE APPLICATION dropdown.
    let file_createapp = new nw.Menu();
    this.menuTree['File']['Create Application']['All Applications'] =
        this.addMenuItem(file_createapp, 'All Applications', null, () => {
          // TODO: Generate sample application for all three platforms.
    });
    this.menuTree['File']['Create Application']['Blockly Web'] =
        this.addMenuItem(file_createapp, 'Blockly Web', null, () => {
          // TODO: Generate sample Web Blockly application.
    });
    this.menuTree['File']['Create Application']['Blockly iOS'] =
        this.addMenuItem(file_createapp, 'Blockly iOS', null, () => {
          // TODO: Generate sample iOS Blockly application.
    });
    this.menuTree['File']['Create Application']['Blockly Android'] =
        this.addMenuItem(file_createapp, 'Blockly Android', null, () => {
          // TODO: Generate sample Android Blockly application.
    });

    // FILE dropdown.
    this.addMenuItem(file, 'New', file_new, null);
    this.menuTree['File']['Open Project'] =
        this.addMenuItem(file, 'Open Project', null, () =>{
          // TODO: Open project action.
    });
    this.menuTree['File']['Save'] =
        this.addMenuItem(file, 'Save', null, () => {
          // TODO: Save project action.
    });
    this.addMenuItem(file, 'Save Only', file_saveonly, null);
    this.addMenuItem(file, 'Import from File', file_import, null);
    this.addMenuItem(file, 'Create Application', file_createapp, null);

    // EDIT dropdown.
    this.menuTree['Edit']['Block'] =
        this.addMenuItem(edit, 'Block', null, () => {
          // TODO: Edit block action.
    });
    this.menuTree['Edit']['Library'] =
        this.addMenuItem(edit, 'Library', null, () => {
          // TODO: Edit library action.
    });
    this.menuTree['Edit']['Toolbox'] =
        this.addMenuItem(edit, 'Toolbox', null, () => {
          // TODO: Edit toolbox action.
    });
    this.menuTree['Edit']['Workspace'] =
        this.addMenuItem(edit, 'Workspace', null, () => {
          // TODO: Edit workspace action.
    });

    // General navbar buttons.
    this.addMenuItem(menu, 'File', file, null);
    this.addMenuItem(menu, 'Edit', edit, null);
    this.addMenuItem(menu, 'Help', help, null);

    this.win.menu = menu;
  }

  /**
   * Helper function for adding actions to leaf nodes of MenuTree.
   *
   * @param {!Menu} menu Menu object that we are adding an element to.
   * @param {string[]} path Path to leaf node of MenuTree we are adding to.
   * @param {function} fcn Action to take when node is clicked.
   */
  addMenuAction(menu, path, name, fcn) {
    this.addMenuItem(
        this.getMenuItem(path),
        name,
        null,
        fcn
    );
  }

  /**
   * Helper function to add menu items to the main menubar.
   *
   * @param {!Menu} menu Menu object from NW.js to which we are adding an element.
   * @param {string} name Name of element being added to menu.
   * @param {!Menu} subMenu Menu object to be added if the added element will also
   * have its own sub-dropdown. Optional (if unused, will be null).
   * @param {function} onclick Function defining what actions to take upon click.
   * Optional (if unused, will be null).
   *
   * @returns {!MenuItem} MenuItem created by method.
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
   * @returns {!MenuItem} MenuItem that the path leads to.
   */
  getMenuItem(pathToMenuItem) {
    let menuItem = this.menuTree;
    for (let i = 0; i < pathToMenuItem.length; i++) {
      try {
        menuItem = menuItem[pathToMenuItem[i]];
      } catch(e) {
        console.log(e);
        break;
      }
    }
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
