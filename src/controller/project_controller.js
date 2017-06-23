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
 * @fileoverview The ProjectController Class controls the management of the
 *   information contained within projects (libraries, toolboxes, workspaces);
 *   when blocks are opened, storage, warning behavior, importing and exporting.
 *
 * @author sagev@google.com (Sage Vouse)
 */

 /**
  * @class ProjectController manages the DevTools Project object's information.
  *    it controls opening and storing blocks, warning about unsaved changes
  *    to libraries, and importing and exporting projects and the elements that
  *    they contain.
  */
  //TODO #44: refactor
  //TODO #50: manage project metadata
class ProjectController {
  constructor() {
    this.project = project;
  }

  /**
   * If there are unsaved changes to the project, checks if user wants to
   * proceed, knowing that they will lose their changes.
   * @return {boolean} Whether or not to proceed.
   */
   warnIfUnsaved() {
    return this.project.isDirty();
  };
}
