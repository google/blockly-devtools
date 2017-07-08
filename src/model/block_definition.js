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
 * @class BlockDefinition provides accessors to a block definition for the
 *     purposes of the DevTools Application.
 */
class BlockDefinition {
// TODO: add methods, fields, etc.
  /**
   * BlockDefinition Class.
   * @constructor
   */
  constructor() {
    this.type;
  }

  /**
   * Returns a block's JSON representation.
   * @return {!Object} JSON representation of the block.
   */
  getJson() {
    throw "unimplemented: getJson";
  }

  /**
   * Returns a block's XML representation.
   * @return {!Element} XML representation of the block.
   */
   //TODO #87: phase out
  getXml() {
    throw "unimplemented: getXml";
  }
}
