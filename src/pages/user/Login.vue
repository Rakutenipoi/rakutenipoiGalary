<script lang="ts">
  import { reactive, computed, getCurrentInstance, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import { ElMessage } from 'element-plus'
  import UserFrontPage from '../user/UserFrontPage.vue'

  export default {
    components: {
      UserFrontPage
    },
    setup(props) {
      const currentInstance = getCurrentInstance()
      const { $resourceApi, $authorizeApi } = currentInstance.appContext.config.globalProperties

      const store = useStore()

      const tokenHeader = computed(() => {
        return {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      })

      const hasLogin = computed(() => store.state.user.hasLogin)
      watch(hasLogin, (newVal, oldVal) => {
        if (newVal == false)
          store.commit('user/setNeedLogin', true)
      }, {immediate: true, deep: true})

      const toRegister = ref(false)
      watch(toRegister, (newVal, oldVal) => {
        form.email = '',
        form.password = '',
        form.username = '',
        form.verifypassword = ''
      })

      // 登录表单
      const form = reactive({
        username: '',
        password: '',
        verifypassword: '',
        email: '',
      })

      //登录
      const login = () => {
        $authorizeApi.post('user/login', null, {
          params: {
            username: form.username,
            password: form.password
          }
        })
        .then(res => {
          if (res.data['code'] == 200) {
            store.commit('user/setHasLogin', true)
            store.commit('user/setAccessToken', res.data['access_token'])
            localStorage.setItem('token', res.data['access_token'])
            ElMessage.success('欢迎回来，' + form.username)
            getUserInfo()
          } else {
            ElMessage.error('登录失败')
          }
        }).catch(err => {
          console.log(err)
        })
      }

      const logout = () => {
        $authorizeApi.get('user/logout')
        .then(res => {
          console.log("logout: " + res)
          if (res.data['code'] == 200) {
            localStorage.removeItem('token')
            store.dispatch('user/clearUser')
            ElMessage({
              message: '登出成功',
              type: 'success',
            })
          } else {
            ElMessage.error('登出失败')
          }
        })
      }

      const register = () => {
        if (form.password == form.verifypassword) {
          $authorizeApi.post('user/register', null, {
            params: {
              username: form.username,
              password: form.password,
              email: form.email
            }
          }).then(res => {
            if (res.data['code'] == 200) {
              ElMessage.success('注册成功')
              toRegister.value = false
            } else {
              ElMessage.error('注册失败，请稍后重试')
            }
          }).catch(err => {
            ElMessage.error('注册失败，请稍后重试')
            console.log(err)
          })
        } else {
          ElMessage({
            message: '请保证两次输入的密码相同',
            type: 'error',
            center: true,
            duration: 1000
          })
        }
      }

      // 获取用户信息
      const getUserInfo = () => {
        $authorizeApi.get('user/info')
        .then(res => {
          if (res.data['code'] == 200) {
            store.commit('user/setUserName', res.data.user['username'])
            store.commit('user/setEmail', res.data.user['email'])
            store.commit('user/setRole', res.data.user['role'])
            store.commit('user/setId', res.data.user['id'])
            store.commit('user/setNickName', res.data.user['nickname'])
          } else {
            ElMessage.error('获取用户信息失败')
          }
        })
      }

      // 验证登录状态有效性
      const verifyToken = () => {
        $authorizeApi.post('user/verify/active', null, {
          params: {
            token: store.getters['user/getAccessToken'],
          }
        }).then(res => {
          if (res.data['code'] != 200) {
            localStorage.removeItem('token')
            store.dispatch('user/clearUser')
            ElMessage({
              message: '登录状态过期，请重新登录',
              type: 'error',
              onClose: autoFreshPage,
            })
          }
        })
      }

      // 自动刷新网页
      const autoFreshPage = () => {
        location.reload()
      }

      return {
        hasLogin,
        toRegister,
        form,
        getUserInfo,
        login,
        logout,
        register,
        verifyToken,
      }
    },
  }
</script>


<template>
  <el-container id="user-container" >
    <el-header height="30%" id="user-header">测试用header</el-header>
    <el-main id="user-main">
      <div id="user-main-profile" v-if="hasLogin">
        <!-- 用户界面 -->
        <UserFrontPage :logout="logout" :getUserInfo="getUserInfo" :verifyToken="verifyToken"></UserFrontPage>
      </div>

      
      <!-- 登录 -->
      <div id="user-main-login" v-else>
        <el-row id="user-main-login-back">
          <el-button id="user-main-login-back-button" v-if="toRegister" @click="toRegister=false">返回</el-button>
        </el-row>
        
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
          <div id="user-main-register" v-if="toRegister" type="password">
            <el-form-item label="再次输入密码" >
              <el-input v-model="form.verifypassword" type="password" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" />
            </el-form-item>
          </div>
        </el-form>

        <el-row id="user-main-button">
          <div id="user-main-register-button" v-if="toRegister">
            <el-button @click="register">确认</el-button>
          </div>
          <div id="user-main-login-button" v-else>
            <el-button @click="login">登录</el-button>
            <el-button @click="toRegister=true">注册</el-button>
          </div>
        </el-row>
      </div>

    </el-main>
  </el-container>
</template>

<style scoped>
/* #user-container {
  position: relative;
  left: 125px;
  height: 100%;
} */

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
  height: 100%;
  width: 35%;
  left: 35%;
}

#user-main-login-form {
  position: relative;
  padding: 20px;
  padding-top: 10px;
  max-width: 300px;
  width: 65%;
  left: 15%;
}

#user-main-button {
  position: relative;
  left: 35%;
  margin: 20px;
}

#user-main-login-back {
  padding: 20px;
  padding-left: 30px;
  padding-bottom: 10px;
}

#user-main-profile {
  width: inherit;
}

</style>