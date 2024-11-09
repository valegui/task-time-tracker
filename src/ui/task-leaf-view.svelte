<script lang="ts">
	import type { Task } from "../tasks";

	export let task: Task | null;
	export let duration: string | null;
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
				Started: {task.startTime}
				{#if task.endTime}
					<br />
					Ended: {task.endTime}
					<br />
					Duration: {task.duration}
				{:else}
					<br />
					Time elapsed: {duration}
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
	}

	.task-name {
		font-weight: bold;
		margin-bottom: 5px;
	}

	.task-category,
	.task-project {
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
