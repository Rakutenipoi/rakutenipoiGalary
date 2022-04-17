<script setup>
import { ref } from 'vue'

const activeIndex = ref('/')

const isCollapse = ref(true)

</script>

<template>
  <div id="top-nav">
    <!-- <el-radio-group v-model="isCollapse" id="top-nav-collapse">
      <el-radio-button :label="false">expand</el-radio-button>
      <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group> -->
    <el-menu :default-active="activeIndex" mode="vertical" id="top-nav-menu" :collapse="isCollapse">
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

/* #top-nav-collapse {
  position: relative;
  left: 125px;
} */

#top-nav-menu {
  height: 100%;
  width: inherit;
  overflow: hidden;
  position: fixed;
}
/* 
#top-nav-menu:not() {
  width: 0;
  height: 100%;
} */

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





