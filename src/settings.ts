import TemplateCommands from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { showSuggest } from "src/suggest/showSuggest";

export interface TemplateCommandsSettings {
	TemplateFolder: string;
}

export const DEFAULT_SETTINGS: TemplateCommandsSettings = {
	TemplateFolder: "default",
};

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
						this.plugin.saveSettings();
						button.setButtonText(
							this.plugin.settings.TemplateFolder
						);
						this.plugin.onload();
					})
			);
	}
}
