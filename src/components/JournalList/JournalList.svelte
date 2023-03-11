<script lang="ts">
  import PopupButton from "../PopupButton/PopupButton.svelte";
</script>

<main>
  <div id="date">
    {#each Array(1).fill(1).map((v, i) => v + i) as i}
      <PopupButton
        originalWidth="auto"
        originalHeight="50px"
        popupWidth="400px"
        popupHeight="500px"
        className="JournalList"
      >
        <div slot="before">
          {i}
        </div>
        <div slot="after">
          <h2>
            DO You Hear the people sing?
          </h2>
          <button>hello world</button>
        </div>
      </PopupButton>
    {/each}
  </div>
</main>

<style lang="scss">
  main {
    #date {
      border: 1px solid black;
    }
  }
  
  :global(.JournalList) {
    margin: 10px;
    display: block !important;
  }
</style>