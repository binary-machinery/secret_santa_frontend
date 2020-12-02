<template>
  <div>
    <table>
      <tr>
        <th>Код приглашения</th>
        <td>
          <input type="text"
                 v-model="invite_code">
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
      invite_code: null
    }
  },
  methods: {
    joinEvent() {
      Axios.post(this.SERVER_URL + '/join-event',
          { invite_code: this.invite_code },
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