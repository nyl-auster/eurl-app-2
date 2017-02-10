// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './ui/components/App'
import VueRouter from 'vue-router'
import routes from './ui/routes'
import _ from "lodash";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes // raccourci pour "routes: routes"
});

new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
