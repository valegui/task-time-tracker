<script lang="ts">
  let svelteUrl = "https://svelte.dev/";
  let tailwindcssUrl = "https://tailwindcss.com/";
  let input: string = "";
</script>

<div class="general">

  <h2 class="title">Task Tracker</h2>
  <hr class="divider">

  <div style="margin-left:5px;">
    <div class="text" style="margin-bottom: 20px;">
      <h2 class="title">Timer</h2>
      <div class="button-horizontal">
        <button class="button-style"> Start Timer </button> 
        <button class="button-style"> Stop Timer </button> 
      </div>
      <form action="new-manual-time" method="POST" class="form-horizontal">
        <div>
          <label for="taskname" class="form-label"> Task name </label>
        </div>
        <div>  
          <input
            type="text"
            name="taskname"
            id="taskname"
            class="form-input"
            placeholder="Task name"
          />
        </div>
        <div>
          <label for="categoryname" class="form-label"> Category </label>
        </div>
        <div>
          <input
            type="text"
            name="categoryname"
            id="categoryname"
            class="form-input"
            placeholder="Category"
          />
        </div>
        <div>
          <label for="projectname" class="form-label"> Project </label>
        </div>
        <div>
          <input
            type="text"
            name="projectname"
            id="projectname"
            class="form-input"
            placeholder="Project"
          />
        </div>
      </form>

    </div>

    <div class="text" style="margin-top:20px;">
      <h2 class="title" style="margin-bottom:20px;">Add manual time</h2>
      <form action="new-manual-time" method="POST">
        <div class="form-horizontal">
          <div>
            <label for="taskname" class="form-label"> Task name </label>
          </div>
          <div>  
            <input
              type="text"
              name="taskname"
              id="taskname"
              class="form-input"
              placeholder="Task name"
            />
          </div>
          <div>
            <label for="starttime" class="form-label">Start Time</label>
          </div>
          <div>
            <input
              type="datetime-local"
              name="starttime"
              class="form-input"
              id="starttime"
            />
          </div>
          <div>
            <label for="endtime" class="form-label">End Time</label>
          </div>
          <div> 
            <input
              type="datetime-local"
              name="endtime"
              class="form-input"
              id="endtime"
            />
          </div>
          <div>
            <label for="categoryname" class="form-label"> Category </label>
          </div>
          <div>
            <input
              type="text"
              name="categoryname"
              id="categoryname"
              class="form-input"
              placeholder="Category"
            />
          </div>
          <div>
            <label for="projectname" class="form-label"> Project </label>
          </div>
          <div>
            <input
              type="text"
              name="projectname"
              id="projectname"
              class="form-input"
              placeholder="Project"
            />
          </div>
        </div>  
        <div style="display:flex; align-items:right; justify-content:flex-end">
          <button class="button-style">Add Task</button>
        </div>
      </form>
    </div>
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
    font-size: var(--table-text-size);
    margin-bottom: 5px;
    margin-top: 10px;
  }

  .form-input {
    width: 100%;
    font-size: var(--table-text-size);
  }

  .form-horizontal {
    display:grid;
    grid-template-columns: max-content 1fr;
    grid-gap:5px;
    margin-top: 5px;
  }

  .button-style {
    padding: 10px 15px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  
  .button-horizontal{
    display: grid;
    grid-gap: 5px;
    grid-template-columns: max-content max-content;
    align-items: center;
    justify-content: center;
  }

</style>