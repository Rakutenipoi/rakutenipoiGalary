<script>
import { useStore } from 'vuex'
import { getCurrentInstance, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import Tag from "../../components/Tag.vue"

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

    const getAllCollection = () => {
      $authorizeApi.get('collection/get/all_collection')
        .then(res => {
          if (res.data['code'] == 200) {
            console.log(res)
            collectionList.value = res.data['collection']
            console.log(collectionList)
          } else {
            ElMessage.error('图集获取失败')
          }
        })
    }

    return {
      hasLogin,
      getAllCollection,
      collectionList,
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
    <div id="collection-content" v-if="hasLogin">
      <div class="collection" v-for="collection in collectionList">
        <ul>
          <li>id: {{collection.id}}</li>
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
  width: 100%;
}

#collection-tag {
  position: relative;
  left: 125px;
  padding: 20px;
}

#collection-content {
  position: relative;
  left: 125px;
  width: 90%;
  max-width: 85%;
  padding: 20px;
  padding-left: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#collection {
  
}

ul {
  background: white;
  list-style-type: none;
  margin: 10px;
  text-align: center;
  padding: 20px;
  border-radius: 6px;
  width: 200px;
  height: 250px;
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