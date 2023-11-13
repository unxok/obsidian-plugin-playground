import { Notice } from "obsidian";
import { TemplateCommands } from "src/plugin/TemplateCommands";
import { DEFAULT_SETTINGS, SettingsTab } from "src/classes/SettingsTab";

/**
 * Inserts the tab for this plugin's settings. Displays a {@link Notice} if the setting hasn't been set yet by the user
 *
 * @param plugin The plugin instace
 *
 */
export const insertSettingsTab = async (plugin: TemplateCommands) => {
	plugin.settings = Object.assign(
		{},
		DEFAULT_SETTINGS,
		await plugin.loadData()
	);
	plugin.addSettingTab(new SettingsTab(plugin.app, plugin));
	if (plugin.settings.TemplateFolder === "default") {
		new Notice(
			"Please go to template-commands plugin settings and set your Template Folder"
		);
	}
};
