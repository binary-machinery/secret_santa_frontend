<template>
  <div>
    <table>
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
  name: "EditProfile",
  data: function () {
    return {
      name: ""
    }
  },
  mounted: function () {
    if (this.$store.state.currentUser) {
      this.name = this.$store.state.currentUser.name;
    }
    this.$store.watch(
        state => state.currentUser,
        (value) => this.name = value ? value.name : ""
    );
  },
  methods: {
    saveChanges() {
      Axios.post(this.SERVER_URL + '/save-profile', { name: this.name }, { withCredentials: true })
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