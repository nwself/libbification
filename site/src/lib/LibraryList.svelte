<script>
  import { createForm } from 'felte';

  export let libraryStore;
  let success = false;

  const { form } = createForm({
    onSubmit: ({shortcode}, {setFields}) => {
      const newLibraries = shortcode.split(",").map(str => str.trim()).filter(lib => $libraryStore.indexOf(lib) === -1);
      $libraryStore = [...$libraryStore, ...newLibraries];
      setFields("shortcode", "");
    },
  });

  function remove(library) {
    $libraryStore = $libraryStore.filter(lib => lib !== library);
  }

  function copyShortcodes() {
    window.navigator.clipboard.writeText($libraryStore.join(","))
      .then(function() {
        success = true;
        setInterval(() => success = false, 3000);
      }, function() {
        console.error("Navigator failed");
      });
  }
</script>

<ul class="text-sm font-medium  bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 ">
  {#each $libraryStore as library}
    <li class="py-2 pl-4 pr-1 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
      <div class="flex flex-wrap flex-col md:flex-row md:justify-between">
        <div>
          {library}
        </div>
        <div>
          <a href="{`https://${library}.overdrive.com`}" class="text-gray-900 dark:text-gray-400" target="_blank" rel="noopener">
            {`https://${library}.overdrive.com`}
          </a>
          <button type="button" on:click={() => remove(library)} class="text-red-600 bg-white border border-red-600 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium font-sans uppercase rounded-lg text-xs px-2 py-1 font-extrabold text-center dark:bg-gray-600 dark:text-red-700 dark:border-red-700 dark:hover:bg-gray-700 dark:hover:border-red-600 dark:focus:ring-gray-800">X</button>
          </div>
      </div>
    </li>
  {/each}
    <li>
      <div class="p-2 bg-blue-50 dark:bg-slate-600">
      <form use:form>
        <div class="mb-2">
          <label for="shortcode" class="block pl-1 mt-2 font-sans text-sm font-medium text-gray-900 dark:text-gray-300">Add library shortcode</label>
          <input name="shortcode" type="text" id="shortcode" class="bg-gray-50 border border-gray-300 text-gray-900 font-sans text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Supports comma delimiter" required>
        </div>
        <button type="submit" class="font-sans font-semibold tracking-wide text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
      </form>
      </div>
    </li>
    <li>
      <div class="p-2 flex justify-center items-center">
        <button on:click={copyShortcodes} type="button" class="py-2.5 px-5 mr-2 text-sm font-sans font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Copy shortcodes</button>
        {#if success}
        <div class="absolute right-[38vw]">Copied!</div> 
        {/if}
      </div>
    </li>
</ul>