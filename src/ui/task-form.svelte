<script lang="ts">
    import { moment } from "obsidian";
    import type { TaskData } from "./TaskModal";

    export let onSubmit: (taskData: TaskData) => void;
    export let onCancel: () => void;

    let taskName = "";
    let taskCategory = "";
    let taskProject = "";
    let startDate = "";
    let startTime = "";
    let endDate = "";
    let endTime = "";
    let expanded = false;

    function handleSubmit() {
        const startMoment = createMoment(startDate, startTime);
        const endMoment = createMoment(endDate, endTime);

        onSubmit({
            taskName,
            taskCategory,
            taskProject,
            startTime: startMoment,
            endTime: endMoment,
        });
    }

    function createMoment(date: string, time: string): moment.Moment | null {
        if (!date || !time) return null;
        const [year, month, day] = date.split("-").map(Number);
        const [hours, minutes] = time.split(":").map(Number);
        if (
            year &&
            month &&
            day &&
            hours !== undefined &&
            minutes !== undefined
        ) {
            return moment()
                .year(year)
                .month(month - 1)
                .date(day)
                .hours(hours)
                .minutes(minutes);
        }
        return null;
    }
</script>

<div class="task-form">
    {#if expanded}
        <h1>Register Task</h1>
    {:else}
        <h1>Start Tracking Task</h1>
    {/if}

    <div class="form-group">
        <label for="taskName">Name</label>
        <input
            id="taskName"
            bind:value={taskName}
            placeholder="Task name"
            required
        />
    </div>

    <div class="form-group">
        <label for="taskCategory">Category (optional)</label>
        <input
            id="taskCategory"
            bind:value={taskCategory}
            placeholder="Category"
        />
    </div>

    <div class="form-group">
        <label for="taskProject">Project (optional)</label>
        <input
            id="taskProject"
            bind:value={taskProject}
            placeholder="Project"
        />
    </div>

    <div class="toggle-switch">
        <label for="expandToggle">
            <input type="checkbox" id="expandToggle" bind:checked={expanded} />
            <span class="slider"></span>
            Add Time
        </label>
    </div>

    {#if expanded}
        <div class="time-inputs">
            <div class="form-group">
                <label for="startDate">Start Date</label>
                <input id="startDate" type="date" bind:value={startDate} />
            </div>
            <div class="form-group">
                <label for="startTime">Start Time</label>
                <input id="startTime" type="time" bind:value={startTime} />
            </div>
            <div class="form-group">
                <label for="endDate">End Date</label>
                <input id="endDate" type="date" bind:value={endDate} />
            </div>
            <div class="form-group">
                <label for="endTime">End Time</label>
                <input id="endTime" type="time" bind:value={endTime} />
            </div>
        </div>
    {/if}

    <div class="button-group">
        <button on:click={onCancel}>Cancel</button>
        <button class="button-submit" on:click={handleSubmit}>Submit</button>
    </div>
</div>

<style>
    .task-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font: var(--font-text-theme);
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .form-group input {
        background-color: var(--background-secondary-alt);
        font-weight: var(--input-font-weight);
        border-color: var(--modal-border-color);
        border-width: var(--modal-border-width);
        border-radius: var(--input-radius);
        height: var(--input-height);
        border-style: solid;
        margin-top: 5px;
    }

    .time-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    .button-group {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        color: var(--color-base-00);
    }

    .button-submit {
        background-color: var(--link-external-color);
        border-color: var(--color-base-00);
    }

    .toggle-switch {
        display: flex;
        align-items: center;
        margin: 10px 0;
    }

    .toggle-switch label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;
        background-color: var(--color-base-100);
        border-radius: 20px;
        margin-right: 10px;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        border-radius: 50%;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: var(--link-external-color);
    }

    input:checked + .slider:before {
        transform: translateX(20px);
    }
</style>
