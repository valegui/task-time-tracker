import { App, Editor, MarkdownView, Modal, Notice, Plugin, TFile, WorkspaceLeaf } from 'obsidian';
import { TaskTimeTrackerSettings, DEFAULT_SETTINGS } from './settings';
import { TaskTimeTrackerSettingTab } from './settings-tab';
import { TASK_TIME_TRACKER_VIEW, TaskTimeTrackerView } from './view';

export default class TaskTimeTrackerPlugin extends Plugin {
	settings: TaskTimeTrackerSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		this.addRibbonIcon('clipboard-list', 'Show Task Time Tracker', () => {
			this.openView();
		});

		// This adds view for contents of the plugin
		this.registerView(TASK_TIME_TRACKER_VIEW, (leaf) => new TaskTimeTrackerView(leaf))

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new TaskTimeTrackerSettingTab(this.app, this));

		// Command palette
		this.addCommand({
			id: 'start-empty-task',
			name: 'Start Empty Task',
			callback() {
			}
		})

		this.addCommand({
			id: 'start-task',
			name: 'Start Task',
			callback() {
			}
		})

		this.addCommand({
			id: 'end-current-task',
			name: 'End Current Task',
			checkCallback: (checking: boolean) => {
				return false;
			}
		})

		this.addCommand({
			id: 'go-to-tracker',
			name: 'Show Tracker File',
			checkCallback: (checking: boolean) => {
				if (this.settings.trackerFile != "") {
					if (!checking) {
						this.showTrackerFile();
					}
					return true;
				}
				return false;
			}
		})
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	openView() {
		this.app.workspace.detachLeavesOfType(TASK_TIME_TRACKER_VIEW);
		let leaf: WorkspaceLeaf | null = null;
		leaf = this.app.workspace.getRightLeaf(false);
		leaf!.setViewState({
			type: TASK_TIME_TRACKER_VIEW,
		});
		this.app.workspace.revealLeaf(leaf!);
	}

	async showTrackerFile() {
		const settings = this.settings as TaskTimeTrackerSettings;
		if (settings.trackerFile == "") {
			new Notice("No file is set as the tracker file.")
		}
		else {
			const leaf = this.app.workspace.getLeaf(false);
			const file = this.app.vault.getFileByPath(settings.trackerFile);
			await leaf.openFile(file as TFile, { active: true});
		}
	}
}


