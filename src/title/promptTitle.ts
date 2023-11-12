import { Plugin } from "obsidian";
import { TitleModal } from "./TitleModal";

export const promptTitle = async (that: Plugin) => {
	return await new Promise<string>((res) => {
		new TitleModal(that.app, res).open();
	});
};
