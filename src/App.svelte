<script lang="ts">
  import JournalList from "./components/exs/Examples.svelte";
</script>

<main>
  <h1>수퍼 스무스 팝업 버튼</h1>
  <div id="emptyBox"></div>
  <JournalList />
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