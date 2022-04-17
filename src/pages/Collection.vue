<script setup>

</script>

<template>
  <el-container id="account-container">
    <el-header height="30%" id="account-header">Header</el-header>
    <el-main id="account-main">
      <h1>collection</h1>
    </el-main>
  </el-container>
</template>

<style scoped>
#account-container {
  position: relative;
  width: 100%;
}

#account-header {
  text-align: center;
}

#account-main {
  position: relative;
  left: 125px;
  display: flex;
  flex-flow: row nowrap;
}

</style>