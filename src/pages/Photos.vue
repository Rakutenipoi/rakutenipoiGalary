<script setup>
const urls = [
  'img/1.jpg',
  'img/3.jpg',
  'img/2.png',
  'img/5.png',
  'img/4.png',
]
</script>

<template>
  <div id="top-photos-container">
    <div id="top-photos">
      <el-image v-for="url in urls" :src="url" :key="url" id="top-photo"></el-image>
    </div>
  </div>
</template>

<style scoped>
#top-photos-container {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  
}

#top-photos-container > div {
  box-sizing: border-box;
  max-width: 200px;
  padding: 10px;
  flex: 15%;
}

#top-photo {
  width: 10px;
  height: 100px;
}

</style>
