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
 * @fileoverview Tests for DevTools Workspace Factory.
 * @author Celine Choo (celinechoo)
 */

'use strict';

// JS special characters that need escape sequences
var specialChars = ['\'', '\\', '\\n', '\\0',
    '\\v', '\\r', '\\b', '\\t', '\\f'];

// Literal representations needed to display the escape sequence for a special character
var charLiteral = ['\\\'', '\\\\', '\\\\n', '\\\\0',
    '\\\\v', '\\\\r', '\\\\b', '\\\\t', '\\\\f'];

// Symbols
var symbols = '~!@#$%^&*()_+`=-_+|{};:<>.,/';

// Random words (to include alphabet in testing)
var words = ['supercalifragilisticexpialidocious', 'blockly', 'test',
    'education', 'penguin', 'Gergle Blerkly', '  ', 'MiXiT.',
    'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch'];

/**
 * Iterates through specialChars, compares against charLiteral after passing
 * through addEscape().
 */
function test_addEscape_simple() {
  for (var i = 0; i < specialChars.length; i++) {
    assertEquals('a$' + charLiteral[i] + 'b@%$@#^',
        'a$' + FactoryUtils.addEscape(specialChars[i]) + 'b@%$@#^');
  }
}

/**
 * Iterates through specialChars, creates a word including each special character.
 * Checks against charLiteral after passing through addEscape().
 */
function test_addEscapeWithWords() {
  for (var i = 0; i < specialChars.length; i++) {
    let symbolIndex = i;
    let wordIndex = i;
    let charIndex = i;

    assertEquals(words[wordIndex] + symbols[symbolIndex] + charLiteral[charIndex],
        FactoryUtils.addEscape(words[wordIndex] + symbols[symbolIndex] + specialChars[charIndex]));

    assertEquals(symbols[symbolIndex] + charLiteral[charIndex] + words[wordIndex],
        FactoryUtils.addEscape(symbols[symbolIndex] + specialChars[charIndex] + words[wordIndex]));

    assertEquals(charLiteral[charIndex] + words[wordIndex] + symbols[symbolIndex],
        FactoryUtils.addEscape(specialChars[charIndex] + words[wordIndex] + symbols[symbolIndex]));
  }
}

/**
 * WorkspaceFactoryGenerator.evaluateMarkedCode() test. Should fail if the code
 * within the fail variable is run.
 */
function test_evaluateMarkedCode_simple() {
  var generator = new WorkspaceFactoryGenerator(null);
  var passedTest = false;

  var start = '/* BEGINNING BLOCKLY_TOOLBOX_XML ASSIGNMENT. DO NOT EDIT. USE BLOCKLY DEVTOOLS. */\n';
  var pass = 'test_evaluateMarkedCode_simple.passedTest = true;';
  var end = '/* END BLOCKLY_TOOLBOX_XML ASSIGNMENT. DO NOT EDIT. */\n';
  var fail = 'assertTrue(false);\n';

  var runCode = fail + start + pass + end + fail;
  console.log(runCode);
  generator.evaluateMarkedCode(runCode);
  assertTrue(test_evaluateMarkedCode_simple.passedTest);
}
