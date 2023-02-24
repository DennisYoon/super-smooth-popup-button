import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

export default {
  preprocess: sveltePreprocess({
    scss: {
      prependData: `@import "src/assets/scss/variables.scss";`
    },
    postcss: {
      plugins: [autoprefixer()]
    }
  })
};
