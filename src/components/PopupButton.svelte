<script lang="ts">
  import { onMount } from "svelte";

  // props
  export let originalWidth: string;
  export let originalHeight: string;
  export let popupWidth: string;
  export let popupHeight: string;

  export let className: string = "";

  // bind:this DOM
  let container: HTMLElement;
  let popupButton: HTMLElement;

  // variables
  const root = document.documentElement;
  let clicked = false;
  let hide = true;

  // functions
  function s(element: HTMLElement) {
    return element.style;
  }

  function designateButtonPosition() {
    s(container).width = s(popupButton).width = originalWidth;
    s(container).height = s(popupButton).height = originalHeight;

    const {top, left} = container.getBoundingClientRect();
    const {offsetWidth, offsetHeight} = document.documentElement;

    s(root).setProperty("--top", top / offsetHeight * 100 + "%");
    s(root).setProperty("--left", left / offsetWidth * 100 + "%");

    s(root).setProperty("--width", popupWidth);
    s(root).setProperty("--height", popupHeight);
  }

  // DOM 렌더링 후
  onMount(designateButtonPosition);

  // resize 시...
  window.addEventListener("resize", designateButtonPosition)

  // 'clicked'시
  $: if (clicked) {
    s(root).setProperty("--scrollability", "hidden");
    hide = false;
  } else {
    s(root).setProperty("--scrollability", "visible");
    setTimeout(() => {
      if (!hide) {
        hide = true;
      }
    }, 500);
  }

  // 'hide'시
  $: if (hide) {
    s(root).setProperty("--td", ".0s");
  } else {
    s(root).setProperty("--td", ".5s");
  }

  $: console.log("click:",clicked,"hide:", hide);
</script>

<main>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    id="background"
    class:showBackground={clicked}
    class:hideBackground1={!clicked}
    class:hideBackground2={hide}
    on:click={() => clicked = false}
  ></div>

  <span id="container" bind:this={container}>
    <button
      class={className}
      id="popupButton"
      bind:this={popupButton}
      on:click={() => clicked = true}
      class:goCenter={clicked}
      class:removeBasicThings={clicked}
    >
        <div id="after" class:hideElement={!clicked}>
          <slot name="after"></slot>
        </div>

        <div id="before" class:hideElement={clicked}>
          <slot name="before"></slot>
        </div>
    </button>
  </span>
</main>

<style lang="scss">
  :root {
    --top: auto;
    --left: auto;

    --width: auto;
    --height: auto;

    --td: .5s;
    --scrollability: scroll;
  }

  :global(body) {
    overflow: var(--scrollability);
  }

  main {
    #container {
      display: inline-block;

      #popupButton {
        margin: 0;
        padding: 0;

        position: absolute;
        top: var(--top);
        left: var(--left);
        transform: translate(0, 0);

        transition-property: top, left, transform, width, height;
        transition-duration: var(--td);

        &.goCenter {
          position: fixed;
          width: var(--width) !important;
          height: var(--height) !important;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          border: none;
          text-transform: none;
          background-color: white;
        }

        #after, #before {
          position: absolute;
          height: 100%;
          transition: opacity .5s;
          top: 0;
          left: 0;

          &.hideElement {
            opacity: 0;
          }
        }

        #after {
          width: var(--width);
        }
      }
    }

    #background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition-property: background-color, backdrop-filter;
      transition-duration: .5s;

      &.showBackground {
        visibility: visible !important;
        backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.551) !important;
      }

      &.hideBackground1 {
        background-color: rgba(255, 255, 255, 0);
        backdrop-filter: blur(0px);

      }

      &.hideBackground2 {
        visibility: hidden !important;
      }
    }
  }
</style>