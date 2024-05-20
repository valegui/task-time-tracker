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

function isRunning(tracker: TaskTracker): boolean {
    if (typeof tracker.currentTask == 'undefined') return false;
    return true;
}

function newTask(name?: string, category?: string, project?: string): Task {
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

function stopTask(task: Task | undefined): Task {
    if (typeof task == 'undefined') {
        throw new TypeError('The input must be a Task');
    }
    let endTime = Date.now().toString();
    task.endTime = endTime;
    let duration = (Number(task.endTime) - Number(task.startTime)).toString();
    task.duration = endTime;
    return task;
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

function trackerNewTask(tracker: TaskTracker, name?: string, category?: string, project?: string): Task {
    trackerStopCurrentTask(tracker);
    let task = newTask(name, category, project);
    tracker.currentTask = task;
    return task;
}