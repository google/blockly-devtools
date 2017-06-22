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
 * Tests whether the default toolbox is properly loaded and displayed upon opening
 * DevTools.
 */
function test_toolboxInit() {
  let controller = new WorkspaceFactoryController('name', 'toolboxDiv', 'previewDiv');
  let model = controller.model;

  assertEquals('FAILED: toolboxList does not have just one element (has ' +
        len(controller) + 'number of elements) upon init.',
      1, len(controller));
  assertTrue('FAILED: Default toolbox name does not exist upon init.',
      model.toolboxNameIsTaken(''));
  assertTrue('FAILED: Default toolbox is not empty.',
      model.isEmptyToolbox(''));
  assertFalse('FAILED: Default toolbox is not recognized as default.',
      model.ifNamedToolbox());
}

/**
 * Tests WorkspaceFactoryModel.addToolbox().
 */
function test_addToolbox() {
  let controller = new WorkspaceFactoryController('name', 'toolboxDiv', 'previewDiv');
  let model = controller.model;

  assertEquals('FAILED: Toolbox has length of ' + len(controller) + '. Expected 1.',
      1, len(controller));

  model.addToolbox('test');

  assertEquals('FAILED: Toolbox has length of ' + len(controller) + '. Expected 2.',
      2, len(controller));

  assertTrue('FAILED: Newly added toolbox is not an empty toolbox.',
      model.isEmptyToolbox(model.toolboxList['test']));
}

/**
 * Tests if WorkspaceFactoryModel.ifNamedToolbox() can properly recognize the
 * default toolbox (the empty string).
 */
function test_ifNamedToolbox() {
  let controller = new WorkspaceFactoryController('name', 'toolboxDiv', 'previewDiv');
  let model = controller.model;

  assertFalse('FAILED: toolboxList should contain one unnamed toolbox upon init.',
      model.ifNamedToolbox());

  model.renameToolbox('', 'hello');

  assertTrue('',
      model.ifNamedToolbox());

  model.renameToolbox('hello', 'ain\'t');

  assertTrue('',
      model.ifNamedToolbox());

  model.renameToolbox('ain\'t', ' ');

  assertTrue('',
      model.ifNamedToolbox());
}

/**
 * Tests if WorkspaceFactoryModel.renameToolbox() can properly rename toolboxes
 * and reject names when they are not valid.
 */
function test_renameToolbox() {
  let controller = new WorkspaceFactoryController('name', 'toolboxDiv', 'previewDiv');
  let model = controller.model;
  // Number of toolboxes saved.
  let numToolboxes = 1;

  assertTrue('FAILED: Default toolbox name \'\' is not in toolboxList.',
      model.toolboxNameIsTaken(''));
  assertTrue('FAILED: Toolbox name "test2" is not saved into toolboxList.',
      model.renameToolbox('', 'test2'));
  assertFalse('FAILED: Default toolbox is still in list after deletion.',
      model.toolboxNameIsTaken(''));
  assertEquals('FAILED: Toolbox has ' + len(controller) + 'toolboxes saved.',
      numToolboxes, len(controller));

  model.addToolbox('anotherTest');
  numToolboxes += 1;

  assertFalse('FAILED: Toolbox names should not be able to be renamed to a ' +
        'single space.',
      model.renameToolbox('anotherTest', ' '));
  assertEquals('FAILED: Toolbox has ' + len(controller) + 'toolboxes saved.',
      numToolboxes, len(controller));

  model.addToolbox('test3');
  numToolboxes += 1;

  assertFalse('Failed: Toolbox names should not be able to be renamed to a ' +
        'newline.',
      model.renameToolbox('test3', '\n'));
  assertEquals('FAILED: Toolbox has ' + len(controller) + 'toolboxes saved.',
      numToolboxes, len(controller));

  model.addToolbox('test4');
  numToolboxes += 1;

  assertFalse('FAILED: Toolbox names should not be able to be renamed to a ' +
        'newline or space.',
      model.renameToolbox('test4', ' \n '));
  assertEquals('FAILED: Toolbox has ' + len(controller) + 'toolboxes saved.',
      numToolboxes, len(controller));
}

/**
 * Checks whether WorkspaceFactoryModel.toolboxNameIsTaken() properly recognizes
 * already taken toolbox names.
 */
function test_toolboxNameIsTaken() {
  let controller = new WorkspaceFactoryController('name', 'toolboxDiv', 'previewDiv');
  let model = controller.model;

  model.toolboxList['hello'] = '<xml></xml>';

  assertTrue('FAILED: Toolbox name "hello" is not found in toolboxList.',
      model.toolboxNameIsTaken('hello'));
  assertFalse('FAILED: Toolbox name "bye" is found in toolboxList. "bye" should ' +
        'not exist in list.',
      model.toolboxNameIsTaken('bye'));
}

/**
 * WorkspaceFactoryController.isEmptyToolbox() test. Makes sure that empty toolboxes
 * are properly indicated as empty and non-empty toolboxes are properly indicated
 * as non-empty.
 */
function test_isEmptyToolbox() {
  let controller = new WorkspaceFactoryController('hi', 'toolboxDiv', 'previewDiv');
  let model = controller.model;

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
        model.isEmptyToolbox(empty_xmls[key]));
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
        model.isEmptyToolbox(nonempty_xmls[key]));
  }
}

/**
 * Tests various toolbox functions in WorkspaceFactoryController. Goes through
 * the back-end motions of adding a new toolbox to list of toolboxes, making sure
 * every step (other function calls) is correctly executed.
 */
function test_toolboxFunctions() {
  let controller = new WorkspaceFactoryController('name', 'toolboxDiv', 'previewDiv');
  let model = controller.model;

  // Making sure initial toolbox is an empty toolbox.
  assertTrue('FAILED: Toolbox is not empty upon init.',
      model.isEmptyToolbox(model.toolboxList[model.currentToolbox]));

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
  controller.model.toolboxList['blockly'] =
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

  // Make sure that trying to rename a toolbox that DNE does not work.
  assertFalse(controller.renameToolbox('NonToolbox', 'A Toolbox'));
  // Assert that no toolboxes have been accidentally added in the process.
  assertTrue(1, len(controller));

  // Make sure that trying to rename a toolbox that does exists, works.
  assertTrue(controller.renameToolbox('A Toolbox', 'Another Toolbox'));
  // Assert that no toolboxes have been accidentally added in the process.
  assertTrue(1, len(controller));
}

/**
 * Tests WorkspaceFactoryController.showToolbox(). Used for showing toolboxes
 * onto workspace. Makes sure that the back-end storage of toolbox XML matches
 * with the toolbox displayed on page.
 */
function test_showToolbox() {
  let controller = new WorkspaceFactoryController('name', 'toolboxDiv', 'previewDiv');

  // Hard-code in a new toolbox.
  controller.currentToolbox = 'New_toolbox';
  controller.toolboxList[controller.currentToolbox] =
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

  // Show toolbox.
  controller.showToolbox('New_toolbox');

  // Toolbox retrieved from workspace should be equal to saved XML.
  let actual = Blockly.Xml.domToPrettyText
      (this.generator.generateToolboxXml());
  let expected = controller.toolboxList[controller.currentToolbox];

  assertEquals('FAILED: showToolbox() is displaying a different toolbox than expected.',
      expected, actual);
}

/**
 * Returns how many toolboxes are saved into the controller.
 */
function len(controller) {
  let listSize = 0;
  for (let key in controller.model.toolboxList) {
    listSize += 1;
  }
  return listSize;
}
