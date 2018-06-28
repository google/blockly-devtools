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

/**
 * @fileoverview ImportResourcePopupController manages app response to the UI
 * for importing resources from file.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */
class ImportResourcePopupController extends PopupController {
  /**
   * @constructor
   * @param {!AppController} appController AppController for the session.
   * @param {ReadWriteController} readWriteController ReadWriteController for
   *    the session, used to read files.
   * @param {string} resourceType The type of resource to import.
   */
  constructor(appController, readWriteController, resourceType) {
    super(appController);

    /**
     * The ReadWriteController for the session, used to read files.
     * @type {!ReadWriteController}
     */
    this.readWriteController = readWriteController;

    /**
     * Type of resource to import.
     * @type {string}
     */
    this.resourceType = resourceType;

    const viewContents = this.makeImportPopupContents();

    /**
     * The popup view that this popup controller manages.
     * @type {!ImportResourcePopupView}
     */
    this.view = new ImportResourcePopupView(this, viewContents);

    // Listeners in the popup
    Emitter(this.view);
    this.view.on('exit', () => {
      this.exit();
    });

    this.view.on('submit', () => {
      this.constructResource(this.view.importLocation);
    });
  }

  /**
   * Generates view, which shows popup to user.
   */
  show() {
    this.view.show();
  }

  /**
   * Returns the html contents for the import popup.
   * @return {string} The html contents for the import popup.
   */
  makeImportPopupContents() {
    let htmlContents = `
<header align="center">Choose a file to import</header>
      <input type="file"  id="location"></input>
      <span id="warning_text">Please select a file.</span><br><br>
      <input type="button" value="Submit" id="submit">
`;
    return htmlContents;
  }

  /**
   * Constructs the resource based off of type.
   * @param {string} path Absolute path to the resource data.
   */
  constructResource(path) {
    if (this.resourceType == PREFIXES.BLOCK) {
      return this.readWriteController.constructBlock(path, 'web');
    } else if (this.resourceType == PREFIXES.LIBRARY) {
      return this.readWriteController.constructLibrary(path, 'web');
    } else if (this.resourceType == PREFIXES.TOOLBOX) {
      return this.readWriteController.constructToolbox(path, 'web');
    } else if (this.resourceType == PREFIXES.WORKSPACE_CONTENTS) {
      return this.readWriteController.constructWorkspaceContents(path, 'web');
    } else if (this.resourceType == PREFIXES.WORKSPACE_CONFIG) {
      return this.readWriteController.constructWorkspaceConfig(path, 'web');
    } else if (this.resourceType == PREFIXES.PROJECT) {
      return this.readWriteController.constructProject(path, 'web');
    }
  }
}
