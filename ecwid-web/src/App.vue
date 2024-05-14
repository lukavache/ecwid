<template>
  <div id="app" class="app">
    <div class="app-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

#app {
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  background: #eceff1;
}

.app-wrapper{
  padding: 2rem;
}
</style>

