<script context="module">
  export const prerender = true;
</script>

<script>
  import LibraryList from '$lib/LibraryList.svelte';
  import { mainLibraries, wishlistLibraries } from '$lib/stores.js';
</script>

<div class="h-full min-h-screen py-8 bg-slate-100 dark:bg-slate-700 text-gray-900 dark:text-white">
  <div class="container md:w-1/2 mx-auto px-4">
    <h2 class="text-xl py-4">
      Main Libraries
    </h2>
    <LibraryList libraryStore={mainLibraries}/>
  </div>
  <div class="container md:w-1/2 mx-auto mt-4 px-4">
    <h2 class="text-xl py-4">
      Wishlist Libraries
    </h2>
    <LibraryList libraryStore={wishlistLibraries}/>
  </div>
</div>
