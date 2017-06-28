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
 * @fileoverview ToolboxController manages user interaction with the toolbox
 * editor, where users group together blocks that were defined within BlockLibrary
 * as toolboxes for their desired Blockly application.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo)
 */
class ToolboxController {
  constructor(project) {
    /**
     * Project whose library is controlled by this BlockLibraryController instance.
     * @type {!Project}
     */
    this.project = project;

    /**
     * Keeps track of which toolbox is currently being edited. Stores name of
     * toolbox.
     * @type {string}
     */
    this.currentToolboxName = '';
  }

  /**
   * Creates new toolbox to this.project.
   *
   * @param {string} toolboxName Name of new toolbox to add.
   */
  addToolbox(toolboxName) {
    /*
     * TODO: Implement
     */
  }

  /**
   * Removes toolbox from this.project's toolboxList.
   *
   * @param {string} toolboxName Name of toolbox to remove.
   */
  removeToolbox(toolboxName) {
    /*
     * TODO: Implement
     */
  }
}
