<template>
  <div id="app">
    <div>
      User: {{ $store.state.currentUser }}
    </div>

    <br/>

    <router-view></router-view>

    <br/>

    <div v-if="$route.path !== '/'">
      <router-link to="/">Вернуться в меню</router-link>
    </div>
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
