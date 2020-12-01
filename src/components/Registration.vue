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

      <tr>
        <th></th>
        <td>
          <button type="button"
                  @click="submitRegistration">
            Зарегистрироваться
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Registration",
  data: function () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    submitRegistration() {
      this.$store.dispatch('register', { email: this.email, password: this.password })
          .then(() => {
            this.$router.push({ path: '/' });
          });
    }
  }
}
</script>

<style scoped>

</style>