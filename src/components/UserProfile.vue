<template>
  <div>
    <h2>Мой профиль</h2>

    <table>
      <tr>
        <th>Email</th>
        <td>
          <input type="text"
                 v-model="email">
        </td>
        <td>
          <button type="button"
                  @click="testEmail">
            Проверить
          </button>
        </td>
      </tr>
      <tr>
        <th>Имя</th>
        <td>
          <input type="text"
                 v-model="name">
        </td>
      </tr>
      <tr>
        <th></th>
        <td>
          <button type="button"
                  @click="saveChanges">
            Сохранить
          </button>
        </td>
      </tr>
    </table>

    <p v-if="emailTestCode">
      Письмо было выслано на {{ $store.state.currentUser.email }}. Проверочный код: {{ emailTestCode }}
    </p>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "UserProfile",
  data: function () {
    return {
      email: "",
      name: "",
      emailTestCode: null
    }
  },
  mounted: function () {
    if (this.$store.state.currentUser) {
      this.email = this.$store.state.currentUser.email;
      this.name = this.$store.state.currentUser.name;
    }
    this.$store.watch(
        state => state.currentUser,
        (value) => {
          this.email = value ? value.email : "";
          this.name = value ? value.name : "";
        }
    );
  },
  methods: {
    saveChanges() {
      Axios.post(this.SERVER_URL + '/save-profile',
          { email: this.email, name: this.name },
          { withCredentials: true })
          .then(() => {
            // TODO: show success message
            this.$store.dispatch('fetchCurrentUser');
          });
    },
    testEmail() {
      Axios.post(this.SERVER_URL + '/test-email', {}, { withCredentials: true })
          .then(response => {
            this.emailTestCode = response.data;
          });
    }
  }
}
</script>

<style scoped>

</style>