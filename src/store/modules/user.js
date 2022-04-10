// state
const state = () => ({
    hasLogin: false,
    id: Number,
    username: String,
    password: String,
    email: String,
    nickname: String,
    access_token: String
})

// getters
const getters = {
    getHasLogin: (state) => {
        return state.hasLogin;
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
    }
}

// mutations
const mutations = {
    setHasLogin: (state, value) => {
        state.hasLogin = value;
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
    }
}

// actions
const actions = {
    setHasLoginState({commit}, value) {
        commit("setHasLogin", value);
    },
    clearUser({commit}) {
        commit("setHasLogin", false);
        commit("setId", null);
        commit("setUserName", null);
        commit("setPassWord", null);
        commit("setEmail", null);
        commit("setNickName", null);
        commit("setAccessToken", null);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

