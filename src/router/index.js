import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
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
Vue.use(Router)


const routes = [

    {
        path: '/',
        redirect: '/vote'
    }, {
        path: '/vote',
        component: Vote
    }, {
        path: '/profile',
        component: Profile
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
        component: BookDetail,
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
    }

]

const router = new Router({
    routes: routes
})


export default router