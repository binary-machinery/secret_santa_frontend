<template>
  <div>
    <h2>{{ event.name }}</h2>
    <p>{{ event.description }}</p>

    <h3>Мои пожелания</h3>
    <div v-if="!editWishesMode">
      <p style="white-space: pre-line;">
        {{ personalData.wishes }}
      </p>
      <div>
        <button type="button"
                @click="editWishes">
          Редактировать
        </button>
      </div>
    </div>

    <div v-if="editWishesMode">
      <p>
        <textarea v-model="wishes" cols="80" rows="10"/>
      </p>
      <div>
        <button type="button"
                @click="submitEditWishes">
          Сохранить
        </button>
        <button type="button"
                @click="cancelEditWishes">
          Отмена
        </button>
      </div>
    </div>

    <h3>Получатель</h3>
    <p>{{ personalData.receiver_name }}</p>

    <h3>Пожелания получателя</h3>
    <p style="white-space: pre-line;">
      {{ personalData.receiver_wishes }}
    </p>

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
      personalData: null,
      editWishesMode: false,
      wishes: null,
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
  },
  methods: {
    editWishes() {
      this.wishes = this.personalData.wishes;
      this.editWishesMode = true;
    },
    cancelEditWishes() {
      this.wishes = null;
      this.editWishesMode = false;
    },
    submitEditWishes() {
      Axios.post(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/save-wishes',
          { wishes: this.wishes },
          { withCredentials: true })
          .then(() => {
            return Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/personal-data',
                { withCredentials: true });
          })
          .then(response => {
            this.personalData = response.data;
          })
          .finally(() => {
            this.editWishesMode = false;
          });
    }
  }
}
</script>

<style scoped>

</style>