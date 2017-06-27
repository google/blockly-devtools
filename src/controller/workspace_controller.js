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
 * @fileoverview The WorkspaceController Class deals with the Blockly workspaces
 * that are used to generate block libraries, toolboxes, and preload-workspaces.
 */

class WorkspaceController {
  constructor() {
    /**
     * Blockly workspace used to create blocks for block library.
     * @type {!Blockly.Workspace}
     */
    this.libraryWorkspace = new Object(null);

    /**
     * Blockly workspace used to create toolboxes.
     * @type {!Blockly.Workspace}
     */
    this.toolboxWorkspace = new Object(null);

    this.toolboxPreviewWorkspace = new Object(null);

    /**
     * Blockly workspace used to create preload workspaces.
     * @type {!Blockly.Workspace}
     */
    this.preloadWorkspace = new Object(null);

    this.preloadPreviewWorkspace = new Object(null);
  }

  /**
   *
   */
  libraryFactoryInit(libraryDiv) {
    this.libraryWorkspace = Blockly.inject(libraryDiv,
    {
      grid: {
        spacing: 25
      }
    });
  }

  toolboxFactoryInit(toolboxDiv) {
    this.toolboxWorkspace = Blockly.inject(toolboxDiv,
    {grid:
      {spacing: 25,
       length: 3,
       colour: '#ccc',
       snap: true},
       media: 'media/',
       toolbox: this.toolbox
     });

    this.toolboxPreviewWorkspace = Blockly.inject(previewDiv,
    {grid:
      {spacing: 25,
       length: 3,
       colour: '#ccc',
       snap: true},
     media: 'media/',
     toolbox: '<xml></xml>',
     zoom:
       {controls: true,
        wheel: true}
    });
  }

  preloadFactoryInit(preloadDiv) {

  }
}
