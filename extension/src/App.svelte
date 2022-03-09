<script>
  import browser from "webextension-polyfill";
  import SearchForm from "./components/SearchForm.svelte";

  function openPage() {
    let createProperties = {
      url: "extensionIndex.html",
    };
    browser.tabs.create(
      createProperties   // object
    );

    window.close();
  }

</script>


<main>
  <SearchForm/>
  <button on:click={openPage}>See search history</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>