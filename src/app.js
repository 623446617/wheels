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


// 单元测试

// import chai from 'chai';
// const expect = chai.expect;
// {
//     // 将组件写到页面的任意位置
//     const Constructor = Vue.extend(xbutton);
//     const button = new Constructor({
//         propsData: {
//             icon: 'setting'
//         }
//     });
//     button.$slots.default = '按钮';
//     button.$mount('#test');
//
//     let element = button.$el.querySelector('use');
//     let href = element.getAttribute('xlink:href');
//     // BDD, 用自然语言描述为:
//     // 期望 href 等于 'setting'
//     expect(href).to.eq('setting');
// }
