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
   * Injects block library editor workspace.
   */
  libraryFactoryInit(libraryDiv) {
    this.libraryWorkspace = Blockly.inject(libraryDiv,
    {
      grid: {
        spacing: 25
      }
    });
  }

  /**
   * Injects toolbox editor workspace.
   */
  toolboxFactoryInit(toolboxDiv, previewDiv) {
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

  /**
   * Injects workspace(TBD?) editor workspace.
   */
  preloadFactoryInit(preloadDiv) {
    // TODO: Implement
  }

  // ===================== TOOLBOX FUNCTIONS =======================

  /**
   * Currently prompts the user for a name, checking that it's valid (not used
   * before), and then creates a tab and switches to it.
   */
  addCategory {
    /*
     * TODO: Move from wfactory_controller.js
     *
     * References:
     * - transferFlyoutBlocksToCategory();
     * - hasElements();
     * - promptForNewCategoryName();
     * - createCategory();
     * - switchElement();
     * - setCategoryOptions();
     * - generateNewOptions();
     * - updatePreview();
     */
  }

  /**
   * Helper method for addCategory. Adds a category to the view given a name, ID,
   * and a boolean for if it's the first category created. Assumes the category
   * has already been created in the model. Does not switch to category.
   * @param {string} name Name of category being added.
   * @param {string} id The ID of the category being added.
   */
  createCategory(name, id) {
    /*
     * TODO: Move from wfactory_controller.js
     *
     * References:
     * - new ListElement();
     * - addElementToList();
     * - addCategoryRow();
     * - addClickToSwitch();
     */
  }

  /**
   * Removes toolbox category element.
   * Attached to "-" button. Checks if the user wants to delete
   * the current element.  Removes the element and switches to another element.
   * When the last element is removed, it switches to a single flyout mode.
   */
  removeElement() {
    /*
     * TODO: Move from wfactory_controller.js
     *
     * References:
     * - getSelected();
     * - getSelectedId();
     * - getIndexElementById();
     * - getElementByIndex();
     * - hasElements();
     * - clearAndLoadElement();
     * - this.toolboxWorkspace.clear();
     * - this.toolboxWorkspace.clearUndo();
     * - createDefaultSelectedIfEmpty();
     * - updatePreview();
     */
  }

  /**
   * Gets a valid name for a new category from the user.
   * @param {string} promptString Prompt for the user to enter a name.
   * @param {string=} opt_oldName The current name.
   * @return {string?} Valid name for a new category, or null if cancelled.
   */
  promptForNewCategoryName(promptString, opt_oldName) {
    /*
     * TODO: Move from wfactory_controller.js
     *
     * References:
     * - hasCategoryByName();
     */
  }
}
