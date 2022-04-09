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
  <div id="top-photos">
    <el-image v-for="url in urls" :src="url" :key="url" id="top-photo"></el-image>
  </div>
</template>

<style scoped>
#top-photos {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
}

#top-photo {
  width: 100px;
  height: 100px;
}

</style>
