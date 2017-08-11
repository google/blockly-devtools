# Blockly Developer Tools
[Blockly Developer Tools]({{dev_tools_url}})
is a native desktop application that automates parts of the Blockly configuration
process, including creating custom blocks, building your toolbox,
and configuring your Blockly workspace.

The Blockly developer process allows users to:

* Create custom blocks using the block editor.
* Organize custom blocks into groupings called "block libraries."
* Build toolboxes using the toolbox editor.
* Build workspace contents (blocks that are loaded onto a Blockly workspace on
  load)
* Configure a workspace using Workspace Factory (currently a web-only
  feature).


## Creating Blockly resource components
The developer tools application has four editors, one for each resource component
required to build a Blockly application. The first editor is the block editor, where
developers can create and define custom blocks. The second is the toolbox editor,
where developers can create multiple groupings of blocks for a Blockly workspace.
The workspace contents editor configures what blocks are first displayed on the
Blockly workspace when loading the Blockly application. Developers can use the
workspace configuration editor to save workspace inject options used when exporting
and creating a Blockly application.

New resource components of your blockly application (such as block libraries, block
definitions, toolboxes, workspace contents, and workspace configurations) can
be added via the menubar at the top left (under File), as well as via the add
button at the bottom left, under the navigation tree.

### Creating a project
When first loading the developer tools application, you will be presented with
a prepopulated sample project, from which you can start creating your Blockly
project.

A project is a concept only used by developers who are using the Blockly API to
create custom blocks and custom Blockly applications. End users will not be
exposed to this concept explicitly. This is just to make the often iterative
development process for Blockly developers easy and intuitive.

Your Blockly project consists of the five resources in a Blockly application,
as mentioned earlier (block libraries, block definitions, toolboxes, workspace
contents, and workspace configurations). You can create one or more of the
aforementioned resources, and choose from your multiple Blockly resources when
creating your Blockly application.

You can navigate through your project and your various resources by clicking
through the navigation tree at the left side of the application. Clicking on
folders will not open up new views, but clicking on Blockly resources will
present you with the resource in its editor.

### Creating block libraries
Block libraries are not user-facing concepts. This means that an end user of your
Blockly application will not know what block belongs in what library. Well-designed
block libraries, however, should be easy to understand at a high level (e.g.,
a good example of a block library might be "Movement Blocks," which contains all
blocks related to movement for your Blockly application).

A block library is essentially a grouping of block definitions. This makes it
easier for you, the developer, to organize your blocks to refer to them later,
save them, and move them around together (as the block definitions that belong
in one library will be in the same file).

The developer tools application, when opening an empty project, will auto-create
a default block library, "MyFirstBlockLibrary." You can always add more block
definitions by using the menubar of the app or by using the add button at the
bottom left side of the window.

### Defining a block within a block library
Within each block library, you can create blocks which are defined by using the
editor workspace on the left and seeing the output on the right. There is a
preview workspace at the top to see what your block will look like in your final
Blockly application, as well as textareas below the preview to see the corresponding
generator stubs and block definitions.

Blocks are referenced by their name, so each block you want to create must have
a unique name. Even within a given project, block names must be unique.

### Creating a toolbox
The toolbox editor helps build the XML for a Toolbox.  The material assumes
familiarity with features of a [Toolbox](/blockly/guides/configure/web/toolbox).
If you already have XML for a toolbox that you want to edit here, you can
load it by clicking "Load to Edit".

#### Toolbox without categories

If you have a few blocks and want to display them without any categories, simply
drag them into the workspace, and you will see your blocks appear in the toolbox
in the preview.

![](https://developers.google.com/blockly/images/workspace_fac_no_cat.png)

#### Toolbox with categories
If you want display blocks in categories, click the “+” button and select the
dropdown item for new category. This will add a category to your category list
that you can select and edit. Select “Standard Category” to add an individual
standard Blockly category (Logic, Loops, etc.), or “Standard Toolbox” to add all
standard Blockly categories. Use the arrow buttons to reorder categories.

![](https://developers.google.com/blockly/images/category_menu.png)

Note: The standard categories and toolbox include all the blocks in the
[Playground](https://blockly-demo.appspot.com/static/tests/playground.html).
This set of blocks is not appropriate for most apps and should be pruned as
needed.  Also, some blocks are not supported on mobile yet.

To change the selected category’s name or color use the “Edit Category”
dropdown. Dragging a block into the workspace will add it to the selected
category.

![](https://developers.google.com/blockly/images/edit_category.png)

#### Advanced blocks
By default, you can add any of the standard blocks or any blocks in your library
to the toolbox. If you have blocks defined in JSON that aren't in your library,
you can import them using the "Import Custom Blocks" button.

Some blocks should be used together or include defaults. This is done with
[groups and shadows](/blockly/guides/configure/web/toolbox#block_groups). Any
blocks that are connected in the editor will be added to the toolbox as a group.
Blocks that are attached to another block can also be changed to shadow blocks
by selecting the child block and clicking the "Make Shadow" button.
Note: Only child blocks that don't contain a variable may be changed to shadow
blocks.

If you include a variable or function block in their toolbox, include a
“Variables” or “Functions” category in your toolbox to allow users to fully
utilize the block. Learn more about
[“Variables” or “Functions" categories](/blockly/guides/configure/web/toolbox#categories).

### Creating workspace contents
Workspace contents are the blocks that are loaded onto a Blockly workspace when
first loaded. This is set right after injecting the workspace.

To add blocks to your workspace contents, simply drag your desired blocks into
the editor workspace. When used in your final Blockly application, the blocks
in your editor workspace will be automatically loaded for your end-user. One
use case of using workspace contents is for giving your end-user cues on what
blocks to start with.

### Creating workspace configurations
Workspace configurations are presets for an individual Blockly workspace. This
eventually goes into the `Blockly.Options` object which is created while injecting
Blockly. The configurations editor is simply a checklist of options. You can
make some workspaces readonly, others with a zoom function, and limit others
with the number of blocks they can use.

## Managing your project

### Saving your project
Once you are satisfied with your Blockly development, you can save your project
via the menubar at the top of the application window (or, for Macs, at the top
menubar). Click `File > Save All`, decide your project location, and save your
project into a directory of your choice.

You can manually edit the files within your project and load them again at a later
time. Your manual changes will be reflected the next time you open up the project
in developer tools. However, keep in mind not to touch any files that are not
specifically Blockly resource files (such as metadata files, which are necessary
for parsing your project structure to load again into the application).

### Opening your project
When opening your application, first open the developer tools app and go to
`File > Open Project` to bring up the popup. Using the file explorer, search
through your local filesystem for the project you wish to open, and open your
project through the metadata file.

Doing so should reload the app with your previously edited Blockly project.

### Exporting parts of your project as a Blockly workspace
When you are ready to create a Blockly workspace for your application, click on
`File > Create Application for Web` via the menubar. Doing so will bring up a
popup which allows you to choose one toolbox, one workspace contents, and one
workspace configuration to group together into one Blockly workspace.

You can find the auto-generated inject file in your saved project, and can also
manually export one file to save to a different location.
