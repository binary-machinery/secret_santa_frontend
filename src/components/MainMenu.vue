<template>
  <div class="hello">
    <ul>
      <li v-if="!$store.state.currentUser">
        <router-link to="/login">Войти</router-link>
      </li>
      <li v-if="!$store.state.currentUser">
        <router-link to="/registration">Зарегистрироваться</router-link>
      </li>
      <li v-if="$store.state.currentUser">
        <router-link to="/user-events">Мои праздники</router-link>
      </li>
      <li v-if="$store.state.currentUser">
        <router-link to="/join-event">Присоединиться к празднику</router-link>
      </li>
      <li v-if="$store.state.currentUser">
        <router-link to="/create-event">Создать праздник</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainMenu'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
