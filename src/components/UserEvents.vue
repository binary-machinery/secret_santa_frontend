<template>
  <div>
    <h2>Мои праздники</h2>

    <table>
      <tr>
        <th>Название</th>
        <th>Описание</th>
        <th>Код приглашения</th>
        <th></th>
      </tr>
      <tr v-for="event in events" :key="event.id">
        <td><router-link :to="'/event/' + event.event_id">{{ event.name }}</router-link></td>
        <td>{{ event.description }}</td>
        <td>{{ event.invite_code }}</td>
        <td><router-link :to="'/event/' + event.event_id">Открыть</router-link></td>
      </tr>
    </table>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "UserEvents",
  data: function () {
    return {
      events: []
    }
  },
  mounted: function () {
    Axios.get(this.SERVER_URL + '/event/user-events', { withCredentials: true })
        .then(response => {
          this.events = response.data;
        });
  }
}
</script>

<style scoped>

</style>