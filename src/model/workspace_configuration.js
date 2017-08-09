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

goog.provide('WorkspaceConfiguration');

goog.require('Resource');

/**
 * @class WorkspaceConfiguration contains workspace settings,
 *     specified by the developer and used to initialize an app's workspace.
 */
class WorkspaceConfiguration extends Resource {
  //TODO: flesh out/implement
  /**
   * WorkspaceConfiguration Class
   * @param {string} workspaceConfigName Name for the workspace configuration.
   * @constructor
   */
  constructor(workspaceConfigName) {
     super(workspaceConfigName, PREFIXES.WORKSPACE_CONFIG);

     /**
      * Options object to be configured for Blockly inject call.
      */
     this.options = Object.create(null);
  }

  /**
   * Sets a new options object for injecting a Blockly workspace.
   * @param {Object} options Options object for injecting a Blockly workspace.
   */
  setOptions(options) {
    // Moved in from wfactory_model.js
    this.options = options;
  }

  /**
   * Clears the workspace configuration.
   */
  reset() {
    this.options = Object.create(null);
  }

  /**
   * Gets the data necessary to export the workspace configuration.
   * @return {!Object} The data needed to export the workspace configuration.
   */
  getExportData() {
    let data = Object.create(null);
    super.buildMetadata(data);
    data.options = this.options;
    return data;
  }
}
