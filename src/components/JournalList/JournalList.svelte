<script lang="ts">
  import PopupButton from "../PopupButton/PopupButton.svelte";

  //props
  export let dates: string[];
</script>

<main>
  <div id="date">
    {#each dates as date}
      <PopupButton
        originalWidth="auto"
        originalHeight="50px"
        popupWidth="400px"
        popupHeight="500px"
        className="JournalList"
      >
        <div slot="before">
          {date}
        </div>
        <div slot="after">
          이것은 {date}의 일기입니다
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