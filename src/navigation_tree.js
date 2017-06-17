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
 * @author sagev (Sage Vouse)
 */

/**
 * @class NavigationTree manages the tree user interface.
 */
class NavigationTree {

/**
 * NavigationTree Class
 * @param {!BlockLibraryController} libraryController allows tree to get blocks
 *    in library
 * @constructor
 */
  constructor(libraryController) {
    this.libraryController = libraryController;
    var blocks = this.libraryController.getStoredBlockTypes();
    this.makeTree(blocks);
  }

  /**
   * Returns JSON object of library's blocktypes.
   * @return {!Object} the JSON of all block types
   */
  makeBlockTypeJson() {
    if (this.libraryController.hasEmptyBlockLibrary()) {
      return '';
    }
    var treeBlockTypeJson = [];
    var types= this.libraryController.getStoredBlockTypes();
    var iterationIndex = 1;
    var finalIndex = 0;
    var toAdd;
    var blockType;
    while (types[iterationIndex]) {
      blockType= types[iterationIndex - 1];
      toAdd = {'text': blockType, 'id': blockType};
      treeBlockTypeJson.push(toAdd);
      iterationIndex++;
      finalIndex++;
    }
    blockType = types[finalIndex];
    toAdd = { 'text': blockType, 'id': blockType};
    treeBlockTypeJson.push(toAdd);
    return treeBlockTypeJson;
  }

  /**
   * Returns a JSON object for initial tree.
   * @return {!Object} the JSON necessary to load the tree
   */
  makeTreeJson() {
    // TODO(#26) : give libraries names
    // TODO(#27) : upon giving libraries names add them as roots under the project
    var data = this.makeBlockTypeJson();
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
   */
  makeTree() {
    var treeJson = this.makeTreeJson();
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
   * Clears a block library from the tree.
   */
  clearLibrary() {
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
   * Adds a block to the tree.
   */
  addBlockNode(blockType) {
    $('#navigationTree').jstree().create_node('#' ,
      {'id': blockType, 'text': blockType }, 'last', null);
  }
}
