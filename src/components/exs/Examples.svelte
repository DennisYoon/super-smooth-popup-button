<script lang="ts">
  import PopupButton from "../PopupButton/PopupButton.svelte";
</script>

<main>
  <div id="examples">
    {#each Array(30).fill(1).map((v, i) => v + i) as value}
      <PopupButton
        originalWidth="auto"
        originalHeight="50px"
        popupWidth="400px"
        popupHeight="500px"
        className="examples"
      >
        <div slot="before">
          {value}
        </div>
        <div slot="after">
          <h1>hello {value}</h1>
        </div>
      </PopupButton>
    {/each}
  </div>
</main>

<style lang="scss">
  main {
    #examples {
      border: 1px solid black;
    }
  }
  
  :global(.examples) {
    margin: 10px;
    display: block !important;
  }
</style>