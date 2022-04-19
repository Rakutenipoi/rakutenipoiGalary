// state
const state = () => ({
    hasLogin: false,
    needLogin: false,
    id: Number,
    username: String,
    password: String,
    email: String,
    nickname: String,
    access_token: String,
    role: String
})

// getters
const getters = {
    getHasLogin: (state) => {
        return state.hasLogin;
    },
    getNeedLogin: (state) => {
        return state.needLogin;
    },
    getId: (state) => {
        return state.id;
    },
    getUserName: (state) => {
        return state.username;
    },
    getPassWord: (state) => {
        return state.password;
    },
    getEmail: (state) => {
        return state.email;
    },
    getNickName: (state) => {
        return state.nickname;
    },
    getAccessToken: (state) => {
        return state.access_token;
    },
    getRole: (state) => {
        return state.role;
    }
}

// mutations
const mutations = {
    setHasLogin: (state, value) => {
        state.hasLogin = value;
    },
    setNeedLogin: (state, value) => {
        state.needLogin = value;
    },
    setId: (state, value) => {
        state.id = value;
    },
    setUserName: (state, value) => {
        state.username = value;
    },
    setPassWord: (state, value) => {
        state.password = value;
    },
    setEmail: (state, value) => {
        state.email = value;
    },
    setNickName: (state, value) => {
        state.nickname = value;
    },
    setAccessToken: (state, value) => {
        state.access_token = value;
    },
    setRole: (state, value) => {
        state.role = value;
    }
}

// actions
const actions = {
    setHasLoginState({commit}, value) {
        commit("setHasLogin", value);
    },
    setNeedLoginState({commit}, value) {
        commit("setNeedLogin", value);
    },
    clearUser({commit}) {
        commit("setHasLogin", false);
        commit("setId", null);
        commit("setUserName", null);
        commit("setPassWord", null);
        commit("setEmail", null);
        commit("setNickName", null);
        commit("setAccessToken", null);
        commit("setRole", null);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

