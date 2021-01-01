export const childValidatorMixin = {
    methods: {
        // 规定传入子组件类型
        validator(cptname) {
            this.$children.forEach((child, i) => {
                if (child.$options.name !== cptname) {
                    throw new Error(`<${this.$options.name}/> 传入的第${i + 1}个子组件不为 <${cptname}/>`);
                }
            });
        }
    }
}
