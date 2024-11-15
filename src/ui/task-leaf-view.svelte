<script lang="ts">
	import { Notice } from "obsidian";
	import type { Task } from "../tasks";

	export let task: Task | null;
	export let duration: string | null;
	export let stopTracker: () => void;

	// Format duration from seconds to HH:MM:SS
	function formatDuration(seconds: string | null | undefined): string {
		if (!seconds) return "-";
		try {
			const totalSeconds = Number(seconds);
			const hours = Math.floor(totalSeconds / 3600);
			const minutes = Math.floor((totalSeconds % 3600) / 60);
			const remainingSeconds = Math.floor(totalSeconds % 60);

			const parts = ["00", "00", "00"];
			if (hours > 0) parts[0] = hours.toString().padStart(2, "0");
			if (minutes > 0) parts[1] = minutes.toString().padStart(2, "0");
			if (remainingSeconds > 0)
				parts[2] = remainingSeconds.toString().padStart(2, "0");

			return parts.join(":");
		} catch (error) {
			return "-";
		}
	}
	// Call the function when the button to stop task is clicked
	function handleStopClick() {
		stopTracker();
	}

	function handleCreateTask() {
		new Notice("Start");
	}
</script>

<div class="task-view-container">
	{#if task}
		<div class="task-info">
			{#if task.endTime}
				Duration {formatDuration(task.duration)}
			{:else}
				<div class="task-time-elapsed">
					{formatDuration(duration)}
				</div>
			{/if}
			<div class="task-name">{task.name}</div>
			<div class="task-category-project">
				{#if task.category}
					{task.category}
					{#if task.project}
						&#9642;
					{/if}
				{/if}
				{#if task.project}{task.project}{/if}
			</div>
		</div>
		<button on:click={handleStopClick}>Stop Tracker</button>
	{:else}
		<div class="no-task">No task running</div>
	{/if}
	<button on:click={handleCreateTask}>Create Task</button>
</div>

<style>
	.task-view-container {
		padding: 10px;
		font-size: 14px;
	}

	.task-info {
		padding: var(--size-4-2);
	}

	.task-name {
		font-size: var(--font-text-size);
	}
	.task-time-elapsed {
		font-size: var(--h3-size);
		margin-bottom: var(--size-2-1);
	}
	.task-category-project {
		font-size: var(--font-ui-smaller);
		margin-bottom: 3px;
	}

	.task-category-project {
		font-style: italic;
		margin-bottom: var(--size-4-3);
	}

	.no-task {
		font-size: var(--font-text-size);
		font-style: italic;
	}
</style>
