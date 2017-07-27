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

'use strict';

goog.provide('ToolboxController');

goog.require('ToolboxEditorView');

/**
 * @fileoverview ToolboxController manages user interaction with the toolbox
 * editor, where users group together blocks that were defined within BlockLibrary
 * as toolboxes for their desired Blockly application.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo), evd2014 (Emma Dauterman)
 */
class ToolboxController {
  constructor(projectController, hiddenWorkspace) {
    /**
     * ProjectController that will edit toolboxes when edited in the toolbox
     *     editor.
     * @type {!ProjectController}
     */
    this.projectController = projectController;

    // Creates first toolbox to add to project.
    const toolbox = this.projectController.createToolbox('MyFirstToolbox');

    /**
     * ToolboxEditorView associated with this instance of ToolboxController.
     * @type {!ToolboxEditorView}
     */
    this.view = new ToolboxEditorView(toolbox);

    /**
     * Keeps track of association between ListElement ID and the DOM element
     * of that ListElement in the view.
     * @type {!Object.<!ListElement, !Element>}
     */
    this.categoryTabs = {};

    /**
     * True if key events are enabled. False otherwise. Used to enable/disable
     * view elements depending on which Editor is currently being used.
     * @type {boolean}
     */
    this.keyEventsEnabled = true;

    /**
     * Hidden Blockly workspace used to generate XML for shadow blocks.
     * @type {!Blockly.Workspace}
     */
    this.hiddenWorkspace = hiddenWorkspace;

    // Adds current toolbox to model.
    this.projectController.addToolbox(this.view.toolbox);

    // Initialize event handlers and listeners for the view.
    this.view.init(this);
  }

  /**
   * Prompts the user for a name, checking that it's valid (not used before),
   * and then creates a tab and switches to it.
   */
  addCategory() {
    // From wfactory_controller.js:addCategory()
    // Get name from user.
    const name = this.promptForNewCategoryName('Enter the name of your new category:');
    if (!name) {  // Exit if cancelled.
      return;
    }

    // Transfers flyout blocks to category if creating the first category.
    if (this.shouldTransferFlyout_()) {
      // Transfers the user's blocks to a flyout if it's the first category created.
      this.transferFlyoutBlocksToCategory();
    }

    this.view.editorWorkspace.clear();
    // Deselect the currently active tab.
    this.view.selectTab(this.view.toolbox.getSelectedId(), false);
    // Create category.
    this.view.toolbox.setSelected(this.createCategory(name));
    // Switch to category.
    this.switchElement(this.view.toolbox.getCategoryId(name));
    // Updates XML of toolbox model.
    this.view.toolbox.setXml(this.generateToolboxXml());
    // Update preview.
    this.updatePreview();
  }

  /**
   * Helper method for addCategory. Adds a category to the view given a name, ID,
   * and a boolean for if it's the first category created. Assumes the category
   * has already been created in the model. Does not switch to category.
   * @param {string} name Name of category being added.
   * @return {string} ID of category that was created.
   */
  createCategory(name) {
    // REFACTOR: Moved in from wfactory_controller.js
    // Create empty category.
    const category = new ListElement(ListElement.TYPE_CATEGORY, name);
    this.view.toolbox.addElement(category);
    const tab = this.view.addCategoryTab(category.name, category.id);
    this.addClickToSwitch(tab, category.id);
    return category.id;
  }

  /**
   * Transfers the blocks in the user's flyout to a new category if
   * the user is creating their first category and their workspace is not
   * empty. Should be called whenever it is possible to switch from single flyout
   * to categories (not including importing).
   */
  transferFlyoutBlocksToCategory() {
    // REFACTORED: Moved in from wfactory_controller.js
    const id = this.createCategory('Category 1');
    this.view.toolbox.setSelected(id);
    this.view.toolbox.getSelected().saveFromWorkspace(this.view.editorWorkspace);
    this.view.selectTab(id, true);
    this.view.toolbox.setXml(this.generateToolboxXml()); // bm

    this.updatePreview();
  }

  /**
   * Returns whether the toolbox (currently being edited) is a flyout and has
   * blocks within the flyout. Used to determine whether to transfer the flyout
   * blocks to a category when a user adds a new category for the first time.
   * @private
   */
  shouldTransferFlyout_() {
    return this.view.toolbox.getSelected().type == ListElement.TYPE_FLYOUT &&
        this.view.editorWorkspace.getAllBlocks().length > 0;
  }

  /**
   * Checks if the user wants to delete the current category. Removes the category
   * and switches to another. When the last category is removed, it switches to
   * a single flyout mode.
   */
  removeElement() {
    // From wfactory_controller.js: removeElement()
    const toolbox = this.view.toolbox;

    // Check that there is a currently selected category to remove.
    if (!toolbox.getSelected()) {
      return;
    }

    // Check if user wants to remove current category.
    const check = window.confirm('Are you sure you want to delete the currently '
          + 'selected ' + toolbox.getSelected().type + '?');
    if (!check) { // If cancelled, exit.
      return;
    }

    const selectedId = toolbox.getSelectedId();
    const selectedIndex = toolbox.getIndexById(selectedId);
    // Delete element visually.
    this.view.deleteElementTab(selectedId, selectedIndex);
    // Delete element in model.
    toolbox.deleteElement(selectedIndex);

    // Find next logical element to switch to.
    let next = toolbox.getElementByIndex(selectedIndex);
    if (!next && !toolbox.isEmpty()) {
      next = toolbox.getElementByIndex(selectedIndex - 1);
    }
    const nextId = next ? next.id : null;

    // Open next element.
    this.clearAndLoadElement(nextId);

    // If no element to switch to, display message, clear the workspace, and
    // set a default selected element not in toolbox list in the model.
    if (!nextId) {
      window.alert('You currently have no categories or separators. All your' +
          ' blocks will be displayed in a single flyout.');
      this.view.editorWorkspace.clear();
      this.view.editorWorkspace.clearUndo();
      toolbox.clear();
    }

    // Update toolbox model.
    this.view.toolbox.setXml(this.generateToolboxXml());
    // Update preview.
    this.updatePreview();
  }

  /**
   * Adds category separator to current Toolbox.
   */
  addCategorySeparator() {
    // From wfactory_controller.js:addSeparator()
    // If adding the first element in the toolbox, transfers the user's blocks
    // in a flyout to a category.
    if (this.shouldTransferFlyout_()) {
      // Transfers the user's blocks to a flyout if it's the first category created.
      this.transferFlyoutBlocksToCategory();
    }
    // Deselect the currently active tab.
    this.view.selectTab(this.view.toolbox.getSelectedId(), false);

    // Create the separator in the model.
    const separator = new ListElement(ListElement.TYPE_SEPARATOR);
    this.view.toolbox.addElement(separator);

    // Create the separator in the view.
    const tab = this.view.addSeparatorTab(separator.id);
    this.addClickToSwitch(tab, separator.id);

    // Switch to the separator and update the preview.
    this.switchElement(separator.id);
    this.updatePreview();
  }

  /**
   * Gets a valid name for a new category from the user.
   * @param {string} promptString Prompt for the user to enter a name.
   * @param {string=} opt_oldName The current name.
   * @return {?string} Valid name for a new category, or null if cancelled.
   */
  promptForNewCategoryName(promptString, opt_oldName) {
    // From wfactory_controller.js
    let defaultName = opt_oldName;
    var name;
    do {
      name = prompt(promptString, defaultName);
      if (!name) {  // If cancelled.
        return null;
      }
      // TODO(#105): Check new category name for validity.
      defaultName = name;
    } while (this.view.toolbox.hasCategory(name));
    return name;
  }

  /**
   * Used to completely reinject the preview workspace. This should be used only
   * when switching from simple flyout to categories, or categories to simple
   * flyout. More expensive than simply updating the flyout or toolbox.
   * @param {!Element} tree Tree of XML elements
   * @package
   */
  reinjectPreview(tree) {
    // From wfactory_controller.js
    this.view.previewWorkspace.dispose();
    let injectOptions = {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        media: 'media/',
        trashcan: true
      };
    injectOptions['toolbox'] = Blockly.Xml.domToPrettyText(tree);
    this.view.previewWorkspace = Blockly.inject('toolboxPreview', injectOptions);
  }

  /**
   * Changes the name of the selected category. Continues prompting the user until
   * they input a category name that is not currently in use. Exits if canceled.
   */
  changeCategoryName() {
    // From wfactory_controller.js:changeCategoryName()
    const selected = this.view.toolbox.getSelected();
    // Return if a category is not selected.
    if (selected.type != ListElement.TYPE_CATEGORY) {
      return;
    }

    // Get new name from user.
    window.foo = selected;
    const newName = this.promptForNewCategoryName('What do you want to change this'
      + ' category\'s name to?', selected.name);
    if (!newName) {  // If cancelled.
      return;
    }

    // Change category name in toolbox model.
    selected.changeName(newName);
    this.view.toolbox.setXml(this.generateToolboxXml());

    // Update view/preview.
    this.view.updateCategoryName(newName, this.view.toolbox.getSelectedId());
    this.updatePreview();
  }

  /**
   * Swaps ordering of categories in toolbox editor.
   *
   * @param {number} offset The index offset from the currently selected element
   *     to swap with. Positive if the element to be swapped with is below, negative
   *     if the element to be swapped with is above.
   */
  moveElement(offset) {
    // From wfactory_controller.js
    const curr = this.view.toolbox.getSelected();
    if (!curr) {  // Return if no selected element.
      return;
    }
    const currIndex = this.view.toolbox.getIndexById(curr.id);
    const swapIndex = this.view.toolbox.getIndexById(curr.id) + offset;
    const swap = this.view.toolbox.getElementByIndex(swapIndex);
    if (!swap) {  // Return if cannot swap in that direction.
      return;
    }
    // Move currently selected element to index of other element.
    // Indexes must be valid because confirmed that curr and swap exist.
    this.moveElementToIndex_(curr, swapIndex, currIndex);
    // Update the toolbox model.
    this.view.toolbox.setXml(this.generateToolboxXml());
    // Update element editing buttons.
    this.view.updateState(swapIndex, this.view.toolbox.getSelected());
    // Update preview.
    this.updatePreview();
  }

  /**
   * Moves a element to a specified index and updates the model and view
   * accordingly. Helper functions throw an error if indexes are out of bounds.
   * @param {!Element} element The element to move.
   * @param {number} newIndex The index to insert the element at.
   * @param {number} oldIndex The index the element is currently at.
   * @private
   */
  moveElementToIndex_(element, newIndex, oldIndex) {
    // From wfactory_controller.js:moveElementToIndex()
    this.view.toolbox.moveElement(element, newIndex, oldIndex);
    this.view.moveTabToIndex(element.id, newIndex, oldIndex);
  }

  /**
   * Removes all categories and separators in the view. Clears categoryTabs to
   * reflect this.
   */
  clear() {
    /*
     * REFACTORED: from wfactory_view.js:clearToolboxTabs()
     *                  wfactory_controller.js:clearAll()
     */
    if (!window.confirm('Are you sure you would like to clear your toolbox ' +
          'editor workspace?')) {
      return;
    }

    // Clears tabs
    this.categoryTabs = {};

    // Clears view elements
    this.view.clearElements();
    this.view.addEmptyToolboxMessage();
    // this.updateElementButtons(-1, null);

    // Clears model
    this.view.toolbox.clear();

    // Clears Blockly toolbox editor workspace
    this.view.editorWorkspace.clear();
    this.view.editorWorkspace.clearUndo();

    // Update preview.
    this.updatePreview();
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
    // REFACTORED: Moved in from wfactory_controller.js:updatePreview()
    Blockly.Events.disable();
    const toolboxXml = this.view.toolbox.getExportData();
    const tree = Blockly.Options.parseToolboxTree(toolboxXml);

    if (tree.getElementsByTagName('category').length == 0) {
      // No categories, creates a simple flyout.
      if (this.view.previewWorkspace.toolbox_) {
        this.reinjectPreview(tree); // Switch to simple flyout.
      } else {
        this.view.previewWorkspace.updateToolbox(tree);
      }
    } else {
      // Uses categories, creates a toolbox.
      if (!this.view.previewWorkspace.toolbox_) {
        this.reinjectPreview(tree); // Create a toolbox.
      } else {
        // Close toolbox before updating.
        this.view.previewWorkspace.toolbox_.clearSelection();
        this.view.previewWorkspace.updateToolbox(tree);
      }
    }

    // Clear preview workspace.
    this.view.previewWorkspace.clear();

    // Reenable events.
    Blockly.Events.enable();
  }

  /**
   * Generates XML of currently active toolbox.
   * @return {!Element} XML of current toolbox.
   */
  generateToolboxXml() {
    const xmlDom = goog.dom.createDom('xml');
    xmlDom.setAttribute('id', 'toolbox');
    xmlDom.setAttribute('style', 'display: none;');

    if (this.view.toolbox.getSelected().type == ListElement.TYPE_FLYOUT) {
      // Toolbox has no categories.
      this.loadToHiddenWorkspace_(this.generateCategoryXml_(this.view.toolbox.selected));
      this.appendHiddenWorkspaceToDom_(xmlDom);
    } else {
      // Toolbox has categories.
      if (!this.view.toolbox.getSelected()) {
        throw new Error('Selected is null when the toolbox is empty.');
      }

      /*
       * Iterate through each category to generate XML for each using the
       * hidden workspace.
       */
      const categories = this.view.toolbox.categoryList;
      categories.forEach((element) => {
        if (element.type == ListElement.TYPE_SEPARATOR) {
          // If the next element is a separator.
          var nextElement = goog.dom.createDom('sep');
        } else if (element.type == ListElement.TYPE_CATEGORY) {
          // If next element is a category.
          var nextElement = this.generateCategoryXml_(element);
        }
        xmlDom.appendChild(nextElement);
      });
    }
    return xmlDom;
  }

  /**
   * Returns XML given a category ListElement.
   * @param {!ListElement} category ListElement object of type category.
   * @return {!Element} DOM element of category XML.
   * @private
   */
  generateCategoryXml_(category) {
    const domElement = goog.dom.createDom('category');
    domElement.setAttribute('name', category.name);
    // Add color attribute if exists.
    if (category.color) {
      domElement.setAttribute('colour', category.color);
    }
    // Add custom attribute if exists.
    if (category.custom) {
      domElement.setAttribute('custom', category.custom);
    }

    this.loadToHiddenWorkspace_(category.xml);
    this.appendHiddenWorkspaceToDom_(domElement);

    return domElement;
  }

  /**
   * Updates the editor toolbox to have categories for user-defined block libraries.
   */
  updateEditorToolbox() {
    const newToolboxXml = FactoryUtils.updateBlockLibCategory(
        this.projectController.getProject(), this.hiddenWorkspace);
    this.view.updateEditorToolbox(newToolboxXml);
  }

  /**
   * Callback function called on editor workspace change.
   * @param {!Event} e Change event in workspace.
   */
  onChange(e) {
    const isCreateEvent = e.type == Blockly.Events.CREATE;
    const isMoveEvent = e.type == Blockly.Events.MOVE;
    const isDeleteEvent = e.type == Blockly.Events.DELETE;
    const isChangeEvent = e.type == Blockly.Events.CHANGE;
    const isUiEvent = e.type == Blockly.Events.UI;

    // Listens for Blockly move, delete, and change events to update preview.
    // Does not listen for Blockly create events because doing so causes the user
    // to drop blocks when dragging them into workspace. Could cause problems if
    // user loads blocks into workspace directly without calling updatePreview.
    if (isMoveEvent || isDeleteEvent || isChangeEvent || isUiEvent) {
      this.saveStateFromWorkspace();
      this.view.toolbox.setXml(this.generateToolboxXml());
      this.updatePreview();
    }

    // Listen for Blockly UI events to correctly enable the "Edit Block" button.
    // Only enable "Edit Block" when a block is selected and it has a
    // surrounding parent, meaning it is nested in another block (blocks that
    // are not nested in parents cannot be shadow blocks).
    if (isMoveEvent || isUiEvent) {
      const selected = this.view.editorWorkspace.getBlockById(e.blockId);
      // const project = this.projectController.getProject();

      // // Displays shadow buttons only when user clicks on a block.
      // this.showShadowButtons_(selected);
      // // Enables shadow buttons only if the clicked block can actually be a
      // // shadow block.
      // const isPotentialShadow = selected != null && selected.getSurroundParent() != null &&
      //     !this.isUserGenShadowBlock(selected.getSurroundParent().id);
      // this.allowShadow_(isPotentialShadow, selected);
      this.showShadowButtons_(selected);
    }

    if (isCreateEvent) {
      this.makeShadowishBlocks_(e.blockId);
    }
  }

  /**
   * Shows buttons to create/remove shadow blocks. Checks selected block if it
   * is able to be a shadow block (e.g. top level blocks cannot be shadow blocks,
   * etc.).
   * @param {!Blockly.BlockSvg} selected The currently selected BlockSvg object.
   * @private
   */
  showShadowButtons_(selected) {
    // Show shadow button if a block is selected.
    const show = selected ? true : false;
    this.view.displayAddShadow(show);
    this.view.displayRemoveShadow(show);

    // Return after hiding buttons if no block was selected.
    if (!show) {
      return;
    }

    // Check if shadow block.
    const isShadow = this.isUserGenShadowBlock(selected.id) ||
        $(selected.svgGroup_).hasClass('shadowBlock');
    // Check if valid shadow block position.
    const isValid = selected != null && selected.getSurroundParent() != null &&
        !this.isUserGenShadowBlock(selected.getSurroundParent().id);
    // Check if block has variables (variable blocks cannot be shadow blocks).
    const hasVar = !FactoryUtils.hasVariableField(selected);
    this.view.enableShadowButtons(isShadow, isValid);

    console.log('isShadow: ' + isShadow);
    console.log('isValid: ' + isValid);
    console.log('hasVar: ' + hasVar);
    console.log('\n');

    if (isShadow && !isValid) {
      selected.setWarningText('Shadow blocks must be nested inside\n'
          + 'other shadow blocks or regular blocks.\nRegular blocks '
          + 'cannot be nested inside\nshadow blocks.');
    } else if (isShadow && hasVar) {
      selected.setWarningText('Shadow blocks must be nested inside other'
          + ' blocks.');
    } else {
      selected.setWarningText(null);
    }
  }

  /**
   * Enables or disables shadow block buttons depending on whether the currently
   * selected block is eligible to be a shadow block.
   * @param {boolean} isPotentialShadow Whether the selected block is a potential
   *      shadow block.
   * @param {Blockly.Block} selected The currently selected block.
   * @private
   */
  allowShadow_(isPotentialShadow, selected) {
    const project = this.projectController.getProject();
    const addButton = this.view.addShadowButton;
    const removeButton = this.view.removeShadowButton;

    if (isPotentialShadow) {
      // Selected block is a valid shadow block or could be a valid shadow
      // block.
      console.log('Potential shadow: ');
      console.log(selected);

      // Enable block editing and remove warnings if the block is not a
      // variable user-generated shadow block.
      addButton.disabled = false;
      removeButton.disabled = false;

      // Remove possible 'invalid shadow block placement' warning.
      const removeWarnings = !FactoryUtils.hasVariableField(selected) &&
          project.hasBlockDefinition(selected.type);
      console.log('remove warnings: ' + removeWarnings);
      this.warnUserFromShadow_(selected, removeWarnings);
    } else {
      if (selected != null && this.isInvalidBlockPlacement_(selected)) {
        this.warnUserFromShadow_(selected);

        // Give editing options so that the user can make an invalid shadow
        // block a normal block.
        addButton.disabled = false;
        removeButton.disabled = true;
      } else {
        // Selected block does not break any shadow block rules, but cannot
        // be a shadow block.

        // Remove possible 'invalid shadow block placement' warning.
        const removeWarnings = selected != null &&
            project.hasBlockDefinition(selected.type) &&
            (!FactoryUtils.hasVariableField(selected) ||
                !this.isUserGenShadowBlock(selected.id));
        console.log('remove warnings: ' + removeWarnings);
        this.warnUserFromShadow_(selected, removeWarnings);

        // No block selected that is a shadow block or could be a valid shadow
        // block. Disable block editing.
        addButton.disabled = true;
        removeButton.disabled = true;
      }
    }
  }

  /**
   * Potentially warns user with help text if the selected block cannot be a valid
   * shadow block. A block is an invalid shadow block if (1) a shadow block no
   * longer has a valid parent, or (2) a normal block is inside of a shadow block.
   * @param {Blockly.Block} selectedBlock Selected block that is a potential
   *     shadow block candidate.
   * @param {boolean} opt_null Whether to remove any warning text that might already
   *     be on the given shadowBlock.
   * @private
   */
  warnUserFromShadow_(selectedBlock, opt_null) {
    if (!selectedBlock) {
      return;
    }
    if (opt_null) {
      selectedBlock.setWarningText(null);
      return;
    }
    console.log('Passed');
    if (!this.isUserGenShadowBlock(selectedBlock.id)) {
      // Warn if a non-shadow block is nested inside a shadow block.
      selectedBlock.setWarningText('Only shadow blocks can be nested inside\n'
          + 'other shadow blocks.');
    } else if (!FactoryUtils.hasVariableField(selectedBlock)) {
      // Warn if a shadow block is invalid only if not replacing
      // warning for variables.
      selectedBlock.setWarningText('Shadow blocks must be nested inside other'
          + ' blocks.');
    }
  }

  /**
   * Convert actual shadow blocks added from the toolbox to user-generated shadow
   * blocks.
   * @param {boolean} blockId ID of the selected block.
   * @private
   */
  makeShadowishBlocks_(blockId) {
    // Converts actual shadow blocks to shadow-looking blocks in editor.
    this.convertShadowBlocks();

    // Let the user create a Variables or Functions category if they use
    // blocks from either category.
    const newBlock = this.view.editorWorkspace.getBlockById(blockId);
    this.warnForMissingCategory_(newBlock.getDescendants());
  }

  /**
   * Checks if user is missing a category necessary for end-users to
   * use the developer's custom blocks. Advises user to add either Variable
   * or Functions category, depending on which category is necessary to use the
   * developer's blocks.
   * @param {!Array.<!Blockly.Block>} blockList List of all blocks to check for
   *      use of variables or functions.
   */
  warnForMissingCategory_(blockList) {
    let variableCreated = false;
    let procedureCreated = false;

    for (let block of blockList) {
      if (FactoryUtils.hasVariableField(block)) {
        variableCreated = true;
      } else if (FactoryUtils.isProcedureBlock(block)) {
        procedureCreated = true;
      }
    }

    // Very small helper function to generate warning message. Not used outside
    // of this function.
    const warningMessage = (categoryName) => {
        return `Your new block has a ${categoryName} field. To use this block fully, you will need a ${categoryName} category.
Do you want to add a ${categoryName} category to your custom toolbox?`;
      };

    // If any of the newly created blocks are variable or procedure blocks,
    // prompt the user to create the corresponding standard category.
    if (variableCreated && !this.hasVariablesCategory()) {
      if (confirm(warningMessage('Variables'))) {
        this.loadCategoryByName('variables');
      }
    }

    if (procedureCreated && !this.hasProceduresCategory()) {
      if (confirm(warningMessage('Functions'))) {
        this.loadCategoryByName('functions');
      }
    }
  }

  /**
   * Determines if a block breaks shadow block placement rules. Breaks rules
   * if (1) a shadow block no longer has a valid parent, or (2) a normal block
   * is inside of a shadow block.
   * @param {!Blockly.Block} block Blockly block that will be checked.
   * @return {boolean} Whether block is placed in valid location as a shadow block.
   * @private
   */
  isInvalidBlockPlacement_(block) {
    return ((this.isUserGenShadowBlock(block.id) &&
        !block.getSurroundParent()) ||
        (!this.isUserGenShadowBlock(block.id) &&
         block.getSurroundParent() &&
         this.isUserGenShadowBlock(block.getSurroundParent().id)));
  }

  /**
   * Saves the contents of the toolbox editor workspace to the corresponding
   * ListElement.
   */
  saveStateFromWorkspace() {
    this.view.toolbox.getSelected().saveFromWorkspace(this.view.editorWorkspace);
  }

  /**
   * Loads the given XML to the hidden Blockly.Workspace and sets any user-generated
   * shadow blocks to be actual shadow blocks in the hidden Blockly.Workspace.
   *
   * @param {!Element} xml XML to be loaded to the hidden workspace.
   * @private
   */
  loadToHiddenWorkspace_(xml) {
    // REFACTOR: Moved in from wfactory_generator.js
    this.hiddenWorkspace.clear();
    Blockly.Xml.domToWorkspace(xml, this.hiddenWorkspace);
    this.setShadowBlocksInHiddenWorkspace_();
  }

  /**
   * Encodes blocks in the hidden workspace in a XML DOM element. Very
   * similar to workspaceToDom, but doesn't capture IDs. Uses the top-level
   * blocks loaded in hiddenWorkspace.
   * @private
   * @param {!Element} xmlDom Tree of XML elements to be appended to.
   */
  appendHiddenWorkspaceToDom_(xmlDom) {
    // REFACTOR: Moved in from wfactory_generator.js
    const blocks = this.hiddenWorkspace.getTopBlocks();
    blocks.forEach((block) => {
      let blockChild = Blockly.Xml.blockToDom(block, /* opt_noId */ true);
      xmlDom.appendChild(blockChild);
    });
  }

  /**
   * Sets the user-generated shadow blocks loaded into hiddenWorkspace to be
   * actual shadow blocks. This is done so that blockToDom records them as
   * shadow blocks instead of regular blocks.
   * @private
   */
  setShadowBlocksInHiddenWorkspace_() {
    // REFACTOR: Moved in from wfactory_generator.js
    const blocks = this.hiddenWorkspace.getAllBlocks();
    blocks.forEach((block) => {
      if (this.view.toolbox.isShadowBlock(block.id)) {
        block.setShadow(true);
      }
    });
  }

  /*
   * Makes the currently selected block a user-generated shadow block. These
   * blocks are not made into real shadow blocks, but recorded in the model
   * and visually marked as shadow blocks, allowing the user to move and edit
   * them (which would be impossible with actual shadow blocks). Updates the
   * preview when done.
   */
  addShadow() {
    // From wfactory_controller.js:addShadow()
    // No block selected to make a shadow block.
    if (!Blockly.selected) {
      return;
    }
    // Clear any previous warnings on the block (would only have warnings on
    // a non-shadow block if it was nested inside another shadow block).
    Blockly.selected.setWarningText(null);
    // Set selected block and all children as shadow blocks.
    this.addShadowForBlockAndChildren_(Blockly.selected);

    // Save and update the preview.
    this.saveStateFromWorkspace();
    this.updatePreview();
  }

  /**
   * Sets a block and all of its children to be user-generated shadow blocks,
   * both in the model and view.
   * @param {!Blockly.Block} block The block to be converted to a user-generated
   *     shadow block.
   * @private
   */
  addShadowForBlockAndChildren_(block) {
    // From wfactory_controller.js:addShadowForBlockAndChildren_(block)
    // Convert to shadow block.
    this.view.markShadowBlock(block);
    this.view.toolbox.addShadowBlock(block.id);

    if (FactoryUtils.hasVariableField(block)) {
      block.setWarningText('Cannot make variable blocks shadow blocks.');
    }

    // Convert all children to shadow blocks recursively.
    const children = block.getChildren();
    children.forEach((child) => {
      this.addShadowForBlockAndChildren_(child);
    });
  }

  /**
   * If the currently selected block is a user-generated shadow block, this
   * function makes it a normal block again, removing it from the list of
   * shadow blocks and loading the workspace again. Updates the preview again.
   */
  removeShadow() {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - removeShadowBlock()
     * - unmarkShadowBlock()
     * - saveStateFromWorkspace()
     * - updatePreview()
     */
     throw 'Unimplemented: removeShadow()';
  }

  /**
   * Given a unique block ID, uses the model to determine if a block is a
   * user-generated shadow block.
   * @param {string} blockId The unique ID of the block to examine.
   * @return {boolean} True if the block is a user-generated shadow block, false
   *     otherwise.
   */
  isUserGenShadowBlock(blockId) {
    // From wfactory_controller.js
    return this.view.toolbox.isShadowBlock(blockId);
  }

  /**
   * Call when importing XML containing real shadow blocks. This function turns
   * all real shadow blocks loaded in the workspace into user-generated shadow
   * blocks, meaning they are marked as shadow blocks by the model and appear as
   * shadow blocks in the view but are still editable and movable.
   */
  convertShadowBlocks() {
    // REFACTORED: Moved in from wfactory_controller.js
    const blocks = this.view.editorWorkspace.getAllBlocks();
    blocks.forEach((block) => {
      if (block.isShadow()) {
        block.setShadow(false);
        // Delete the shadow DOM attached to the block so that the shadow block
        // does not respawn. Dependent on implementation details.
        const parentConnection = block.outputConnection ?
            block.outputConnection.targetConnection :
            block.previousConnection.targetConnection;
        if (parentConnection) {
          parentConnection.setShadowDom(null);
        }
        this.view.toolbox.addShadowBlock(block.id);
        this.view.markShadowBlock(block);
      }
    });
  }

  /**
   * Given a XML DOM tree, loads it into the toolbox editing area so that the
   * user can continue editing their work. Assumes that tree is in valid toolbox
   * XML format. Assumes that the mode is MODE_TOOLBOX.
   * @param {!Element} tree XML tree to be loaded to toolbox editing area.
   * @private
   */
  importToolboxFromTree_(tree) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - clearToolboxList()
     * - clearToolboxTabs()
     * - convertShadowBlocks()
     * - view.addEmptyCategoryMessage()
     * - createCategory()
     * - setBorderColor()
     * - switchElement()
     * - updateState()
     * - saveStateFromWorkspace()
     * - setCategoryOptions()
     * - generateNewOptions()
     * - updatePreview()
     */
    throw 'Unimplemented: importToolboxFromTree_()';
  }

  /**
   * Sets a warning on blocks loaded to the workspace that are not defined.
   * @private
   */
  warnForUndefinedBlocks_() {
    const blocks = this.view.editorWorkspace.getAllBlocks();
    const project = this.projectController.getProject();
    blocks.forEach((block) => {
      if (!project.hasBlockDefinition(block.type)) {
        block.setWarningText(block.type + ' is not defined (it is not a standard '
            + 'block, \nin your block library, or an imported block).');
      }
    });
  }

  /**
   * Imports blocks from a file, generating a category in the toolbox workspace
   * to allow the user to use imported blocks in the toolbox and in pre-loaded
   * blocks.
   * @param {!File} file File object for the blocks to import.
   * @param {string} format The format of the file to import, either 'JSON' or
   *     'JavaScript'.
   */
  importBlocks(file, format) {
    /*
     * TODO: Move in from wfactory_controller.js
     *
     * References:
     * - defineAndGetBlockTypes()
     * - hasDefinedBlockTypes()
     * - getDefinedBlocks()
     * - addImportedBlockTypes()
     * - clearAndLoadXml_()
     */
    throw 'Unimplemented: importBlocks()';
  }

  /**
   * Displays imported Toolbox recently added to model onto editor view.
   *
   * @param {string} toolboxName Name of toolbox that was imported.
   * @param {string} xmlString String representation of XML of recently imported
   *     toolbox.
   */
  loadImportedToolbox(toolboxName, xmlString) {
    /*
     * TODO: Move in from wfactory_generator.js:loadXml(jsFileContents, importMode)
     *                    wfactory_generator.js:evaluateMarkedCode(code)
     *       Note: loadXml() is broken into two functions in refactored version.
     *
     * References:
     * - evaluateMarkedCode()
     */
    throw 'Unimplemented: loadImportedToolbox()';
  }

  /**
   * Return the block types used in the custom toolbox and pre-loaded workspace.
   * @return {!Array.<string>} Block types used in the custom toolbox and
   *     pre-loaded workspace.
   */
  getAllUsedBlockTypes() {
    /*
     * TODO: Move in from wfactory_controller.js
     *       Also move in from wfactory_model.js
     *       (Also moved into: workspace_controller.js)
     *
     * References:
     * - model.getAllUsedBlockTypes()
     */

    // TODO: Separate getAllUsedBlockTypes() so that it is restricted to just
    //       used block types in a toolbox editor or just used block types in
    //       workspace editor.
    throw 'Unimplemented: getAllUsedBlockTypes()';
  }

  /**
   * Prompts user for name of a standard Blockly category (case insensitive),
   * loads it as a new category, and switches to it. Leverages StandardCategories.
   */
  loadStandardCategory() {
    // From wfactory_controller.js:loadCategory()
    // Prompt user for the name of the standard category to load.
    do {
      var name = prompt('Enter the name of the category you would like to import '
          + '(Logic, Loops, Math, Text, Lists, Colour, Variables, or Functions)');
      if (!name) {
        return;  // Exit if cancelled.
      }
    } while (!FactoryUtils.isStandardCategoryName(name));

    // Load category.
    this.loadCategoryByName(name);

    FactoryUtils.closeModal(this.view.openModal_);
    this.view.openModal_ = null;
  }

  /**
   * Loads the standard Blockly toolbox into the editing space. Should only
   * be called when the mode is set to toolbox.
   */
  loadStandardToolbox() {
    // From wfactory_controller.js:loadStandardToolbox()
    this.loadCategoryByName('Logic');
    this.loadCategoryByName('Loops');
    this.loadCategoryByName('Math');
    this.loadCategoryByName('Text');
    this.loadCategoryByName('Lists');
    this.loadCategoryByName('Colour');
    this.addCategorySeparator();
    this.loadCategoryByName('Variables');
    this.loadCategoryByName('Functions');
  }

  /**
   * Loads a Standard Category by name and switches to it. Leverages
   * StandardCategories. Does nothing if cannot load standard category.
   * @param {string} name Name of the standard category to load.
   */
  loadCategoryByName(name) {
    // From wfactory_controller.js:loadCategoryByName(name)
    // Check if the user can load that standard category.
    if (!FactoryUtils.isStandardCategoryName(name)) {
      return;
    }
    if (this.view.toolbox.hasVariables() && name.toLowerCase() == 'variables') {
      alert('A Variables category already exists. You cannot create multiple' +
          ' variables categories.');
      return;
    }
    if (this.view.toolbox.hasProcedures() && name.toLowerCase() == 'functions') {
      alert('A Functions category already exists. You cannot create multiple' +
          ' functions categories.');
      return;
    }
    // Check if the user can create a category with that name.
    const standardCategory = StandardCategories.categoryMap[name.toLowerCase()]
    if (this.view.toolbox.hasCategory(standardCategory.name)) {
      alert('You already have a category with the name ' + standardCategory.name
          + '. Rename your category and try again.');
      return;
    }
    // Transfers current flyout blocks to a category if it's the first category
    // created.
    if (this.view.toolbox.getSelected().type == ListElement.TYPE_FLYOUT &&
        this.view.editorWorkspace.getAllBlocks().length > 0) {
      // Transfers the user's blocks to a flyout if it's the first category created.
      this.transferFlyoutBlocksToCategory();
    }
    this.view.selectTab(this.view.toolbox.getSelectedId(), false);
    // Copy the standard category in the model.
    const copy = standardCategory.copy();

    // Add it to the model.
    this.view.toolbox.addElement(copy);
    this.view.toolbox.setXml(this.generateToolboxXml());

    // Load category blocks onto editor workspace.
    Blockly.Xml.domToWorkspace(copy.xml, this.view.editorWorkspace);

    // Update the copy in the view.
    const tab = this.view.addCategoryTab(copy.name, copy.id);
    this.addClickToSwitch(tab, copy.id);
    // Color the category tab in the view.
    if (copy.color) {
      this.view.setBorderColor(copy.id, copy.color);
    }
    // Switch to loaded category.
    this.switchElement(copy.id);
    // Convert actual shadow blocks to user-generated shadow blocks.
    this.convertShadowBlocks();
    // Save state from workspace before updating preview.
    this.saveStateFromWorkspace();
    // Update preview.
    this.updatePreview();
  }

  /**
   * Given a tab and a ID to be associated to that tab, adds a listener to
   * that tab so that when the user clicks on the tab, it switches to the
   * element associated with that ID.
   * @param {!Element} tab The DOM element to add the listener to.
   * @param {string} id The ID of the element to switch to when tab is clicked.
   */
  addClickToSwitch(tab, id) {
    // REFACTOR: Moved in from wfactory_controller.js:addClickToSwitch(tab, id)
    const clickFunction = (id) => {
      return () => {
        this.switchElement(id);
      };
    };
    this.view.bindClick(tab, clickFunction(id));
  }

  /**
   * Switches to a new tab for the element given by ID. Stores XML and blocks
   * to reload later, updates selected accordingly, and clears the workspace
   * and clears undo, then loads the new element.
   * @param {string} id ID of tab to be opened, must be valid element ID.
   */
  switchElement(id) {
    // From wfactory_controller.js:switchElement(id)
    // Disables events while switching so that Blockly delete and create events
    // don't update the preview repeatedly.
    Blockly.Events.disable();
    // Caches information to reload or generate XML if switching to/from element.
    // Only saves if a category is selected.
    if (this.view.toolbox.getSelectedId() != null && id != null) {
      this.view.toolbox.getSelected().saveFromWorkspace(this.view.editorWorkspace);
    }
    // Load element.
    this.clearAndLoadElement(id);
    // Enable Blockly events again.
    Blockly.Events.enable();
  }

  /**
   * Switches to a new tab for the element by ID. Helper for switchElement.
   * Updates selected, clears the workspace and clears undo, loads a new element.
   * @param {string} id ID of category to load.
   */
  clearAndLoadElement(id) {
    // From wfactory_controller.js
    // Unselect current tab if switching to and from an element.
    if (this.view.toolbox.getSelectedId() != null && id != null) {
      this.view.selectTab(this.view.toolbox.getSelectedId(), false);
    }

    // If switching to another category, set category selection in the model and
    // view.
    if (id != null) {
      // Set next category.
      this.view.toolbox.setSelected(id);

      // Clears workspace and loads next category.
      this.clearAndLoadXml_(this.view.toolbox.getSelectedXml());

      // Selects the next tab.
      this.view.selectTab(id, true);

      // Order blocks as shown in flyout.
      this.view.editorWorkspace.cleanUp();

      // Update category editing buttons.
      this.view.updateState(this.view.toolbox.getIndexById(this.view.toolbox.getSelectedId()),
          this.view.toolbox.getSelected());
    } else {
      // Update category editing buttons for no categories.
      this.view.updateState(-1, null);
    }
  }

  /**
   * Clears the toolbox workspace and loads XML to it, marking shadow blocks
   * as necessary. Helper function of clearAndLoadElement().
   * @private
   * @param {!Element} xml The XML to be loaded to the workspace.
   */
  clearAndLoadXml_(xml) {
    // From wfactory_controller.js
    this.view.editorWorkspace.clear();
    this.view.editorWorkspace.clearUndo();
    Blockly.Xml.domToWorkspace(xml, this.view.editorWorkspace);
    this.view.markShadowBlocks(this.getShadowBlocksInWorkspace
        (this.view.editorWorkspace.getAllBlocks()));
    this.warnForUndefinedBlocks_();
  }

  /*
   * Determines if a standard variable category is in the custom toolbox.
   * @return {boolean} True if a variables category is in use, false otherwise.
   */
  hasVariablesCategory() {
    // REFACTOR: Moved in from wfactory_controller.js
    return this.view.toolbox.hasVariables();
  }

  /**
   * Determines if a standard procedures category is in the custom toolbox.
   * @return {boolean} True if a procedures category is in use, false otherwise.
   */
  hasProceduresCategory() {
    // REFACTOR: Moved in from wfactory_controller.js
    return this.view.toolbox.hasProcedures();
  }

  /**
   * Extracts Toolbox XML from user-uploaded file. XML should be between marked
   * comments in uploaded file.
   *
   * @param {string} fileContents Contents of JS file uploaded by user.
   * @return {!Object.<string, string>} Toolbox name to XML string pair.
   */
  extractToolboxXml(fileContents) {
    let extractedToolbox = {};
    extractedToolbox.name = '';
    extractedToolbox.xmlString = '';

    /*
     * TODO: Move in from wfactory_generator.js:loadXml(jsFileContents, importMode)
     *                    wfactory_generator.js:evaluateMarkedCode(code)
     *
     * References:
     * - evaluateMarkedCode()
     */
     throw 'Unimplemented: extractToolboxXml()';
  }

  /**
   * Generates JavaScript string representation of toolbox for user to download.
   * Does not deal with popups or file system access; just generates content.
   *
   * @returns {string} String representation of JS file to be exported.
   */
  generateJsFileContents() {
    /*
     * TODO: Move in from wfactory_generator.js:generateJsFromXml(xml, name, mode)
     *       (Also moved into: workspace_contents.js)
     *
     * References:
     * - [NEW] this.generateXml()
     * - [NEW] this.name
     */
    throw 'Unimplemented: generateJsFileContents()';
  }

  /**
   * Exports the toolbox.
   */
  exportToolbox() {
    throw 'Unimplemented: exportToolbox()';
  }

  /**
   * Changes the color of the selected category. Does nothing if the selected
   * element is a separator.
   * @param {string} color The color to change the selected category. Must be
   *     a valid CSS string.
   */
  changeSelectedCategoryColor(color) {
    // From wfactory_controller.js:changeSelectedCategoryColor(color)
    // Return if category is not selected.
    if (this.view.toolbox.getSelected().type != ListElement.TYPE_CATEGORY) {
      return;
    }

    // Return if color is not valid.
    if (!FactoryUtils.isValidHex(color)) {
      return;
    }

    // Change color of selected category.
    this.view.toolbox.getSelected().changeColor(color);
    this.view.setBorderColor(this.view.toolbox.getSelectedId(), color);
    this.view.toolbox.setXml(this.generateToolboxXml());
    this.updatePreview();
  }

  /**
   * Given a set of blocks currently loaded, returns all blocks in the workspace
   * that are user generated shadow blocks.
   * @param {Array.<!Blockly.Block>} blocks Array of blocks currently loaded.
   * @return {Array.<!Blockly.Block>} Array of user-generated shadow blocks currently
   *     loaded.
   */
  getShadowBlocksInWorkspace(blocks) {
    // From wfactory_model.js:getShadowBlocksInWorkspace()
    let shadowsInWorkspace = [];
    blocks.forEach((block) => {
      if (this.view.toolbox.isShadowBlock(block.id)) {
        shadowsInWorkspace.push(block);
      }
    });
    return shadowsInWorkspace;
  }
}
