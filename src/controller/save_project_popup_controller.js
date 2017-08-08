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

goog.provide('SaveProjectPopupController');

goog.require('SaveProjectPopupView');
goog.require('PopupController');


/**
 * @fileoverview SaveProjectPopup manages app response to the UI for saving projects.
 *
 * @author celinechoo (Celine Choo), sagev (Sage Vouse)
 */
class SaveProjectPopupController extends PopupController {
  /**
   * @constructor
   * @param {!AppController} appController AppController for the session.
   * @param {ReadWriteController} readWriteController ReadWriteController for
   * the session, used to write files.
   * @param {Array<Object>} toWrite Array of project elements to be written.
   * TODO #205: Pass in list of platforms ids (strings) for this save/export pass.
   */
  constructor(appController, readWriteController, toWrite) {
    super(appController);

    /**
     * The ReadWriteController for the session, used to write files.
     * @type {!ReadWriteController}
     */
    this.readWriteController = readWriteController;

    /**
     * Array of project elements to be written.
     * @type {Array<Object>}
     */
    this.toWrite = toWrite;

    /**
     * List of html division ids in the view, used to assign variables to the view
     * and update the ReadWriteController's directory map with the appropriate
     * keys.
     * Filled in by this.makeProjectPopupContents().
     * @type {Array<string>}
     */
    this.viewDivIds = [];

    const viewContents = this.makeProjectPopupContents();
    /**
     * The popup view that this popup controller manages.
     * @type {!SaveProjectPopupView}
     */
    this.view = new SaveProjectPopupView(this, this.viewDivIds, viewContents);

    // Listeners in the popup
    Emitter(this.view);
    this.view.on('exit', () => {
      this.exit();
    });

    this.view.on('submit', () => {
      // Save location for each division id, or, if no location chosen, set
      // a default.
      for (let divId of this.viewDivIds) {
          // The user has chosen a location, indicated by the existence of the
          // appropriate view variable (the name of this variable is the lower
          // case version of the matching directory map key.
          let typeAndName = divId.split("_");
          let type = typeAndName[0];
          let name = typeAndName[1];
          if (this.view[divId]) {
            this.getResource(type, name).webFilepath = this.view[divId];
          } else {
            // No location has been chosen, so default to the same directory as
            // the project.
            const projectLocation =
                this.appController.project.webFilepath;
            this.getResource(type, name).webFilepath = projectLocation;
          }
      }
      this.readWriteController.resourceDivIds = this.viewDivIds;
      // Save the project.
      this.readWriteController.saveAllFiles();
      this.exit();
    });
  }

  /**
   * Generates view, which shows popup to user.
   */
  show() {
    this.view.show();
  }

  /**
   * Creates the html contents for the project saving popup, based upon the
   * resources currently in the project.
   * @return {string} The html contents for the project saving popup.
   */
  makeProjectPopupContents() {
    let divName = this.readWriteController.getDivName(this.appController.project);
    let htmlContents = `
<header align="center">Choose File Locations</header>
    <h3>Project<span class="red">*</span></h3>
      <input type="file" nwdirectory id=
`;
    htmlContents = htmlContents + divName + '></input>' +
      '<span id="warning_text">Please select a project directory.</span><br><br>' +
          '<h3>Project Resources </h3><span>(default location is in the same ' +
            'directory as the project)</span><div id="projectResources">';
    this.viewDivIds.push(divName);
    let object = Object.create(null);
    this.appController.project.buildMetadata(object);
    for (let resource of object.resources) {
      divName = this.readWriteController.getDivName(resource);
      this.viewDivIds.push(divName);
      htmlContents = htmlContents +  resource.name +
          '<input type="file" nwdirectory id=' + '\"' + divName + '"></input><br><br>';
    }
    htmlContents = htmlContents + '</div><br><br>' +
        '<input type="button" value="Submit" id="submit">';
    return htmlContents;
  }

  /**
   * Gets resource based off of type and name.
   * @param {string} type The type of the resource.
   * @param {string} name The name of the resource.
   * @return {!Resource} The resource from the project.
   */
  getResource(type, name) {
    if (type == PREFIXES.BLOCK) {
      return this.appController.project.getBlockDefinition(name);
    } else if (type == PREFIXES.LIBRARY) {
      return this.appController.project.getBlockLibrary(name);
    } else if (type == PREFIXES.TOOLBOX) {
      return this.appController.project.getToolbox(name);
    } else if (type == PREFIXES.WORKSPACE_CONTENTS) {
      return this.appController.project.getWorkspaceContents(name);
    } else if (type == PREFIXES.WORKSPACE_CONFIG) {
      return this.appController.project.getWorkspaceConfiguration(name);
    } else if (type == PREFIXES.PROJECT) {
      return this.appController.project;
    }
  }

  /**
   * Initialize a Project based off of read values.
   * @param {string} projectMetaPath An absolute path to the project's metadata.
   * @param {string} platform The platform being uploaded.
   * @return {?Project} The reconstructed project, or null if invalid filepath.
   */
  constructProject(projectMetaPath, platform) {
    try {
      const dataString = fs.readFileSync(projectMetaPath, encoding);
    } except {
      throw 'invalid project metadata filepath';
      return null;
    }
    let data = JSON.parse(dataString);
    let project = new Project(data.name);
    for (let resource of data.resources) {
      if (resource.resourceType == PREFIXES.LIBRARY) {
        this.constructLibrary(resource.name, resource[platform].filepath);
      } else if (resource.resourceType == PREFIXES.TOOLBOX) {
        this.constructToolbox(resource.name, resource[platform.filepath]);
      } else if (resource.resourceType == PREFIXES.WORKSPACE_CONTENTS) {
          this.constructWorkspaceContents(resource.name, resource[platform].filepath);
      } else if (resource.resourceType == PREFIXES.WORKSPACE_CONFIG) {
          this.constructWorkspaceConfig(resource.name, resource[platform].filepath);
      }
    }
    return project;
  }

  /**
   * Construct a library based off of its metadata, and add it to the project.
   * @param {string} libraryName The name of the library.
   * @param {string} path The absolute filepath to the library data.
   */
  constructLibrary(libraryName, path) {
    try {
      const dataString = fs.readFileSync(path, encoding);
    } except {
      return;
    }

  }

  /**
   * Construct a toolbox based off of its metadata, and add it to the project.
   * @param {string} toolboxName The name of the toolbox.
   * @param {string} path The absolute filepath to the toolbox data.
   */
  constructToolbox(toolboxName, path) {

  }

  /**
   * Construct workspace contents based off of metadata and add to project.
   * @param {string} contentsName The name of the workspace contents.
   * @param {string} path The absolute filepath to the workspace contents data.
   */
  constructWorkspaceContents(contentsName, path) {

  }

  /**
   * Construct a workspace configuration based off of metadata and add to project.
   * @param {string} workspaceConfigName The name of the workspace configuration.
   * @param {string} path The absolute filepath to the workspace config's data.
   */
  constructWorkspaceConfig(workspaceConfigName, path) {

  }
}
