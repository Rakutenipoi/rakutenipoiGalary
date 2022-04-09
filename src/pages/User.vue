<script setup lang="ts">
import { reactive, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

const form = reactive({
  username: '',
  password: '',
  email: '',
})

const store = useStore()
const currentInstance = getCurrentInstance()
const { $resourceApi, $authorizeApi } = currentInstance.appContext.config.globalProperties

// const getHasLogin = computed(() => store.getters.user.hasLogin)
const getHasLogin = false
const register = false

const login = () => {
  $authorizeApi.post('/login', null, {
    params: {
      username: form.username,
      password: form.password,
    }
  })
  .then(res => {
    // localStorage.getItem('token')
    // store.commit('user/addUser')
    console.log(res)
  })
}

const logout = () => {
    $authorizeApi.post('/logout', null, null)
    .then(res => {
        // localStorage.removeItem('token')
        // store.dispatch('user/clearUser')
    })
    .catch(error => console.log(error))
}

</script>

<template>
  <el-container id="user-container">
    <el-header height="30%" id="user-header">Header</el-header>
    <el-main id="user-main">
      <div id="user-main-profile" v-if="getHasLogin">
        <!-- 用户界面 -->

      </div>

      
      <!-- 登录 -->
      <div id="user-main-login" v-else>
        <el-form
          :model="form"
          label-width="100px"
          id="user-main-login-form"
        >
          <el-form-item label="用户名">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password"/>
          </el-form-item>
          <el-form-item label="邮箱" v-if="register">
            <el-input v-model="form.password" />
          </el-form-item>
        </el-form>

        <el-row id="user-main-login-button">
          <el-button @click="login">登录</el-button>
          <el-button>注册</el-button>
        </el-row>
      </div>

    </el-main>
  </el-container>
</template>

<style scoped>
#user-container {
  position: relative;
  left: 125px;
  height: 100%;
}

#user-header {
  text-align: center;
  height: 50px;
  position: sticky;
  top: 0;
  z-index: 3;
}

#user-main {
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  overflow: hidden;
}

#user-main-login {
  border-style: hidden;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 5px 5px 15px gray;
  
  position: relative;
  overflow: hidden;
  height: 65%;
  width: 35%;
  left: 25%;
}

#user-main-login-form {
  position: relative;
  margin: 20px;
  max-width: 300px;
  width: 65%;
  left: 15%;
}

#user-main-login-button {
  position: relative;
  left: 35%;
  margin: 20px;
}

</style>