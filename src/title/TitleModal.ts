import { App, ButtonComponent, Modal, Setting } from "obsidian";

export class TitleModal extends Modal {
	callback: Function;
	title: string = "Untitled";

	constructor(app: App, callback: Function) {
		super(app);
		this.callback = callback;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.createEl("h1", { text: "Create Note from Template" });
		new Setting(this.contentEl)
			.addText((text) => {
				text.onChange((text) => (this.title = text));
			})
			.setName("Note Title")
			.setDesc(
				'The title of the new note you are creating. Leave blank for "Untitled"'
			);
		new Setting(this.contentEl).addButton((button) => {
			button.setButtonText("Create Note").onClick(() => {
				this.callback(this.title);
				this.close();
			});
		});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
