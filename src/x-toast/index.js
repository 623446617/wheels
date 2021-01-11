import XToast from './x-toast';

export default {
    install(Vue, options) {
        const Construtor = Vue.extend(XToast);
        const toast = new Construtor();
        toast.$mount(); // 将toast组件挂载到内存中

        Vue.prototype.$toast = toast;

        // 将toast添加到body中
        document.body.appendChild(toast.$el);
    }
};
