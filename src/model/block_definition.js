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
   */
  constructor(type) {
    super(type);

    /**
     * XML Element of blocks displayed on Block Editor workspace.
     * @type {!Element}
     */
    this.xml = null;
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
    this.name = type;
  }

  /**
   * Returns a block's JSON representation.
   * @return {!Object} JSON representation of the block.
   */
  getJson() {
    return {'id': this.type(), 'text': this.type()};
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
   * Saves XML of block editor blocks. Used for loading editing blocks when
   * switching blocks in the block editor.
   * @param {string} xml XML element of current block.
   */
  setXml(xml) {
    this.xml = xml;
  }
}
