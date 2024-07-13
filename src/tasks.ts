import { Notice, TFile, Vault } from "obsidian";

export interface Task {
    name: string;
    startTime: string;
    endTime: string | null;
    duration: string | null;
    category?: string;
    project?: string;
}

function formatWriteTask(task: Task): string {
    // ass function,
    let endTime = "";
    let duration = "";
    let category = "";
    let project = "";
    if (task.endTime != null) endTime = task.endTime;
    if (task.duration != null) duration = task.duration;
    if (task.category != undefined) category = task.category;
    if (task.project != undefined) project = task.project;
    return `${task.name},${task.startTime},${endTime},${duration},${category},${project}`;

}

function formatReadTask(taskString: string): Task {
    return {
        name: "",
        startTime: "",
        endTime: "",
        duration: ""
    };
}

export async function startTrackerTimerTask(vault: Vault, trackerFile: string, name?: string, category?: string, project?: string){
    if (trackerFile == "") {
        new Notice(
            "No file is set as Task Time Tracker file."
        );
        return;
    }
    let tracker = vault.getFileByPath(trackerFile) as TFile;
    let trackerContent = await vault.read(tracker);
    const newTask = newTimerTask(name, category, project);
    const taskString = formatWriteTask(newTask);
	const newTrackerContent = `${trackerContent}\n${taskString}`;
	vault.modify(tracker, newTrackerContent);
}

function newTimerTask(name?: string, category?: string, project?: string): Task {
    if (typeof name == 'undefined') {
        name = Math.random().toString(30).slice(2, 20);
    }
    let startTime = new Date().toISOString();
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