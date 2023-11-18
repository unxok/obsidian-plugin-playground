import { TemplateCommands } from "src/plugin/TemplateCommands";
import { getFilesFromTemplateFolder } from "./getFilesFromTemplatesFolder";
import { Notice } from "obsidian";
import { addCommands } from "./addCommands";

export const pluginExecute = async (plugin: TemplateCommands) => {
	// get the template files from the folder specified in settings
	const templateFiles = getFilesFromTemplateFolder(plugin);
	// if there are no template files, show a notice
	if (!templateFiles.length) {
		new Notice("Templates not found. Maybe your Template folder is empty?");
		return;
	}

	// add the commands for every tempalte file
	const commands = await addCommands(plugin, templateFiles);
	// add the command ids to the plugin class
	plugin.commandIds = commands;
};
