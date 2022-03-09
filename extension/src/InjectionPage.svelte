<script>
  import { clickOutside } from "./click_outside.js";
  import browser from "webextension-polyfill";
  import { fade } from 'svelte/transition';
  import { search, localDB, moreLibraries, backgroundSyncer } from "./stores.js";
  import Results from "./components/Results.svelte";


  let terms;
  let showAside = true;

  $: search(terms);

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "toggle-overlay") {
      showAside = !showAside;
      return;
    }

    if ("terms" in message) {
      console.log("Triggered new search from terms", message.terms);
      terms = message.terms;
    } else {
      const selection = window.getSelection().toString().trim();
      console.log("Triggered new search from selection", {selection});
      terms = selection;
    }

    showAside = true;
  });

  console.log({$backgroundSyncer});

  function searchMore() {
    search(terms, moreLibraries)
  }

  function stretch(node, {
    delay = 0,
    duration = 1500
    }) {
    const wStr = getComputedStyle(node).width;
    const w = +wStr.substring(0, wStr.length - 3);
    const hStr = getComputedStyle(node).height;
    const h = +hStr.substring(0, hStr.length - 3);

    return {
      delay,
      duration,
      css: t => {
        // console.log(`width: ${t * w}; height: ${t * h}`);
        return `width: ${t * w}; height: ${t * h}`;
      }
    };
  }
</script>

{#if showAside}
<aside transition:fade use:clickOutside on:outclick={() => (showAside = false)}>
  <p>Search for "{terms}"</p>

  {#if $localDB[terms]}
  {#each Object.entries($localDB[terms]) as [library, results], index}
    <Results {library} {results}/>
  {/each}
  <button on:click={searchMore}>Search Wishlist Libraries</button>
  {:else}
  <p>Stamping checkout cards...</p>
  {/if}
</aside>
{/if}



<style>
aside {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 1rem 1rem 1rem;
  background-color: #222222dd;
  color: white;
  width: 20vw;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-y: scroll;
  z-index: 1000;
  font-family:  arial, sans-serif
}

p {
  margin-bottom: .25rem;
}
</style>
