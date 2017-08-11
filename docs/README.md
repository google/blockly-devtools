# Blockly Developer Tools
[Blockly Developer Tools]({{dev_tools_url}})
is a native desktop application that automates parts of the Blockly configuration
process, including creating custom blocks, building your toolbox,
and configuring your web Blockly workspace.

The Blockly developer process using the tool consists of three parts:

* Create custom blocks using the block editor.
* Organize custom blocks into groupings called "block libraries."
* Build toolboxes using the toolbox editor.
* Build workspace contents (blocks that are loaded onto a Blockly workspace on
  load)
* Configure your workspace using Workspace Factory (currently a web-only
  feature).


## Block Factory Tab
The Block Factory tab helps you create
[block definitions](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks) and
[code generators](https://developers.google.com/blockly/guides/create-custom-blocks/generating-code)
for custom blocks. On this tab you can easily create, modify, and save
custom blocks.

### Defining a block
This video walks through the steps of defining a block in detail. The UI is out
date, but the block features it highlights are still accurate.
<div class="">
  <iframe class="devsite-embedded-youtube-video" data-video-id="s2_xaEvcVI0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


### Managing the library
Blocks are referenced by their name, so each block you want to create must have
a unique name. The UI enforces this and makes it clear when you are 'saving'
a new block or 'updating' an existing block.

![](https://developers.google.com/blockly/images/block_save_as.png) ![](https://developers.google.com/blockly/images/update_button.png)

You can switch between blocks you've previously saved or create a new empty
block by clicking the Library button. Changing the name of an existing block is
another way to quickly create multiple blocks with similar definitions.

![](https://developers.google.com/blockly/images/blocklib_button.png)

### Exporting and importing a library
Blocks are saved to the browser's local storage.  Clearing the browser's local
storage will delete your blocks.  To save your blocks indefinitely, you must
download your library. Your Block Library is downloaded as an XML
file that can be imported to set your Block Library to the state it was when
you downloaded the file. Note that importing a Block Library replaces your
current one, so you might want to export first.

The import and export features are also the recommended way to maintain and
share different sets of custom blocks.

![](https://developers.google.com/blockly/images/block_manage_buttons.png)


## Block Exporter tab
Once you have designed your blocks you will need to export the block definitions
and generator stubs to use them in an app. This is done on the
Block Exporter tab.

Every block stored in your Block Library will be shown in the Block Selector.
Click on the block to to select or deselect it for export. If you want to select
all the blocks in your library, use the “Select” → “All Stored In Block
Library” option. If you built your toolbox or configured your workspace using
the Workspace Factory tab, you can also select all the blocks you used by
clicking “Select” → “All Used In Workspace Factory”.

![](https://developers.google.com/blockly/images/block_exporter_select.png)

The export settings let you choose which generated language you want to target
and whether you want the definitions, the generator stubs, or both for the
selected blocks. Once you've selected these, click 'Export' to download your
files.

![](https://developers.google.com/blockly/images/block_exporter_tab.png)

Note: If using a save dialog on Mac you can only download
[one file at a time](https://github.com/google/blockly/issues/647)

## Workspace Factory tab
The Workspace Factory makes it easy to configure a toolbox and the default
set of blocks in a workspace. You can switch between editing the toolbox and the
starting workspace with the "Toolbox" and "Workspace" buttons.

![](https://developers.google.com/blockly/images/ws_fac_tb_ws_buttons.png)

### Building a toolbox
This tab helps build the XML for a Toolbox.  The material assumes
familiarity with features of a [Toolbox](/blockly/guides/configure/web/toolbox).
If you already have XML for a toolbox that you want to edit here, you can
load it by clicking "Load to Edit".
### Toolbox without categories

If you have a few blocks and want to display them without any categories, simply
drag them into the workspace, and you will see your blocks appear in the toolbox
in the preview.

![](https://developers.google.com/blockly/images/workspace_fac_no_cat.png)

### Toolbox with categories
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

### Advanced blocks
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


### Configuring a workspace (for web Blockly)
To configure different parts of your workspace, go to the “Workspace Factory”
tab and select “Workspace".

#### Choose Workspace Options
Set different values for
[configuration options](https://developers.google.com/blockly/guides/get-started/web#configuration)
and see the result in the preview area. Enabling
[grid](https://developers.google.com/blockly/guides/configure/web/grid) or
[zoom](https://developers.google.com/blockly/guides/configure/web/zoom) reveals more options to configure.
Also, switching to using categories usually requires a more complex
workspace; a trashcan and scrollbars are added automatically when you add your
first category.

![](https://developers.google.com/blockly/images/configure_workspace.png)

#### Add Pre-loaded Blocks to the Workspace
This is optional but may be necessary if you want to display a set of blocks in
the workspace:

* When the application loads.
* When an event (advancing a level, clicking a help button, etc.) is triggered.

Drag blocks into the editing space to see them in your workspace in the preview.
You can create block groups, disable blocks, and make certain blocks shadow
blocks when you select them.

![](https://developers.google.com/blockly/images/load_workspace_blocks.png)

### Exporting
Workspace Factory gives you the following export options:

![](https://developers.google.com/blockly/images/workspace_export_opt.png)

* Starter Code: Produces starter html and javascript to inject your customized
  Blockly workspace.
* Toolbox produces XML to specify your toolbox.
* Workspace Blocks produces XML which can be loaded into a workspace.


