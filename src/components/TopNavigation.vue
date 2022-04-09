<script setup>
import { ref, getCurrentInstance, computed } from 'vue'
import { useStore } from 'vuex'

const activeIndex = ref('/')
const hasLogin = ref(false)
const avatar = ref(false)
const currentInstance = getCurrentInstance()
const { $resourceApi, $authorizeApi } = currentInstance.appContext.config.globalProperties
const store = useStore()

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}

</script>

<template>
  <div id="top-nav">
    <el-menu :default-active="activeIndex" mode="vertical" id="top-nav-menu" @open="handleOpen">
      <h1 style="text-align: center;">桐 牲 晦</h1>

      <router-link to="/" id="top-nav-front-link">
        <el-menu-item index="front" id="top-nav-front">首页</el-menu-item>
      </router-link>

      <el-sub-menu index="browse" id="top-nav-browse">
        <template #title>浏览</template>
        <router-link to="/browse/collection" id="top-nav-browse-collection-link">
          <el-menu-item index="browse/collection">图集</el-menu-item>
        </router-link>

        <router-link to="/browse/favorite" id="top-nav-browse-favorite-link">
          <el-menu-item index="browse/favorite">收藏</el-menu-item>
        </router-link>
      </el-sub-menu>

      <router-link to="/user" id="top-nav-user-link">
        <el-menu-item index="user" id="top-nav-user">个人</el-menu-item>
      </router-link>

      <router-link to="/upload" id="top-nav-upload-link">
        <el-menu-item index="upload" id="opt-nav-upload">上传</el-menu-item>
      </router-link>

    </el-menu>
  </div>
</template>



<style scoped>
#top-nav {
  display: flex;
  flex-direction: column;
  width: 125px;
  height: 100%;
  position: fixed;
  z-index: 5;
}

#top-nav-menu {
  height: 100%;
  overflow: hidden;
}

#top-nav-front-link {
  text-decoration: none;
  color:black;
}

#top-nav-browse-collection-link {
  text-decoration: none;
  color:black;
}

#top-nav-browse-favorite-link {
  text-decoration: none;
  color:black;
}

#top-nav-user-link {
  text-decoration: none;
  color:black;
}

#top-nav-upload-link {
  text-decoration: none;
  color:black;
}

</style>





