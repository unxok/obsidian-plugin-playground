import { Plugin } from "obsidian";
import { FolderSuggestModal } from "./FolderSuggestModal";
import { TitleModal } from "../title/TitleModal";

/** Show a *FolderSuggestModal* but wrapped in a promise and returns the path of the selected folder
 * @param that this plugin
 */
export const showSuggest = async (that: Plugin) => {
	return new Promise<string>((res) => {
		new FolderSuggestModal(that.app, res).open();
	});
};
