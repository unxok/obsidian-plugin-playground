import { TFile } from "obsidian";
import { TemplateCommands } from "src/plugin/TemplateCommands";

/**
 * Removes all existing commands that have been added by the plugin, then adds commands for each template file provided
 * 
 * @param plugin The plugin instance
 * @param files The template files to add commmands for 

 */
export const addCommands = async (plugin: TemplateCommands, files: TFile[]) => {
	// remove all commands (if any) that we have created
	plugin.commandIds.forEach((command) => {
		//@ts-expect-error app is 'depcrecated' but the dev team stated it's okay to use and will still be supported
		app.commands.removeCommand(command);
	});
	const activeFile = plugin.app.workspace.getActiveFile();
	const activeParentPath = activeFile?.parent?.path || "/";
	// @ts-expect-error vault.config is a real thing but not in the docs? Hopefully it doesn't break later...
	const newFileLocation = activeFile?.vault.config.newFileLocation;
	const parentPath = newFileLocation === "current" ? activeParentPath : "/";

	const commands = files.map((file, i) => {
		const command = plugin.addCommand({
			id: file.basename,
			name: file.basename,
			callback: async () => {
				const content = await plugin.app.vault.cachedRead(file);
				const newFile = await plugin.app.vault.create(
					`${parentPath}/Untitled.md`,
					content,
					{}
				);
				await plugin.app.workspace.openLinkText(
					newFile.path,
					"/",
					true
				);
				// @ts-expect-error
				app.commands.executeCommandById("workspace:edit-file-title");
			},
		});
		return command.id;
	});
	console.log("commands finshed inserting");
	return commands;
};
