<script lang="ts">
  import PopupButton from "../PopupButton/PopupButton.svelte";
  import { getAllDays } from "./getAllDays";

  // props
  export let year: string = "NaN";
  export let month: string = "NaN";
</script>

<main>
  <div id="DateSelection">
    <PopupButton
      originalWidth="200px"
      originalHeight="30px"
      popupWidth="400px"
      popupHeight="400px"
      className="DateSelection"
    >
      <div slot="before">
        {year}년 {month}월
      </div>
      
      <div slot="after">
        {getAllDays(parseInt(year), parseInt(month))[0].dayOfTheWeek}
      </div>
    </PopupButton>
  </div>
</main>

<style lang="scss">
  :global(.DateSelection #popupButton) {
    border-radius: 20px !important;
  }

  :global(.DateSelection #after) {
    text-align: center;
    font-size: 50px;
  }

  main {
    #DateSelection {
      display: flex;
      justify-content: center;
    }
  }
</style>