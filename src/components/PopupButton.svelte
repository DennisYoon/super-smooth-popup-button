<script lang="ts">
  import { onMount } from "svelte";

  // props
  export let content: string;
  export let originalWidth: string;
  export let originalHeight: string;
  export let popupWidth: string;
  export let popupHeight: string;

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
      id="popupButton"
      bind:this={popupButton}
      on:click={() => clicked = true}
      class:goCenter={clicked}
      class:removeBasicThings={clicked}
    >
      {#if clicked}
        <slot />
      {:else}
        {content}
      {/if}
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

      button {
        margin: 0;
        position: absolute;
        top: var(--top);
        left: var(--left);
        transform: translate(0, 0);

        transition-property: top, left, transform, width, height;
        transition-duration: var(--td);
      }

      .goCenter {
        position: fixed;
        width: var(--width) !important;
        height: var(--height) !important;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .removeBasicThings {
        // background-color: transparent;
        // border: none;
        // user-select: text;
      }
    }

    #background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: background-color .5s;
    };

    .showBackground {
      visibility: visible !important;
      background-color: rgba(0, 0, 0, 0.551) !important;
    }

    .hideBackground1 {
      background-color: rgba(255, 255, 255, 0);
    }

    .hideBackground2 {
      visibility: hidden !important;
    }
  }
</style>