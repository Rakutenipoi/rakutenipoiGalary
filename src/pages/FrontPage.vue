<script setup>
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { computed } from '@vue/reactivity';

const store = useStore()

const hasLogin = computed(() => store.state.user.hasLogin)

const urls = [
  'img/1.jpg',
  'img/3.jpg',
  'img/2.png',
  'img/5.png',
  'img/4.png'
]
</script>

<template>
  <div id="top-photos-container">
    <el-image v-for="url in urls" :src="url" :key="url" id="top-photo"></el-image>
  </div>
</template>

<style scoped>
#top-photos-container {
  position: relative;
  left: 125px;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start; 
  padding: 10px;
}

#top-photo {
  /* box-sizing: border-box; */
  padding: 10px;
  width: 200px;
  height: 200px;
  
}

</style>







