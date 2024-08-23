export interface TaskTimeTrackerSettings {
  trackerFile: string;
  weekStart: string;
  category: boolean;
  project: boolean;
  showOpenTracker: boolean;
}

export const DEFAULT_SETTINGS: TaskTimeTrackerSettings = {
  trackerFile: "",
  weekStart: "Monday",
  category: true,
  project: true,
  showOpenTracker: true,
};
