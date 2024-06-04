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
        contentEl.createEl("h3", { text: "Task Time Tracker" });
        contentEl.createEl("h4", { text: "Tasks" });
        new Setting(contentEl)
            .setName("Add Manual Task")
            .addButton(item => { item.setButtonText("New") });
        new Setting(contentEl)
            .setName("Start Tracking Task")
            .addButton(item => { item.setButtonText("Start") });
    }

    onunload(): void {
        this.app.workspace.detachLeavesOfType(TASK_TIME_TRACKER_VIEW);
    }

}