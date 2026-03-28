import { App, Plugin, PluginSettingTab, Setting, Notice, moment } from "obsidian";

interface PluginSettings {
	propertyName: string;
	dateFormat: string;
	showRibbonIcon: boolean;
}

const DEFAULT_SETTINGS: PluginSettings = {
	propertyName: "updated",
	dateFormat: "YYYY-MM-DD",
	showRibbonIcon: true,
};

export default class UpdateDatePlugin extends Plugin {
	settings: PluginSettings;
	ribbonIconEl: HTMLElement | null = null;

	async onload() {
		await this.loadSettings();

		if (this.settings.showRibbonIcon) {
			this.addRibbonButton();
		}

		this.addCommand({
			id: "update-date-property",
			name: "更新日期属性",
			callback: () => this.updateDateProperty(),
		});

		this.addSettingTab(new UpdateDateSettingTab(this.app, this));
	}

	addRibbonButton() {
		this.ribbonIconEl = this.addRibbonIcon("calendar", "更新日期属性", () => {
			this.updateDateProperty();
		});
	}

	removeRibbonButton() {
		if (this.ribbonIconEl) {
			this.ribbonIconEl.remove();
			this.ribbonIconEl = null;
		}
	}

	async updateDateProperty() {
		const file = this.app.workspace.getActiveFile();
		if (!file) {
			new Notice("没有打开的笔记");
			return;
		}

		const dateValue = moment().format(this.settings.dateFormat);
		const propertyName = this.settings.propertyName;
		const fm = this.app.metadataCache.getFileCache(file)?.frontmatter;

		if (!fm || !(propertyName in fm)) {
			return;
		}

		await this.app.fileManager.processFrontMatter(file, (fm) => {
			fm[propertyName] = dateValue;
		});

		new Notice(`已更新 ${propertyName}: ${dateValue}`);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class UpdateDateSettingTab extends PluginSettingTab {
	plugin: UpdateDatePlugin;

	constructor(app: App, plugin: UpdateDatePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("属性名")
			.setDesc("要更新的 frontmatter 属性名")
			.addText((text) =>
				text
					.setPlaceholder("updated")
					.setValue(this.plugin.settings.propertyName)
					.onChange(async (value) => {
						this.plugin.settings.propertyName = value.trim() || "updated";
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("日期格式")
			.setDesc("使用 Moment.js 格式，如 YYYY-MM-DD、YYYY/MM/DD、YYYY-MM-DD HH:mm")
			.addText((text) =>
				text
					.setPlaceholder("YYYY-MM-DD")
					.setValue(this.plugin.settings.dateFormat)
					.onChange(async (value) => {
						this.plugin.settings.dateFormat = value.trim() || "YYYY-MM-DD";
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("显示侧边栏图标")
			.setDesc("在左侧侧边栏显示快捷图标")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.showRibbonIcon)
					.onChange(async (value) => {
						this.plugin.settings.showRibbonIcon = value;
						await this.plugin.saveSettings();
						if (value) {
							this.plugin.addRibbonButton();
						} else {
							this.plugin.removeRibbonButton();
						}
					})
			);
	}
}
