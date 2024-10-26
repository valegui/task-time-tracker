<script lang="ts">
    import type { Task } from "./tasks";
    export let data: Task[] = [];

    // Helper function to handle null/undefined values
    function formatValue(value: string | null | undefined): string {
        return value ?? "-";
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
                    <td>{task.startTime}</td>
                    <td>{formatValue(task.endTime)}</td>
                    <td>{formatValue(task.duration)}</td>
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
