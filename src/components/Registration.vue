<template>
  <form id="registrationForm"
        method="post"
        :action="SERVER_URL + '/registration'">
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

    <input type="submit" value="Зарегистрироваться">
  </form>
</template>

<script>
export default {
  name: "Registration",
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