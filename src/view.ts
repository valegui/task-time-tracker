import { ItemView, WorkspaceLeaf } from "obsidian";

export const TASK_TIME_TRACKER_VIEW = "task-time-tracker-view";

export class TaskTimeTrackerView extends ItemView {

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
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

    async onOpen(): Promise<void> {

    }

    async onClose(): Promise<void> {
    }

    onunload(): void {
        this.app.workspace.detachLeavesOfType(TASK_TIME_TRACKER_VIEW);
    }

}