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

/**
 * WorkspaceFactoryController.isEmptyToolbox() test. Makes sure that empty toolboxes
 * are properly indicated as empty and non-empty toolboxes are properly indicated
 * as non-empty.
 */
function test_isEmptyToolbox() {
  let controller = new WorkspaceFactoryController('hi', 'toolboxDiv', 'previewDiv');

  // Confirm that empty toolboxes return true.
  let empty_xmls = {
    'space in between': '<xml> </xml>',
    'newline in between': '<xml>\n</xml>',
    'space and newline in between': '<xml> \n </xml>',
    'space in between tags': '<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">' +
        ' </xml>'
  };

  for (let key in empty_xmls) {
    assertTrue('FAILED: this.isEmptyToolbox() returned false when there was ' + key + '.',
        controller.isEmptyToolbox(empty_xmls[key]));
  }

  // Confirm that non-empty toolboxes return false.
  let nonempty_xmls = {
    'words in between': '<xml>Hello</xml>'
  };

  nonempty_xmls['a full toolbox'] =
      '<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">' +
        '<block type="math_arithmetic">' +
          '<field name="OP">ADD</field>' +
          '<value name="A">' +
            '<shadow type="math_number">' +
              '<field name="NUM">1</field>' +
            '</shadow>' +
          '</value>' +
          '<value name="B">' +
            '<shadow type="math_number">' +
              '<field name="NUM">1</field>' +
            '</shadow>' +
          '</value>' +
        '</block>' +
      '</xml>';

  for (let key in nonempty_xmls) {
    assertFalse('FAILED: this.isEmptyToolbox() returned true when there was ' + key + '.',
        controller.isEmptyToolbox(nonempty_xmls[key]));
  }
}

/**
 * WorkspaceFactoryController.addToolbox() test. Goes through the back-end motions
 * of adding a new toolbox to list of toolboxes, making sure every step is
 * correctly executed.
 */
function test_addToolbox() {
  console.log('test_addToolbox started.');
  let controller = new WorkspaceFactoryController('hi', 'toolboxDiv', 'previewDiv');

  console.log('Hi');

  // Making sure initial toolbox is an empty toolbox.
  assertTrue('FAILED: Toolbox is not empty upon init.',
      controller.isEmptyToolbox(controller.toolboxList[controller.currentToolbox]));

  // Checking that no extra toolboxes are accidentally created/added upon init.
  assertEquals('FAILED: controller.toolboxList has ' + len(controller) + ' elements.',
      1, len(controller));

  // Showing a toolbox should only be for preexisting toolbox names.
  assertFalse('FAILED: Showing a toolbox that does not exist.',
      controller.showToolbox('NonToolbox'));

  // Renaming toolbox should be succesful.
  assertTrue('',
      controller.renameToolbox('', 'blockly'));

  // Adding XML to sample toolbox called 'blockly'.
  controller.toolboxList['blockly'] =
      '<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">' +
        '<block type="math_arithmetic">' +
          '<field name="OP">ADD</field>' +
          '<value name="A">' +
            '<shadow type="math_number">' +
              '<field name="NUM">1</field>' +
            '</shadow>' +
          '</value>' +
          '<value name="B">' +
            '<shadow type="math_number">' +
              '<field name="NUM">1</field>' +
            '</shadow>' +
          '</value>' +
        '</block>' +
      '</xml>';


  assertFalse(controller.renameToolbox('NonToolbox', 'A Toolbox'));
  assertTrue(1, len(controller));
  assertTrue(controller.renameToolbox('A Toolbox', 'Another Toolbox'));
  assertTrue(1, len(controller));
}

/**
 * Returns how many toolboxes are saved into the controller.
 */
function len(controller) {
  let listSize = 0;
  console.log('toolboxList:');
  console.log(controller.toolboxList);
  for (let key in controller.toolboxList) {
    listSize += 1;
  }
  return listSize;
}
