<template>
<h1>Epi-Use Technical Assesment</h1>
  <nav>
    <router-link to="/">Create User</router-link> |
    <router-link to="/search">Search User</router-link> |
    <router-link to="/update">Update User</router-link> |
    <router-link to="/delete">Delete User</router-link>
  </nav>
  <router-view/>
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

.page{
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

}
</style>
