<script lang="ts">
  import PopupButton from "./components/PopupButton/PopupButton.svelte";
</script>

<main>
  <!-- <Background /> -->
  <h1>a Journey to the Journal</h1>
  <div id="date">
    {#each Array(1).fill(1).map((v, i) => v + i) as i}
      <PopupButton
        originalWidth="auto"
        originalHeight="50px"
        popupWidth="400px"
        popupHeight="500px"
        className="hello"
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
    #date {
      border: 1px solid black;
    }
  }

  :global(.hello) {
    margin: 10px;
    display: block !important;
  }

  

  
</style>