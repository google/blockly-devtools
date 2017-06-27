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
   *
   * @param {string} libraryDiv ID of block library in HTML
   *     page to inject the library editor workspace.
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
   *
   * @param {string} toolboxDiv ID of toolbox in HTML page to inject
   *     toolbox editor.
   * @param {string} previewDiv ID of toolbox preview in HTML page to inject
   *     toolbox previewer.
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
   *
   * @param {string} preloadDiv ID of preload-workspace in HTML page to inject
   *     preload-workspace editor.
   * @param {string} previewDiv ID of preload-workspace preview in HTML page
   *     to inject the previewer for preload-workspace.
   */
  preloadFactoryInit(preloadDiv, previewDiv) {
    /*
     * TODO: Implement
     *
     * References: N/A
     */
    console.log('preloadFactoryInit() called in WorkspaceController');
  }

  /**
   * Currently prompts the user for a name, checking that it's valid (not used
   * before), and then creates a tab and switches to it.
   */
  addCategory() {
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
    console.log('addCategory() called in WorkspaceController');
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
    console.log('createCategory() called in WorkspaceController');
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
    console.log('removeElement() called in WorkspaceController');
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
    console.log('promptForNewCategoryName() called in WorkspaceController');
  }

  /**
   * Switches to a new tab for the element given by ID. Stores XML and blocks
   * to reload later, updates selected accordingly, and clears the workspace
   * and clears undo, then loads the new element.
   * @param {string} id ID of tab to be opened, must be valid element ID.
   */
  switchElement(id) {
    /*
     * TODO: Move from wfactory_controller.js
     *
     * References:
     * - getSelectedId();
     * - clearAndLoadElement();
     */
    console.log('switchElement() called in WorkspaceController');
  }

  /**
   * Switches to a new tab for the element by ID. Helper for switchElement.
   * Updates selected, clears the workspace and clears undo, loads a new element.
   * @param {string} id ID of category to load.
   */
  clearAndLoadElement(id) {
    /*
     * TODO: Move from wfactory_controller.js
     *
     * References:
     * - getSelectedId();
     * - setCategoryTabSelection();
     * - setSelectedById();
     * - setCategoryTabSelection();
     * - updateState();
     */
    console.log('clearAndLoadElement() called in WorkspaceController');
  }
}
