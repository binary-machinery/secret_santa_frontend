import Vue from 'vue'
import App from '@/App.vue'

import router from "@/router";
import store from "@/store";
import config_mixin from "@/config_mixin";

Vue.config.productionTip = false;
Vue.mixin(config_mixin);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
