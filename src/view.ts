import { ItemView, Setting, WorkspaceLeaf } from "obsidian";
import TaskTimeTrackerPlugin from "./main";
export const TASK_TIME_TRACKER_VIEW = "task-time-tracker-view";

export class TaskTimeTrackerView extends ItemView {
    plugin: TaskTimeTrackerPlugin;
    icon: string = 'lucide-clipboard-list';

    constructor(leaf: WorkspaceLeaf, plugin: TaskTimeTrackerPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType(): string {
        return TASK_TIME_TRACKER_VIEW;
    }

    getDisplayText(): string {
        return "Task Time Tracker";
    }

    async onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl("h2", { text: "Controls" });

        new Setting(contentEl)
            .setName("Stop Current Task")
            .addButton(item => { item.setButtonText("Stop") });

        contentEl.createEl("h3", { text: "Current Task" });
        contentEl.createEl("h3", { text: "Past Tasks" });
        contentEl.createEl("h3", { text: "Weekly Report" });

    }

    onunload(): void {
        this.app.workspace.detachLeavesOfType(TASK_TIME_TRACKER_VIEW);
    }

}