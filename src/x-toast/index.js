import XToast from './x-toast';
export default {
    install(Vue, options) {
        Vue.prototype.$toast= function (message) {
            const Construtor = Vue.extend(XToast);
            const toast = new Construtor();
            toast.$mount(); // 将toast组件挂载到内存中

            toast.message = message;

            // 将toast的元素添加到body中
            document.body.appendChild(toast.$el);
        }
    }
};
