export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'Jbone CMS',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
 
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://jbone-sm-gateway.majunwei.com:10005',
    pro: 'http://jbone-sm-gateway.majunwei.com:10005'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  },
  // proxyTable: {
    
  //   '/': {
  //     target: 'http://192.168.1.37:20001',//设置你调用的接口域名和端口号 别忘了加http
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
  //     }
  //   }
  // }
}
