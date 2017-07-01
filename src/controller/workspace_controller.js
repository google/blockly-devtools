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
 * @fileoverview WorkspaceController manages user interaction with the
 * workspace configurations, which include (1) blocks that are pre-loaded onto a
 * developer's Blockly workspace, and (2) Blockly.Options which configure the
 * settings on a developer's workspace (e.g. trashcan, RTL/LTR, etc.).
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo)
 */
class WorkspaceController {
  constructor(project) {
    /**
     * Project whose library is controlled by this BlockLibraryController instance.
     * @type {!Project}
     */
    this.project = project;

    /**
     * Keeps track of what WorkspaceContents is currently being edited.
     * @type {!WorkspaceContents}
     */
    this.currentWorkspaceContents = null;

    /**
     * Keeps track of what WorkspaceConfig is currently being edited.
     * @type {!WorkspaceContents}
     */
    this.currentWorkspaceConfig = null;


    /**
     * WorkspaceEditorView associated with this instance of WorkspaceController.
     * @type {!WorkspaceView}
     */
    this.view = new WorkspaceEditorView(this.currentWorkspaceContents);
  }

  /**
   * Saves the state from the workspace depending on the current mode. Should
   * be called after making changes to the workspace.
   */
  saveState() {
    /*
     * TODO: Move in from wfactory_controller.js:saveStateFromWorkspace()
     *
     * References:
     * - getSelectedXml()
     * - saveFromWorkspace(this.toolboxWorkspace)
     * - getPreloadXml()
     * - savePreloadXml()
     */
  }

  /**
   * Used to completely reinject the preview workspace. This should be used only
   * when switching from simple flyout to categories, or categories to simple
   * flyout. More expensive than simply updating the flyout or toolbox.
   * @param {!Element} Tree of XML elements
   * @package
   */
  reinjectPreview(tree) {
    /*
     * Move in from wfactory_controller.js
     * ALSO used in ToolboxController
     *
     * References:
     * - readOptions_()
     * - generateWorkspaceXml()
     */
  }
}
