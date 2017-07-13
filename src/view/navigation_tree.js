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
 * @param {!AppController} appController The AppController for the session the
 *     tree is part of, and therefore must use in the listener.
 * @param {!Project} project The project the tree represents.
 * @constructor
 */
  constructor(appController, project) {

    /**
     * The AppController for the tree to listen to.
     * @type {!AppController}
     */
    this.appController = appController;

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
    this.makeTreeListener();
    $('#navigationTree').jstree(treeJson);
  }

  /**
   * Adds a block to the tree.
   * @param {string} blockType The name of the block to be added.
   * @param {string} componentName The name of the component to add it under.
   */
  addBlockNode(blockType, componentName) {
    $('#navigationTree').jstree().create_node(componentName,
      {'id': 'block_' + blockType, 'text': blockType }, 'last', null);
  }

  /**
   * Adds a component of the project (BlockLibrary, Toolbox, WorkspaceContents,
   *     or WorkspaceConfiguration) to the navigation tree.
   * @param {string} componentType The type of component that is being added.
   * @param {string} componentName The name of the component to add.
   */
  addComponentNode(componentType, componentName) {
    $('#navigationTree').jstree().create_node(componentType,
      {'id': componentType + '_' + blockType, 'text': blockType }, 'last', null);

  /**
   * Clears the tree.
   */
  clear() {
    $('#navigationTree').jstree('destroy');
    this.makeTree();
  }

  /**
   * Deletes a block from the tree.
   * @param {string} blockType The name of the block node to remove.
   */
  deleteBlockNode(blockType) {
    $('#navigationTree').jstree().delete_node('block_' + blockType);
  }

  /**
   * Deletes a component of the project (BlockLibrary, Toolbox, WorkspaceContents,
   *     or WorkspaceConfiguration) from the navigation tree.
   * @param {string} componentType The type of the component to delete.
   * @param {string} componentName The name of the component to delete.
   */
  deleteComponentNode(componentType, componentName) {
    $('#navigationTree').jstree().delete_node(componentType + '_' + componentName);
  }

  /**
   * Creates menu for right click functionality.
   * @return {!Object} The right click menu for the nodes in the tree.
   * //TODO: add right click functionality to tree
   */
   createMenu() {
    const items = {
      renameElement : {
        label: 'Rename',
        action: () => {
          // TODO: add function for renaming node and associated element
          console.warn('Action undefined');
        }
      },
      deleteElement : {
        label: 'Delete',
        action: () => {
          // TODO: add function for deleting node and associated element
          console.warn('Action undefined');
        }
      },
      exportElement : {
        label: 'Export',
        action: () => {
          // TODO: add function for exporting associated element
          console.warn('Action undefined');
        }
      }
    };
    //TOOD: Add if statements for type-specfic options (as needed).
    return items;
  }

  /**
   * Listens for block selected in tree.
   */
  makeTreeListener() {
    $('#navigationTree').on('select_node.jstree', (e, data) => {
      // collect data of all selected blocks
      let i, j;
      let r = [];
      for (i = 0, j = data.selected.length; i < j; i++) {
        r.push(data.instance.get_node(data.selected[i]).text);
      }
      // load the blocks
     this.appController.editorController.view.openBlock(r.join(', '));

      //TODO #99: switch tab if necessary
    });
  }
}
