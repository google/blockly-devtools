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
  /**
   * Static constants for block definition formats.
   */
  static get FORMAT_JSON() {
    return 'JSON';
  }
  static get FORMAT_JAVASCRIPT() {
    return 'JS';
  }

  /**
   * BlockDefinition Class.
   * @constructor
   * @param {string} blockTypeName The type name of the definition, used as a
   *                               key in Blockly.Blocks.
   * @param {string} format The format of the definition. Either 'JSON' or
   *                        'JS'.
   * @param {string=} opt_defStr Optional string representation block
   *                             definition, in the declared format.
   * @param {Element} opt_xml Optional XML DOM representing the block (to be
   *                          removed).
   *
   * @throws If format is not either 'JSON' or 'JS'.
   */
  // TODO(#260): Remove opt_xml.
  constructor(blockTypeName, format, opt_defStr, opt_xml) {
    super(blockTypeName, PREFIXES.BLOCK);

    /**
     * XML Element of blocks displayed on Block Editor workspace.
     * @type {!Element}
     */
    // TODO(#260): Remove.
    this.xml = Blockly.Xml.textToDom('<xml></xml>');

    /**
     * The JSON string representation of the block.
     * @type {string}
     */
    this.json_ = null;

    /**
     * The JavaScript string representation of the block.
     * @type {string}
     */
    this.javascript_ = null;

    this.update(format, opt_defStr, opt_xml)
  }

  /**
   * Retrieves the block's format and code as an array pair.
   * @return {!Array.<string>} Two-element array. First element is format of
   *                           code, and second is the block definition code.
   * @private
   */
  getBlockFormatCode() {
    if (this.json_) {
      return [BlockDefinition.FORMAT_JSON, this.json_];
    } else {
      return [BlockDefinition.FORMAT_JAVASCRIPT, this.javascript_];
    }
  }

  /**
   * Updates the block definition from a JSON string.
   * @param {string} format The format of the definition. Either 'JSON' or 'JS'.`
   * @param {string=} opt_defStr optional String representation block definition.
   * @param {Element} opt_xml optional XML string representing the block (to be removed).
   * @throws If format is not either 'JSON' or 'JS'.
   */
  update(format, opt_defStr, opt_xml) {
    if (format === BlockDefinition.FORMAT_JSON) {
      this.json_ = opt_defStr || this.createStarterJson_();
    } else if (format === BlockDefinition.FORMAT_JAVASCRIPT) {
      this.javascript_ = opt_defStr || this.createStarterJavaScript_();
    } else {
      throw new Error('Unrecognized BlockDefinition format specifier: ' + format);
    }

    // TODO(#260): Remove
    this.xml = opt_xml || Blockly.Xml.textToDom('<xml></xml>');
  }

  /**
   * Defines block by adding it to the Blockly.Blocks map. Previous entry in
   * Blockly.Blocks map is overwritten if the block has already been defined before.
   *
   * @throws If this.name is not valid.
   * @throws If cannot parse a JSON definition.
   * @throws If JavaScript eval throws, or does not generated the named block definition.
   * @throws If no definition string is found.
   */
  define() {
    if (!this.name) {
      throw new Error(
        'Block definition does not have a valid name. Cannot be added to ' +
        'Blockly.Blocks map.');
    }

    if (this.json_) {
      this.defineFromJson_();
    } else if (this.javascript_) {
      this.defineFromJavaScript_();
    } else {
      throw new Error('Illegal state in BlockDefinition: No definition string found.');
    }
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
   * Defines block from JSON string, adding it to the Blockly.Blocks map.
   * Previous entry in Blockly.Blocks map is overwritten if the block has
   * already been defined before.
   *
   * @throws If cannot parse the JSON definition.
   * @private
   */
  defineFromJson_() {
    const typeName = this.type();
    try {
      var jsonObj = JSON.parse(this.json_);
    } catch(jsonParseError) {
      console.log('BlockDefinition \"' + typeName + '\" JSON:', this.json_);
      throw jsonParseError;
    }

    jsonObj.name = typeName;

    Blockly.Blocks[typeName] = {
      init: function() {
        this.jsonInit(jsonObj);
      }
    };
  }

  /**
   * Defines block from JavaScript string, adding it to the Blockly.Blocks map.
   * Previous entry in Blockly.Blocks map is overwritten if the block has
   * already been defined before.
   *
   * @throws If JavaScript eval throws.
   * @throws If JavaScript does not generated the expected block definition.
   */
  defineFromJavaScript_() {
    try {
      // TODO(#278): Evaluate this definition in a sandbox / interpreter.
      eval(this.javascript_);
    } catch (e) {
      // TODO: Display evaluation error in the UI

      // Log the full stack trace of the error.
      console.error(
        'Error while evaluating JavaScript formatted block definition', e);
      this.undefine();  // Attempt to reset state.
      throw new Error('Failed to define block type from JavaScript.');
    }

    if (!Blockly.Blocks[this.name]) {
      throw new Error('Evaluating JavaScript did not define a block type named "'
          + this.name + '".');
    }
  }

  /**
   * Creates starter JSON for the block if no JSON has been provided.
   * @return {!Object} JSON with a defined type and message0 field.
   * @private
   */
  createStarterJson_() {
    var blockJson = Object.create(null);
    blockJson.type = this.type();
    blockJson.message0 = '';
    return JSON.stringify(blockJson, null, '  ');
  }

  /**
   * Creates starter JavaScript for the block if no definition has been provided.
   * @return {!Object} JSON with a defined type and message0 field.
   * @private
   */
  createStarterJavaScript_() {
    return `
Blockly.Blocks['${this.type()}'] = {
  init: function() {
    // Definition calls go here.
  }
};`;
  }

  /**
   * Returns the type of the block.
   * @return {string} The type name of the definition.
   */
  type() {
    return this.name;
  }

  /**
   * Sets type of BlockDefinition to new name.
   * @param {string} blockTypeName The type name of the definition.
   */
  setType(blockTypeName) {
    // TODO(#180): Remove references to setType() to be setName() to follow object
    // inheritance.
    this.setName(blockTypeName);
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
    return this.json_;
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
