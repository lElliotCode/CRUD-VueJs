<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/products">Product List</router-link> |
    <router-link to="/orders">Order List</router-link> |
    <router-link to="/create-order">Create Order</router-link>
  </nav>
  <router-view />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import MyComponent from './components/MyComponent.vue'

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
