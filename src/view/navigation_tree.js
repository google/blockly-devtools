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

/*
 * Global constants for organizing different node types, used when giving them
 *     ids. Given with the assumption that the name of each object in a
 *     project is unique across that project.
 */
const BLOCK_PREFIX = 'Block';
const TOOLBOX_PREFIX = 'Toolbox';
const LIBRARY_PREFIX = 'BlockLibrary';
const WORKSPACE_CONTENTS_PREFIX = 'WorkspaceContents';
const WORKSPACE_CONFIG_PREFIX = 'WorkspaceConfiguration';

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
    const data = this.project.getTreeJson(TOOLBOX_PREFIX, LIBRARY_PREFIX,
      WORKSPACE_CONTENTS_PREFIX, WORKSPACE_CONFIG_PREFIX);
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
    this.addComponentNode(BLOCK_PREFIX, blockType, libraryName);
  }

  /**
   * Adds toolbox to the tree.
   *
   * @param {string} toolboxName Name of the toolbox to add to the tree.
   */
  addToolboxNode(toolboxName) {
    this.addComponentNode(TOOLBOX_PREFIX, toolboxName, TOOLBOX_PREFIX);
  }

  /**
   * Adds WorkspaceContents to the tree.
   *
   * @param {string} workspaceContentsName Name of the WorkspaceContents to
   *     add to the tree.
   */
  addWorkspaceContentsNode(workspaceContentsName) {
    this.addComponentNode(WORKSPACE_CONTENTS_PREFIX, workspaceContentsName,
        WORKSPACE_CONTENTS_PREFIX);
  }

  /**
   * Adds WorkspaceConfiguration to the tree.
   *
   * @param {string} workspaceConfigName Name of the WorkspaceConfiguration
   *     to add to the tree.
   */
  addWorkspaceConfigurationNode(workspaceConfigName) {
    this.addComponentNode(WORKSPACE_CONFIG_PREFIX, workspaceConfigName,
        WORKSPACE_CONFIG_PREFIX);
  }

  /**
   * Adds BlockLibrary to the tree.
   *
   * @param {string} libraryName Name of BlockLibrary to add to the tree.
   */
  addBlockLibraryNode(libraryName) {
    this.addComponentNode(LIBRARY_PREFIX, libraryName, LIBRARY_PREFIX);
  }

  /**
   * Adds a component of the project (BlockLibrary, Toolbox, WorkspaceContents,
   *     or WorkspaceConfiguration) to the navigation tree.
   * @param {string} prefix The prefix of the node's id.
   * @param {string} componentName The name of the component to add.
   * @param {string} parentName The name of the parent of the new node.
   */
  addComponentNode(prefix, componentName, parentName) {
    $('#navigationTree').jstree().create_node(parentName,
      {'id': prefix + '_' + componentName, 'text': componentName }, 'last', null);
  }

  /**
   * Clears the tree.
   */
  clear() {
    $('#navigationTree').jstree('destroy');
    this.makeTree();
  }

  /**
   * Removes a blcok from the tree.
   * @param {string} blockType The name of the block to be removed.
   */
  deleteBlockNode(blockType) {
    deleteComponentNode(BLOCK_PREFIX, blockType);
  }

  /**
   * Removes toolbox from the tree.
   *
   * @param {string} toolboxName Name of the toolbox to remove from the tree.
   */
  deleteToolboxNode(toolboxName) {
    deleteComponentNode(TOOLBOX_PREFIX, toolboxName);
  }

  /**
   * Removes WorkspaceContents from the tree.
   *
   * @param {string} workspaceContentsName Name of the WorkspaceContents to
   *     remove from the tree.
   */
  deleteWorkspaceContentsNode(workspaceContentsName) {
    deleteComponentNode(WORKSPACE_CONTENTS_PREFIX, workspaceContentsName);
  }

  /**
   * Removes a WorkspaceConfiguration from the tree
   *
   * @param {string} workspaceConfigName Name of the
   *     WorkspaceConfiguration to remove from the tree.
   */
  deleteWorkspaceConfigurationNode(workspaceConfigName) {
    deleteComponentNode(WORKSPACE_CONFIG_PREFIX, workspaceConfigName);
  }

  /**
   * Removes a BlockLibrary from the tree.
   *
   * @param {string} blockLibraryName The name of the BlockLibrary to remove
   *     from the tree.
   */
  deleteBlockLibraryNode(blockLibraryName) {
    deleteComponentNode(LIBRARY_PREFIX, blockLibraryName);
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
   * Gives appropriate response for selected node. Switches the tab if
   *     necessary, opens the block if appropriate.
   * @param {string} id The id of the selected node.
   */
  changeView(id) {
    const prefix = id.split('_')[0];
    console.log(prefix);
    if (prefix === LIBRARY_PREFIX) {
      //Here's where tab switching happens
      console.log('Node type: BlockLibray. No response has been coded.');
    } else if (prefix === TOOLBOX_PREFIX) {
      //Here's where tab switching happens
      console.log('Node type: Toolbox. No response has been coded.');
    } else if (prefix === WORKSPACE_CONTENTS_PREFIX || prefix === WORKSPACE_CONFIG_PREFIX) {
      //Here's where tab switching happens
      console.log('Node type: Workspace Contents or Configuration. No response has been coded.');
    } else if (prefix === BLOCK_PREFIX) {
      // Open the block.
      this.appController.editorController.blockEditorController.view.openBlock(id);
    }
  }

  /**
   * Listens for block selected in tree.
   */
  makeTreeListener() {
    $('#navigationTree').on('select_node.jstree', (e, data) => {
      // Collect id of first selected block.
      const node = $('#navigationTree').jstree('get_selected')[0];
      //TODO #99: switch tab if necessary
      // Respond to selection.
      this.changeView(node);
    });
  }
}
