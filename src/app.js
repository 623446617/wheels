import Vue from 'vue';
import xbutton from "./x-button";
import xicon from "./x-icon";
import xbuttongroup from './x-button-group';
// 注册全局组件
Vue.component('x-button', xbutton);
Vue.component('x-icon', xicon);
Vue.component('x-button-group', xbuttongroup)

let app = new Vue({
    el: '#app',
    data: {
        loading1: false,
        loading2: false,
        loading3: false
    }
});
