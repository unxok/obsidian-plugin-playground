/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => TemplateCommandsPlugin
});
module.exports = __toCommonJS(main_exports);

// src/functions/getFilesFromTemplatesFolder.ts
var getFilesFromTemplateFolder = (plugin) => {
  const parentPath = plugin.settings.TemplateFolder;
  const files = plugin.app.vault.getFiles().filter((file) => file.path.startsWith(parentPath));
  return files;
};

// src/functions/pluginExecute.ts
var import_obsidian = require("obsidian");

// src/functions/addCommands.ts
var addCommands = async (plugin, files) => {
  var _a;
  plugin.commandIds.forEach((command) => {
    app.commands.removeCommand(command);
  });
  const activeFile = plugin.app.workspace.getActiveFile();
  const activeParentPath = ((_a = activeFile == null ? void 0 : activeFile.parent) == null ? void 0 : _a.path) || "/";
  const newFileLocation = activeFile == null ? void 0 : activeFile.vault.config.newFileLocation;
  const parentPath = newFileLocation === "current" ? activeParentPath : "/";
  const commands = files.map((file, i) => {
    const command = plugin.addCommand({
      id: file.basename,
      name: file.basename,
      callback: async () => {
        const content = await plugin.app.vault.cachedRead(file);
        const newFile = await plugin.app.vault.create(
          `${parentPath}/Untitled.md`,
          content,
          {}
        );
        await plugin.app.workspace.openLinkText(
          newFile.path,
          "/",
          true
        );
        app.commands.executeCommandById("workspace:edit-file-title");
      }
    });
    return command.id;
  });
  console.log("commands finshed inserting");
  return commands;
};

// src/functions/pluginExecute.ts
var pluginExecute = async (plugin) => {
  const templateFiles = getFilesFromTemplateFolder(plugin);
  if (!templateFiles.length) {
    new import_obsidian.Notice("Templates not found. Maybe your Template folder is empty?");
    return;
  }
  const commands = await addCommands(plugin, templateFiles);
  plugin.commandIds = commands;
};

// src/functions/insertSettingsTab.ts
var import_obsidian4 = require("obsidian");

// src/classes/SettingsTab.ts
var import_obsidian3 = require("obsidian");

// src/classes/FolderSuggestModal.ts
var import_obsidian2 = require("obsidian");
var FolderSuggestModal = class extends import_obsidian2.SuggestModal {
  constructor(app2, callback) {
    super(app2);
    this.callback = callback;
    this.folders = this.app.vault.getAllLoadedFiles().filter((file) => file instanceof import_obsidian2.TFolder);
  }
  getSuggestions() {
    return this.folders;
  }
  renderSuggestion(folder, el) {
    el.createEl("div", { text: folder.path });
  }
  onChooseSuggestion(folder, evt) {
    this.callback(folder.path);
  }
};

// src/functions/showSuggest.ts
var showSuggest = async (plugin) => {
  return new Promise((res) => {
    new FolderSuggestModal(plugin.app, res).open();
  });
};

// src/classes/SettingsTab.ts
var DEFAULT_SETTINGS = {
  TemplateFolder: "default"
};
var SettingsTab = class extends import_obsidian3.PluginSettingTab {
  constructor(app2, plugin) {
    super(app2, plugin);
    this.plugin = plugin;
  }
  display() {
    this.containerEl.empty();
    this.containerEl.createEl("h2", {
      text: "Settings for template-commands"
    });
    new import_obsidian3.Setting(this.containerEl).setName("Template Folder").setDesc("The folder that you store your template files inside of.").addButton(
      (button) => button.setButtonText(this.plugin.settings.TemplateFolder).onClick(async () => {
        const newFolder = await showSuggest(this.plugin);
        this.plugin.settings.TemplateFolder = newFolder;
        this.plugin.saveData(this.plugin.settings);
        button.setButtonText(
          this.plugin.settings.TemplateFolder
        );
        this.plugin.onload();
      })
    );
  }
};

// src/functions/insertSettingsTab.ts
var insertSettingsTab = async (plugin) => {
  plugin.settings = Object.assign(
    {},
    DEFAULT_SETTINGS,
    await plugin.loadData()
  );
  plugin.addSettingTab(new SettingsTab(plugin.app, plugin));
  if (plugin.settings.TemplateFolder === "default") {
    new import_obsidian4.Notice(
      "Please go to template-commands plugin settings and set your Template Folder"
    );
  }
};

// src/functions/pluginOnload.ts
var pluginOnload = async (plugin) => {
  await insertSettingsTab(plugin);
  if (!plugin.app.workspace.layoutReady) {
    plugin.app.workspace.onLayoutReady(() => plugin.execute());
    return;
  }
  console.log("started up", new Date().toLocaleString());
  plugin.app.vault.on("create", async () => await plugin.execute());
  plugin.app.vault.on("rename", async () => await plugin.execute());
  plugin.app.vault.on("delete", async () => await plugin.execute());
};

// src/plugin/TemplateCommands.ts
var import_obsidian5 = require("obsidian");
var TemplateCommands = class extends import_obsidian5.Plugin {
  constructor() {
    super(...arguments);
    /**
     * The array of ids for the commands this plugin has inserted. Update this whenever you add/remove/change custom commands
     */
    this.commandIds = [];
  }
  async onload() {
    await this.onloadCallback(this);
  }
  async execute() {
    await this.executeCallback(this);
  }
  onunload() {
  }
};

// main.ts
var TemplateCommandsPlugin = class extends TemplateCommands {
  constructor(app2, manifest) {
    super(app2, manifest);
    this.onloadCallback = pluginOnload;
    this.executeCallback = pluginExecute;
  }
};
