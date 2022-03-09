<script>
  import Spinner from '$lib/Spinner.svelte';
  import { names } from '$lib/overdrive.js';

  export let library;
  export let results;
</script>

{#if library !== "_meta"}

<div class="p-4 my-4 mx-auto max-w-2xl bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex flex-col justify-between items-start mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
          {names[library]}
          {#if results.type === "querying"}
            <Spinner/>
          {/if}
        </h5>
        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
          {library}
        </p>
   </div>

    <div class="flow-root">
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        {#if results.type === "error"}
        <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Error
                    </p>
                </div>
            </div>
        </li>
        {:else if results.type === "querying"}
        <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Querying
                    </p>
                </div>
            </div>
        </li>
        {:else if results.results.length == 0}
        <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        No results
                    </p>
                </div>
            </div>
        </li>
        {:else}
        {#each results.results as {id, title, isAvailable, firstCreatorName, cover}}
          <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                      <a href="{`https://${library}.overdrive.com/media/${id}`}" class="text-sm font-medium text-gray-900 dark:text-white">
                        <img class="h-16" src="{cover.href}" alt="{title} cover">
                      </a>
                  </div>
                  <div class="flex-1 min-w-0">
                      <a href="{`https://${library}.overdrive.com/media/${id}`}" class="text-sm font-medium text-gray-900 dark:text-white">
                          {title}
                      </a>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          {firstCreatorName}
                      </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {#if isAvailable}
                      available
                      {:else}
                      unavailable
                      {/if}
                  </div>
              </div>
          </li>
        {/each}
        {/if}
      </ul>
    </div>

</div>

<!--
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
-->
{/if}
