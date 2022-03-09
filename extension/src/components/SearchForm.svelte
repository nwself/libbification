<script>
  import { onMount } from 'svelte';

  export let closeOnSearch = false;
  let input;
  let terms = "";

  onMount(() => {
    input.focus();
  });

  function onSubmit() {
    // turns out you have to bounce these messages off the background
    // script to get them to the content script!?!
    browser.runtime.sendMessage({
      type: "search",
      terms
    });

    closeOnSearch && window.close();
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <input type="text" bind:this={input} bind:value={terms} />
  <button type="submit">Search</button>
</form>

<style>
  button {
    padding-y: 0.625rem;
    padding-x: 1.25rem;
    background-color: white;
    color: #222;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    border-width: 1px;
    border-color: #222;
    border-radius: 0.5rem;
  }
</style>