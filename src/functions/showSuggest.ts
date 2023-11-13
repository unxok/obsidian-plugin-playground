import { Plugin } from "obsidian";
import { FolderSuggestModal } from "../classes/FolderSuggestModal";

/**
 * Show a {@link SuggestModal} for all folders wrapped in a promise that returns the path of the selected folder
 * @param plugin this plugin
 */
export const showSuggest = async (plugin: Plugin) => {
	return new Promise<string>((res) => {
		new FolderSuggestModal(plugin.app, res).open();
	});
};
