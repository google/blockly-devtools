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

goog.provide('WorkspaceContents');

goog.require('Resource');

/**
 * @class Workspacecontents contains a set of positioned blocks specified by the
 * developer to load onto a Blockly workspace upon initialization.
 * @authors  Emma Dauterman (evd2014), sagev@google.com (Sage Vouse), celinechoo (Celine Choo)
 */
class WorkspaceContents extends Resource {
  /**
   * WorkspaceContents Class
   * @param {string} workspaceContentsName The name for the workspace contents.
   * @constructor
   */
  constructor(workspaceContentsName) {
    super(workspaceContentsName);

    /**
     * XML DOM element of this workspace contents.
     * @type {!Element}
     */
    this.xml = Blockly.Xml.textToDom('<xml></xml>');
  }

  /**
   * Sets XML of this instance of WorkspaceContents to given XML DOM element.
   * @param {!Element} xml XML DOM element to set.
   */
  setXml(xml) {
    // Moved in from wfactory_model.js:savePreloadXml(xml)
    this.xml = xml;
  }

  /**
   * Gets XML DOM element associated with this WorkspaceContents.
   * @return {!Element} XML DOM element of this WorkspaceContents.
   */
  getXml() {
    // Moved in from wfactory_model.js:getPreloadXml()
    return this.xml;
  }

  /**
   * Generates XML DOM element for WorkspaceContents. Used to insert
   * into files that user will download.
   *
   * @return {!Element} XML DOM element of this WorkspaceContents.
   */
  getExportData() {
    /*
     * TODO: Move in from wfactory_generator.js:generateWorkspaceXml()
     *
     * References:
     * - hiddenWorkspace.clear()
     * - setShadowBlocksInHiddenWorkspace_()
     */
    throw "unimplemented: getExportData";
  }

  /**
   * Gets the JSON object necessary to represent the workspace contents in the
   *     navigation tree.
   * @return {!Object} The JSON representation of the workspace contents.
   */
  getJson() {
    const workspaceContentsJson = $.extend(true, super.getJson(),
      {'id': PREFIXES.WORKSPACE_CONTENTS});
    return workspaceContentsJson;
  }
}
