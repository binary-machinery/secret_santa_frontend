<template>
  <div id="app">

    <h1>Тайный Санта</h1>

    <div class="user-bar">
      <hr>
      <div v-if="$store.state.currentUser">
        <span class="user-bar-element">{{ $store.state.currentUser.name }}</span>

        <button class="user-bar-element" type="button" @click="openProfile">
          Профиль
        </button>

        <button class="user-bar-element" type="button" @click="logout">
          Выйти
        </button>

        <hr>
      </div>
    </div>

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
  },
  methods: {
    openProfile() {
      this.$router.push({ path: '/user-profile' });
    },
    logout() {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push({ path: '/' });
          });
    }
  }
}
</script>

<style>
.user-bar-element {
  margin: 5px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px;
}
</style>
