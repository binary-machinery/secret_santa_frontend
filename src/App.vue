<template>
  <div id="app">
    <div>
      User: {{ $store.state.currentUser }}
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted: function () {
    this.$store.commit('setServerUrl', this.SERVER_URL);
    this.$store.dispatch('fetchCurrentUser');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px;
}
</style>
