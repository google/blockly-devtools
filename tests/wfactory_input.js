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
 * @fileoverview Tests for workspace factory input.
 * @author Celine Choo (celinechoo)
 */
'use strict';

var specialChars = ['\'', '\\', '\n', '\0', '\v', '\r', '\"', '\b', '\t', '\f'];
var symbols = '~!@#$%^&*()_+`=-_+|{};:<>.,/';
var words = ['hello', 'blockly', 'wao'];

function runSymbols(fcn) {
  for (var i = 0; i < symbols.length; i++) {
    fcn(symbols.charAt(i));
  }
}

function runSpecials(fcn) {
  for (var i = 0; i < specialChars.length; i++) {
    fcn(specialChars.charAt(i));
  }
}

function test_toolboxName_simple() {

}

function test_toolboxName_specialChar() {

}

function test_toolboxName_simple() {

}

function test_toolboxName_specialChar() {

}

function test_categoryName_simple() {

}

function test_categoryName_specialChar() {

}

function test_exportComment() {

}