import { createStore } from "vuex";
import user from './modules/user'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default createStore({
    modules: {
        user
    },
    plugins: [vuexLocal.plugin],
})






