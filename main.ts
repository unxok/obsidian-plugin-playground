import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	SuggestModal,
	TFile,
	TFolder,
} from "obsidian";
import { FolderSuggestModal } from "src/suggest/FolderSuggestModal";
import { TitleModal } from "src/title/TitleModal";
import { promptTitle } from "src/title/promptTitle";
import {
	DEFAULT_SETTINGS,
	SettingsTab,
	TemplateCommandsSettings,
} from "src/settings";
import { showSuggest } from "src/suggest/showSuggest";

// Remember to rename these classes and interfaces!

const getFilesFromTemplateFolder = (that: TemplateCommands) => {
	const parentPath = that.settings.TemplateFolder;
	const files = that.app.vault
		.getFiles()
		.filter((file) => file.path.startsWith(parentPath));
	return files;
};

const addCommands = async (that: TemplateCommands, files: TFile[]) => {
	const activeFile = that.app.workspace.getActiveFile();
	const activeParentPath = activeFile?.parent?.path || "/";
	//@ts-expect-error vault.config is a real thing but not in the docs? Hopefully it doesn't break later...
	const newFileLocation = activeFile?.vault.config.newFileLocation;
	const parentPath = newFileLocation === "current" ? activeParentPath : "/";

	const commands = files.map((file) => {
		return that.addCommand({
			id: file.basename,
			name: file.basename,
			callback: async () => {
				const title = await promptTitle(that);
				const content = await that.app.vault.cachedRead(file);
				const newFile = await that.app.vault.create(
					`${parentPath}/${title}.md`,
					content,
					{}
				);
				that.app.workspace.openLinkText(newFile.path, "/", true);
			},
		});
	});
	console.log("commands finshed inserting");
	console.log(commands.length, "commands were inserted");
};

export default class TemplateCommands extends Plugin {
	settings: TemplateCommandsSettings;

	async onload(): Promise<Function | undefined> {
		// await new Promise((res) => setTimeout(res, 3000));
		await this.loadSettings();
		console.log("started up", new Date().toLocaleString());
		// new TitleModal(this.app, () => console.log("hi")).open();
		this.addSettingTab(new SettingsTab(this.app, this));
		if (this.settings.TemplateFolder === "default") {
			new Notice(
				"Please go to template-commands plugin settings and set your Template Folder"
			);
		}
		const templateFiles = getFilesFromTemplateFolder(this);
		if (!templateFiles.length) {
			return this.onload();
		}
		addCommands(this, templateFiles);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
