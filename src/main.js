// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'

import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5'

import 'iview/dist/styles/iview.css'
import './assets/js/adminlte.js'
import './assets/js/bootstrap.min.js'
import './assets/js/app.min.js'

// 引入adminLTE
import '!style-loader!css-loader!./assets/css/bootstrap.min.css'
import '!style-loader!css-loader!./assets/css/AdminLTE.min.css'
import '!style-loader!css-loader!./assets/css/_all-skins.min.css'
import '!style-loader!css-loader!./assets/css/font-awesome.min.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios
axios.defaults.timeout = 9000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
// axios.defaults.baseURL = 'https://xxxx.com'; //配置接口地址

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

Vue.use(router)
Vue.use(iview)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})