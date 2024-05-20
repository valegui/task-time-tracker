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
