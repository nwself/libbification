<script context="module">
  export const prerender = true;
</script>

<script>
  import { createForm } from 'felte';
  import { localDB, search } from '$lib/overdrive.js';
  import { mainLibraries, wishlistLibraries } from '$lib/stores.js';
  import Results from '$lib/Results.svelte';

  let terms;

  $: search(terms, $mainLibraries);

  const { form } = createForm({
    onSubmit: (values) => {
      console.log("setting terms");
      terms = values.terms;
    },
  });

  function searchMore() {
    search(terms, $wishlistLibraries);
  }

  function searchBrooklyn() {
    search(terms, ["brooklyn"]);
  }
</script>

<div class="h-full min-h-screen py-8 bg-slate-100 dark:bg-slate-700">

<div class="container mx-auto px-4">
  <form use:form>
    <div class="mb-6">
      <label for="terms" class="block pl-1 mb-2 font-sans text-sm font-medium text-gray-900 dark:text-gray-300">Search your libraries</label>
      <input name="terms" type="text" id="terms" class="bg-gray-50 border border-gray-300 text-gray-900 font-sans text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Terms..." required>
    </div>
    <button type="submit" class="font-sans font-semibold tracking-wide text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </form>
</div>

<div class="container mx-auto px-4">
{#if $localDB[terms]}
  {#each Object.entries($localDB[terms]) as [library, results], index}
    <Results {library} {results}/>
  {/each}
{/if}
</div>

{#if (terms in $localDB) && !("chesapeake" in $localDB[terms])}
<div class="container mx-auto my-4 px-4 flex items-center">
    <button on:click={searchMore} class="font-sans font-semibold tracking-wide mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search Wishlist Libraries</button>
  </div>
{/if}

{#if (terms in $localDB) && !("brooklyn" in $localDB[terms])}
<div class="container mx-auto my-4 px-4 flex items-center">
    <button on:click={searchBrooklyn} class="font-sans font-semibold tracking-wide mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search Brooklyn</button>
  </div>
{/if}

</div>
