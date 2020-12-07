<template>
  <div>
    <h2>Присоединиться к празднику</h2>

    <table>
      <tr>
        <th>Код приглашения</th>
        <td>
          <input type="text"
                 v-model="inviteCode">
        </td>
      </tr>
      <tr>
        <th></th>
        <td>
          <button type="button"
                  @click="joinEvent">
            Отправить
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "JoinEvent",
  data: function () {
    return {
      inviteCode: null
    }
  },
  methods: {
    joinEvent() {
      Axios.post(this.SERVER_URL + '/event/join',
          { invite_code: this.inviteCode },
          { withCredentials: true })
          .then(() => {
            // TODO: notify user
            this.$router.push({ path: '/user-events' });
          });
    }
  }
}
</script>

<style scoped>

</style>