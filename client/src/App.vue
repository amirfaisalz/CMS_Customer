<template>
  <div id="app">
    <div id="nav" class="sticky">
      <div id="Logo">
        <p>Bukalipik</p>
      </div>
      <router-link v-if="!isLogin" class="nav-name" to="/">Login</router-link>
      <router-link v-if="!isLogin" class="nav-name" to="/register">Register</router-link>
      <router-link v-if="isLogin" class="nav-name cart" to="/dashboard/cart">Cart</router-link>
      <a v-if="isLogin" @click.prevent="logout" class="nav-name" href="">
        Logout
      </a>
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#Logo {
  font-weight: bold;
  font-size: 26px;
  color: #ff6161;
  margin-right: 20px;
}

.nav-name {
  margin: 0 20px 0;
  text-decoration: none;
}

#nav {
  padding: 10px 100px 10px;
  background: white;
  display: flex;
  align-items: center;
  position: sticky;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.082);
}
#nav .cart {
  margin-left: 65vw;
}
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

#nav a {
  font-weight: bold;
  color: #909090;
}

#nav a.router-link-exact-active {
  color: #2096f3;
  border-bottom: 1px solid #2096f3;
  padding-bottom: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.5s;
}

.fade-enter-active {
  transition-delay: 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
