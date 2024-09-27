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
  project: Error("project"),
};

export async function startTrackerTimerTask(
  vault: Vault,
  trackerFile: string,
  name?: string,
  category?: string,
  project?: string,
) {
  // get tracker file and content
  // create a new task
  //
  if (trackerFile == "") {
    new Notice("No file is set as Task Time Tracker file.");
    return;
  }
  const tracker = vault.getFileByPath(trackerFile) as TFile;
  const trackerContent = await vault.read(tracker);
  const newTask = newTimerTask(name, category, project);
  const taskString = formatWriteTask(newTask);
  const newTrackerContent = `${taskString}\n${trackerContent}`;
  vault.modify(tracker, newTrackerContent);
}

export async function stopLastTrackerTask(vault: Vault, trackerFile: string) {
  if (trackerFile == "") {
    new Notice("No file is set as Task Time Tracker file.");
    return;
  }
  const tracker = vault.getFileByPath(trackerFile) as TFile;
  const trackerContent = await vault.read(tracker);
  let [lastTask, content] = getLastTaskAndContent(trackerContent);
  if (taskIsRunning(lastTask)) {
    lastTask = stopTask(lastTask);
  }
  const taskString = formatWriteTask(lastTask);
  const newTrackerContent = `${taskString}\n${content}`;
  vault.modify(tracker, newTrackerContent);
}

export async function trackerTaskRunning(vault: Vault, trackerFile: string) {
  // get the list of task and
  if (trackerFile == "") {
    new Notice("No file is set as Task Time Tracker file.");
    return false;
  }
  const tracker = vault.getFileByPath(trackerFile) as TFile;
  const trackerContent = await vault.read(tracker);
  const trackerTasks = trackerContent.split("\n");
  for (let i = 0; i < trackerTasks.length; i++) {
    const task = formatReadTask(trackerTasks[i]);
    if (taskIsRunning(task)) {
      return true;
    }
  }
  return false;
}

function newTimerTask(
  name?: string,
  category?: string,
  project?: string,
): Task {
  if (typeof name == "undefined") {
    name = Math.random().toString(30).slice(2, 20);
  }
  const startTime = Date.now().toString();
  return {
    name: name,
    startTime: startTime,
    endTime: null,
    duration: null,
    category,
    project,
  };
}

function newManualTask(
  name: string,
  startTime: string,
  endTime: string,
  category?: string,
  project?: string,
): Task {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const duration = (end.getTime() - start.getTime()).toString();
  return {
    name,
    startTime,
    endTime,
    duration,
    category,
    project,
  };
}

function stopTask(task: Task | undefined): Task {
  if (typeof task == "undefined") {
    throw new TypeError("The input must be a Task");
  }
  const endTime = Date.now().toString();
  task.endTime = endTime;
  const duration = (Number(task.endTime) - Number(task.startTime)).toString();
  task.duration = duration;
  return task;
}

function getLastTaskAndContent(trackerContent: string): [Task, string] {
  // from the content, split it and return the last line (first line) as task
  // and the rest of the content as a string
  const lines: string[] = trackerContent.split(/\r?\n/);
  const lastTask: Task = formatReadTask(lines[0]);
  lines.shift();
  const content: string = lines.join("\n");
  return [lastTask, content];
}

function taskIsRunning(task: Task): boolean {
  if (task == TASK_ERROR) {
    return false;
  }
  if (task.endTime != null || task.endTime != "") {
    return true;
  }
  return false;
}

function formatWriteTask(task: Task): string {
  // ass function
  // get the string to write the task
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
  // another ass function
  // from a string (line in the tracker file) parse a task
  const taskFieldList = taskString.split(",");
  if (taskFieldList.length != 6) {
    console.log("Not a task");
    return TASK_ERROR;
  }

  let endTime = null;
  if (taskFieldList[2] != "") endTime = taskFieldList[2];
  let duration = null;
  if (taskFieldList[3] != "") duration = taskFieldList[3];

  const task: Task = {
    name: taskFieldList[0],
    startTime: taskFieldList[1],
    endTime: endTime,
    duration: duration,
  };

  if (taskFieldList[4] != "") {
    task.category = taskFieldList[4];
  }
  if (taskFieldList[5] != "") {
    task.project = taskFieldList[5];
  }

  return task;
}
