import { App, ItemView, moment, Vault, WorkspaceLeaf } from "obsidian";
import type { Task } from "../tasks";
import { stopRunningTrackerTask } from "../tasks";
import TaskLeafView from "../ui/task-leaf-view.svelte";

export const TASK_LEAF_VIEW_TYPE = "task-time-tracker-leaf-view";

export class TaskTimeTrackerLeafView extends ItemView {
	private view: TaskLeafView;
	private app: App;
	private vault: Vault;
	private trackerFile: string;

	constructor(
		leaf: WorkspaceLeaf,
		app: App,
		vault: Vault,
		trackerFile: string,
	) {
		super(leaf);
		this.app = app;
		this.vault = vault;
		this.trackerFile = trackerFile;
	}

	getViewType(): string {
		return TASK_LEAF_VIEW_TYPE;
	}

	getDisplayText(): string {
		return "Task Time Tracker";
	}

	getIcon(): string {
		return "clipboard-list";
	}

	async onOpen(): Promise<void> {
		this.view = new TaskLeafView({
			target: this.contentEl,
			props: {
				task: null,
				stopTracker: () => {
					stopRunningTrackerTask(this.vault, this.trackerFile);
				},
				app: this.app,
				vault: this.vault,
				trackerFile: this.trackerFile,
			},
		});
	}

	async onClose(): Promise<void> {
		this.view.$destroy();
	}

	async updateTask(task: Task | null): Promise<void> {
		const endTime = moment().unix().toString();
		let duration: string | null = null;
		if (task) {
			duration = (Number(endTime) - Number(task.startTime)).toString();
		}
		this.view.$set({ task: task, duration: duration });
	}
}
