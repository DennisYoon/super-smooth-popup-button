<script lang="ts">
  type Element = HTMLElement;

  /* Props */
  export let content: string = "hello";
  export let width: string;
  export let height: string;

  /* DOMs */
  let container: Element;
  let activeButton: Element;

  /* Variables */
  let showing = false;

  /* Listeners */
  function onButtonClick() {
    if (showing) return;

    const domRect = activeButton.getBoundingClientRect();
    const buttonX = domRect.top / window.innerHeight * 100;
    const buttonY = domRect.left / window.innerWidth * 100;
    const buttonW = domRect.width;
    const buttonH = domRect.height;

    const cs = container.style;
    cs.width = `${buttonW}px`;
    cs.height = `${buttonH}px`;

    const bs = activeButton.style;
    bs.position = "absolute";
    bs.top = `${buttonX}%`;
    bs.left = `${buttonY}%`;
    bs.transition = `top .5s, left .5s, transform .5s, width .5s, height .5s`;
    bs.transform = "translate(0, 0)";
    bs.width = `${buttonW}px`;
    bs.height = `${buttonH}px`;
    
    setTimeout(() => {
      bs.top = "50%";
      bs.left = "50%";
      bs.transform = "translate(-50%, -50%)";
      bs.width = `${width}%`;
      bs.height = `${height}%`;
    });

    showing = true;
  }
</script>

<main>
  <div id=background class:bgBlur = {showing}></div>

  <div bind:this={container} id=container>
    <button on:click={onButtonClick} bind:this={activeButton} id=activeButton>
      {#if showing}
        <div>
          <slot></slot>
        </div>
      {:else}
        {content}
      {/if}
    </button>
  </div>

</main>

<style lang="scss">
  #activeButton {
    margin: 0;
  }

  #container {
    display: inline-block;
    border: 1px solid black;
  }

  #background {
    position: absolute;
    margin: 0;
    padding: 0;
    background-color: black;
    opacity: .0;
    display: none;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    transition: opacity .5s;
  }

  .bgBlur {
    display: block !important;
    opacity: .5 !important;
  }
</style>