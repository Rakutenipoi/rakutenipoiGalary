<script setup>
	import { reactive, computed, getCurrentInstance, ref, watch, toRef } from 'vue'
	import { useStore } from 'vuex'
	import { ElMessage } from 'element-plus'

	console.log("setup")
	const currentInstance = getCurrentInstance()
	const { $resourceApi, $authorizeApi } = currentInstance.appContext.config.globalProperties

	const store = useStore()

	const props = defineProps({
			info: Object,
			logout: Function,
	})

	const getInfo = () => {
		console.log(props.info)		
	}

</script>

<template>
<div id="user-main-profile-front">
	<el-button @click="getInfo()">用户信息</el-button>
	<el-button @click="logout()">登出</el-button>
	<div id="user-main-profile-details">
		<el-avatar></el-avatar>
		<div id="user-main-profile-info">
			<p>id: {{props.info.id}}</p>
			<p>username: {{props.info.username}}</p>
			<p>email: {{props.info.email}}</p>
			<p>role: {{props.info.role}}</p>
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
	margin: 30px;
}
#user-main-profile-info {
	margin: 20px;
}

</style>


