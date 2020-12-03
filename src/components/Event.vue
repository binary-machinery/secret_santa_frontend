<template>
  <div>
    <h2>{{ event.name }}</h2>
    <p>{{ event.description }}</p>

    <h3>Мои пожелания</h3>
    <p>{{ personalData.wishes }}</p>

    <h3>Получатель</h3>
    <p>{{ personalData.receiver_name }}</p>
    <p>{{ personalData.receiver_wishes }}</p>

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
      eventUsers: [],
      personalData: null
    }
  },
  mounted: function () {
    Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId,
        { withCredentials: true })
        .then(response => {
          this.event = response.data;
        });

    Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/users',
        { withCredentials: true })
        .then(response => {
          this.eventUsers = response.data;
        });

    Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/personal-data',
        { withCredentials: true })
        .then(response => {
          this.personalData = response.data;
        });
  }
}
</script>

<style scoped>

</style>