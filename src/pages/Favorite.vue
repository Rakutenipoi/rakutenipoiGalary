<script setup>

</script>

<template>
  <el-container id="account-container">
    <el-header height="30%" id="account-header">Header</el-header>
    <el-main id="account-main">
      <h1>favorite</h1>
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