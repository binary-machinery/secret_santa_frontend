<template>
  <div class="hello">
    <h1>Тайный Санта</h1>
    <ul>
      <li>
        <router-link to="/login">Войти</router-link>
      </li>
      <li>
        <router-link to="/registration">Зарегистрироваться</router-link>
      </li>
      <li>
        <router-link to="/edit-profile">Профиль</router-link>
      </li>
      <li>
        <router-link to="/create-event">Создать событие</router-link>
      </li>
      <li>
        <router-link to="/user-events">Мои события</router-link>
      </li>
      <li>
        <router-link to="/join-event">Присоединиться к событию</router-link>
      </li>
      <li>
        <button type="button"
                @click="logout">
          Logout
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push({ path: '/login' });
          });
    }
  }
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
