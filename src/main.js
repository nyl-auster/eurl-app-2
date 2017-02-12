// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './ui/components/App'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routes from './ui/Routes'
import Store from './ui/Store'

Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes // raccourci pour "routes: routes"
});

new Vue({
  router,
  store: new Vuex.Store(Store),
  template: '<App/>',
  components: { App }
}).$mount('#app')
