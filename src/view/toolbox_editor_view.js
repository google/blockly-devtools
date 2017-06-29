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
 * @fileoverview ToolboxEditorView manages the visible parts of the application involved
 * in editing toolboxes, creating categories, and populating them with blocks for a
 * user's Blockly application. ToolboxView contains EventHandlers and popups (prompts,
 * etc.) necessary to create a toolbox.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo)
 */
class ToolboxEditorView {
  constructor(toolbox) {
    /**
     * Toolbox associated with this instance of ToolboxView.
     * @type {!Toolbox}
     */
    this.toolbox = toolbox;

    /**
     * Blockly workspace where developers create and define toolboxes.
     * @type {!Blockly.Workspace}
     */
    this.editorWorkspace = Blockly.inject(toolboxDiv,
      {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true},
          media: 'media/',
          toolbox: this.toolbox
        }
      });
  }

  /**
   * Changes toolbox reference to reflect the new toolbox being edited.
   * @param {!Toolbox} toolbox Toolbox object to re-load into workspace.
   */
  setToolbox(toolbox) {
    // TODO: Load new toolbox into editor.
  }

  /**
   * Returns current Toolbox object that is being edited within the toolbox editor.
   * @return {!Toolbox} Toolbox currently being edited.
   */
  getToolbox() {
    return this.toolbox;
  }
}
