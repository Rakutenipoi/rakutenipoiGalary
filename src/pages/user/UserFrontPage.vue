<script setup>
	import { reactive, computed, getCurrentInstance, ref, watch, toRef } from 'vue'
	import { useStore } from 'vuex'
	import { ElMessage, ElMessageBox } from 'element-plus'
	import emitter from '../../compatible/eventBus';

	const currentInstance = getCurrentInstance()
	const { $resourceApi, $authorizeApi } = currentInstance.appContext.config.globalProperties

	const store = useStore()

	const userInfo = reactive({
		id: Number,
		username: String,
		nickname: String,
		email: String,
		role: String,
	})

	const updateUserInfo = computed(() => {
		userInfo.id = store.state.user.id
		userInfo.username = store.state.user.username
		userInfo.nickname = store.state.user.nickname
		userInfo.email = store.state.user.email
		userInfo.role = store.state.user.role
	})

	const props = defineProps({
		logout: Function,
		getUserInfo: Function,
		verifyToken: Function,
	})

	const setNickName = () => {
		ElMessageBox.prompt('昵称', '设置昵称', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
		}).then(value => {
			$authorizeApi.post('user/modify/nickname', null, {
				params: {
					nickname: value.value,
				}
			}).then(res => {
				if (res.data['code'] == 200) {
					props.getUserInfo()
					ElMessage.success('昵称修改成功')
				} else {
					ElMessage.error('昵称修改失败')
					props.verifyToken()
				}
			})
		})
	}

	const ModifyPassWord = () => {
		ElMessageBox.prompt('密码', '更改密码', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
		}).then(value => {
			$authorizeApi.post('user/modify/password', null, {
				params: {
					password: value.value,
					token: store.getters['user/getAccessToken'],
				}
			}).then(res => {
				if (res.data['code'] == 200) {
					ElMessage.success('密码更改成功，请重新登录')
					store.dispatch('user/clearUser')
				} else {
					ElMessage.error('密码更改失败')
					props.verifyToken()
				}
			})
		})
	}

</script>

<template>
<div id="user-main-profile-front" :=updateUserInfo >
	<el-button @click="logout()">登出</el-button>
	<el-button @click="setNickName()">设置昵称</el-button>
	<el-button @click="ModifyPassWord()">更改密码</el-button>
	<div id="user-main-profile-details">
		<!-- <el-avatar src="../../assets/aqua.jpg"></el-avatar> -->
		<div id="user-main-profile-info">
			<p>id: {{userInfo.id}}</p>
			<p>username: {{userInfo.username}}</p>
			<p>nickname: {{userInfo.nickname}}</p>
			<p>email: {{userInfo.email}}</p>
			<p>role: {{userInfo.role}}</p>
		</div>
	</div>
</div>

</template>

<style>
#user-main-profile-front {
	position: relative;
	left: 125px;
}
#user-main-profile-details {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	margin-top: 20px;
	padding: 20px;
	background-color: white;
	border-radius: 10px;
}
#user-main-profile-info {
	padding: 20px;
	padding-left: 40px;
}

</style>


