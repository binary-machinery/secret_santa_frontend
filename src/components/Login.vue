<template>
  <form id="loginForm"
        method="post"
        :action="SERVER_URL + '/login'">
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

    <input type="submit" value="Войти">
  </form>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      email: null,
      password: null
    }
  }
}
</script>

<style scoped>

</style>