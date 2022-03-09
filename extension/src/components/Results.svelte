<script>
  export let library;
  export let results;
</script>

{#if library !== "_meta"}
<h5>{library}</h5>
{#if results.type === "error"}
<p>Error: {results.err}</p>
{:else if results.type === "results"}
  {#if results.results.length == 0}
  <p>
    No results.
  </p>
  {:else}
  <ul>
    {#each results.results as {id, title, isAvailable, firstCreatorName}}
    <li class:available={isAvailable}>
      <a href="{`https://${library}.overdrive.com/media/${id}`}">{title}</a> by {firstCreatorName}
      {#if isAvailable}
      <span>(AVALIABLE)</span>
      {:else}
      <span>(unavailable)</span>
      {/if}
    </li>
    {/each}
  </ul>
  {/if}
{:else if results.type === "querying"}
<p>
  loading...
</p>
{/if}
{/if}


<style>
* {
  color: white;
  font-family:  arial, sans-serif;
}

h5 {
  font-family: palatino, "Palatino Linotype", serif;
  font-size: 1.125rem;
}

ul li::marker {
  content: "❌ ";
}

ul li.available::marker {
  content: "✅ ";
}

a {
  color: white;
}
</style>