<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div class="link">
    <router-link class="router" v-for="i in routers" :to="i.path">{{
      i.meta.title
    }}</router-link>
  </div>
  <br />
  <div>
    <router-view></router-view>
  </div>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { routes } from "./router";
export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    const routers = routes;
    return {
      routers,
    };
  },
});
</script>

<style>
#app {
    max-width: 800px;
    margin-top: 60px;

    text-align: center;

    color: #2c3e50;

    font-family: Avenir, Helvetica, Arial, sans-serif;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.router {
    margin: 10px;
}

.link {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>
