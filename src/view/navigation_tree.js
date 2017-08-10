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

// TODO: Move PREFIXES out of app_controller to fix dependencies.
// goog.require('PREFIXES');
goog.require('Project');

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
   * @constructor
   */
  constructor(appController) {

    /**
     * The AppController for the tree to listen to.
     * @type {!AppController}
     */
    this.appController = appController;

    this.makeTree_();
  }

  /**
   * Returns a JSON object for initial tree.
   * @return {!Object} The JSON necessary to load the tree.
   */
  makeTreeJson() {
    const data = this.appController.project.getNavTreeJson();
    data['state'] = {
        'opened': true
      };
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
      },
      'plugins' : ['types'],
      'types': Object.create(null)  // See below.
     };

    // TODO: Make icons 24px and reference via CSS class.
    tree.types[PREFIXES.BLOCK] = {
          // TODO(#221): Map block icon by block hue.
          'icon' : '../media/ic_block.png'
        };
    tree.types[PREFIXES.TOOLBOX] = {
          'icon' : '../media/ic_toolbox.png'
        };
    tree.types[PREFIXES.WORKSPACE_CONTENTS] = {
          'icon' : '../media/ic_workspace.png'
        };
    tree.types[PREFIXES.WORKSPACE_CONFIG] = {
          'icon' : '../media/ic_config.png'
        };
    return tree;
  }

  /**
   * Returns JSTree object. Used for calling JSTree operations on navtree.
   * @return {!JsTree}
   */
  getTree() {
    return $('#navigationTree').jstree();
  }

  /**
   * Returns the name of the resource associated with the currently selected
   * node in the navtree. If the selected node is not associated with a
   * resource object (e.g. a general "Block Libraries" division node), returns
   * the ID and sends a warning into the console.
   * @return {string} Name of selected resource.
   */
  getSelectedName() {
    const idList = this.getTree().get_selected()[0].split(/_(.+)/);
    if (idList.length == 1) {
      console.warn('The retrieved selected node is not a resource node.');
      return idList[0];
    } else {
      return idList[1];
    }
  }

  /**
   * Populates the tree and adds its listener.
   * @private
   */
  makeTree_() {
    const treeJson = this.makeTreeJson();
    this.makeTreeListener_();
    $('#navigationTree').jstree(treeJson);
  }

  /**
   * Wrapper event handler for jstree on ready event.
   * @param {function} Function to execute when jstree is finished loading.
   */
  ready(onReady) {
    $('#navigationTree').on('ready.jstree', () => {
      onReady();
    });
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
    this.addComponentNode(PREFIXES.BLOCK, blockType, PREFIXES.LIBRARY + '_' + libraryName);
  }

  /**
   * Adds BlockLibrary to the tree.
   *
   * @param {string} libraryName Name of BlockLibrary to add to the tree.
   */
  addBlockLibraryNode(libraryName) {
    this.addComponentNode(PREFIXES.LIBRARY, libraryName,
        PREFIXES.LIBRARY);
  }

  /**
   * Adds toolbox to the tree.
   *
   * @param {string} toolboxName Name of the toolbox to add to the tree.
   */
  addToolboxNode(toolboxName) {
    this.addComponentNode(PREFIXES.TOOLBOX, toolboxName,
        PREFIXES.TOOLBOX);
  }

  /**
   * Adds WorkspaceContents to the tree.
   *
   * @param {string} workspaceContentsName Name of the WorkspaceContents to
   *     add to the tree.
   */
  addWorkspaceContentsNode(workspaceContentsName) {
    this.addComponentNode(PREFIXES.WORKSPACE_CONTENTS, workspaceContentsName,
        PREFIXES.WORKSPACE_CONTENTS);
  }

  /**
   * Adds WorkspaceConfiguration to the tree.
   *
   * @param {string} workspaceConfigName Name of the WorkspaceConfiguration
   *     to add to the tree.
   */
  addWorkspaceConfigurationNode(workspaceConfigName) {
    this.addComponentNode(PREFIXES.WORKSPACE_CONFIG, workspaceConfigName,
        PREFIXES.WORKSPACE_CONFIG);
  }

  /**
   * Adds a component of the project (BlockLibrary, Toolbox, WorkspaceContents,
   *     or WorkspaceConfiguration) to the navigation tree.
   * @param {string} prefix The prefix of the node's id.
   * @param {string} componentName The name of the component to add.
   * @param {string} parentName The name of the parent of the new node.
   */
  addComponentNode(prefix, componentName, parentName) {
    const tree = this.getTree();
    const id = prefix + '_' + componentName;
    const data = {
        'id': id,
        'type': prefix,
        'text': componentName
      };
    tree.create_node(parentName, data, 'last', null);
    tree.open_node(prefix);
    tree.deselect_all();
    tree.select_node(id);
  }

  /**
   * Clears the tree.
   */
  clear() {
    $('#navigationTree').jstree('destroy');
    this.makeTree_();
  }

  /**
   * Removes a blcok from the tree.
   * @param {string} blockType The name of the block to be removed.
   */
  deleteBlockNode(blockType) {
    this.deleteComponentNode(PREFIXES.BLOCK, blockType);
  }

  /**
   * Removes a BlockLibrary from the tree.
   *
   * @param {string} blockLibraryName The name of the BlockLibrary to remove
   *     from the tree.
   */
  deleteBlockLibraryNode(blockLibraryName) {
    this.deleteComponentNode(PREFIXES.LIBRARY, blockLibraryName);
  }

  /**
   * Removes toolbox from the tree.
   *
   * @param {string} toolboxName Name of the toolbox to remove from the tree.
   */
  deleteToolboxNode(toolboxName) {
    this.deleteComponentNode(PREFIXES.TOOLBOX, toolboxName);
  }

  /**
   * Removes WorkspaceContents from the tree.
   *
   * @param {string} workspaceContentsName Name of the WorkspaceContents to
   *     remove from the tree.
   */
  deleteWorkspaceContentsNode(workspaceContentsName) {
    this.deleteComponentNode(PREFIXES.WORKSPACE_CONTENTS, workspaceContentsName);
  }

  /**
   * Removes a WorkspaceConfiguration from the tree
   *
   * @param {string} workspaceConfigName Name of the
   *     WorkspaceConfiguration to remove from the tree.
   */
  deleteWorkspaceConfigurationNode(workspaceConfigName) {
    this.deleteComponentNode(PREFIXES.WORKSPACE_CONFIG, workspaceConfigName);
  }

  /**
   * Renames node text and ID in tree to match the new resource name.
   * @param {string} id ID of node to rename.
   * @param {string} newName New text to display in the given node.
   */
  renameNode(id, newName) {
    const tree = this.getTree();
    const node = tree.get_node(id);
    tree.rename_node(node, newName);
    tree.set_id(node, id.split('_')[0] + '_' + newName);
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
   * @private
   */
   createMenu_() {
    // TODO(#210): add right click functionality to tree
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
   * @throws When name of resource extracted from the clicked tree node is
   *     empty or null.
   */
  changeView(id) {
    const nodeInfo = id.split(/_(.+)/);
    const prefix = nodeInfo[0];
    const name = nodeInfo[1];

    if (!name) {
      throw 'Name of resource associated with node element is null or empty. ID' +
          ' was ' + id + '.';
    }

    if (prefix === PREFIXES.LIBRARY) {
      const library = this.appController.project.getBlockLibrary(name);
      const blockDef = library.getBlockDefinition(Object.keys(library.blocks)[0]);
      if (blockDef) {
        this.getTree().deselect_all();
        this.getTree().select_node(PREFIXES.BLOCK + '_' + blockDef.type());
      }
    } else if (prefix === PREFIXES.TOOLBOX) {
      this.appController.switchEnvironment(AppController.TOOLBOX_EDITOR,
          this.appController.project.getToolbox(name));
    } else if (prefix === PREFIXES.WORKSPACE_CONTENTS) {
      this.appController.switchEnvironment(AppController.WORKSPACE_EDITOR,
          this.appController.project.getWorkspaceContents(name));
    } else if (prefix === PREFIXES.WORKSPACE_CONFIG) {
      this.appController.switchEnvironment(AppController.WORKSPACE_EDITOR,
          this.appController.project.getWorkspaceConfiguration(name));
    } else if (prefix === PREFIXES.BLOCK) {
      const library = this.appController.projectController.getLibrary(name);
      this.appController.switchEnvironment(AppController.BLOCK_EDITOR,
          library.getBlockDefinition(name));
    }
  }

  /**
   * Listens for block selected in tree.
   * @private
   */
  makeTreeListener_() {
    $('#navigationTree').on('select_node.jstree', (e, data) => {
      // Collect id of first selected block.
      const node = $('#navigationTree').jstree('get_selected')[0];
      // Respond to selection.
      this.changeView(node);
    });
  }
}
