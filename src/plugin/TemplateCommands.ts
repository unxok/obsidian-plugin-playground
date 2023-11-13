import { Plugin } from "obsidian";
import { TemplateCommandsSettings } from "src/classes/SettingsTab";

/**
 * The base class to extend off of in {@link [main.ts](../../main.ts)}.
 * Allows me to abscract this part away to be able to be a bit more functional
 */
export class TemplateCommands extends Plugin {
	/**
	 * The settings configuration for this plugin
	 */
	settings: TemplateCommandsSettings;
	/**
	 * The array of ids for the commands this plugin has inserted. Update this whenever you add/remove/change custom commands
	 */
	commandIds: string[] = [];
	/**
	 * The main execution function that runs when the plugin starts loading
	 */
	onloadCallback: (plugin: any) => Promise<void>;
	executeCallback: (plugin: any) => Promise<void>;

	async onload() {
		await this.onloadCallback(this);
	}

	async execute() {
		await this.executeCallback(this);
	}

	onunload() {}
}
