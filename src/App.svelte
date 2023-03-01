<script lang="ts">
  import PopupButton from "./components/PopupButton.svelte";
</script>

<main>
  <h1>a Journey to the Journal</h1>
  <PopupButton
    content="hello world"
    originalWidth="100px"
    originalHeight="50px"
    popupWidth="50%"
    popupHeight="50%"
  >
    hello guys
  </PopupButton>
</main>

<style lang="scss">
  :global(::-webkit-scrollbar) {
      width: 5px;
      height: 0px;
    }

  :global(::-webkit-scrollbar-thumb) {
    background-color: rgba(0, 0, 0, 0.511);
    border-radius: 100px;
  }

  h1 {
    text-align: center;
  }
</style>