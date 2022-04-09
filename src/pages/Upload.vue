<script setup>
import { reactive, computed, getCurrentInstance } from 'vue'
const currentInstance = getCurrentInstance()
const { $resourceApi, $authorizeApi } = currentInstance.appContext.config.globalProperties

const getTest = () => {
  $authorizeApi.get('/get/abd').then(res => console.log(res))
}
</script>

<template>
  <el-container id="account-container">
    <el-header height="30%" id="account-header">Header</el-header>
    <el-main id="account-main">
      <el-button @click="getTest">upload</el-button>
    </el-main>
  </el-container>
</template>

<style scoped>
#account-container {
  position: relative;
  left: 125px;
}

#account-header {
  text-align: center;
}

#account-main {
  display: flex;
  flex-flow: row nowrap;
}

</style>