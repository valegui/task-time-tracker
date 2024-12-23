import { App, PluginSettingTab, Setting } from "obsidian";
import TaskTimeTrackerPlugin from "./main";
import { FileSuggest } from "./suggest";

export class TaskTimeTrackerSettingTab extends PluginSettingTab {
	plugin: TaskTimeTrackerPlugin;

	constructor(app: App, plugin: TaskTimeTrackerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		containerEl.createEl("h2", { text: "Task Time Tracker - Settings" });

		new Setting(containerEl)
			.setName("Tracker File")
			.setDesc("File used to contain and show tracker")
			.addText((file) => {
				new FileSuggest(this.app, file.inputEl);
				file.setPlaceholder(this.plugin.settings.trackerFile);
				file.setValue(this.plugin.settings.trackerFile);
				file.onChange(async (value) => {
					this.plugin.settings.trackerFile = value;
					await this.plugin.saveSettings();
				});
			});

		new Setting(containerEl)
			.setName("Week start")
			.setDesc("Day of the week the summary starts from")
			.addDropdown((c) =>
				c
					.addOption("Monday", "Monday")
					.addOption("Tuesday", "Tuesday")
					.addOption("Wednesday", "Wednesday")
					.addOption("Thursday", "Thursday")
					.addOption("Friday", "Friday")
					.addOption("Saturday", "Saturday")
					.addOption("Sunday", "Sunday")
					.setValue(this.plugin.settings.weekStart)
					.onChange(async (value) => {
						this.plugin.settings.weekStart = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Category")
			.setDesc("Show the category of the task.")
			.addToggle((state) =>
				state
					.setValue(this.plugin.settings.category)
					.onChange(async (value) => {
						this.plugin.settings.category = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Project")
			.setDesc("Show the project the task is from.")
			.addToggle((state) =>
				state
					.setValue(this.plugin.settings.project)
					.onChange(async (value) => {
						this.plugin.settings.project = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Task table length")
			.setDesc(
				"Number of lines that will visible in the table table that contains tasks. If the tracker has more lines than this number, the table will be vertically scrollable. Reload the plugin to display changes.",
			)
			.addText((number) => {
				number
					.setValue(String(this.plugin.settings.tableLength))
					.setPlaceholder("Enter a whole number")
					.onChange(async (value) => {
						const parsed = parseInt(value);
						if (!isNaN(parsed)) {
							this.plugin.settings.tableLength = parsed;
							await this.plugin.saveSettings();
						}
					});
			});

		new Setting(containerEl)
			.setName("Tracker icon")
			.setDesc(
				"Show icon to open tracker file. Reaload the plugin to display changes.",
			)
			.addToggle((state) =>
				state
					.setValue(this.plugin.settings.showOpenTracker)
					.onChange(async (value) => {
						this.plugin.settings.showOpenTracker = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Task view")
			.setDesc("Add view for current (running) task.")
			.addToggle((state) =>
				state
					.setValue(this.plugin.settings.showLeaf)
					.onChange(async (value) => {
						this.plugin.settings.showLeaf = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
