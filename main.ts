import { App, PluginManifest } from "obsidian";
import { pluginExecute } from "src/functions/pluginExecute";
import { pluginOnload } from "src/functions/pluginOnload";
import { TemplateCommands } from "src/plugin/TemplateCommands";

export default class TemplateCommandsPlugin extends TemplateCommands {
	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		this.onloadCallback = pluginOnload;
		this.executeCallback = pluginExecute;
	}
}

// bug: deleting file is not re inserting commands
