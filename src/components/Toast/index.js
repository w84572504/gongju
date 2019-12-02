import Toast from "./Toast";

const obj = {}

obj.install= function (Vue) {
  //1创建组件构造器
  const tosatConturstor = Vue.extend(Toast)

  //2 new的方式 根据左键构造器，可以创建出来一个组件对象
  const toast = new tosatConturstor()

  //3将组件对象，手动挂载到一个元素上
  toast.$mount(document.createElement('div'))

  //4toast.$el 对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}
export default obj