<script lang="ts">
  import JournalList from "./components/JournalList/JournalList.svelte";
  import DateSelection from "./components/DateSelection/DateSelection.svelte";

  const dates = Array(30).fill("").map((_, i) => i + 1 + "번째 일기");
</script>

<main>
  <!-- <Background /> -->
  <h1>a Journey to the Journal</h1>
  <DateSelection year="2023" month="3" />
  <div id="emptyBox"></div>
  <JournalList dates={dates} />
</main>

<style lang="scss">
  :global(::-webkit-scrollbar) {
      width: 5px;
      height: 5px;
    }

  :global(::-webkit-scrollbar-thumb) {
    background-color: rgba(0, 0, 0, 0.511);
    border-radius: 100px;
  }

  main {
    h1 {
      text-align: center;
    }

    #emptyBox {
      height: 20px;
    }
  }
</style>