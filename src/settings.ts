export interface TaskTimeTrackerSettings {
	weekStart: string;
	category: boolean;
	project: boolean;
}

export const DEFAULT_SETTINGS: TaskTimeTrackerSettings = {
	weekStart: 'Monday',
	category: true,
	project: true,
}