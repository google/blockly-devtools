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
   *
   * @constructor
   */
  constructor(workspaceConfigurationSetName, projectName) {
    super(workspaceConfigurationSetName, projectName, WorkspaceConfiguration);
  }

  /**
   * Adds a workspace configurationto the set.
   * @param {string} workspaceConfigurationName The name of the workspace
   *     configuration to be added.
   */
  addWorkspaceConfiguration(workspaceConfigurationName) {
    super.addResource(workspaceConfigurationName);
  }

  /**
   * Removes a workspace configuration from the set.
   * @param {string} workspace configurationName The name of the workspace
   *     configuration to be removed.
   */
  removeWorkspaceConfiguration(workspaceConfigurationName) {
    super.removeResource(workspaceConfigurationName);
  }

  /**
   * Gets a workspace configuration contained within the set.
   * @param {string} workspaceConfigurationName The workspace configuration to
   *     be returned.
   * @return {!Object} The workspace configuration, or null if it's not in
   *     the set.
   */
  getWorkspaceConfiguration(workspaceConfigurationName) {
    return super.getResource(workspaceConfigurationName);
  }

  /**
   * Gets the names of all workspace configurations contained within the set.
   * @return {Array.<string>} Names of all workspace configurations in the set.
   */
  getWorkspaceConfigurationNames() {
    return super.getResourceNames();
  }

  /**
   * Returns a workspace configuration to default settings.
   * @param {string} workspaceConfigurationName The name of the workspace
   *     configuration to be reset.
   */
  //TODO #103
  resetWorkspaceConfiguration(workspaceConfigurationName) {
    throw 'unimplemented: resetWorkspaceConfiguration';
  }

  /**
   * Produces the JSON needed to organize workspace configurations in the tree.
   * @return {!Object} The JSON for the tree's workspace configuration section.
   */
  getTreeJson() {
    const workspaceConfigSetJson = [
      {'id': 'WorkspaceConfiguration', 'text': 'Workspace Configurations'},
      {'children': super.getTreeJson()}
    ];
    return workspaceConfigSetJson;
  }
}
