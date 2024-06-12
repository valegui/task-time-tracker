<script lang="ts">
  let svelteUrl = "https://svelte.dev/";
  let tailwindcssUrl = "https://tailwindcss.com/";
  let input: string = "";
</script>

<div class="general">

  <h2 class="title">Task Tracker</h2>
  <hr class="divider">

  <div style="margin-left:5px; margin-right:4px;">
    <div class="text" style="margin-bottom: 20px;">
      <div class="section-title">
        Timer
      </div>
      <div class="button-horizontal">
        <button class="button-style"> Start Timer </button> 
        <button class="button-style"> Stop Timer </button> 
      </div>
      <form action="new-manual-time" method="POST">
        <div class="form-horizontal">
          <div class="form-label">
            <label for="taskname" > Task name </label>
          </div>
          <div class="form-input">  
            <input
              type="text"
              name="taskname"
              id="taskname"
              class="form-input"
              placeholder="Task name"
            />
          </div>
          <div class="form-label">
            <label for="categoryname" > Category </label>
          </div>
          <div class="form-input">
            <input
              type="text"
              name="categoryname"
              id="categoryname"
              class="form-input"
              placeholder="Category"
            />
          </div>
          <div class="form-label">
            <label for="projectname" > Project </label>
          </div>
          <div class="form-input">
            <input
              type="text"
              name="projectname"
              id="projectname"
              class="form-input"
              placeholder="Project"
            />
          </div>
        </div>  
      </form>

    </div>

    <div class="text" style="margin-top:20px;">
      <div class="section-title">
        Add manual time
      </div>
      <form action="new-manual-time" method="POST" style="margin-top:10px;">
        <div class="form-horizontal">
          <div class="form-label">
            <label for="taskname" > Task name </label>
          </div>
          <div class="form-input">  
            <input
              type="text"
              name="taskname"
              id="taskname"
              class="form-input"
              placeholder="Task name"
            />
          </div>
          <div class="form-label">
            <label for="starttime" >Start Time</label>
          </div>
          <div class="form-input">
            <input
              type="text"
              name="starttime"
              class="form-input"
              style="letter-spacing:-1px;"
              id="starttime"
              onfocus="(this.type='datetime-local')"
              onblur="if(!this.value) this.type='text'"
              placeholder="&#9716;"
            />
          </div>
          <div class="form-label">
            <label for="endtime" >End Time</label>
          </div>
          <div class="form-input"> 
            <input
              type="text"
              name="endtime"
              class="form-input"
              style="letter-spacing:-1px;"
              id="endtime"
              onfocus="(this.type='datetime-local')"
              onblur="if(!this.value) this.type='text'"
              placeholder="&#9716;"
            />
          </div>
          <div class="form-label">
            <label for="categoryname" > Category </label>
          </div>
          <div class="form-input">
            <input
              type="text"
              name="categoryname"
              id="categoryname"
              class="form-input"
              placeholder="Category"
            />
          </div>
          <div class="form-label">
            <label for="projectname"> Project </label>
          </div>
          <div class="form-input">
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
    font-size: var(--tab-font-size);
  }

  .general {
    font-family: var(--inline-title-font);
  }

  .section-title {
    font-size: var(--h4-size);
    font-weight: var(--h3-weight);
  }
  
  .form-label {
    display: block;
    font-size: var(--tab-font-size);
    margin-top: 10px;
    margin-right: 2px;
  }

  .form-input {
    width: 100%;
    font-size: var(--tab-font-size);
  }

  .form-horizontal {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-gap: 5px;
    margin-top: 5px;
  }

  .button-style {
    padding: 10px 15px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .button-horizontal{
    display: grid;
    grid-gap: 5px;
    grid-template-columns: max-content max-content;
    align-items: center;
    justify-content: center;
  }

</style>