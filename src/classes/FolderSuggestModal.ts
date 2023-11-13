import { App, SuggestModal, TFolder } from "obsidian";

export class FolderSuggestModal extends SuggestModal<TFolder> {
	//
	folders: TFolder[];
	callback: Function;

	constructor(app: App, callback: Function) {
		super(app);
		this.callback = callback;
		this.folders = this.app.vault
			.getAllLoadedFiles()
			.filter((file): file is TFolder => file instanceof TFolder);
	}

	getSuggestions(): TFolder[] {
		return this.folders;
	}

	renderSuggestion(folder: TFolder, el: HTMLElement) {
		el.createEl("div", { text: folder.path });
	}

	onChooseSuggestion(folder: TFolder, evt: MouseEvent | KeyboardEvent) {
		// Handle the selection (e.g., open the folder, display its content, etc.)
		this.callback(folder.path);
	}
}
