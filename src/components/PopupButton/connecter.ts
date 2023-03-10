import { writable } from "svelte/store";

const showingHiding = writable({
  showing: false,
  hiding: true
});

const called = writable(false);

export { showingHiding, called };