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
 * @fileoverview AppController controls all parts of the application by creating
 * sub-controllers (ProjectController, WorkspaceController) which individually
 * control specific parts of application. AppController is the central part of
 * DevTools which initializes all other parts of the application.
 *
 * @authors sagev@google.com (Sage Vouse), celinechoo (Celine Choo)
 */

'use strict';

// TODO(#44): Rename to AppController once refactor is finished. Temporarily named
// to AppController2 to avoid overlapping namespaces with current AppController,
// which will be refactored into this (and other) files.
class AppController2 {
  constructor() {
    this.projectName = this.openProject();
    this.projectController = new ProjectController();
  }

  /**
   * Prompts user to either open a preexisting project or create a new project.
   */
  openProject() {

  }
}