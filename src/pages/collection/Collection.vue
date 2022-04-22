<script>
import { useStore } from 'vuex'
import { getCurrentInstance, ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Tag from "../../components/Tag.vue"
import Login from "../user/Login.vue"

export default {
  components: {
    Tag,
  },

  setup(props) {
    const currentInstance = getCurrentInstance()
    const { $resourceApi, $authorizeApi } = currentInstance.appContext.config.globalProperties

    const store = useStore()

    const hasLogin = computed(() => store.state.user.hasLogin)
    const collectionList = ref([])
    const toDeleteCollection = ref(false)

    const getAllCollection = () => {
      $authorizeApi.get('collection/get/all_collection')
        .then(res => {
          if (res.data['code'] == 200) {
            collectionList.value = res.data['collection']
          } else {
            ElMessage.error('图集获取失败')
          }
        })
    }

    //创建图集
    const createCollection = () => {
      ElMessageBox.prompt('图集名称', '创建图集', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      }).then(value => {
        if (value.value == null || value.value == '') 
          ElMessage.error('图集名称不能为空')
        else {
          $authorizeApi.post('collection/create', null, {
            params: {
              name: value.value,
            }
          }).then(res => {
            if (res.data['code'] == 200) {
              ElMessage.success('创建图集成功')
              getAllCollection()
            } else {
              ElMessage.error('创建图集失败')
            }
          })
        }
      })
    }

    // 删除图集
    const deleteCollection = (tagName) => {
      $authorizeApi.post('collection/delete', null, {
				params: {
          token: store.getters['user/getAccessToken'],
					name: tagName,
				}
			}).then(res => {
				if (res.data['code'] == 200) {
					ElMessage({
						message: '删除成功',
						type: 'success',
						duration: 1000,
					})
					getAllCollection()
				} else {
					ElMessage({
						message: '删除图集失败',
						type: 'error',
						duration: 1000,
					})
				}
			}).catch(err => ElMessage.error("error " + err))
    }

    //打开图集详情
    const openCollection = () => {
      console.log('open collection')
    }

    return {
      hasLogin,
      toDeleteCollection,
      collectionList,
      getAllCollection,
      createCollection,
      deleteCollection,
      openCollection,
    }
  },

  created() {
  },

  mounted() {
    this.getAllCollection()
  },

}
</script>

<template>
  <div id="collection-contrainer">
    <Tag v-if="hasLogin" id="collection-tag"></Tag>
    <div v-if="hasLogin" id="collection-button">
      <el-button @click="createCollection">创建图集</el-button>
      <el-button @click="toDeleteCollection = !toDeleteCollection">删除图集</el-button>
    </div>
    <div id="collection-content" v-if="hasLogin">
      <div id="collection" v-for="collection in collectionList">
        <el-icon v-if="toDeleteCollection" id="collection-content-delete" @click="deleteCollection(collection.name)">
          <circle-close-filled />
        </el-icon>

        <ul @click="openCollection()">
          <li></li>
          <li>name: {{collection.name}}</li>
          <li>images: {{collection.images}}</li>
          <li>tags: {{collection.tags}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
#collection-contrainer {
  position: relative;
  left: 125px;
  max-width: 85%;
}

#collection-tag {
  position: relative;
  /* left: 125px; */
  padding: 20px;
  padding-bottom: 5px;
  max-width: 800px;
  z-index: 6;
}

#collection-button {
  padding: 20px;
  padding-top: 10px;
  float: left;
}

#collection-content {
  position: relative;
  /* left: 125px; */
  top: 0px;
  width: 100%;
  padding: 20px;
  padding-left: 40px;
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#collection {
  position: relative;
}

#collection-content-delete {
  position: absolute;
	color: rgba(203, 39, 39, 0.7);
	top: 10px;
	right: 10px;
  font-size: 20px;
}

#collection-content-delete:hover {
  color: rgb(151, 29, 29);
}

ul {
  background: white;
  list-style-type: none;
  margin: 10px;
  text-align: center;
  padding: 20px;
  border-radius: 6px;
  width: 250px;
  height: 300px;
  box-shadow: 3px 5px 10px gray;
  cursor: pointer;
}

ul:hover {
  background: #f7f7f7;
  box-shadow: 3px 3px 5px rgb(119, 118, 118);
}

li {
  padding: 5px;
}

</style>