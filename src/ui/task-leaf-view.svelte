<script lang="ts">
	import type { Task } from "../tasks";

	export let task: Task | null;
	export let duration: string | null;

	// Format timestamp to YYYY-mm-dd HH:MM:SS
	function formatTimestamp(timestamp: string | null | undefined): string {
		if (!timestamp) return "-";
		try {
			// Convert seconds to milliseconds and create Date object
			const date = new Date(Number(timestamp) * 1000);
			return date
				.toLocaleString("en-CA", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					hour12: false,
				})
				.replace(",", "");
		} catch (error) {
			return "-";
		}
	}
	// Format duration from seconds to HH:MM:SS
	function formatDuration(seconds: string | null | undefined): string {
		if (!seconds) return "-";
		try {
			const totalSeconds = Number(seconds);
			const hours = Math.floor(totalSeconds / 3600);
			const minutes = Math.floor((totalSeconds % 3600) / 60);
			const remainingSeconds = Math.floor(totalSeconds % 60);

			const parts = [];
			if (hours > 0) parts.push(`${hours}h`);
			if (minutes > 0) parts.push(`${minutes}m`);
			if (remainingSeconds > 0 || parts.length === 0)
				parts.push(`${remainingSeconds}s`);

			return parts.join(" ");
		} catch (error) {
			return "-";
		}
	}
</script>

<div class="task-view-container">
	{#if task}
		<div class="task-info">
			<div class="task-name">{task.name}</div>
			{#if task.category}
				<div class="task-category">Category: {task.category}</div>
			{/if}
			{#if task.project}
				<div class="task-project">Project: {task.project}</div>
			{/if}
			<div class="task-time">
				<div class="task-started">
					Started: {formatTimestamp(task.startTime)}
				</div>
				{#if task.endTime}
					<br />
					Ended: {task.endTime}
					<br />
					Duration: {task.duration}
				{:else}
					<div class="task-time-elapsed">
						Time elapsed: {formatDuration(duration)}
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div class="no-task">No task running</div>
	{/if}
</div>

<style>
	.task-view-container {
		padding: 10px;
		font-size: 14px;
		border: 1px;
	}

	.task-name {
		font-weight: bold;
		margin-bottom: 5px;
	}

	.task-category,
	.task-project,
	.task-started,
	.task-time-elapsed {
		font-size: 12px;
		color: var(--text-muted);
		margin-bottom: 3px;
	}

	.task-time {
		font-size: 12px;
		margin-top: 5px;
	}

	.no-task {
		color: var(--text-muted);
		font-style: italic;
	}
</style>
