<script lang="ts">
  import { onMount } from "svelte";

  // props
  export let originalWidth: string;
  export let originalHeight: string;
  export let popupWidth: string;
  export let popupHeight: string;

  export let className: string = "";

  // bind:this DOM
  let root: HTMLElement;
  let container: HTMLElement;
  let popupButton: HTMLElement;

  // variables
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
  window.addEventListener("resize", designateButtonPosition);
</script>

<main bind:this={root}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    id="background"
    class:showBackground={clicked}
    class:hideBackground1={!clicked}
    class:hideBackground2={hide}
    on:click={() => {
      clicked = false;
      s(root).setProperty("--zi", "1");
      s(root).setProperty("--scrollability", "visible");
      setTimeout(() => {
        if (!hide) {
          hide = true;
          s(root).setProperty("--td", ".0s");
        }
      }, 500);
    }}
  ></div>

  <span id="container" bind:this={container}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class={className}
      id="popupButton"
      bind:this={popupButton}
      on:click={() => {
        clicked = true;
        s(root).setProperty("--zi", "99999");
        s(root).setProperty("--scrollability", "hidden");
        hide = false;
        s(root).setProperty("--td", ".5s");
      }}
      class:goCenter={clicked}
      class:removeBasicThings={clicked}
    >
        <div id="after" class:hideElement={!clicked}>
          <slot name="after"></slot>
        </div>

        <div id="before" class:hideElement={clicked}>
          <slot name="before"></slot>
        </div>
    </div>
  </span>
</main>

<style lang="scss">
  :global(body) {
    overflow: var(--scrollability);
  }

  main {
    --top: auto;
    --left: auto;

    --width: auto;
    --height: auto;

    --td: .0s;
    --scrollability: scroll;

    --zi: 1;
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

          &.hideElement {
            opacity: 0;
          }
        }

        #before {
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
          cursor: pointer;
        }

        #after {
          width: var(--width);
          z-index: var(--zi);
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