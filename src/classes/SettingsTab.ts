import { App, PluginSettingTab, Setting } from "obsidian";
import { showSuggest } from "src/functions/showSuggest";
import { TemplateCommands } from "../plugin/TemplateCommands";

/**
 * Defines the structure of the plugin's settings
 */
export interface TemplateCommandsSettings {
	TemplateFolder: string;
}

/**
 * The default settings to set if there is no settings file or if the user has yet to choose them
 */
export const DEFAULT_SETTINGS: TemplateCommandsSettings = {
	TemplateFolder: "default",
};

/**
 * Creates a settings tab that can be added to the plugins settings that display in the settings screen
 */
export class SettingsTab extends PluginSettingTab {
	plugin: TemplateCommands;

	constructor(app: App, plugin: TemplateCommands) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		this.containerEl.empty();

		this.containerEl.createEl("h2", {
			text: "Settings for template-commands",
		});

		new Setting(this.containerEl)
			.setName("Template Folder")
			.setDesc("The folder that you store your template files inside of.")
			.addButton((button) =>
				button
					.setButtonText(this.plugin.settings.TemplateFolder)
					.onClick(async () => {
						const newFolder = await showSuggest(this.plugin);
						this.plugin.settings.TemplateFolder = newFolder;
						this.plugin.saveData(this.plugin.settings);
						button.setButtonText(
							this.plugin.settings.TemplateFolder
						);
						this.plugin.onload();
					})
			);
	}
}
