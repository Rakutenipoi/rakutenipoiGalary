import { createRouter, createWebHashHistory } from "vue-router"
import FrontPage from "../pages/FrontPage.vue"
import User from "../pages/User.vue"
import Favorite from "../pages/Favorite.vue"
import Collection from "../pages/Collection.vue"
import Upload from "../pages/Upload.vue"

const routes = [
    {
        path: '/',
        name: 'frontpage',
        component: FrontPage,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/user',
        name: 'user',
        component: User,
        meta: {
            title: '个人'
        }
    },
    {
        path: '/browse/favorite',
        name: 'browse/favorite',
        component: Favorite,
        meta: {
            title: '收藏'
        }
    },
    {
        path: '/browse/collection',
        name: 'browse/collection',
        component: Collection,
        meta: {
            title: '图集'
        }
    },
    {
        path: '/upload',
        name: 'upload',
        component: Upload,
        meta: {
            title: '上传'
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

router.afterEach((to, from) => {
    if(to.meta.title) {
        document.title = to.meta.title
    }
})

export default router
