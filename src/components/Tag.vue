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
		const toDeleteTag = ref(false)

		const getAllTags = () => {
			$authorizeApi.get('tag/get/all_tags')
			.then(res => {
				console.log(res)
				if (res.data['code'] = 200) {
					tagList.value = res.data['tags']
				} else {
					ElMessage.error('获取所有标签失败')
				}
			})
		}

		const openTagList = () => {
			if (showTags.value == false)
				getAllTags()
			showTags.value = !showTags.value
		}		

		const createTag = () => {
			ElMessageBox.prompt('输入新标签的名称(输入\“名称 分类\”可以快速添加分类)', '创建新标签', {
				confirmButtonText: '确认',
    		cancelButtonText: '取消',
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

		const deleteTag = (tagName) => {
			$authorizeApi.post('tag/delete', null, {
				params: {
					name: tagName,
				}
			}).then(res => {
				if (res.data['code'] == 200) {
					ElMessage({
						message: '删除成功',
						type: 'success',
						duration: 1000,
					})
					getAllTags()
				} else {
					ElMessage({
						message: '删除标签失败',
						type: 'error',
						duration: 1000,
					})
				}
			}).catch(err => ElMessage.error("error " + err))
		}

		const closeTagPanel = () => {
			showTags.value = false
			toDeleteTag.value = false
		}

		// 修改标签所属
		const modifyBelongs = (tag) => {
			ElMessageBox.prompt('标签所属详情', '修改标签所属', {
				confirmButtonText: '确认',
    		cancelButtonText: '取消',
				inputValue: tag.belongs,
			}).then(value => {
				if (value.value == null || value.value == '') {
					$authorizeApi.post('tag/delete/belongs', null, {
						params: {
							name: tag.name,
						}
					}).then(res => {
						if (res.data['code'] == 200) {
							ElMessage.success('所属删除成功')
							getAllTags()
						} else {
							ElMessage.error('所属删除失败')
						}
					})
				} else {
					$authorizeApi.post('tag/add/belongs', null, {
						params: {
							name: tag.name,
							belongs: value.value,
						}
					}).then(res => {
						if (res.data['code'] == 200) {
							ElMessage.success('所属修改成功')
							getAllTags()
						} else {
							ElMessage.error('所属修改失败')
						}
					})
				}
			})
		}

		const modifyBelongsInputValidator = (value) => {
			return value == '' || value.trim(' ')
		}

		return {
			openTagList,
			createTag,
			deleteTag,
			closeTagPanel,
			modifyBelongs,
			showTags,
			tagList,
			toDeleteTag,
		}
	},

	mounted() {
		
	},
}
</script>

<template>
	<div id="tag">
		<el-button @click="openTagList" id="tag-label">标签</el-button>
		<div v-if="showTags" id="tag-panel">
			<el-button @click="closeTagPanel">关闭</el-button>
			<el-button @click="createTag">添加标签</el-button>
			<el-button @click="toDeleteTag = !toDeleteTag">删除标签</el-button>
			<div id="tag-panel-items">
				<div v-for="tag in tagList" id="tag-panel-item" @click="toDeleteTag? '': modifyBelongs(tag)"> 
					<el-icon v-if="toDeleteTag" id="tag-panel-item-delete" @click="deleteTag(tag.name)"><circle-close-filled /></el-icon>
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

#tag-label {
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
	position: relative;
	font-size: small;
	text-align: center;
	padding: 8px;
	max-width: 150px;
	border-radius: 6px;
	background-color:blanchedalmond;
	margin: 5px;
}

#tag-panel-item:not(el-icon):hover {
	background-color:  rgb(240, 220, 191);
	cursor: pointer;
}



#tag-panel-item-delete {
	position: absolute;
	color: rgba(203, 39, 39, 0.7);
	top: 0;
	right: 0;
}

#tag-panel-item-delete:hover {
	color: rgb(151, 29, 29);
}

p {
	margin: 0;
	padding: 0px 2px;
}

</style>


