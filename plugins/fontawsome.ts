import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import {
  faMagnifyingGlass,
  faChevronDown,
  faSpinner,
  faArrowLeftLong,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;

library.add(
  faMoon,
  faMagnifyingGlass,
  faChevronDown,
  faSpinner,
  faArrowLeftLong,
  faCheck,
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon as any);
});
