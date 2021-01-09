import "./src/icon";        // 图标库
import "./src/base.css";    // 基础样式

import XButton from './src/x-button';
import XButtonGroup from './src/x-button-group';
import XIcon from './src/x-icon';
import XInput from './src/x-input';
import XRow from './src/x-row';
import XCol from './src/x-col';

// Vue插件
const plugin = {
    install: function (Vue) {
        // 注册全局组件
        Vue.component('x-button', XButton);
        Vue.component('x-button-group', XButtonGroup);
        Vue.component('x-icon', XIcon);
        Vue.component('x-input', XInput);
        Vue.component('x-row', XRow);
        Vue.component('x-col', XCol);
    }
};

export default plugin;

export {
    XButton,
    XButtonGroup,
    XIcon,
    XInput,
    XRow,
    XCol
};
