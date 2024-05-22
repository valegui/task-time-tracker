import { ItemView, Setting, WorkspaceLeaf } from "obsidian";
import TaskTimeTrackerPlugin from "./main";
export const TASK_TIME_TRACKER_VIEW = "task-time-tracker-view";

export class TaskTimeTrackerView extends ItemView {
    plugin: TaskTimeTrackerPlugin;

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

    getIcon(): string {
        return 'lucide-clipboard-list'
    }

    async onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl("h2", { text: "Controls" });
        contentEl.createEl("h3", { text: "Current Task" });
        new Setting(contentEl)
            .setName("Stop Current Task")
            .addButton(item => { item.setButtonText("Stop") });

        contentEl.createEl("h3", { text: "Past Tasks" });
        contentEl.createEl("p", { text: "This week's tasks." });
        contentEl.createEl("h3", { text: "Weekly Report" });

    }

    onunload(): void {
        this.app.workspace.detachLeavesOfType(TASK_TIME_TRACKER_VIEW);
    }

}