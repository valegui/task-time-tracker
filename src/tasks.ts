export interface TaskTracker {
    tasks: Task[];
}

export interface Task {
    name: string;
    category: string;
    project: string;
    startTime: string;
    endTime: string;
    duration: string;
}
