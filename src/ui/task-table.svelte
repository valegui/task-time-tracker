<script lang="ts">
    import type { Task } from "./tasks";
    export let data: Task[] = [];

    // Helper function to handle null/undefined values
    function formatValue(value: string | null | undefined): string {
        return value ?? "-";
    }

    // Format timestamp to ISO8601
    function formatTimestamp(timestamp: string | null | undefined): string {
        if (!timestamp) return "-";
        try {
            // Convert seconds to milliseconds and create Date object
            const date = new Date(Number(timestamp) * 1000);
            return date.toISOString();
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

<div class="timeline-table">
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
    .timeline-table {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
    }

    th,
    td {
        padding: 0.5rem;
        text-align: left;
        border: 1px solid #ddd;
    }

    th {
        background-color: #f5f5f5;
        font-weight: bold;
    }

    tr:nth-child(even) {
        background-color: #fafafa;
    }

    tr:hover {
        background-color: #f0f0f0;
    }
</style>
