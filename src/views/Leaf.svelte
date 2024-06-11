<script lang="ts">
  let svelteUrl = "https://svelte.dev/";
  let tailwindcssUrl = "https://tailwindcss.com/";
  let input: string = "";
</script>

<div class="general">

  <h2 class="title">Task Tracker</h2>
  <hr class="divider">

  <div style="margin-left:5px;">
    <div class="text">
    <h3 class="title">Add manual time</h3>
      <form action="new-manual-time" method="POST">
        <div class="form-horizontal">
          <label for="taskname" class="form-label"> Task name </label>
          <input
            type="text"
            name="taskname"
            id="taskname"
            class="form-input"
            placeholder="Task name"
          />
        </div>
        <div class="form-horizontal">
          <label for="starttime" class="form-label">Start Time</label>
          <input
            type="datetime-local"
            name="starttime"
            class="form-input"
            id="starttime"
          />
        </div>
        <div class="form-horizontal">
          <label for="endtime" class="form-label">End Time</label>
          <input
            type="datetime-local"
            name="endtime"
            class="form-input"
            id="endtime"
          />
        </div>
        <div class="form-horizontal">
          <label for="categoryname" class="form-label"> Category </label>
          <input
            type="text"
            name="categoryname"
            id="categoryname"
            class="form-input"
            placeholder="Category"
          />
        </div>
        <div class="form-horizontal">
          <label for="projectname" class="form-label"> Project </label>
          <input
            type="text"
            name="projectname"
            id="projectname"
            class="form-input"
            placeholder="Project"
          />
        </div>

        <div style = "display: flex; justify-content:flex-end">
          <button class="button-style">Add Task</button>
        </div>
      </form>
    </div>
    <h3 class="title">Start timer</h3>

    <h3 class="title">Stop timer</h3>

  </div>
</div>

<style>
  .title {
    text-align: left;
    line-height: var(--table-line-height);
    display: block;
    margin: 0 5px 5px 0;
  }

  .divider {
    display: block;
    border-top: 0.5px solid var(--hr-color);
    border-bottom: none;
    height: 1px;
    margin: 0 0 15px 0;
  }

  .text {
    font-size: var(--table-text-size);
  }

  .general {
    font-family: var(--inline-title-font);

  }

  .form-label {
    display: block;
    margin-bottom: 5px;
    margin-top: 10px;
  }

  .form-input {
    width: 100%;
  }

  .input-flex {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
  }

  .form-horizontal {
    display:grid;
    grid-template-columns: 30% 1fr;
    grid-gap:5px;
    margin-top: 5px;
  }

  .button-style {
    padding: 10px 15px;
    margin-top: 15px;
    margin-bottom: 15px;
  }


</style>