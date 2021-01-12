import Vue from 'vue';
import XButton from "./x-button";
import XIcon from "./x-icon";
import XButtonGroup from './x-button-group';
import XInput from './x-input';
import XRow from './x-row';
import XCol from './x-col';
import XLayout from './x-layout';
import XContent from './x-content';
import XHeader from './x-header';
import XFooter from './x-footer';
import XSider from './x-sider';
import XToast from './x-toast';

// 注册全局组件
Vue.component('x-button', XButton);
Vue.component('x-icon', XIcon);
Vue.component('x-button-group', XButtonGroup);
Vue.component('x-input', XInput);
Vue.component('x-row', XRow);
Vue.component('x-col', XCol);
Vue.component('x-layout', XLayout);
Vue.component('x-content', XContent);
Vue.component('x-header', XHeader);
Vue.component('x-footer', XFooter);
Vue.component('x-sider', XSider);
Vue.use(XToast);

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
        },
        showToast() {
            this.$toast.show({
                text: '<strong>aaamamamam</strong>',
                closeText: '知道了',
                enableHtml: true,
                position: 'center',
                onClosed() {
                    console.log('关闭');
                }
            }, 1000);
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
