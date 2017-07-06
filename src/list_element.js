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

goog.provide('ListElement');

/**
 * Each list element is an element of the WorkspaceFactoryModel. Either a
 * category, a separator, or a flyout.
 * @author Emma Dauterman (evd2014)
 *
 * @constructor
 */
ListElement = function(type, opt_name) {
  this.type = type;
  // XML DOM element to load the element.
  this.xml = Blockly.Xml.textToDom('<xml></xml>');
  // Name of category. Can be changed by user. Null if separator.
  this.name = opt_name ? opt_name : null;
  // Unique ID of element. Does not change.
  this.id = Blockly.utils.genUid();
  // Color of category. Default is no color. Null if separator.
  this.color = null;
  // Stores a custom tag, if necessary. Null if no custom tag or separator.
  this.custom = null;
};

// List element types.
ListElement.TYPE_CATEGORY = 'category';
ListElement.TYPE_SEPARATOR = 'separator';
ListElement.TYPE_FLYOUT = 'flyout';

/**
 * Saves a category by updating its XML (does not save XML for
 * elements that are not categories).
 * @param {!Blockly.workspace} workspace The workspace to save category entry
 * from.
 */
ListElement.prototype.saveFromWorkspace = function(workspace) {
  // Only save XML for categories and flyouts.
  if (this.type == ListElement.TYPE_FLYOUT ||
      this.type == ListElement.TYPE_CATEGORY) {
    this.xml = Blockly.Xml.workspaceToDom(workspace);
  }
};


/**
 * Changes the name of a category object given a new name. Returns if
 * not a category.
 * @param {string} name New name of category.
 */
ListElement.prototype.changeName = function (name) {
  // Only update list elements that are categories.
  if (this.type != ListElement.TYPE_CATEGORY) {
    return;
  }
  this.name = name;
};

/**
 * Sets the color of a category. If tries to set the color of something other
 * than a category, returns.
 * @param {string} color The color that should be used for that category.
 */
ListElement.prototype.changeColor = function (color) {
  if (this.type != ListElement.TYPE_CATEGORY) {
    return;
  }
  this.color = color;
};

/**
 * Makes a copy of the original element and returns it. Everything about the
 * copy is identical except for its ID.
 * @return {!ListElement} The copy of the ListElement.
 */
ListElement.prototype.copy = function() {
  copy = new ListElement(this.type);
  // Generate a unique ID for the element.
  copy.id = Blockly.utils.genUid();
  // Copy all attributes except ID.
  copy.name = this.name;
  copy.xml = this.xml;
  copy.color = this.color;
  copy.custom = this.custom;
  // Return copy.
  return copy;
};
