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
 * @fileoverview EditorController manages user interaction involving changes in
 *     specific components of a project (Toolbox, Workspace (contents or configs),
 *     or Block Library).
 *
 * @author sagev (Sage Vouse), celinechoo (Celine Choo)
 */

class EditorController {
  constructor(project) {
    /**
     * Project object whose components are controlled by EditorController.
     * @type {!Project}
     */
    this.project = project;

    /**
     * Toolbox Controller.
     * @type {!ToolboxController}
     */
    this.toolboxController = new ToolboxController(this.project);

    /**
     * Workspace Controller.
     * @type {!WorkspaceController}
     */
    this.workspaceController = new WorkspaceController(this.project);

    /**
     * Block Editor Controller
     * @type {BlockLibraryController}
     */
    this.blockEditorController = new BlockEditorController(this.project);
  }
}
