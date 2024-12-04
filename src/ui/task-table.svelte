<script lang="ts">
	import type { Task } from "./tasks";
	export let data: Task[] = [];
	export let tableLength = 50;
	export let deleteTask: (task: Task) => void;
	export let stopTask: (task: Task) => void;

	// Helper function to handle null/undefined values
	function formatValue(value: string | null | undefined): string {
		return value ?? "-";
	}

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

<div class="task-table" style="max-height: {tableLength * 2.3}rem;">
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Start</th>
				<th>End</th>
				<th>Duration</th>
				<th>Category</th>
				<th>Project</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each data as task}
				<tr>
					<td>{task.name}</td>
					<td>{formatTimestamp(task.startTime)}</td>
					<td>{formatTimestamp(task.endTime)}</td>
					<td>{formatDuration(task.duration)}</td>
					<td>{formatValue(task.category)}</td>
					<td>{formatValue(task.project)}</td>
					<td class="action-cell">
						<div class="action">
							{#if !task.duration}
								<a
									href="."
									on:click|preventDefault={() =>
										stopTask(task)}
									aria-label="Stop task"
								>
									⛔
								</a>
							{/if}
							<a
								href="."
								on:click|preventDefault={() => deleteTask(task)}
								aria-label="Delete task"
							>
								🗑️
							</a>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.task-table {
		overflow-x: auto;
		overflow-y: auto;
		position: relative;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		border-color: var(--table-border-color);
		border-width: var(--table-border-width);
		background-color: var(--table-background-color);
	}

	th,
	td {
		padding: 0.5rem;
		text-align: left;
		border-bottom: 1px solid var(--background-modifier-border);
		font-size: var(--table-text-size);
	}

	td {
		overflow-x: auto;
	}

	th {
		background-color: var(--table-header-background);
		font-family: var(--table-header-font);
		font-weight: var(--table-header-weight);
	}

	.action-cell {
		overflow-x: auto;
		height: 100%;
	}

	.action {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center; /* Add this */
		height: 100%;
		gap: var(--size-2-2);
	}

	.action a {
		text-decoration: none;
		cursor: pointer;
		padding: 4px;
		border-radius: var(--radius-s);
		display: inline-block;
		transition: background-color 0.2s;
	}

	.action a:hover {
		background-color: var(--background-modifier-hover);
	}

	.action a:active {
		background-color: var(--background-modifier-active);
	}
</style>
