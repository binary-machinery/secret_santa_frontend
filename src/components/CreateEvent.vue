<template>
  <div>
    <table>
      <tr>
        <th>Название</th>
        <td>
          <input type="text"
                 v-model="name">
        </td>
      </tr>

      <tr>
        <th>Описание</th>
        <td>
          <textarea v-model="description" cols="80" rows="10"/>
        </td>
      </tr>

      <tr>
        <th></th>
        <td>
          <button type="button"
                  @click="submitEvent">
            Создать
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "CreateEvent",
  data: function () {
    return {
      name: null,
      description: null
    }
  },
  methods: {
    submitEvent() {
      Axios.post(this.SERVER_URL + '/event/create',
          { name: this.name, description: this.description },
          { withCredentials: true })
          .then(() => {
            // TODO: show result
            this.$router.push({ path: '/' });
          });
    }
  }
}
</script>

<style scoped>

</style>