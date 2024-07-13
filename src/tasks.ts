import { Notice, TFile, Vault } from "obsidian";

export interface Task {
    name: string;
    startTime: string;
    endTime: string | null;
    duration: string | null;
    category?: string;
    project?: string;
}

const TASK_ERROR: Task = {
    name: Error("name"),
    startTime: Error("startTime"),
    endTime: Error("endTime"),
    duration: Error("duration"),
    category: Error("category"),
    project: Error("project")
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
    // another ass function, dont ask, may change l8r
    const taskFieldList = taskString.split(",");
    if (taskFieldList.length != 6){
        console.log("Not a task");
        return TASK_ERROR;
    } 
    
    let endTime = null;
    if (taskFieldList[2] != "") endTime = taskFieldList[2];
    let duration = null;
    if (taskFieldList[3] != "") duration = taskFieldList[3];
    
    let task : Task = {
        name: taskFieldList[0],
        startTime: taskFieldList[1],
        endTime: endTime,
        duration: duration
    };

    if (taskFieldList[4] != ""){
        task.category = taskFieldList[4];
    } 
    if (taskFieldList[5] != "") {
        task.project = taskFieldList[5];
    }

    return task;
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
	const newTrackerContent = `${taskString}\n${trackerContent}`;
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

export async function trackerTaskRunning(vault: Vault, trackerFile: string) {
    if (trackerFile == "") {
        new Notice(
            "No file is set as Task Time Tracker file."
        );
        return false;
    }
    const tracker = vault.getFileByPath(trackerFile) as TFile;
    const trackerContent = await vault.read(tracker);
    const trackerTasks = trackerContent.split("\n");
    for (let i = 0; i < trackerTasks.length; i++){
        let task = formatReadTask(trackerTasks[i]);
        if (taskIsRunning(task)){
            return true;
        }
    }
    return false;
}

function taskIsRunning(task: Task): boolean {
    if (task == TASK_ERROR){
        return false;
    }
    if (task.endTime != null || task.endTime != "") {
        return true;
    }
    return false;
}