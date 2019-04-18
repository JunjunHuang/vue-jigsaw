import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueJigsaw from './plugin/vueJigsaw'

Vue.config.productionTip = false
Vue.use(vueJigsaw);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
