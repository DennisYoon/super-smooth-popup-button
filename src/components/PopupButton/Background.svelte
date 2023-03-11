<script lang="ts">
  import { showingHiding } from "./connecter";

  let showing: boolean;
  let hiding: boolean;

  showingHiding.subscribe(v => {
    showing = v.showing;
    hiding = v.hiding;
  });

  const body = document.querySelector("body");
</script>

<main>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    id="background"
    class:showBackground={showing}
    class:hideBackground1={!showing}
    class:hideBackground2={hiding}
    on:click={() => {
      showingHiding.set({showing: false, hiding: false});
      body.style.setProperty("--td", ".5s");
      setTimeout(() => {
        body.style.setProperty("--scrollability", "visible");
        showingHiding.set({showing, hiding: !showing});
        if (hiding) body.style.setProperty("--td", ".0s");
      }, 500);
    }}
  ></div>
</main>

<style lang="scss">
  main {
    #background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition-property: background-color, /*backdrop-filter*/;
      transition-duration: .5s;
      z-index: 0;
  
      &.showBackground {
        visibility: visible !important;
        // backdrop-filter: blur(5px);
        background-color: rgba(0, 0, 0, 0.8) !important;
      }
  
      &.hideBackground1 {
        background-color: rgba(255, 255, 255, 0);
        // backdrop-filter: blur(0px);
  
      }
  
      &.hideBackground2 {
        visibility: hidden !important;
      }
    }
  }
</style>