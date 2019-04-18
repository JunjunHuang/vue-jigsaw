import jigsaw from '../components/vueJigsaw.vue';
let vueJigsaw = {}
vueJigsaw.install = function (Vue, options) {
  Vue.component(jigsaw.name, jigsaw) // testPanel.name 组件的name属性
}
export default vueJigsaw;

