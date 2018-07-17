module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    /*titleTemplate: '%s - 叮当配主播配音平台',*/
    title: '与声俱来·声咖大赛',
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=no'
    }, {
      httpEquiv: "X-UA-Compatible",
      content: "IE=edge,chrome=1"
    }, {
      name: "renderer",
      content: "webkit"
    }, {
      name: 'keywords',
      content: '叮当配，配音，有声知识服务，知识付费, freelancer，兼职，人工智能，自由职业者，外包，广告配音，专题解说，课件配音，新闻播报，情景剧配音，语音提示配音，方言配音，外语配音，创意平台，主播, 碎片化, 有钱, ddpei, ddpeiyin, 配音团队，接到，叮当配能接到单吗'
    }, {
      hid: 'description',
      name: 'description',
      content: '叮当配（ddpeiyin.com）拥有10000+国内外一流配音团队/个人主播，提供专业的商业配音和有声知识录制服务，包括：广告配音、专题解说、课件配音、新闻播报、情景剧配音、语音提示配音、方言配音、外语配音等，已服务包括掌阅集团、湛庐文化、当当网、喜马拉雅、蜻蜓FM、考拉FM、懒人听书、智伴机器人等8000+企业，了解更多叮当配案例。'
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  //loading: { color: '#3B8070' },
  loading: '~/components/load/load.vue',
  css: [{
    src: '~assets/scss/index.scss'
  }, {
    src: 'element-ui/lib/theme-chalk/index.css'
  }],
  plugins: [{
    src: '@/plugins/element-ui'
  }, {
    src: '~plugins/scroll.js',
    ssr: false
  }, {
    src: '~plugins/ilingxi-1.0.0.js',
    ssr: false
  }],
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    prefix: '/api',
    proxy: true
  },
  proxy: {
    "/api": {
      target: "http://192.168.100.59:8080/api",
      pathRewrite: {
        "^/api": ""
      }
    }
  },
  //http://192.168.100.210:8080
  //http://192.168.100.70:8080
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    postcss: [
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ],
    babel: {
      presets: ['es2015', 'stage-0'],
      plugins: ['transform-runtime']
    },
    vendor: ['axios', 'babel-polyfill', 'weixin-js-sdk'],
    publicPath: 'http://st.ddpei.cn/hv/mglx/',
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.entry['polyfill'] = ['babel-polyfill']
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}