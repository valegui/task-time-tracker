export interface TaskTracker {
    tasks: Task[];
    currentTask?: Task;
}

export interface Task {
    name: string;
    startTime: string;
    endTime: string;
    duration: string;
    category?: string;
    project?: string;
}

function isRunning(tracker: TaskTracker): boolean {
    if (typeof tracker.currentTask == 'undefined') return false;
    return true;
}