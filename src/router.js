import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Battle from './views/battle/battle'
/*import Home from './views/Home.vue'*/
import {
  wxFnVer,
  lingxiFn
} from 'assets/js/version'
import {
  login
} from 'assets/js/lingxi'

import {
  getData
} from 'api/api'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'battle',
    component: Battle
  }, {
    path: '/enroll',
    name: 'enroll',
    component: () =>
      import ('./views/enroll/enroll')
  }, {
    path: '/profile',
    name: 'profile',
    component: () =>
      import ('./views/profile/profile')
  }, {
    path: '/success',
    name: 'success',
    component: () =>
      import ('./views/success/success')
  }, {
    path: '/singer',
    name: 'singer',
    component: () =>
      import ('./views/singer/singer')
  }, {
    path: '/dome',
    name: 'dome',
    component: () =>
      import ('./views/dome/dome')
  }, {
    path: '/pkDome',
    name: 'pkDome',
    component: () =>
      import ('./views/pkDome/pkDome')
  }, {
    path: '/selectbook',
    name: 'selectbook',
    component: () =>
      import ('./views/selectbook/selectbook')
  }, {
    path: '/selectbook/:id',
    name: 'selectbookDetail',
    component: () =>
      import ('./views/bookDetailPK/bookDetailPK')
  }, {
    path: '/record',
    name: 'record',
    component: () =>
      import ('./views/record/record')
  }, {
    path: '/me',
    name: 'me',
    component: () =>
      import ('./views/me/me')
  }, {
    path: '/modifyProfile',
    name: 'modifyProfile',
    component: () =>
      import ('./views/profileDetail/profileDetail')
  }, {
    path: '/card',
    name: 'card',
    component: () =>
      import ('./views/cardDetail/cardDetail')
  }, {
    path: '/bind',
    name: 'bind',
    component: () =>
      import ('./views/bind/bind')
  }, {
    path: '/myFavouriteSingers',
    name: 'myFavouriteSingers',
    component: () =>
      import ('./views/myFavouriteSingers/myFavouriteSingers')
  }, {
    path: '/myVoteDetail',
    name: 'myVoteDetail',
    component: () =>
      import ('./views/myVoteDetail/myVoteDetail')
  }, {
    path: '/searchSingers',
    name: 'searchSingers',
    component: () =>
      import ('./views/searchSingers/searchSingers')
  }]
})

// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem('token')) {
  store.commit('SET_LOGIN', window.sessionStorage.getItem('token'))
}
router.afterEach((to) => {
  if (store.state.token) {
    return;
  } else {
    let lingxi = lingxiFn()
    let wxV = wxFnVer()
    if (!wxV && !lingxi) return;
    getData('/api/user/token').then(res => {
      if (res.status === 200) {
        store.commit('SET_LOGIN', res.data)
      } else if (res.status === 302) {
        if (res.data && wxV) {
          //微信
          let statu = `#${to.fullPath}`
          let url = res.data.replace('{STATE}', encodeURIComponent(statu))
          window.location.href = url;
        } else if (!res.data && lingxi) {
          //灵犀
          login();
        }
      }
    }).catch(err => {
      if (err.data) {
        //let error = err.data.message || err.data.error;
        window.alert(err)
      }
    })
  }
})

export default router