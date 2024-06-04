<script lang="ts">
  let svelteUrl = "https://svelte.dev/";
  let tailwindcssUrl = "https://tailwindcss.com/";
  let input: string = "";
</script>

<div class="general">
  <h2 class="title">Task Tracker</h2>
  <hr class="divider">
  <h3 class="title">Time</h3>

  <dl class="text" style="margin: 0 20px 20px 5px;">
    <dt> Add manual time </dt>
    <dt> Start timer </dt>
  </dl>
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
    margin: 0 0 8px 0;
  }

  .text {
    font-size: var(--table-text-size);
  }

  .general {
    font-family: var(--inline-title-font);
  }


</style>