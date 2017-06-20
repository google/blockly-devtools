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
var words = ['hello', 'blockly', 'test', 'education',
    'penguin', 'Gergle Blerkly', '  ', 'MiXiT.'];

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
function test_addEscapeWithWords_ordered() {
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
 * addEscape() test with random words, large number of tests.
 */
function test_addEscapeWithWords_random() {
  for (var i = 0; i < 100; i++) {
    let randSymbol = random(0, specialChars.length);
    let randWord = random(0, words.length);
    let randChar = random(0, specialChars.length);

    assertEquals(words[randWord] + symbols[randSymbol] + charLiteral[randChar],
        FactoryUtils.addEscape(words[randWord] + symbols[randSymbol] + specialChars[randChar]));

    assertEquals(symbols[randSymbol] + charLiteral[randChar] + words[randWord],
        FactoryUtils.addEscape(symbols[randSymbol] + specialChars[randChar] + words[randWord]));

    assertEquals(charLiteral[randChar] + words[randWord] + symbols[randSymbol],
        FactoryUtils.addEscape(specialChars[randChar] + words[randWord] + symbols[randSymbol]));
  }
}

/**
 * addEscape() test with big words.
 */
function test_addEscapeWithBigWords() {
  for (var i = 0; i < 100; i++) {
    let name = generateName();
    assertEquals(name[0], name[1]);
  }
}

/**
 * WorkspaceFactoryGenerator.evaluateMarkedCode() test. Should fail if the code
 * within the fail variable is run.
 */
function test_evaluateMarkedCode_simple() {
  var generator = new WorkspaceFactoryGenerator(null);

  var start = '/* BEGINNING BLOCKLY_TOOLBOX_XML ASSIGNMENT. DO NOT EDIT. USE BLOCKLY DEVTOOLS. */\n';
  var pass = 'assertTrue(true);\n';
  var end = '/* END BLOCKLY_TOOLBOX_XML ASSIGNMENT. DO NOT EDIT. */\n';
  var fail = 'assertTrue(false);\n';

  generator.evaluateMarkedCode(fail + start + pass + end + fail);
}

/**
 * Generates random number from start (inclusive) to end (exclusive).
 */
function random(start, end) {
  return Math.floor((Math.random() * (end - start)) + start);
}

/**
 * Generates random large word using a random collection of words, symbols, and
 * special characters.
 */
function generateName() {
  let randSymbol = random(0, specialChars.length);
  let randWord = random(0, words.length);
  let randChar = random(0, specialChars.length);

  // Generate large word
  let jumble =
      symbols[randSymbol] +
      words[randWord] +
      specialChars[randChar] +
      words[(randWord + 5) % words.length] +
      symbols[(randSymbol + 5) % symbols.length] +
      specialChars[(randChar + 5) % specialChars.length] +
      words[(randWord - 5) % words.length];

  let correctJumble =
      symbols[randSymbol] +
      words[randWord] +
      charLiteral[randChar] +
      words[(randWord + 5) % words.length] +
      symbols[(randSymbol + 5) % symbols.length] +
      charLiteral[(randChar + 5)%charLiteral.length] +
      words[(randWord - 5) % words.length]

  return [correctJumble, FactoryUtils.addEscape(jumble)];
}
