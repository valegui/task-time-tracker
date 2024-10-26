import { Notice, Plugin, TFile } from "obsidian";
import { TaskModal } from "./modals";
import { DEFAULT_SETTINGS, TaskTimeTrackerSettings } from "./settings";
import { TaskTimeTrackerSettingTab } from "./settings-tab";
import type { Task } from "./tasks";
import {
  createManualTrackerTask,
  startTrackerTimerTask,
  stopLastTrackerTask,
  trackerTaskRunning,
} from "./tasks";
import TaskTable from "./ui/task-table.svelte";

export default class TaskTimeTrackerPlugin extends Plugin {
  settings: TaskTimeTrackerSettings = DEFAULT_SETTINGS;

  async onload() {
    await this.loadSettings();

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new TaskTimeTrackerSettingTab(this.app, this));

    // This registers a markdown post processor that takes a task time tracker code
    // block and shows it as table
    this.addMarkdownPostprocessor();

    // This creates an icon in the left ribbon.
    if (this.settings.showOpenTracker) {
      this.addRibbonIcon("clipboard-list", "Task Time Tracker File", () => {
        this.openView();
      });
    }

    this.loadCommandPalette();
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  addMarkdownPostprocessor() {
    this.registerMarkdownCodeBlockProcessor(
      "task-time-tracker",
      (source, el, ctx) => {
        try {
          // Split the source into lines and filter out empty lines
          const rows = source
            .split("\n")
            .filter((row) => row.trim().length > 0);

          // Parse the CSV-like data into Task objects
          const data: Task[] = rows.map((row) => {
            const [name, startTime, endTime, duration, category, project] = row
              .split("|")
              .map((cell) => cell.trim());

            return {
              name,
              startTime,
              endTime: endTime === "-" ? null : endTime,
              duration: duration === "-" ? null : duration,
              category: category === "-" ? undefined : category,
              project: project === "-" ? undefined : project,
            };
          });

          // Create and mount the Svelte component
          new TaskTable({
            target: el,
            props: {
              data,
            },
          });
        } catch (error) {
          console.error("Error processing timeline table:", error);
          el.createEl("div", { text: "Error processing timeline data" });
        }
      },
    );
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async openView() {
    const settings = this.settings as TaskTimeTrackerSettings;
    if (settings.trackerFile == "") {
      new Notice("Task Time Tracker: no file is set as the tracker file.");
      return;
    }
    // File is active
    const activeFileName = this.app.workspace.activeEditor?.file?.name;
    if (activeFileName && activeFileName == settings.trackerFile) {
      return;
    }
    // Check if file is open in another tab
    let trackerLeafOpen = false;
    this.app.workspace.iterateAllLeaves((leaf) => {
      const viewState = leaf.getViewState();
      if (viewState.state?.file?.endsWith(settings.trackerFile)) {
        trackerLeafOpen = true;
        this.app.workspace.setActiveLeaf(leaf);
      }
    });
    if (trackerLeafOpen) {
      return;
    }
    // Create new tab with the file open
    const leaf = this.app.workspace.getLeaf("tab");
    const file = this.app.vault.getFileByPath(settings.trackerFile);
    await leaf.openFile(file as TFile, { active: true });
    return;
  }

  loadCommandPalette() {
    const vault = this.app.vault;
    // Command palette
    this.addCommand({
      id: "add-timed-task",
      name: "Create Task",
      callback: () => {
        new TaskModal(this.app, (taskData): void => {
          new Notice(`Starting task: ${taskData.taskName}`);
          if (taskData.endTime == null) {
            startTrackerTimerTask(
              vault,
              this.settings.trackerFile,
              taskData.taskName,
              taskData.taskCategory,
              taskData.taskProject,
            );
          } else {
            createManualTrackerTask(
              vault,
              this.settings.trackerFile,
              taskData.taskName,
              taskData.startTime,
              taskData.endTime,
              taskData.taskCategory,
              taskData.taskProject,
            );
          }
        }).open();
      },
    });

    this.addCommand({
      id: "start-task",
      name: "Start Task",
      callback: () => {
        startTrackerTimerTask(vault, this.settings.trackerFile);
      },
    });

    this.addCommand({
      id: "stop-task",
      name: "Stop Task",
      callback: () => {
        stopLastTrackerTask(vault, this.settings.trackerFile);
      },
    });

    this.addCommand({
      id: "task-running",
      name: "Is there a task running?",
      callback: async () => {
        const running = await trackerTaskRunning(
          vault,
          this.settings.trackerFile,
        );
        console.log(running);
        if (running) {
          new Notice("Task running");
        } else {
          new Notice("No Task running");
        }
      },
    });

    this.addCommand({
      id: "go-to-tracker",
      name: "Show Tracker File",
      checkCallback: (checking: boolean) => {
        if (this.settings.trackerFile != "") {
          if (!checking) {
            this.openView();
          }
          return true;
        }
        return false;
      },
    });
  }
}
