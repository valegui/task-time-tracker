import { App, Modal } from "obsidian";
import { trackerNewManualTask, trackerNewTimerTask } from "./tasks";
import TaskTimeTrackerPlugin from "./main";

type EmptyTask =
    | {
        name: string | null;
        startTime: string | null;
        endTime: string | null;
        category?: string;
        project?: string;
    }
    | undefined;
export class CreateTaskModal extends Modal {
    plugin: TaskTimeTrackerPlugin;
    emptyTask: EmptyTask;

    constructor(app: App, plugin: TaskTimeTrackerPlugin, emptyTask: EmptyTask) {
        super(app);
        this.plugin = plugin;
        this.emptyTask = emptyTask;
    }

    onOpen() {

    }
}