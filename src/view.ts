import { ItemView, WorkspaceLeaf } from "obsidian";
import LeafComponent from "./views/Leaf.svelte";
import { trackerNewManualTask, trackerNewTimerTask, trackerStopCurrentTask, trackerEditTask, trackerEditCurrentTask, isRunning } from "./tasks";

export const TASK_TIME_TRACKER_VIEW = "task-time-tracker-view";

export class TaskTimeTrackerView extends ItemView {
    leafComponent!: LeafComponent;

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
        this.leafComponent = new LeafComponent({
            target: this.contentEl,
            props: {
                variable: 1
            }
        });
    }

    async onClose(): Promise<void> {
        this.leafComponent.$destroy();
    }

    onunload(): void {
        this.app.workspace.detachLeavesOfType(TASK_TIME_TRACKER_VIEW);
    }

}