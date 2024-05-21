import { start } from "repl";

export interface TaskTracker {
    tasks: Task[];
    currentTask?: Task;
}

export interface Task {
    name: string;
    startTime: string;
    endTime: string | null;
    duration: string | null;
    category?: string;
    project?: string;
}

function changeTaskCategory(task: Task, category: string): Task {
    task.category = category;
    return task;
}

function changeTaskProject(task: Task, project: string): Task {
    task.project = project;
    return task;
}

function newTimerTask(name?: string, category?: string, project?: string): Task {
    if (typeof name == 'undefined') {
        name = Math.random().toString(30).slice(2, 20);
    }
    let startTime = Date.now().toString();
    return {
        name: name,
        startTime: startTime,
        endTime: null,
        duration: null,
        category,
        project
    };
}

function newManualTask(name: string, startTime: string, endTime: string, category?: string, project?: string): Task {
    const start = new Date(startTime);
    const end = new Date(endTime);
    let duration = (end.getTime() - start.getTime()).toString();
    return {
        name,
        startTime,
        endTime,
        duration,
        category,
        project
    };
}

function stopTask(task: Task | undefined): Task {
    if (typeof task == 'undefined') {
        throw new TypeError('The input must be a Task');
    }
    let endTime = Date.now().toString();
    task.endTime = endTime;
    let duration = (Number(task.endTime) - Number(task.startTime)).toString();
    task.duration = duration;
    return task;
}

function isRunning(tracker: TaskTracker): boolean {
    if (typeof tracker.currentTask == 'undefined') return false;
    return true;
}

function trackerStopCurrentTask(tracker: TaskTracker): boolean {
    if (!isRunning(tracker)) {
        return false;
    }
    let taskToStop = tracker.currentTask;
    let stoppedTask = stopTask(taskToStop);
    delete tracker.currentTask;
    tracker.tasks.push(stoppedTask);
    return true;
}

function trackerNewTimerTask(tracker: TaskTracker, name?: string, category?: string, project?: string): Task {
    trackerStopCurrentTask(tracker);
    let task = newTimerTask(name, category, project);
    tracker.currentTask = task;
    return task;
}

function trackerNewManualTask(tracker: TaskTracker, name: string, startTime: string, endTime: string, category?: string, project?: string): Task {
    let task = newManualTask(name, startTime, endTime, category, project);
    tracker.tasks.push(task);
    return task;
}

function trackerGetCategories(tracker: TaskTracker): string[] {
    return ['to do'];
}

function trackerGetProjects(tracker: TaskTracker): string[] {
    return ['to do'];
} 