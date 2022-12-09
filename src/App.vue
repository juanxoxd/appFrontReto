import { default } from './views/Login.vue';
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Login from '../src/views/Login.vue';
import { mapActions, mapGetters } from 'vuex';
import Popper from '../src/assets/js/core/popper.min.js';
import Bootstrap from '../src/assets/js/core/bootstrap.min.js';
import Perfect from '../src/assets/js/plugins/perfect-scrollbar.min.js';
import Smooth from '../src/assets/js/plugins/smooth-scrollbar.min.js';
import CssCode from '../src/assets/css/argon-dashboard.css?v=2.0.4';
export default {
  components: {
    Login
  },
  data() {
    return {

    }
  },
  created() {
    this.readToken();
  },
  methods: {
    ...mapActions(['closeSession', 'readToken']),
  },
  computed: {
    ...mapGetters(['isActive'])
  }
}
</script>

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
