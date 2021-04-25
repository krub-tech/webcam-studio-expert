import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import DefaultLayout from "./layouts/DefaultLayout.vue";
import SecondaryLayout from "./layouts/SecondaryLayout.vue";

import Proposal from "@/components/modal/Proposal";
import Terms from "@/components/modal/Terms";
import Privacy from "@/components/modal/Privacy";
import Interview from "@/components/modal/Interview";
import Claim from "@/components/modal/Claim";
import Feedback from "@/components/modal/Feedback";
import Certification from "@/components/modal/Certification";
import SpecSelection from "@/components/modal/SpecSelection";
import EnglishDesc from "@/components/modal/EnglishDesc";

Vue.component("default-layout", DefaultLayout);
Vue.component("secondary-layout", SecondaryLayout);

Vue.component("Proposal", Proposal);
Vue.component("Terms", Terms);
Vue.component("Privacy", Privacy);
Vue.component("Interview", Interview);
Vue.component("Claim", Claim);
Vue.component("Feedback", Feedback);
Vue.component("Certification", Certification);
Vue.component("SpecSelection", SpecSelection);
Vue.component("EnglishDesc", EnglishDesc);

export const eventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
