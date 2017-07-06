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
 * @fileoverview WorkspaceEditorView deals with the view elements of Blockly workspaces
 * that are used to generate block libraries, toolboxes, and preload-workspaces.
 * This includes EventHandlers, EventListeners, tab switching functions, etc.
 *
 * @authors celinechoo (Celine Choo), sagev (Sage Vouse)
 */

class WorkspaceEditorView {
  constructor(workspaceContents, workspaceConfig) {
    /**
     * WorkspaceContents associated with this instance of WorkspaceView.
     * @type {!WorkspaceContents}
     */
    this.workspaceContents = workspaceContents;

    /**
     * WorkspaceConfig associated with this instance of WorkspaceView.
     * @type {!WorkspaceConfig}
     */
    this.workspaceConfig = workspaceConfig;

    /**
     * Blockly workspace where users define a group of WorkspaceContents.
     * @type {!Blockly.Workspace}
     */
    this.editorWorkspace = Blockly.inject('wContentsDiv',
      {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        media: 'media/',
        toolbox: DevToolsToolboxes.toolboxEditor('')
      });

    /**
     * Blockly workspace where users can preview a defined WorkspaceContents.
     * @type {!Blockly.Workspace}
     */
    this.previewWorkspace = Blockly.inject('workspacePreview',
      {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        media: 'media/',
        toolbox: '<xml></xml>'
      });
  }

  /**
   * Displays imported WorkspaceContents recently added to model onto editor view.
   *
   * @param {string} wsContentsName Name of toolbox that was imported.
   * @param {string} xmlString String representation of XML of recently imported
   *     toolbox.
   */
  loadImportedWorkspaceContents(wsContentsName, xmlString) {
    /*
     * TODO: Move in from wfactory_generator.js:loadXml(jsFileContents, importMode)
     *                    wfactory_generator.js:evaluateMarkedCode(code)
     *       Note: loadXml() is broken into two functions in refactored version.
     *
     * References:
     * - evaluateMarkedCode()
     */
    throw 'Unimplemented: loadImportedWorkspaceContents()';
  }

  /**
   * Resets WorkspaceConfig checkboxes to default settings.
   */
  initBaseConfigs() {
    /*
     * TODO: Move in from wfactory_view.js:setBaseOptions()
     */
    throw 'Unimplemented: initBaseConfigs()';
  }
}
