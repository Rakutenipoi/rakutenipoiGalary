<script>
import { useStore } from 'vuex';
import { getCurrentInstance, reactive, computed, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
	setup(props) {
		const currentInstance = getCurrentInstance()
		const { $resourceApi, $authorizeApi } = currentInstance.appContext.config.globalProperties

		const store = useStore()
		const hasLogin = computed(() => store.state.user.hasLogin)
		const tagList = ref([])
		const showTags = ref(false)

		const getAllTags = () => {
			$authorizeApi.get('tag/get/all_tags')
			.then(res => {
				console.log(res)
				if (res.data['code'] = 200) {
					tagList.value = res.data['tags']
					console.log(tagList.value)
				} else {
					ElMessage.error('获取所有标签失败')
				}
			})
		}

		const openTagList = () => {
			getAllTags()
			showTags.value = true
		}		

		const createTag = () => {
			ElMessageBox.prompt('输入新标签的名称', '创建新标签', {
				confirmButtonText: '确认',
    		cancelButtonText: '取消',
				inputErrorMessage: '无效的标签名',
			}).then(value => {
				$authorizeApi.post('tag/create', null, {
					params: {
						name: value.value,
					}
				}).then(res => {
					console.log(res)
					if (res.data['code'] == 200) {
						ElMessage.success('创建成功')
						getAllTags()
					} else {
						ElMessage.error('创建标签失败')
					}
				}).catch(err => ElMessage.error("error " + err))
			})
		}

		

		return {
			openTagList,
			createTag,
			showTags,
			tagList,
		}
	},

	mounted() {
		
	},
}
</script>

<template>
	<div id="tag">
		<el-button @click="openTagList">标签</el-button>
		<div v-if="showTags" id="tag-panel">
			<el-button @click="showTags = false">关闭</el-button>
			<el-button @click="createTag">添加标签</el-button>
			<el-button>删除标签</el-button>
			<div id="tag-panel-items">
				<div v-for="tag in tagList" id="tag-panel-item"> 
					<p>{{tag.name}} {{tag.belongs}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
#tag {
	position: relative;
}

#tag-panel {
	position: fixed;
	z-index: 6;
	padding: 20px;
	margin: 10px;
	max-width: 800px;
	max-height: 600px;
	background: white;
	border-radius: 6px;
	box-shadow: 3px 3px 3px gray;
}

#tag-panel-items {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

#tag-panel-item {
	font-size: small;
	text-align: center;
	padding: 5px;
	max-width: 150px;
	border-radius: 6px;
	background-color:blanchedalmond;
	margin: 5px;
}

#tag-panel-item:hover {
	background-color: rgb(240, 220, 191);
	cursor: pointer;
}

p {
	margin: 0;
	padding: 0px 2px;
}

</style>


