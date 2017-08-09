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

goog.provide('WorkspaceConfigurationSet');

goog.require('ResourceSet');
goog.require('WorkspaceConfiguration');

/**
 * @class WorkspaceConfigurationSet is a set of WorkspaceConfiguration objects.
 */
class WorkspaceConfigurationSet extends ResourceSet {
  /**
   * WorkspaceConfigurationSet Class.
   * @param {string} workspaceConfigurationSetName The name for the set.
   * @param {string} projectName The name of the project the set belongs to.
   * @constructor
   */
  constructor(workspaceConfigurationSetName, projectName) {
    super(workspaceConfigurationSetName, projectName);
  }
}
