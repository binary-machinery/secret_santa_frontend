<template>
  <div>
    <h2>{{ event.name }}</h2>
    <p>{{ event.description }}</p>
    <h3>Участники</h3>
    <table>
      <tr v-for="eventUser in eventUsers" :key="eventUser.user_id">
        <td>
          <span>{{ eventUser.user_name }}</span>
          <span v-if="eventUser.is_admin"> (организатор)</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Event",
  data: function () {
    return {
      event: null,
      eventUsers: []
    }
  },
  mounted: function () {
    Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId, { withCredentials: true })
        .then(response => {
          this.event = response.data;
        });
    Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/users', { withCredentials: true })
        .then(response => {
          this.eventUsers = response.data;
        })
  }
}
</script>

<style scoped>

</style>