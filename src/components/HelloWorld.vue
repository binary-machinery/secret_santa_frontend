<template>
  <div class="hello">
    <h1>Тайный Санта</h1>
    <ul>
      <li>
        <router-link to="/login">Войти</router-link>
      </li>
      <li>
        <router-link to="/registration">Зарегистрироваться</router-link>
      </li>
      <li>
        <button type="button"
                @click="ping">
          Ping
        </button>
      </li>
      <li>
        <button type="button"
                @click="pingCred">
          Ping cred
        </button>
      </li>
      <li>
        <button type="button"
                @click="pingPost">
          Ping Post
        </button>
      </li>
      <li>
        <button type="button"
                @click="pingPostCred">
          Ping Post Cred
        </button>
      </li>
      <li>
        <form :action="SERVER_URL + '/ping'"
              method="post">
          <button type="submit">
            Ping Post Submit
          </button>
        </form>
      </li>
      <li>
        <button type="button"
                @click="loginTest">
          Login Test
        </button>
      </li>
      <li>
        <button type="button"
                @click="logout">
          Logout
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: 'HelloWorld',
  methods: {
    ping: function () {
      Axios.get(this.SERVER_URL + '/ping');
    },
    pingCred: function () {
      Axios.get(this.SERVER_URL + '/ping', { withCredentials: true });
    },
    pingPost: function () {
      Axios.post(this.SERVER_URL + '/ping', {});
    },
    pingPostCred: function () {
      Axios.post(this.SERVER_URL + '/ping', {}, { withCredentials: true });
    },
    loginTest: function () {
      Axios.get(this.SERVER_URL + '/login-test', { withCredentials: true });
    },
    logout: function () {
      Axios.post(this.SERVER_URL + '/logout', {}, { withCredentials: true });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
