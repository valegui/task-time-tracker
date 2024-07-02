import { App, Editor, MarkdownView, Modal, Notice, Plugin, TFile, WorkspaceLeaf } from 'obsidian';
import { TaskTimeTrackerSettings, DEFAULT_SETTINGS } from './settings';
import { TaskTimeTrackerSettingTab } from './settings-tab';

export default class TaskTimeTrackerPlugin extends Plugin {
	settings: TaskTimeTrackerSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new TaskTimeTrackerSettingTab(this.app, this));

		// This creates an icon in the left ribbon.
		this.addRibbonIcon('clipboard-list', 'Task Time Tracker File', () => {
			this.openView();
		});

		this.loadCommandPalette();
	}
	

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async openView() {
		const settings = this.settings as TaskTimeTrackerSettings;
		if (settings.trackerFile == "") {
			new Notice("Task Time Tracker: no file is set as the tracker file.");
			return;
		}
		// File is active
		let activeFileName = this.app.workspace.activeEditor?.file?.name;
		if (activeFileName && activeFileName == settings.trackerFile) {
			return;
		}
		// Check if file is open in another tab
		let trackerLeafOpen = false;
		this.app.workspace.iterateAllLeaves((leaf) => {
			const viewState = leaf.getViewState();
			if (viewState.state?.file?.endsWith(settings.trackerFile)) {
				trackerLeafOpen = true;
				this.app.workspace.setActiveLeaf(leaf);
			}
		})
		if (trackerLeafOpen) {
			return;
		}
		// Create new tab with the file open
		let leaf = this.app.workspace.getLeaf('tab');
		let file = this.app.vault.getFileByPath(settings.trackerFile);
		await leaf.openFile(file as TFile, { active: true });
		return;
	}

	async startTask(): Promise<void> {
		const vault = this.app.vault;
		const settings = this.settings as TaskTimeTrackerSettings;
		if (settings.trackerFile == "") {
			new Notice("Task Time Tracker: no file is set as the tracker file.");
			return;
		}
		const file = vault.getFileByPath(settings.trackerFile) as TFile;
		const fileContent = await vault.read(file);
		let newTask = "Task, " + new Date().toISOString() + ", End Time, Category, Project";
		const newFileContent = `${fileContent}\n${newTask}`;
		vault.modify(file, newFileContent);
	}

	loadCommandPalette() {
		// Command palette
		this.addCommand({
			id: 'start-task',
			name: 'Start Task',
			callback: () => {
				this.startTask();
			}
		})

		this.addCommand({
			id: 'go-to-tracker',
			name: 'Show Tracker File',
			checkCallback: (checking: boolean) => {
				if (this.settings.trackerFile != "") {
					if (!checking) {
						this.openView();
					}
					return true;
				}
				return false;
			}
		})
	}
}


