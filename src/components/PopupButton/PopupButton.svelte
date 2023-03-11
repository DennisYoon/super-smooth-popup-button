<script lang="ts">
  import { onMount } from "svelte";
  import Background from "./Background.svelte";
  import { showingHiding, called as calledOrigin } from "./connecter";

  // props
  export let originalWidth: string;
  export let originalHeight: string;
  export let popupWidth: string;
  export let popupHeight: string;

  export let className: string = "";

  // functions
  function s(element: HTMLElement) {
    return element.style;
  }

  // showingHiding
  let showing: boolean;
  let hiding: boolean;

  showingHiding.subscribe(v => {
    showing = v.showing;
    hiding = v.hiding;
  });

  // bind:this DOM
  const body = document.querySelector("body");
  let root: HTMLElement;
  let container: HTMLElement;
  let popupButton: HTMLElement;

  // variables
  let backgroundMe = false;
  let clicked = false;
  let hideBefore = false;

  function designateButtonPosition() {
    s(root).setProperty("--owidth", originalWidth);
    s(root).setProperty("--oheight", originalHeight);

    const {left, top, width, height} = container.getBoundingClientRect();

    s(root).setProperty("--top", top + window.pageYOffset + "px");
    s(root).setProperty("--left", left + window.pageXOffset + "px");

    s(root).setProperty("--width", popupWidth);
    s(root).setProperty("--height", popupHeight);
    
    s(popupButton).width = width + "px";
    s(popupButton).height = height + "px";

    setTimeout(designateButtonPosition, 1);
  }

  // DOM 렌더링 전
  calledOrigin.update(v => {
    backgroundMe = !v;
    return true;
  });

  // DOM 렌더링 후
  onMount(designateButtonPosition);

  // resize 시...
  window.addEventListener("resize", designateButtonPosition);

  $: if (showing) {
    s(root).setProperty("--myzi", clicked ? "99999" : "-1");
  } else {
    if (root) {
      setTimeout(() => {
        if (hiding) s(root).setProperty("--myzi", "99999");
      }, 500);
      clicked = showing;
    }
  };

  $: if (clicked) {
    setTimeout(() => {
      hideBefore = true;
    }, 500);
  } else {
    hideBefore = false;
  }
</script>

<main bind:this={root}>
  {#if backgroundMe}
    
  <Background></Background>
  {/if}
  <span id="container" class={className} bind:this={container}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      id="popupButton"
      bind:this={popupButton}
      on:click={() => {
        clicked = true;
        showingHiding.set({showing: true, hiding: false});
        s(root).setProperty("--myzi", "99999");
        body.style.setProperty("--scrollability", "hidden");
        body.style.setProperty("--td", ".5s");
      }}
      class:goCenter={clicked}
      class:removeBasicThings={clicked}
    >
        <div id="after" class:hideElement1={!clicked}>
          <slot name="after"></slot>
        </div>

        <div id="before" class:hideElement1={clicked} class:hideElement2={hideBefore}>
          <slot name="before"></slot>
        </div>
    </div>
  </span>
</main>

<style lang="scss">
  :global(body) {
    overflow: var(--scrollability);

    --td: .0s;
    --scrollability: auto;
  }

  main {
    --owidth: auto;
    --oheight: auto;

    --top: auto;
    --left: auto;

    --width: auto;
    --height: auto;

    --myzi: 1;


    #container {
      display: inline-block;
      
      width: var(--owidth);
      height: var(--oheight);

      #popupButton {
        margin: 0;
        padding: 0;
        z-index: var(--myzi);

        position: absolute;
        
        top: var(--top);
        left: var(--left);
        transform: translate(0, 0);

        transition-property: top, left, transform, width, height;
        transition-duration: var(--td);

        background-color: rgb(244, 244, 244);
        border: 1px solid rgb(204, 204, 204);

        &.goCenter {
          position: fixed;
          width: var(--width) !important;
          height: var(--height) !important;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        #after, #before {
          position: absolute;
          height: 100%;
          width: 100%;
          transition: opacity .5s;
          top: 0;
          left: 0;

          &.hideElement1 {
            opacity: 0;
          }
        }

        #before {
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
          cursor: pointer;

          &.hideElement2 {
            visibility: none;
          }
        }

        #after {
          width: var(--width);
        }
      }
    }
  }
</style>