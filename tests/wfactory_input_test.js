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

let inputTestVar = {
  // JS special characters that need escape sequences
  specialChars: ['\'', '\\', '\\n', '\\0',
      '\\v', '\\r', '\\b', '\\t', '\\f'],

  // Literal representations needed to display the escape sequence for a special character
  charLiteral: ['\\\'', '\\\\', '\\\\n', '\\\\0',
      '\\\\v', '\\\\r', '\\\\b', '\\\\t', '\\\\f'],

  // Symbols
  symbols: '~!@#$%^&*()_+`=-_+|{};:<>.,/',

  // Random words (to include alphabet in testing)
  words: ['supercalifragilisticexpialidocious', 'blockly', 'test',
      'education', 'penguin', 'Gergle Blerkly', '  ', 'MiXiT.',
      'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch']
};

/**
 * Iterates through specialChars, compares against charLiteral after passing
 * through addEscape().
 */
function test_addEscape_simple() {
  for (let i = 0; i < inputTestVar.specialChars.length; i++) {
    assertEquals(inputTestVar.charLiteral[i],
        FactoryUtils.addEscape(inputTestVar.specialChars[i]));
  }
}

/**
 * Iterates through specialChars, creates a word including each special character.
 * Checks against charLiteral after passing through addEscape().
 */
function test_addEscapeWithWords() {
  let specialChars = inputTestVar.specialChars;
  let charLiteral = inputTestVar.charLiteral;
  let symbols = inputTestVar.symbols;
  let words = inputTestVar.words;

  for (let i = 0; i < inputTestVar.specialChars.length; i++) {
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
function test_evaluateMarkedCode() {
  let generator = new WorkspaceFactoryGenerator(null);
  test_evaluateMarkedCode.passedTest = false;

  let start = '/* BEGINNING BLOCKLY_TOOLBOX_XML ASSIGNMENT. DO NOT EDIT. USE BLOCKLY DEVTOOLS. */\n';
  let pass = 'test_evaluateMarkedCode.passedTest = true;';
  let end = '/* END BLOCKLY_TOOLBOX_XML ASSIGNMENT. DO NOT EDIT. */\n';
  let fail = 'assertTrue(false);\n';

  let runCode = fail + start + pass + end + fail;
  generator.evaluateMarkedCode(runCode);
  assertTrue(test_evaluateMarkedCode.passedTest);
}
