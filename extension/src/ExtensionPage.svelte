<script>
  import browser from "webextension-polyfill";
  import { localDB } from "./stores.js";
  import Results from "./components/Results.svelte";
  import SearchForm from "./components/SearchForm.svelte";
</script>

<main>
  <SearchForm/>
  <h5>History:</h5>
  <ul>
  {#each Object.entries($localDB) as [terms, db]}
    <h3>{terms}</h3>
    <small>{db._meta.datetime}</small>
    {#each Object.entries(db) as [library, results]}
      <Results {library} {results}/>
    {/each}
  {/each}
  </ul>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    background-color: #222222dd;
    color: white;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>