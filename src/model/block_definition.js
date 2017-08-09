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
   * @param {string=} opt_json optional String representation block definition
   *     JSON.
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
     * @type {string}
     */
    this.json = opt_json || this.createStarterJson();
  }

  /**
   * Defines block by adding it to the Blockly.Blocks map. Previous entry in
   * Blockly.Blocks map is overwritten if the block has already been defined before.
   * @throws If BlockDefinition object is unnamed.
   */
  define() {
    if (!this.name) {
      throw 'Block definition does not have a valid name. Cannot be added to ' +
          'Blockly.Blocks map.';
      return;
    }
    const json = JSON.parse(this.json);
    Blockly.Blocks[this.name] = {
      init: function() {
        this.jsonInit(json);
      }
    };
  }

  /**
   * Undefines block by removing it from Blockly.Blocks map.
   */
  undefine() {
    if (Blockly.Blocks[this.name]) {
      delete Blockly.Blocks[this.name];
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
    return JSON.stringify(blockJson, null, '  ');
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
   * Returns a block's XML representation.
   * @return {!Element} XML representation of the block.
   */
  // TODO(#87): Phase out once BlockDefinition <--> JSON
  getXml() {
    return this.xml;
  }

  /**
   * Returns a block's JSON representation.
   * @return {string} The JSON for the block.
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
