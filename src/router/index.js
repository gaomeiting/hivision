import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
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
import axios from 'axios'
const Vote = resolve => {
    import ('components/vote/vote').then(module => {
        resolve(module)
    })
};
const Profile = resolve => {
    import ('components/profile/profile').then(module => {
        resolve(module)
    })
};
const Success = resolve => {
    import ('components/success/success').then(module => {
        resolve(module)
    })
};
const Singer = resolve => {
    import ('components/singer/singer').then(module => {
        resolve(module)
    })
};
const Me = resolve => {
    import ('components/me/me').then(module => {
        resolve(module)
    })
};
const Dome = resolve => {
    import ('components/dome/dome').then(module => {
        resolve(module)
    })
};
const SelectBook = resolve => {
    import ('components/selectbook/selectbook').then(module => {
        resolve(module)
    })
};
const BookDetail = resolve => {
    import ('components/bookDetail/bookDetail').then(module => {
        resolve(module)
    })
};
const BookDetailPK = resolve => {
    import ('components/bookDetailPK/bookDetailPK').then(module => {
        resolve(module)
    })
};
const Record = resolve => {
    import ('components/Record/Record').then(module => {
        resolve(module)
    })
};
const ProfileDetail = resolve => {
    import ('components/profileDetail/profileDetail').then(module => {
        resolve(module)
    })
};
const CardDetail = resolve => {
    import ('components/cardDetail/cardDetail').then(module => {
        resolve(module)
    })
};
const Bind = resolve => {
    import ('components/bind/bind').then(module => {
        resolve(module)
    })
};
const Enroll = resolve => {
    import ('components/enroll/enroll').then(module => {
        resolve(module)
    })
};
const MyFavouriteSingers = resolve => {
    import ('components/myFavouriteSingers/myFavouriteSingers').then(module => {
        resolve(module)
    })
};
const SearchSingers = resolve => {
    import ('components/searchSingers/searchSingers').then(module => {
        resolve(module)
    })
};
const MyVoteDetail = resolve => {
    import ('components/myVoteDetail/myVoteDetail').then(module => {
        resolve(module)
    })
};
const Battle = resolve => {
    import ('components/battle/battle').then(module => {
        resolve(module)
    })
};
Vue.use(Router)


const routes = [

    {
        path: '/',
        component: Battle
    }, {
        path: '/vote',
        component: Vote
    }, , {
        path: '/enroll',
        component: Enroll
    }, {
        path: '/profile',
        component: Profile
    }, {
        path: '/success',
        component: Success
    }, {
        path: '/singer',
        component: Singer
    }, {
        path: '/dome',
        component: Dome
    }, {
        path: '/selectbook',
        component: SelectBook
    }, {
        path: '/selectbook/:id',
        component: BookDetailPK,
    }, {
        path: '/record',
        component: Record,
    }, {
        path: '/me',
        component: Me,
    }, {
        path: '/modifyProfile',
        component: ProfileDetail,
    }, {
        path: '/card',
        component: CardDetail,
    }, {
        path: '/bind',
        component: Bind,
    }, {
        path: '/myFavouriteSingers',
        component: MyFavouriteSingers,
    }, {
        path: '/myVoteDetail',
        component: MyVoteDetail,
    }, {
        path: '/searchSingers',
        component: SearchSingers,
    }, {
        path: '/battle',
        component: Battle,
    }

]


const router = new Router({
    routes: routes
})
// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem('token')) {
    store.commit('SET_LOGIN', window.sessionStorage.getItem('token'))
}
router.afterEach((to, from) => {
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