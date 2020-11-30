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
import Axios from "axios";

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
      var formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);
      Axios.post(this.SERVER_URL + '/login', formData, { withCredentials: true })
          .then(() => {
            return Axios.get(this.SERVER_URL + '/current-user', { withCredentials: true });
          })
          .then(response => {
            this.$store.commit('setUser', response.data);
            this.$router.push({ path: '/' });
          });
    }
  }
}
</script>

<style scoped>

</style>