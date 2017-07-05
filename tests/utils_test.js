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
 * @fileoverview Tests for DevTools Util functions.
 * @author Celine Choo (celinechoo)
 */

'use strict';

function test_isStandardCategoryName_simple() {
  let standardCategoryNames = ['logic', 'loops', 'math', 'text', 'lists', 'colour',
      'functions'];
  let notStandardNames = ['logics', 'log ic', 'looops', ' math ', 'text\n', 'LoGic ',
      '\nlogic', 'color'];

  for (let i in standardCategoryNames) {
    let word = standardCategoryNames[i];
    if (!FactoryUtils.isStandardCategoryName(word)) {
      fail('FAILED: ' + word + ' is a standard category.');
    }
    if (!FactoryUtils.isStandardCategoryName(word.toUpperCase())) {
      fail('FAILED: ' + word + ' is a standard category.');
    }
  }

  for (let i in notStandardNames) {
    let word = notStandardNames[i];
    if (FactoryUtils.isStandardCategoryName(word)) {
      fail('FAILED: ' + word + ' is not a standard category.');
    }
  }
}
