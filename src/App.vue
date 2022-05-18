<template>
  <div id="app">
    <nav>
      <router-link to="/">Employees</router-link> |
      <a v-if="authToken" href="javascript:"  @click="logout" >Logout</a> 
      <router-link v-else to="/login">Login</router-link>
      <h3 v-if="currentUser"> Welcome {{ currentUser.name }} </h3>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>


<script>
import { onLogout, getToken } from './vue-apollo.js'
// import { currentUserQuery } from './graphql/queries/currentUser.gql'
import gql from 'graphql-tag'

export default {
  name: 'EmployeesList',
  data() {
    return {
      authToken: getToken(),
      currentUser: null
    }
  },
  apollo: {
    currentUser: {
      query: gql`
        query currentUser {
          currentUser {
            id
            name
          }
        }
      `,
    }
  },
  methods: {
    logout() {
      onLogout(this.$apollo.provider.defaultClient)
      this.$router.go(0);
    }
  }
}
</script>
