<script setup>
import TopNavigation from './components/TopNavigation.vue';

</script>

<template>
  <div id="app-div">
    <el-container direction="horizontal" style="height: 100%;width: 100%;">
      <TopNavigation></TopNavigation>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color:aliceblue;
}

.content-box {
  box-sizing: content-box;
}

.border-box {
  box-sizing: border-box;
}

#app-div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
}

</style>
