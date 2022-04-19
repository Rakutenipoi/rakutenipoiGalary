<script setup>
	import { reactive, computed, getCurrentInstance, ref, watch, toRef } from 'vue'
	import { useStore } from 'vuex'
	import { ElMessage } from 'element-plus'

	const currentInstance = getCurrentInstance()
	const { $resourceApi, $authorizeApi } = currentInstance.appContext.config.globalProperties

	const store = useStore()

	const userInfo = reactive({
		username: String,
		nickname: String,
		id: Number,
		email: String,
		role: String
	})

	const getInfo = computed(() => {
		userInfo.username = store.state.user.username
		userInfo.nickname = store.state.user.nickname
		userInfo.id = store.state.user.id
		userInfo.email = store.state.user.email
		userInfo.role = store.state.user.role
	})

	const props = defineProps({
		logout: Function,
	})

</script>

<template>
<div id="user-main-profile-front">
	<el-button @click="getInfo">用户信息</el-button>
	<el-button @click="logout()">登出</el-button>
	<div id="user-main-profile-details">
		<el-avatar src="../../assets/aqua.jpg"></el-avatar>
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


