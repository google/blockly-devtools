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
     super(workspaceConfigName);

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
    //TODO: implement
    throw "unimplemented: getExportData";
  }

  /**
   * Gets the JSON object necessary to represent the workspace configuration in
   *     the navigation tree.
   * @return {!Object} The JSON representation of the workspace configuration.
   */
  getJson() {
    const workspaceConfigJson = $.extend(true, super.getJson(),
      {'id': PREFIXES.WORKSPACE_CONFIG});
    return workspaceConfigJson;
  }

  /**
   * Creates a string representation of the options, for use in making the string
   * used to inject the workspace.
   * @param {!Object} obj Object representing the options selected in the current
   *     configuration.
   * @param {string} tabChar The tab character.
   * @return {string} String representation of the workspace configuration's
   *     options.
   * @recursive
   * @private
   */
  addAttributes_(obj, tabChar) {
    // REFACTORED from wfactory_generator.js
    if (!obj) {
      return '{}\n';
    }
    var str = '';
    for (var key in obj) {
      if (key == 'grid' || key == 'zoom') {
        var temp = tabChar + key + ' : {\n' + addAttributes(obj[key],
            tabChar + '\t') + tabChar + '}, \n';
      } else if (typeof obj[key] == 'string') {
        var temp = tabChar + key + ' : \'' + obj[key] + '\', \n';
      } else {
        var temp = tabChar + key + ' : ' + obj[key] + ', \n';
      }
      str += temp;
    }
    var lastCommaIndex = str.lastIndexOf(',');
    str = str.slice(0, lastCommaIndex) + '\n';
    return str;
  }

  /**
   * Generates string necessary for injecting the workspace and starter code.
   * @return {string} String representation of starter code for injecting.
   */
  generateInjectString() {
    // REFACTORED from wfactory_generator.js
    var attributes = addAttributes_(this.options, '\t');
    if (!this.options['readOnly']) {
      attributes = 'toolbox : BLOCKLY_TOOLBOX_XML[/* TODO: Insert name of ' +
        'imported toolbox to display here */], \n' + attributes;
    }

    // Initializing toolbox
    var finalStr = `

  var BLOCKLY_OPTIONS = {
    ${attributes}
  };

  document.onload = function() {
    /* Inject your workspace */
    /* TODO: Add ID of div to inject Blockly into */
    var workspace = Blockly.inject(null, BLOCKLY_OPTIONS);
  };
  `;
    return finalStr;
  }
}
