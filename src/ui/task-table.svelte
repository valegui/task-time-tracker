<script lang="ts">
    import type { Task } from "./tasks";
    export let data: Task[] = [];

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

<div class="task-table">
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Start</th>
                <th>End</th>
                <th>Duration</th>
                <th>Category</th>
                <th>Project</th>
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
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .task-table {
        overflow-x: scroll;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
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
        overflow-x: scroll;
    }

    th {
        background-color: var(--table-header-background);
        font-family: var(--table-header-font);
        font-weight: var(--table-header-weight);
    }
</style>
