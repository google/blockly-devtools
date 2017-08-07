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

goog.provide('BlockDefinition');

/**
 * @class BlockDefinition provides accessors to a block definition for the
 *     purposes of the DevTools Application.
 */
class BlockDefinition extends Resource {
// TODO: add methods, fields, etc.
  /**
   * BlockDefinition Class.
   * @constructor
   * @param {string} type The name of the block.
   * @param {?Object} opt_json optional JSON representation of the block.
   */
  constructor(type, opt_json) {
    super(type, PREFIXES.BLOCK);

    /**
     * XML Element of blocks displayed on Block Editor workspace.
     * @type {!Element}
     */
    this.xml = Blockly.Xml.textToDom('<xml></xml>');

    /**
     * The JSON representation of the block.
     * @type {!Object}
     */
    this.json = opt_json || this.createStarterJson();

    /**
     * Keeps track of whether a BlockDefinition has been defined previously
     * to prevent defining a block multiple times.
     * @type {boolean}
     * @private
     */
    this.isDefined_ = false;
  }

  /**
   * Defines block by adding it to the Blockly.Blocks map. If the block has
   * already been defined before, nothing is executed.
   */
  define() {
    if (this.isDefined_) {
      return;
    }
    const json = this.json;
    Blockly.Blocks[this.name || 'unnamed'] = {
      init: function() {
        this.jsonInit(json);
      }
    };
    this.isDefined_ = true;
  }

  /**
   * Undefines block by removing it from Blockly.Blocks map.
   */
  undefine() {
    if (Blockly.Blocks[this.name]) {
      delete Blockly.Blocks[this.name];
      this.isDefined_ = false;
    }
  }

  /**
   * Creates starter JSON for the block if no JSON has been provided.
   * @return {!Object} JSON with a defined type and message0 field.
   */
  createStarterJson() {
    var blockJson = Object.create(null);
    blockJson.type = this.type();
    blockJson.message0 = '';
    return blockJson;
  }

  /**
   * Returns the type of the block.
   * @return {string} The block type.
   */
  type() {
    return this.name;
  }

  /**
   * Sets type of BlockDefinition to new name.
   * @param {string} type New type name of block.
   */
  setType(type) {
    // TODO(#180): Remove references to setType() to be setName() to follow object
    // inheritance.
    this.setName(type);
  }

  /**
   * Returns a block's navigation tree-specific JSON representation.
   * @return {!Object} The navigation tree-specific JSON for the block.
   */
  getNavTreeJson() {
    return {
      'id': this.type(),
      'text': this.type()
    };
  }

  /**
   * Returns a block's XML representation.
   * @return {!Element} XML representation of the block.
   */
  // TODO(#87): Phase out once BlockDefinition <--> JSON
  getXml() {
    return this.xml;
  }

  /**
   * Returns a block's JSON representation.
   * @return {!Object} The JSON for the block.
   */
  getBlockDefinitionJson() {
    return this.json;
  }

  /**
   * Saves XML of block editor blocks. Used for loading editing blocks when
   * switching blocks in the block editor.
   * @param {!Element} xml XML element of current block.
   */
  setXml(xml) {
    if (!(xml instanceof Element)) {
      console.warn('XML set to be a string. Converted to DOM element.');
      xml = Blockly.Xml.textToDom(xml);
    }
    this.xml = xml;
  }
}
