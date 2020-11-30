<template>
  <div>
    <table>
      <tr>
        <th>Email</th>
        <td>
          <input type="email"
                 name="email"
                 v-model="email">
        </td>
      </tr>

      <tr>
        <th>Пароль</th>
        <td>
          <input type="password"
                 name="password"
                 v-model="password">
        </td>
      </tr>
    </table>

    <button type="button"
            @click="submitLogin">
      Войти
    </button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    submitLogin: function () {
      this.$store.dispatch('login', { email: this.email, password: this.password })
          .then(() => {
            this.$router.push({ path: '/' });
          });
    }
  }
}
</script>

<style scoped>

</style>