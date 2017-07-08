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
 * @class NavigationTree manages the tree user interface.
 *
 * @author sagev@google.com (Sage Vouse)
 */
class NavigationTree {
/**
 * NavigationTree Class
 * @param {!Project} project The project the tree shall represent.
 * @constructor
 */
  constructor(project) {
    /**
     * The Project the tree represents.
     * @type {!Project}
     */
    this.project = project;

    this.makeTree();
  }

  /**
   * Returns a JSON object for initial tree.
   * @return {!Object} The JSON necessary to load the tree.
   */
  makeTreeJson() {
    // TODO(#26) : give libraries names
    // TODO(#27) : upon giving libraries names add them as roots under the project
    const data = this.project.getTreeJson();
    const tree = {
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
   */
  makeTree() {
    const treeJson = this.makeTreeJson();
    $('#navigationTree').jstree(treeJson);
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
    console.warn("unimplemented: NavigationTree.addWorkspaceContentsNode(workspaceContentsName)");
  }

  /**
   * Adds a workspace configuration to the navigation tree.
   * @param {string} workspaceConfigurationName The name of the workspace
   *     configuration to add.
   */
  addWorkspaceConfigurationNode(workspaceConfigurationName) {
    console.warn("unimplemented: NavigationTree.addWorkspaceConfigurationNode(workspaceConfigurationName)");
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
    console.warn("unimplemented: NavigationTree.deleteWorkspaceContentsNode(workspaceContentsName)");
  }

  /**
   * Deletes a workspace configuration from the navigation tree.
   * @param {string} workspaceConfignName The name of the workspace
   *     configuration node to delete.
   */
  deleteWorkspaceConfigurationNode(workspaceConfigName) {
    console.warn("unimplemented: NavigationTree.deleteWorkspaceConfigurationNode(workspaceConfigName)");
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
