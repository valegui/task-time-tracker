import { App, Modal } from "obsidian";
import TaskForm from "./ui/task-form.svelte";

export interface TaskData {
	taskName: string;
	taskCategory: string;
	taskProject: string;
	startTime: moment.Moment | null;
	endTime: moment.Moment | null;
}

export class TaskModal extends Modal {
	onSubmit: (taskData: TaskData) => void;
	taskForm: TaskForm;

	constructor(app: App, onSubmit: (taskData: TaskData) => void) {
		super(app);
		this.onSubmit = onSubmit;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();

		this.taskForm = new TaskForm({
			target: contentEl,
			props: {
				onSubmit: (taskData: TaskData) => {
					if (this.validateInputs(taskData)) {
						this.close();
						this.onSubmit(taskData);
					}
				},
				onCancel: () => this.close(),
			},
		});
	}

	validateInputs(taskData: TaskData): boolean {
		if (!taskData.taskName) {
			new Notice("Task name is required.");
			return false;
		}

		if (
			(taskData.startTime && !taskData.endTime) ||
			(!taskData.startTime && taskData.endTime)
		) {
			new Notice(
				"Both Start Time and End Time must be provided if one is set.",
			);
			return false;
		}

		if (
			taskData.startTime &&
			taskData.endTime &&
			taskData.startTime.isAfter(taskData.endTime)
		) {
			new Notice("Start Time must be before End Time.");
			return false;
		}

		return true;
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
		if (this.taskForm) {
			this.taskForm.$destroy();
		}
	}
}
