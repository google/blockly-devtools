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
 * @fileoverview WorkspaceView deals with the view elements of Blockly workspaces
 * that are used to generate block libraries, toolboxes, and preload-workspaces.
 * This includes EventHandlers, EventListeners, tab switching functions, etc.
 *
 * @authors celinechoo (Celine Choo), sagev (Sage Vouse)
 */

class WorkspaceView {
  constructor(project, controller) {
    /**
     * Project associated with this instance of WorkspaceView.
     * @type {!Project}
     */
    this.project = project;

    /**
     * WorkspaceController associated with this instance of WorkspaceView.
     * @type {!WorkspaceController}
     */
    this.controller = controller;
  }

  // TODO(#44): Add functions for refactor.
}
