import { moment, Notice, TFile, Vault } from "obsidian";

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

async function getTrackerCodeBlock(
  vault: Vault,
  trackerFile: string,
): Promise<[TFile, string, string, RegExpMatchArray]> {
  if (trackerFile == "") {
    throw new Error("No file is set as Task Time Tracker file.");
  }

  const tracker = vault.getAbstractFileByPath(trackerFile);
  if (!(tracker instanceof TFile)) {
    throw new Error(`File not found: ${trackerFile}`);
  }

  const trackerContent = await vault.read(tracker);
  const codeBlockRegex = /```task-time-tracker\n([\s\S]*?)```/;
  const match = trackerContent.match(codeBlockRegex);

  if (!match) {
    throw new Error("No task-time-tracker code block found");
  }

  return [tracker, trackerContent, match[1], match];
}

async function updateTrackerContent(
  vault: Vault,
  tracker: TFile,
  match: RegExpMatchArray,
  taskString: string,
  codeBlockContent: string,
) {
  let newCodeBlockContent = "";
  if (taskString != "") {
    newCodeBlockContent = `${taskString}\n${codeBlockContent}`;
  } else {
    newCodeBlockContent = `${codeBlockContent}`;
  }
  const newTrackerContent = match.input.replace(
    match[0],
    "```task-time-tracker\n" + newCodeBlockContent + "```",
  );
  await vault.modify(tracker, newTrackerContent);
}

export async function startTrackerTimerTask(
  vault: Vault,
  trackerFile: string,
  name?: string,
  category?: string,
  project?: string,
) {
  try {
    const [tracker, _, codeBlockContent, match] = await getTrackerCodeBlock(
      vault,
      trackerFile,
    );
    const newTask = newTimerTask(name, category, project);
    const taskString = formatWriteTask(newTask);
    await updateTrackerContent(
      vault,
      tracker,
      match,
      taskString,
      codeBlockContent,
    );
  } catch (error) {
    new Notice(error.message);
    return;
  }
}

export async function createManualTrackerTask(
  vault: Vault,
  trackerFile: string,
  name: string,
  startTime: string,
  endTime: string,
  category?: string,
  project?: string,
) {
  try {
    const [tracker, _, codeBlockContent, match] = await getTrackerCodeBlock(
      vault,
      trackerFile,
    );
    const newTask = newManualTask(name, startTime, endTime, category, project);
    const taskString = formatWriteTask(newTask);
    await updateTrackerContent(
      vault,
      tracker,
      match,
      taskString,
      codeBlockContent,
    );
  } catch (error) {
    new Notice(error.message);
    return;
  }
}

export async function trackerHasTaskRunning(
  vault: Vault,
  trackerFile: string,
): Promise<boolean> {
  try {
    const [, , codeBlockContent] = await getTrackerCodeBlock(
      vault,
      trackerFile,
    );
    const codeBlockTasks = codeBlockContent.split("\n");
    for (let i = 0; i < codeBlockTasks.length; i++) {
      const task = formatReadTask(codeBlockTasks[i]);
      if (taskIsRunning(task)) {
        return true;
      }
    }
    return false;
  } catch (error) {
    new Notice(error.message);
    return false;
  }
}

function trackerLastTaskRunning(tasks: string[]): Task | null {
  for (let i = 0; i < tasks.length; i++) {
    console.log(tasks[i]);
    const task = formatReadTask(tasks[i]);
    if (taskIsRunning(task)) {
      console.log("Returning task");
      return task;
    }
  }
  return null;
}

export async function stopRunningTrackerTask(
  vault: Vault,
  trackerFile: string,
) {
  try {
    const [tracker, , codeBlockContent, match] = await getTrackerCodeBlock(
      vault,
      trackerFile,
    );
    const tasks = codeBlockContent.split("\n");
    const runningTask = trackerLastTaskRunning(tasks);

    if (runningTask) {
      const stoppedTask = stopTask(runningTask);
      const taskString = formatWriteTask(stoppedTask);
      const updatedContent = codeBlockContent.replace(
        tasks[
          tasks.indexOf(
            tasks.find(
              (t) =>
                formatReadTask(t).name == runningTask.name &&
                formatReadTask(t).startTime == runningTask.startTime,
            ),
          )
        ],
        taskString,
      );
      await updateTrackerContent(vault, tracker, match, "", updatedContent);
    }
  } catch (error) {
    new Notice(error.message);
    return;
  }
}

export async function trackerTaskRunning(vault: Vault, trackerFile: string) {
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
  const startTime = moment().unix().toString();
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
  const start = Math.floor(new Date(startTime).getTime() / 1000).toString();
  const end = Math.floor(new Date(endTime).getTime() / 1000).toString();
  const duration = (parseInt(end) - parseInt(start)).toString();
  return {
    name: name,
    startTime: start,
    endTime: end,
    duration: duration,
    category: category,
    project: project,
  };
}

function stopTask(task: Task | undefined): Task {
  if (typeof task == "undefined") {
    throw new TypeError("The input must be a Task");
  }
  const endTime = moment().unix().toString();
  task.endTime = endTime;
  const duration = (Number(task.endTime) - Number(task.startTime)).toString();
  task.duration = duration;
  return task;
}

function getLastTaskAndContent(trackerContent: string): [Task, string] {
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
  if (task.endTime == "") {
    return true;
  }
  if (task.endTime == null) {
    return true;
  }
  return false;
}

function formatWriteTask(task: Task): string {
  if (!task || !task.name || !task.startTime) {
    throw new Error("Invalid task: missing required fields");
  }

  const endTime = task.endTime ?? "";
  const duration = task.duration ?? "";
  const category = task.category ?? "";
  const project = task.project ?? "";

  return `${task.name} | ${task.startTime} | ${endTime} | ${duration} | ${category} | ${project}`;
}

function formatReadTask(taskString: string): Task {
  if (!taskString) {
    throw new Error("Empty task string provided");
  }

  const taskFieldList = taskString.split(" | ");

  if (taskFieldList.length !== 6) {
    console.error("Invalid task format: expected 6 fields");
    return TASK_ERROR;
  }

  const [name, startTime, endTimeRaw, durationRaw, categoryRaw, projectRaw] =
    taskFieldList;

  if (!name || !startTime) {
    console.error("Invalid task: missing required fields");
    return TASK_ERROR;
  }

  const task: Task = {
    name,
    startTime,
    endTime: endTimeRaw || null,
    duration: durationRaw || null,
  };

  if (categoryRaw) {
    task.category = categoryRaw;
  }

  if (projectRaw) {
    task.project = projectRaw;
  }

  return task;
}
