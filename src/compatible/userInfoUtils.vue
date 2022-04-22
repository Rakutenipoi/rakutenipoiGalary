<script>
import { useStore } from "vuex";
import { getCurrentInstance } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
    data() {
        return {
            store: () => useStore()
        }
    },

    methods: {
        //登录
      login: (form) => {
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
    


    },
}

</script>