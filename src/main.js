import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import storage from 'packages/sealui-storage/src'
Vue.config.productionTip = false

storage.save('demo', '测试存储', 3000)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
