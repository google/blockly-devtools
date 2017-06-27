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
  constructor() {

  }

  /**
   * Given a tab and a ID to be associated to that tab, adds a listener to
   * that tab so that when the user clicks on the tab, it switches to the
   * element associated with that ID.
   * @param {!Element} tab The DOM element to add the listener to.
   * @param {string} id The ID of the element to switch to when tab is clicked.
   */
  addClickToSwitch(tab, id) {
    /*
     * TODO: Move from wfactory_controller.js
     *
     * References:
     * - switchElement();
     * - bindClick();
     */
    console.log('addClickToSwitch() called in WorkspaceView');
  }
}
