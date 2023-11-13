import { TemplateCommands } from "src/plugin/TemplateCommands";
import { insertSettingsTab } from "./insertSettingsTab";

export const pluginOnload = async (plugin: TemplateCommands) => {
	// load and insert the plugin settings
	await insertSettingsTab(plugin);
	// if workspace isn't rendered yet, add event listener to retry once it is
	if (!plugin.app.workspace.layoutReady) {
		plugin.app.workspace.onLayoutReady(() => plugin.execute());
		return;
	}

	// on first load, add these event listeners
	console.log("started up", new Date().toLocaleString());
	plugin.app.vault.on("create", async () => await plugin.execute());
	plugin.app.vault.on("rename", async () => await plugin.execute());
	plugin.app.vault.on("delete", async () => await plugin.execute());
};
