// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import axios from 'axios'
import VueQuillEditor, { Quill } from 'vue-quill-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = '/api';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')
Vue.use(VueQuillEditor)
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

Vue.prototype.prompt = function (success, text) {
  if (success) {
    this.$Message.info({content: text, duration: 3})
  } else {
    this.$Message.error({content: text, duration: 20, closable: true})
  }
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
