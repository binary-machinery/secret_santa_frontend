<template>
  <div>
    <h2>{{ event.name }}</h2>
    <div v-if="!editEventMode">
      <p style="white-space: pre-line;">
        {{ event.description }}
      </p>
      <div v-if="personalData.is_admin">
        <button type="button" @click="editEvent">
          Редактировать событие
        </button>
      </div>
    </div>

    <div v-if="editEventMode">
      <p>
        <input v-model="eventName">
      </p>
      <p>
        <textarea v-model="eventDescription" cols="80" rows="10"/>
      </p>
      <div>
        <button type="button" @click="submitEditEvent">
          Сохранить
        </button>
        <button type="button" @click="cancelEditEvent">
          Отмена
        </button>
      </div>
    </div>

    <h3>Мои пожелания</h3>
    <div v-if="!editWishesMode">
      <p style="white-space: pre-line;">
        {{ personalData.wishes }}
      </p>
      <div>
        <button type="button" @click="editWishes">
          Редактировать пожелания
        </button>
      </div>
    </div>

    <div v-if="editWishesMode">
      <p>
        <textarea v-model="wishes" cols="80" rows="10"/>
      </p>
      <div>
        <button type="button" @click="submitEditWishes">
          Сохранить
        </button>
        <button type="button" @click="cancelEditWishes">
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
      <tr>
        <th>Имя</th>
        <th v-if="personalData.is_admin">Ограничения</th>
      </tr>

      <tr v-for="eventUser in eventUsers" :key="eventUser.user_id">
        <td>
          <span>{{ eventUser.user_name }}</span>
          <span v-if="eventUser.is_admin"> (организатор)</span>
        </td>

        <td v-if="personalData.is_admin">
          <table>
            <tr v-for="constraint in eventUserConstraints[eventUser.user_id]" :key="constraint.constraint_user_id">
              <td>
                {{ getUserName(constraint.constraint_user_id) }}
                <button type="button" @click="deleteUserConstraint(eventUser.user_id, constraint.constraint_user_id)">
                  Удалить
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button type="button" @click="addUserConstraint">
                  Добавить
                </button>
              </td>
            </tr>
          </table>
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
      event: {},
      eventUsers: [],
      eventUserConstraints: {},
      personalData: {},

      editWishesMode: false,
      wishes: null,

      editEventMode: false,
      eventName: null,
      eventDescription: null,
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
          if (this.personalData.is_admin) {
            return Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/constraints',
                { withCredentials: true });
          }
        })
        .then(response => {
          this.eventUserConstraints = response.data;
        });
  },
  methods: {
    getUserName(userId) {
      const found = this.eventUsers.find(e => e.user_id === userId);
      return found ? found.user_name : '';
    },

    editEvent() {
      this.eventName = this.event.name;
      this.eventDescription = this.event.description;
      this.editEventMode = true;
    },

    cancelEditEvent() {
      this.eventName = null;
      this.eventDescription = null;
      this.editEventMode = false;
    },

    submitEditEvent() {
      Axios.post(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/edit',
          { name: this.eventName, description: this.eventDescription },
          { withCredentials: true })
          .then(() => {
            this.event.name = null;
            this.event.description = null;
            return Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId,
                { withCredentials: true });
          })
          .then(response => {
            this.event = response.data;
          })
          .finally(() => {
            this.editEventMode = false;
          });
    },

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
            this.wishes = null;
            return Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/personal-data',
                { withCredentials: true });
          })
          .then(response => {
            this.personalData = response.data;
          })
          .finally(() => {
            this.editWishesMode = false;
          });
    },

    addUserConstraint(userId, constraintUserId) {
      Axios.post(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/constraints',
          { user_id: userId, constraint_user_id: constraintUserId },
          { withCredentials: true })
          .then(() => {
            this.eventUserConstraints[userId] = {
              event_id: this.$route.params.eventId,
              user_id: userId,
              constraint_user_id: constraintUserId
            };
          });
    },

    deleteUserConstraint(userId, constraintUserId) {
      Axios.delete(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/constraints',
          {
            data: { user_id: userId, constraint_user_id: constraintUserId },
            withCredentials: true
          })
          .then(() => {
            delete this.eventUserConstraints[userId];
          });
    },
  }
}
</script>

<style scoped>

</style>