import Vue from 'vue';
import XButton from "./x-button";
import XIcon from "./x-icon";
import XButtonGroup from './x-button-group';
import XInput from './x-input';
// 注册全局组件
Vue.component('x-button', XButton);
Vue.component('x-icon', XIcon);
Vue.component('x-button-group', XButtonGroup);
Vue.component('x-input', XInput);

let app = new Vue({
    el: '#app',
    data: {
        loading1: false,
        loading2: false,
        loading3: false,
        message: 'hi'
    },
    methods: {
        xfocus(param) {
            console.log(param);
        },
        xblur(param) {
            console.log(param);
        },
        xinput(param) {
            console.log(param);
        },
        xchange(param) {
            console.log(param);
        }
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
