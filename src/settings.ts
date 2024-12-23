export interface TaskTimeTrackerSettings {
	trackerFile: string;
	weekStart: string;
	category: boolean;
	project: boolean;
	showOpenTracker: boolean;
	showLeaf: boolean;
	tableLength: number;
}

export const DEFAULT_SETTINGS: TaskTimeTrackerSettings = {
	trackerFile: "",
	weekStart: "Monday",
	category: true,
	project: true,
	showOpenTracker: true,
	showLeaf: true,
	tableLength: 50,
};
