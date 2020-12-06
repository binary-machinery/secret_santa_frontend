<template>
  <div>
    <h2>{{ event.name }}</h2>
    <div v-if="!editEventModel">
      <p style="white-space: pre-line;">
        {{ event.description }}
      </p>
      <div v-if="personalData.is_admin">
        <button type="button" @click="editEvent">
          Редактировать событие
        </button>
      </div>
    </div>

    <div v-if="editEventModel">
      <p>
        <input v-model="editEventModel.name">
      </p>
      <p>
        <textarea v-model="editEventModel.description" cols="80" rows="10"/>
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
    <div v-if="!editWishesModel">
      <p style="white-space: pre-line;">
        {{ personalData.wishes }}
      </p>
      <div>
        <button type="button" @click="editWishes">
          Редактировать пожелания
        </button>
      </div>
    </div>

    <div v-if="editWishesModel">
      <p>
        <textarea v-model="editWishesModel.wishes" cols="80" rows="10"/>
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
                <div v-if="!addUserConstraintModel || addUserConstraintModel.user_id !== eventUser.user_id">
                  <button type="button" @click="addUserConstraint(eventUser.user_id)">
                    Добавить
                  </button>
                </div>

                <div v-if="addUserConstraintModel && addUserConstraintModel.user_id === eventUser.user_id">
                  <div>
                    <select v-model="addUserConstraintModel.constraint_user_id">
                      <option v-for="eventUser in eventUsers" :key="eventUser.user_id"
                              :value="eventUser.user_id">
                        {{ eventUser.user_name }}
                      </option>
                    </select>
                    <button type="button" @click="submitAddUserConstraint">
                      Добавить
                    </button>
                    <button type="button" @click="cancelAddUserConstraint">
                      Отмена
                    </button>
                  </div>
                </div>
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

      editWishesModel: null,
      editEventModel: null,
      addUserConstraintModel: null,
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
      this.editEventModel = {
        name: this.event.name,
        description: this.event.description
      };
    },

    cancelEditEvent() {
      this.editEventModel = null;
    },

    submitEditEvent() {
      Axios.post(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/edit',
          this.editEventModel,
          { withCredentials: true })
          .then(() => {
            return Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId,
                { withCredentials: true });
          })
          .then(response => {
            this.event = response.data;
            this.editEventModel = null;
          });
    },

    editWishes() {
      this.editWishesModel = {
        wishes: this.personalData.wishes
      };
    },

    cancelEditWishes() {
      this.editWishesModel = null;
    },

    submitEditWishes() {
      Axios.post(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/save-wishes',
          { wishes: this.editWishesModel.wishes },
          { withCredentials: true })
          .then(() => {
            return Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/personal-data',
                { withCredentials: true });
          })
          .then(response => {
            this.personalData = response.data;
            this.editWishesModel = null;
          });
    },

    addUserConstraint(userId) {
      this.addUserConstraintModel = {
        event_id: this.$route.params.eventId,
        user_id: userId,
        constraint_user_id: null,
      };
    },

    cancelAddUserConstraint() {
      this.addUserConstraintModel = null;
    },

    submitAddUserConstraint() {
      Axios.post(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/constraints',
          this.addUserConstraintModel,
          { withCredentials: true })
          .then(() => {
            return Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/constraints',
                { withCredentials: true });
          })
          .then(response => {
            this.eventUserConstraints = response.data;
            this.addUserConstraintModel = null;
          });
    },

    deleteUserConstraint(userId, constraintUserId) {
      Axios.delete(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/constraints',
          {
            data: { user_id: userId, constraint_user_id: constraintUserId },
            withCredentials: true
          })
          .then(() => {
            return Axios.get(this.SERVER_URL + '/event/' + this.$route.params.eventId + '/constraints',
                { withCredentials: true });
          })
          .then(response => {
            this.eventUserConstraints = response.data;
          });
    },
  }
}
</script>

<style scoped>

</style>