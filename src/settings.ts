export interface TaskTimeTrackerSettings {
	trackerFile: string;
	weekStart: string;
	category: boolean;
	project: boolean;
}

export const DEFAULT_SETTINGS: TaskTimeTrackerSettings = {
	trackerFile: '',
	weekStart: 'Monday',
	category: true,
	project: true,
}