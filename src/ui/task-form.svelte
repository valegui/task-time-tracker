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
      endTime: endMoment
    });
  }

  function createMoment(date: string, time: string): moment.Moment | null {
    if (!date || !time) return null;
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);
    if (year && month && day && hours !== undefined && minutes !== undefined) {
      return moment().year(year).month(month - 1).date(day).hours(hours).minutes(minutes);
    }
    return null;
  }

  function toggleExpanded() {
    expanded = !expanded;
  }
</script>

<div class="task-form">
  <h1>Task</h1>

  <div class="form-group">
    <label for="taskName">Name</label>
    <input id="taskName" bind:value={taskName} placeholder="Task name" required />
  </div>

  <div class="form-group">
    <label for="taskCategory">Category (optional)</label>
    <input id="taskCategory" bind:value={taskCategory} placeholder="Category" />
  </div>

  <div class="form-group">
    <label for="taskProject">Project (optional)</label>
    <input id="taskProject" bind:value={taskProject} placeholder="Project" />
  </div>

  <button on:click={toggleExpanded}>
    {expanded ? "^" : "v"}
  </button>

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
    <button on:click={handleSubmit}>Submit</button>
    <button on:click={onCancel}>Cancel</button>
  </div>
</div>

<style>
  .task-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
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
  }
</style>
