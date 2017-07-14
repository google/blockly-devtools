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

goog.provide('NavigationTree');

goog.require('Project');

/**
 * @class NavigationTree manages the tree user interface.
 *
 * @author sagev@google.com (Sage Vouse)
 */
class NavigationTree {
  /**
   * Global constants for organizing different node types, used when placing
   *     nodes in proper sections of the tree and giving them ids. Given with
   *     the assumption that the name of each object in a project is unique
   *     across that project.
   */
  toolboxPrefix = "Toolbox";
  libraryPrefix = "BlockLibrary";
  workspaceContentsPrefix = "WorkspaceContents";
  workspaceConfigPrefix = "WorkspaceConfiguration";

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
   * @param {string} libraryName The name of the library to add it under.
   */
  addBlockNode(blockType, libraryName) {
    /*
     * NOTE: The libraryName is the given prefix due to the assumption that
     *     blocktypes are unique across all libraries in the project.
     */
    addComponentNode(libraryName, blockType);
  }

  /**
   * Adds toolbox to the tree.
   *
   * @param {string} toolboxName Name of the toolbox to add to the tree.
   */
  addToolboxNode(toolboxName) {
    addComponentNode(toolboxPrefix, toolboxName);
  }

  /**
   * Adds WorkspaceContents to the tree.
   *
   * @param {string} workspaceContentsName Name of the WorkspaceContents to
   *     add to the tree.
   */
  addWorkspaceContentsNode(workspaceContentsName) {
    addComponentNode(workspaceContentsPrefix, workspaceContentsName);
  }

  /**
   * Adds WorkspaceConfiguration to the tree.
   *
   * @param {string} workspaceConfigName Name of the WorkspaceConfiguration
   *     to add to the tree.
   */
  addWorkspaceConfigurationNode(workspaceConfigName) {
    addComponentNode(workspaceConfigPrefix, workspaceConfigName);
  }

  /**
   * Adds BlockLibrary to the tree.
   *
   * @param {string} libraryName Name of BlockLibrary to add to the tree.
   */
  addBlockLibraryNode(libraryName) {
    addComponentNode(libraryPrefix, libraryName);
  }

  /**
   * Adds a component of the project (BlockLibrary, Toolbox, WorkspaceContents,
   *     or WorkspaceConfiguration) to the navigation tree.
   * @param {string} prefix Indicates where the node will be placed in the tree
   *     as well as what will be the beginning of its id.
   * @param {string} componentName The name of the component to add.
   */
  addComponentNode(prefix, componentName) {
    $('#navigationTree').jstree().create_node(prefix,
      {'id': prefix + '_' + componentName, 'text': componentName }, 'last', null);

  /**
   * Clears the tree.
   */
  clear() {
    $('#navigationTree').jstree('destroy');
    this.makeTree();
  }

  /**
   * Removes toolbox from the tree.
   *
   * @param {string} toolboxName Name of the toolbox to remove from the tree.
   */
  deleteToolboxNode(toolboxName) {
    deleteComponentNode(toolboxPrefix, toolboxName);
  }

  /**
   * Removes WorkspaceContents from the tree.
   *
   * @param {string} workspaceContentsName Name of the WorkspaceContents to
   *     remove from the tree.
   */
  deleteWorkspaceContentsNode(workspaceContentsName) {
    deleteComponentNode(workspaceContentsPrefix, workspaceContentsName);
  }

  /**
   * Removes a WorkspaceConfiguration from the tree
   *
   * @param {string} workspaceConfigName Name of the
   *     WorkspaceConfiguration to remove from the tree.
   */
  deleteWorkspaceConfigurationNode(workspaceConfigName) {
    deleteComponentNode(workspaceConfigPrefix, workspaceConfigName);
  }

  /**
   * Removes a BlockLibrary from the tree.
   *
   * @param {string} blockLibraryName The name of the BlockLibrary to remove
   *     from the tree.
   */
  deleteBlockLibraryNode(blockLibraryName) {
    deleteComponentNode(libraryPrefix, blockLibraryName);
  }

  /**
   * Deletes a component of the project (BlockLibrary, Toolbox, WorkspaceContents,
   *     or WorkspaceConfiguration) from the navigation tree.
   * @param {string} prefix The prefix of the node to delete.
   * @param {string} componentName The name of the component to delete.
   */
  deleteComponentNode(prefix, componentName) {
    $('#navigationTree').jstree().delete_node(prefix + '_' + componentName);
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
     this.appController.editorController.blockEditorController.view.openBlock(r.join(', '));

      //TODO #99: switch tab if necessary
    });
  }
}
