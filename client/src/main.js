import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$mainUrl = ()=>{
	if(process.env.NODE_ENV !== 'production') {
		return 'localhost:9000'

	}
}

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
