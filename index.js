import "./src/icon";        // 图标库
import "./src/base.css";    // 基础样式

import XButton from './src/x-button';
import XButtonGroup from './src/x-button-group';
import XIcon from './src/x-icon';
import XInput from './src/x-input';
import XRow from './src/x-row';
import XCol from './src/x-col';
import XLayout from "./src/x-layout";
import XContent from "./src/x-content";
import XHeader from "./src/x-header";
import XFooter from "./src/x-footer";
import XSider from "./src/x-sider";
import XToast from './src/x-toast';
import XTabs from "./src/x-tabs";
import XTabsItem from "./src/x-tabs-item";
import XPopover from './src/x-popover';
import XCollapse from './src/x-collapse';
import XCollapseItem from './src/x-collapse-item';

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
        Vue.component('x-layout', XLayout);
        Vue.component('x-content', XContent);
        Vue.component('x-header', XHeader);
        Vue.component('x-footer', XFooter);
        Vue.component('x-sider', XSider);
        Vue.use(XToast);
        Vue.component('x-tabs', XTabs);
        Vue.component('x-tabs-item', XTabsItem);
        Vue.component('x-popover', XPopover);
        Vue.component('x-collapse', XCollapse);
        Vue.component('x-collapse-item', XCollapseItem);
    }
};

export default plugin;

export {
    XButton,
    XButtonGroup,
    XIcon,
    XInput,
    XRow,
    XCol,
    XLayout,
    XContent,
    XHeader,
    XFooter,
    XSider,
    XToast,
    XTabs,
    XTabsItem
};
