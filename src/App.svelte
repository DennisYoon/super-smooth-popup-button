<script lang="ts">
  import JournalList from "./components/JournalList/JournalList.svelte";
</script>

<main>
  <!-- <Background /> -->
  <h1>a Journey to the Journal</h1>
  <JournalList dates={["3월 11일", "3월 12일"]}></JournalList>
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
  }
</style>