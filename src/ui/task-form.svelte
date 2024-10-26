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
    let activeTab = "timed"; // "timed" or "manual"

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
            const new_moment = moment()
                .year(year)
                .month(month - 1)
                .date(day)
                .hours(hours)
                .minutes(minutes)
                .seconds(0);
            return new_moment;
        }
        return null;
    }
</script>

<div class="task-form">
    <h1>Create Tracked Task</h1>
    <div class="tabs">
        <button
            class:active={activeTab === "timed"}
            on:click={() => (activeTab = "timed")}
        >
            Timed Task
        </button>
        <button
            class:active={activeTab === "manual"}
            on:click={() => (activeTab = "manual")}
        >
            Manual Task
        </button>
    </div>

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

    {#if activeTab === "manual"}
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
        {#if activeTab === "manual"}
            <button class="button-submit" on:click={handleSubmit}>Add</button>
        {:else}
            <button class="button-submit" on:click={handleSubmit}>Start</button>
        {/if}
    </div>
</div>

<style>
    .task-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font: var(--font-text-theme);
    }

    .tabs {
        display: flex;
        gap: 1px;
        margin-bottom: 15px;
        background-color: var(--background-secondary-alt);
        border-radius: var(--input-radius);
        padding: 2px;
    }

    .tabs button {
        flex: 1;
        padding: 8px;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: var(--input-radius);
        transition: background-color 0.3s;
    }

    .tabs button.active {
        background-color: var(--link-external-color);
        color: var(--text-normal);
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
</style>
