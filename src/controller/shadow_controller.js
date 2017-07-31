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

goog.provide('ShadowController');

/**
 * @fileoverview ShadowController is an abstract class for any controller that
 * deals with shadow blocks. Children of ShadowController can inherit and share
 * shadow-block managing code, such as loading onto a hidden workspace to generate
 * real shadow blocks from the fake shadow blocks in the editor.
 *
 * @authors sagev (Sage Vouse), celinechoo (Celine Choo)
 */
class ShadowController {
  constructor(projectController, hiddenWorkspace) {
    /**
     * ProjectController that will edit toolboxes when edited in the toolbox
     *     editor.
     * @type {!ProjectController}
     */
    this.projectController = projectController;

    /**
     * Hidden Blockly workspace used to generate XML for shadow blocks.
     * @type {!Blockly.Workspace}
     */
    this.hiddenWorkspace = hiddenWorkspace;
  }

  /**
   * Sets the current resource displayed in the view. Used as model reference
   * when checking for shadow blocks.
   * @param {!Toolbox|!WorkspaceContents} resource The current resource that is
   *     displayed in editor view.
   */
  setResource(resource) {
    this.currentResource = resource;
  }

  /*
   * Makes the currently selected block a user-generated shadow block. These
   * blocks are not made into real shadow blocks, but recorded in the model
   * and visually marked as shadow blocks, allowing the user to move and edit
   * them (which would be impossible with actual shadow blocks). Updates the
   * preview when done.
   */
  setSelectedAsShadowBlock() {
    // From wfactory_controller.js:addShadow()
    // No block selected to make a shadow block.
    if (!this.view.selectedBlock) {
      return;
    }
    ShadowController.markShadowBlock(this.view.selectedBlock);
    this.currentResource.addShadowBlock(this.view.selectedBlock.id);

    // Apply shadow block to the children as well.
    for (let block of this.view.selectedBlock.getDescendants()) {
      ShadowController.markShadowBlock(block);
      this.currentResource.addShadowBlock(block.id);
    }

    this.view.showAndEnableShadow(false,
        ShadowController.isValidShadowBlock(this.view.selectedBlock, true));
    this.checkShadowStatus();
    // Save and update the preview.
    this.saveStateFromWorkspace();
    this.updatePreview();
  }

  /**
   * Makes user-generated shadow block back to a normal block again. Removes
   * block from list of shadow blocks and then reloads workspace. Updates the
   * preview when done.
   */
  unsetSelectedAsShadowBlock() {
    // From wfactory_controller.js
    if (!this.view.selectedBlock) {
      return;
    }
    ShadowController.unmarkShadowBlock(this.view.selectedBlock);
    this.currentResource.removeShadowBlock(this.view.selectedBlock.id);
    this.checkShadowStatus();
    this.view.showAndEnableShadow(true,
        ShadowController.isValidShadowBlock(this.view.selectedBlock, true));

    // Save and update the preview.
    this.saveStateFromWorkspace();
    this.updatePreview();
  }

  /**
   * Checks currently selected block if it is breaking any shadow block rules.
   * Sets warning text to user if it breaks a rule, and removes warning
   * text if not.
   * Shadow blocks must be nested within another block and cannot have any
   * non-shadow blocks as children.
   * @recursive Checks connected blocks for their shadow block status.
   */
  checkShadowStatus() {
    const selected = this.view.selectedBlock;
    if (!selected) {
      // Return if no block is selected.
      return;
    }

    // Check if shadow block.
    const isShadow = this.isUserGenShadowBlock(selected.id) ||
        $(selected.svgGroup_).hasClass('shadowBlock');

    // Check if valid shadow block position.
    const isValid = ShadowController.isValidShadowBlock(selected, isShadow);

    // Check if block has variables (variable blocks cannot be shadow blocks).
    const hasVar = FactoryUtils.hasVariableField(selected);
    this.view.enableShadowButtons(isShadow, isValid);

    // Checks various states of the selected block to make the warning text
    // more helpful/descriptive. Removes warning text if no rules are broken.
    if (isShadow && !isValid) {
      selected.setWarningText('Shadow blocks must be nested inside\n'
          + 'other shadow blocks or regular blocks.');
    } else if (isShadow && hasVar) {
      selected.setWarningText('Shadow blocks must be nested inside other'
          + ' blocks.');
    } else if (!isShadow && selected.getSurroundParent() &&
        $(selected.getSurroundParent().svgGroup_).hasClass('shadowBlock')) {
      selected.setWarningText('Regular blocks cannot be children\nof shadow '
          + 'blocks.');
    } else {
      selected.setWarningText(null);
    }

    if (selected.getNextBlock()) {
      // Recursively check next block in connection for its status.
      this.view.selectedBlock = selected.getNextBlock();
      this.checkShadowStatus();
      this.view.selectedBlock = selected;
    }
  }

  /**
   * Convert actual shadow blocks added from the toolbox to user-generated shadow
   * blocks.
   * @param {boolean} blockId ID of the selected block.
   * @private
   */
  createFakeShadowBlocks_(blockId) {
    // Converts actual shadow blocks to shadow-looking blocks in editor.
    this.convertShadowBlocks();
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
   * @param {!Element} xmlDom Tree of XML elements to be appended to.
   * @private
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
      if (this.currentResource.isShadowBlock(block.id)) {
        block.setShadow(true);
      }
    });
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
      if (this.currentResource.isShadowBlock(block.id)) {
        shadowsInWorkspace.push(block);
      }
    });
    return shadowsInWorkspace;
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
        this.currentResource.addShadowBlock(block.id);
        ShadowController.markShadowBlock(block);
      }
    });
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
    FactoryUtils.markShadowBlock(block);
    this.currentResource.addShadowBlock(block.id);

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
   * Returns array of shadow blocks from a list of blocks.
   * @param {!Array.<!Blockly.Block>} blockList List of blocks.
   * @return {!Array.<!Blockly.Block>} List of shadow blocks from given list.
   */
  static getShadowBlocks(blockList) {
    let shadowBlocks = [];
    for (let block of blockList) {
      if ($(block.svgGroup_).hasClass('shadowBlock')) {
        shadowBlocks.push(block);
      }
    }
    return shadowBlocks;
  }

  /**
   * Removes visual marking for a shadow block given a rendered block.
   * @param {!Blockly.Block} block The block that should be unmarked as a shadow
   *     block (must be rendered).
   */
  static unmarkShadowBlock(block) {
    // REFACTOR: Moved in from wfactory_view.js
    Blockly.utils.removeClass(block.svgGroup_, 'shadowBlock');
  }

  /**
   * Given a Blockly.Block, visually marks a block in the view to look like a
   * shadow block.
   * @param {!Blockly.Block} block Blockly block to be marked as a shadow block.
   */
  static markShadowBlock(block) {
    // REFACTOR: Moved in from wfactory_view.js:markShadowBlock(block)
    // Add Blockly CSS for user-generated shadow blocks.
    Blockly.utils.addClass(block.svgGroup_, 'shadowBlock');
    // If not a valid shadow block, add a warning message.
    if (!block.getSurroundParent()) {
      block.setWarningText('Shadow blocks must be nested inside other blocks' +
          ' be displayed.');
    }
    if (FactoryUtils.hasVariableField(block)) {
      block.setWarningText('Cannot make variable blocks shadow blocks.');
    }
  }

  /**
   * Given a unique block ID, uses the model to determine if a block is a
   * user-generated shadow block.
   * @param {string} blockId The unique ID of the block to examine.
   * @return {boolean} True if the block is a user-generated shadow block, false
   *     otherwise.
   */
  isUserGenShadowBlock(blockId) {
    return this.currentResource.isShadowBlock(blockId);
  }

  /**
   * Checks whether the given block is a valid shadow block.
   * @param {!Blockly.Block} block The block to be evaluated for shadow block
   *     validity.
   * @param {boolean} isShadow Whether the given block is a shadow block.
   * @return {boolean} Whether the given block is a valid shadow block that
   *     does not need warning text.
   */
  static isValidShadowBlock(block, isShadow) {
    // Check if valid shadow block position.
    const children = block.getChildren();
    // To be a valid shadow block candidate, the block must (1) have a parent,
    // and (2) have only shadow blocks as its children.
    const isValid = block.getSurroundParent() != null &&
        (isShadow || ShadowController.getShadowBlocks(children).length == children.length);
    return isValid;
  }
}
