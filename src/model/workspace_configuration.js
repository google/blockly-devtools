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
 * @class WorkspaceConfiguration contains workspace settings,
 *     specified by the developer and used to initialize an app's workspace.
 */
class WorkspaceConfiguration extends Resource {
  //TODO: flesh out/implement
  /**
   * WorkspaceConfiguration Class
   * @param {string} workspaceConFigName Name for the workspace configuration.
   * @constructor
   */
  constructor(workspaceConFigName) {
    /*
     * TODO: fully implement
     *
     * References: N/A
     */
    /**
     * The name of the workspace configuration.
     * @type {string}
     */
     super(workspaceConFigName);
  }
  /**
   * Checks to see if no options have been changed/set.
   * @return {boolean} True if same as init options, false otherwise.
   */
  isDefault() {
    /*
     * TODO: implement
     *
     * References: N/A
     */
    throw "unimplemented: isDefault";
  }

  /**
   * Clears the workspace configuration.
   */
  reset() {
    /*
     * TODO: implement
     *
     * References: N/A
     *
     */
    throw "unimplemented: reset";
  }

  /**
   * Renames the workspace configuration.
   * @param {string} newName New name of the workspace configuration.
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
   * Returns whether or not the workspace configuration is unsaved.
   * @return {boolean} Whether or not there are unsaved changes.
   */
  isDirty() {
    throw "unimplemented: isDirty";
  }

  /**
   * Reads the workspace configuration from local storage.
   */
  loadFromLocalStorage() {
    throw "unimplemented: loadFromLocalStorage";
  }

  /**
   * Writes the workspace configuration to local storage.
   */
  saveToLocalStorage() {
    throw "unimplemented: saveFromLocalStorage";
  }
}
