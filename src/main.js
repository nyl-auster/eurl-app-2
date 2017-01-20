// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './routes'
import _ from "lodash";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
});

new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
