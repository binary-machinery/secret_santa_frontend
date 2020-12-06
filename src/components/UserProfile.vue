<template>
  <div>
    <table>
      <tr>
        <th>Email</th>
        <td>
          <input type="text"
                 v-model="email">
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
    }
  }
}
</script>

<style scoped>

</style>