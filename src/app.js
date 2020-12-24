import Vue from 'vue';
import xbutton from "./x-button";

// 注册全局x-button组件
Vue.component('x-button', xbutton);

let app = new Vue({
    el: '#app'
});
