export interface TaskTimeTrackerSettings {
	trackerFile: string;
	weekStart: string;
	category: boolean;
	project: boolean;
}

export const DEFAULT_SETTINGS: TaskTimeTrackerSettings = {
	trackerFile: 'Tracker.md',
	weekStart: 'Monday',
	category: true,
	project: true,
}