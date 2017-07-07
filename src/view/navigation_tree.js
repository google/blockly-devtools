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
 * @fileoverview The NavigationTree manages all of the functions for changing
 * the tree view
 *
 * @author sagev@google.com (Sage Vouse)
 */

/**
 * @class NavigationTree manages the tree user interface.
 */
class NavigationTree {

/**
 * NavigationTree Class
 * @param {!AppView} appView Allows the tree to get the data from the project.
 * @constructor
 */
  constructor(appView) {
    /**
     * The AppView the tree belongs to.
     * @type {!AppView}
     */
    this.appView = appView;

    this.makeTree(blocks);
  }

  /**
   * Returns a JSON object for initial tree.
   * @param {!Object} data The JSON representation of the project data.
   * @return {!Object} The JSON necessary to load the tree.
   */
  makeTreeJson(data) {
    // TODO(#26) : give libraries names
    // TODO(#27) : upon giving libraries names add them as roots under the project
    var tree = {
      'core': {
        'check_callback': true,
        'data': data
      },
      'plugins': [ 'contextmenu', 'dnd', 'crrm'],
      'contextmenu': {
        'items': {
          'create': {
            'label': 'Add',
            'action': function (obj) {
              $('#navigationTree').jstree().create_node(
                '#',
                { 'id': 'ajason5', 'text': 'new_block' },
                'last',
                null
                );
            },
          },
          'delete': {
            'label': 'Delete Block',
            'action': function(obj) {
              $('#navigationTree').jstree().delete_node('#nodeId');
            }
          }
        }
      }
    };
    return tree;
  }

  /**
   * Populates the tree and adds its listener.
   * @param {!Object} data The JSON representation of the project data.
   */
  makeTree(data) {
    var treeJson = this.makeTreeJson(data);
    this.makeTreeListener();
    $('#navigationTree').jstree(treeJson);
  }

  /**
   * Listens for block selected in tree.
   */
  makeTreeListener() {
    $('#navigationTree').on('select_node.jstree', (e, data) => {
      // collect data of all selected blocks
      var i, j, r = [];
      for (i = 0, j = data.selected.length; i < j; i++) {
        r.push(data.instance.get_node(data.selected[i]).text);
      }
      // load the blocks
      this.libraryController.openBlock(r.join(', '));
    });
  }

  /**
   * Adds a block to the tree.
   */
  addBlockNode(blockType) {
    $('#navigationTree').jstree().create_node('#' ,
      {'id': blockType, 'text': blockType }, 'last', null);
  }

  /**
   * Adds a block library to the navigation tree.
   * @param {string} libraryName The name of the library to add.
   */
  addLibraryNode(libraryName) {
    console.warn("unimplemented: NavigationTree.addLibraryNode(libraryName)");
  }

  /**
   * Adds a toolbox to the navigation tree.
   * @param {string} toolboxName The name of the toolbox to add.
   */
  addToolboxNode(toolboxName) {
    console.warn("unimplemented: NavigationTree.addToolboxNode(toolboxName)");
  }

  /**
   * Adds a workspace contents object to the navigation tree.
   * @param {string} workspaceContentsName The name of the workspace contents to
   *     add.
   */
  addWorkspaceContentsNode(workspaceContentsName) {
    console.warn("unimplemented:
        NavigationTree.addWorkspaceContentsNode(workspaceContentsName)");
  }

  /**
   * Adds a workspace configuration to the navigation tree.
   * @param {string} workspaceConfigurationName The name of the workspace
   *     configuration to add.
   */
  addWorkspaceConfigurationNode(workspaceConfigurationName) {
    console.warn("unimplemented:
        NavigationTree.addWorkspaceConfigurationNode(workspaceConfigurationName)");
  }

  /**
   * Clears the tree.
   */
  clear() {
    $('#navigationTree').jstree('destroy');
    this.makeTree();
  }

  /**
   * Deletes a block from the tree.
   */
  deleteBlockNode(blockType) {
    $('#navigationTree').jstree().delete_node(blockType);
  }

  /**
   * Deletes a block library from the navigation tree.
   * @param {string} libraryName The name of the library node to delete.
   */
  deleteLibraryNode(libraryName) {
    console.warn("unimplemented: NavigationTree.deleteLibraryNode(libraryName)");
  }

  /**
   * Deletes a toolbox from the navigation tree.
   * @param {string} toolboxName The name of the toolbox node to delete.
   */
  deleteToolboxNode(toolboxName) {
    console.warn("unimplemented: NavigationTree.deleteToolboxNode(toolboxName)");
  }

  /**
   * Deletes a workspace contents object from the navigation tree.
   * @param {string} workspaceContentsName The name of the workspace contents
   *     node to delete.
   */
  deleteWorkspaceContentsNode(workspaceContentsName) {
    console.warn("unimplemented:
        NavigationTree.deleteWorkspaceContentsNode(workspaceContentsName)");
  }

  /**
   * Deletes a workspace configuration from the navigation tree.
   * @param {string} workspaceConfignName The name of the workspace
   *     configuration node to delete.
   */
  deleteWorkspaceConfigurationNode(workspaceConfigName) {
    console.warn("unimplemented:
        NavigationTree.deleteWorkspaceConfigurationNode(workspaceConfigName)");
  }

  /**
   * Creates menu for right click functionality.
   * @return {!Object} The right click menu for the nodes in the tree.
   * //TODO: add right click functionality to tree
   */
   createMenu() {
    const items = {
      renameElement : {
        label: "Rename",
        action: () => console.warn("Action undefined");
        //TODO: add function for renaming node and associated element
      },
      deleteElement : {
        label: "Delete",
        action: () => console.warn("Action undefined");
        //TODO: add function for deleting node and associated element
      },
      exportElement : {
        label: "Export",
        action: () => console.warn("Action undefined");
        //TODO: add function for exporting associated element
      }
    };
    //TOOD: Add if statements for type-specfic options (as needed).
    return items;
  }
}
