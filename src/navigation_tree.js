/**
 * @license
 * Blockly Demos: Block Factory
 *
 * Copyright 2016 Google Inc.
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
 * @fileoverview Contains the code for the Navigation Tree, which
 * depends on Block Library. Provides the
 * interface for the user to navigate all blocks in their library
 * Depends on BlockLibraryController functions defined in block_library_controller.js.
 *
 * @author svouse (Sage Vouse)
 */

NavigationTree = function(appController){
	this.controller = appController;
}

/**
 * Return a JSON string of all blocks in Library
 * @return the block library as a JSON string
 */
NavigationTree.prototype.makeLibraryJSON = function(){
  // TODO: svouse: give Block Libraries names
  // TODO: svouse: upon giving Block Libraries names add them as roots
   var libraryTreeJSON = '{ "core" : { "data" : [ { "text" : "LIBRARYNAME", "children" : [';
    var types= this.controller.blockLibraryController.storage.getBlockTypes();
    var i = 1;
    var x = 0;
    for(;types[i];){
      libraryTreeJSON += '{ "text" :' + "\"" + types[i-1] + "\"" + '},';
      i++;
      x++;
    }
    libraryTreeJSON += '{ "text" :' + "\"" + types[x] + "\"" + '} ] } ] } }';
    return libraryTreeJSON;
};

/**
 * Populate the tree with contents of Block Library.  Called on page load.
 */
NavigationTree.prototype.populateTree = function(){
  var libraryTreeJSON= this.makeLibraryJSON();
    var x= JSON.parse(libraryTreeJSON);
    this.makeTreeListener();
     $('#treeNavigation').jstree(x);
};

/**
* 
*/
NavigationTree.prototype.makeTreeListener = function(){
    $('#treeNavigation')
    .on('changed.jstree', function (e, data){
      var i, j, r=[];
      for(i=0, j=data.selected.length; i< j; i++){
        r.push(data.instance.get_node(data.selected[i]).text);
      }
      this.controller.blockLibraryController.openBlock(r.join(', '));
    });
  };

  NavigationTree.prototype.addToTree = function(blockType){
  var current = $('#treeNavigation').jstree('get_selected');
  var id = $('#treeNavigation').jstree.create_node
}