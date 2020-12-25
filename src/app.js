import Vue from 'vue';
import xbutton from "./x-button";
import xicon from "./x-icon";

// 注册全局组件
Vue.component('x-button', xbutton);
Vue.component('x-icon', xicon);

let app = new Vue({
    el: '#app'
});
