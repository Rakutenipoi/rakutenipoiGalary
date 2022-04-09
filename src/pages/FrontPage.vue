<script setup>
const urls = [
  'img/1.jpg',
  'img/3.jpg',
  'img/2.png',
  'img/5.png',
  'img/4.png'
]
</script>

<template>
  <el-main id="front-photo" >
    <el-image v-for="url in urls" :src="url" :key="url" id="top-photo"></el-image>
  </el-main>
</template>

<style scoped>

#front-photo {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  position: relative;
  left: 125px;
}

#top-photo {
  width: 150px;
  height: 150px;
  padding: 3px;
}

</style>







