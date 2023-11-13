import { TemplateCommands } from "src/plugin/TemplateCommands";

/**
 * Finds the files within the folder that has been designed as the Template Folder in this plugin's settings
 *
 * @param plugin The plugin instance
 * @returns The files from the Template Folder
 */
export const getFilesFromTemplateFolder = (plugin: TemplateCommands) => {
	const parentPath = plugin.settings.TemplateFolder;
	const files = plugin.app.vault
		.getFiles()
		.filter((file) => file.path.startsWith(parentPath));
	return files;
};
