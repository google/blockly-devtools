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
     * Blockly workspace where users define/edit toolboxes.
     * @type {!Blockly.Workspace}
     */
    this.editorWorkspace = Blockly.inject('toolboxDiv',
      {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        media: 'media/',
        toolbox: DevToolsToolboxes.toolboxEditor('')
      });

    /**
     * Blockly workspace where users can preview a defined WorkspaceContents.
     * @type {!Blockly.Workspace}
     */
    this.previewWorkspace = Blockly.inject('toolboxPreview',
      {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        media: 'media/',
        toolbox: '<xml></xml>'
      });
  }

  // TODO: Add functions.

  /**
   * Transfers the blocks in the user's flyout to a new category if
   * the user is creating their first category and their workspace is not
   * empty. Should be called whenever it is possible to switch from single flyout
   * to categories (not including importing).
   */
  transferFlyoutBlocksToCategory() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - hasElements()
     * - createCategory()
     * - getCategoryIdByName()
     * - setSelectedById()
     * - setCategoryTabSelection()
     * - setCategoryOptions()
     * - generateNewOptions()
     * - updatePreview()
     */
  }

  /**
   * Switches to a new tab for the element given by ID. Stores XML and blocks
   * to reload later, updates selected accordingly, and clears the workspace
   * and clears undo, then loads the new element.
   * @param {string} id ID of tab to be opened, must be valid element ID.
   */
  switchElement(id) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - getSelectedId()
     * - clearAndLoadElement(id)
     */
  }

  /**
   * Switches to a new tab for the element by ID. Helper for switchElement.
   * Updates selected, clears the workspace and clears undo, loads a new element.
   * @param {string} id ID of category to load.
   */
  clearAndLoadElement(id) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - getSelectedId()
     * - setCategoryTabSelection()
     * - clearAndLoadXml_()
     * - getSelectedXml()
     * - setCategoryTabSelection(id, true)
     * - updateState()
     */
  }

  /**
   * Updates the preview workspace based on the toolbox workspace. If switching
   * from no categories to categories or categories to no categories, reinjects
   * Blockly with reinjectPreview, otherwise just updates without reinjecting.
   * Called whenever a list element is created, removed, or modified and when
   * Blockly move and delete events are fired. Do not call on create events
   * or disabling will cause the user to "drop" their current blocks. Make sure
   * that no changes have been made to the workspace since updating the model
   * (if this might be the case, call saveStateFromWorkspace).
   */
  updatePreview() {
    // Disable events to stop updatePreview from recursively calling itself
    // through event handlers.
    Blockly.Events.disable();

    // Only update the toolbox if not in read only mode.
    if (!this.model.options['readOnly']) {
      // Get toolbox XML.
      var tree = Blockly.Options.parseToolboxTree(
          this.generator.generateToolboxXml());

      // No categories, creates a simple flyout.
      if (tree.getElementsByTagName('category').length == 0) {
        // No categories, creates a simple flyout.
        if (this.previewWorkspace.toolbox_) {
          this.reinjectPreview(tree); // Switch to simple flyout, expensive.
        } else {
          this.previewWorkspace.updateToolbox(tree);
        }
      } else {
        // Uses categories, creates a toolbox.
        if (!this.previewWorkspace.toolbox_) {
          this.reinjectPreview(tree); // Create a toolbox, expensive.
        } else {
          // Close the toolbox before updating it so that the user has to reopen
          // the flyout and see their updated toolbox (open flyout doesn't update)
          this.previewWorkspace.toolbox_.clearSelection();
          this.previewWorkspace.updateToolbox(tree);
        }
      }
    }

    // Update pre-loaded blocks in the preview workspace.
    this.previewWorkspace.clear();
    Blockly.Xml.domToWorkspace(this.generator.generateWorkspaceXml(),
        this.previewWorkspace);

    // Reenable events.
    Blockly.Events.enable();
  }
}
