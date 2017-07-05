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
 * @class Workspacecontents contains a set of positioned blocks
 *    specified by the developer and used to initialize an app's workspace.
 */
class WorkspaceContents extends Resource {
  /**
   * WorkspaceContents Class
   * @param {string} workspaceContentsName The name for the workspace contents.
   * @constructor
   */
  constructor(workspaceContentsName) {
    /*
     * TODO: fully implement
     *
     * References: N/A
     */
     super(workspaceContentsName);
  }

  /**
   * Saves block to block workspace contents.
   * @param {string} blockType Type of block.
   * @param {Element} blockXML The block's XML pulled from workspace contents.
   */
  addBlock(blockType, blockXML) {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - addBlock(blockType, blockXML)
     */
    throw "unimplemented: addBlock";
  }

  /**
   * Clears the workspace contents.
   */
  clear() {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - clear()
     */
    throw "unimplemented: clear";
  }

  /**
   * Checks to see if block workspace contents is empty.
   * @return {boolean} True if empty, false otherwise.
   */
  isEmpty() {
    /*
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - isEmpty()
     */
    throw "unimplemented: isEmpty";
  }

  /**
   * Returns boolean of whether or not a given blockType is stored in the
   * workspace contents.
   * @param {string} blockType Type of block.
   * @return {boolean} Whether or not blockType is in the workspace contents.
   */
  has(blockType) {
    /*
     * TODO: make specific to the nature of the workspace//more useful; perhaps
     *     use something other than blockType
     * TODO: implement
     *
     * References: src/block_library_storage.js
     * - has(blockType)
     *
     * Additional reference: src/block_library_controller.js
     * - has(blockType)
     *
     */
    throw "unimplemented: has";
  }

  /**
   * Renames the workspace contents.
   * @param {string} newName New name of the workspace contents.
   */
  setName(newName) {
    /*
     * TODO: implement
     *
     * References: N/A
     */
    throw "unimplemented: setName";
  }

  /**
   * Gets the data necessary to export the workspace contents.
   * @return {!Object} The data needed to export the workspace contents
   */
  getExportData() {
    //TODO: implement
    throw "unimplemented: getExportData";
  }
  //TODO: Create getters/has specified for nature of workspaceContents
}
