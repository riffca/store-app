import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'

axios.interceptors.request.use(function (config) {
	console.log('request----->', config)
	return config;
}, function (error) {
	return Promise.reject(error);
});

Vue.config.productionTip = false

Vue.prototype.$copy = (obj)=>{
	return JSON.parse(JSON.stringify(obj))
}

Vue.prototype.$request = (location, data)=>{

	let url
	if(process.env.NODE_ENV !== 'production') {
		url =  'http://localhost:9000'
	} else {
		url = 'https://some.org'
	}


	return axios({
				method: data ? 'POST' : 'GET',
				url: `${url}/${location}`,
				data
			}
		).then(res=>{
				return res.data
		})
}


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
