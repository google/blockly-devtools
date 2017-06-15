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
 * @fileoverview The ProjectController Class manages projects, and thus controls
 * The libraries, toolboxes, and workspaces contained within them
 *
 * @author sagev (Sage Vouse)
 */

/**
 * Block Library Controller Class
 * @param {string} projectName Desired name of project, used for local storage
 * and tree population
 * //TODO(#34): add multiple projects
 * @constructor
 */
ProjectController = function(projectName) {
  this.name = projectName;
  // Create array of libraries, add first one
  this.libraries = [];
  //TODO(#26): actually have users choose names
  //TODO(#36): invoke previous name upon first load
  this.libraries.push(new BlockLibraryController(tree, 'blockLibrary'));

};

/**
 * Returns JSON object of library's blocktypes.
 * @return JSON of all block types
 */
BlockLibraryController.prototype.makeBlockTypeJson= function() {
  if (this.hasEmptyBlockLibrary()) {
    return '';
  }
  var treeBlockTypeJson = [];
  var types= this.storage.getBlockTypes();
  var iterationIndex = 1;
  var finalIndex = 0;
  var toAdd;
  var blockType;
  while (types[iterationIndex]) {
    blockType= types[iterationIndex - 1];
    toAdd = {"text" : blockType, "id" : blockType};
    treeBlockTypeJson.push(toAdd);
    iterationIndex++;
    finalIndex++;
  }
  blockType = types[finalIndex];
  toAdd = { "text" : blockType, "id" : blockType};
  treeBlockTypeJson.push(toAdd);
  return treeBlockTypeJson;
};

/**
 * Returns a JSON object for initial tree.
 * @return the JSON necessary to load the tree
 */
BlockLibraryController.prototype.makeTreeJson = function() {
  // TODO(#26) : give libraries names
  // TODO(#27) : upon giving libraries names add them as roots under the project
  var data = this.makeBlockTypeJson();
  var library = {
    "core" : {
      "check_callback" : true,
      "data" : data
    },
    "plugins" : [ "contextmenu", "dnd", "crrm"],
    "contextmenu": {
      "items": {
        "create": {
          "label": "Add",
          "action": function (obj) {
            $('#navigationTree').jstree().create_node('#' , { "id" :
              "ajason5", "text" : "new_block"}, "last", null);
          },
        },
        "delete": {
          "label" : "Delete Block",
          "action": function(obj) {
            $('#navigationTree').jstree().delete_node('#nodeId');
          }
        }
      }
    }
  };
  return library;
};

/**
 * Populate tree and ready it for listening
 */
BlockLibraryController.prototype.buildTree = function() {
  var treeJson= this.makeTreeJson();
  this.makeTreeListener();
  $('#navigationTree').jstree(treeJson);
};

/**
* Listen for block selected in tree
*/
BlockLibraryController.prototype.makeTreeListener = function() {
  $('#navigationTree').on('select_node.jstree', (e, data) => {
    // collect data of all selected blocks
    var i, j, r = [];
    for (i = 0, j = data.selected.length; i < j; i++) {
      r.push(data.instance.get_node(data.selected[i]).text);
    }
    // load the blocks
    this.openBlock(r.join(', '));
  });
};