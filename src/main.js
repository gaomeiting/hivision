import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'assets/scss/index.scss';
import {
	wxShare,
	commonWxConfig
} from 'assets/js/mixin'
let Component = Vue.extend({
	mixins: [wxShare, commonWxConfig]
})

let component = new Component()
component._getShareConfig()


Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')