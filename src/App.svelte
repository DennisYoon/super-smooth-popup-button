<script lang="ts">
  import PopupButton from "./components/PopupButton.svelte";
</script>

<main>
  <h1>a Journey to the Journal</h1>
  <PopupButton
    originalWidth="300px"
    originalHeight="100px"
    popupWidth="200px"
    popupHeight="500px"
    className="hello"
  >
    <div slot="before">
      <h2>
        hello world
      </h2>
    </div>
    <div slot="after">
      <h2>
        DO You Hear the people sing?
      </h2>
      <button>hello world</button>
    </div>
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

  :global(.hello) {
    // background-color: red;
  }
</style>