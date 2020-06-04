<template>
  <div class="dashboard">
    <transition name="view">
      <router-view />
    </transition>
    <Notif class="notif" />
    <Error class="error" />
  </div>
</template>

<script>
import Error from "../components/Error";
import Notif from "../components/Notif";
export default {
  name: "Dashboard",
  components: {
    Error,
    Notif
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("SET_LOGIN", false);
      this.$router.push("/");
    }
  },
  created() {
    if (localStorage.token) {
      this.$store.commit("SET_LOGIN", true);
      this.$store.commit("CHANGE_USERLOGIN", {
        role: localStorage.getItem("userRole"),
        image_url: localStorage.getItem("userImage"),
        name: localStorage.getItem("userName")
      });
    } else {
      this.$store.commit("SET_LOGIN", false);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.navGroup {
  display: flex;
  justify-content: flex-end;
}
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
.adminNavbar {
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  background: linear-gradient(
    90deg,
    rgba(97, 100, 255, 0.082) 0%,
    rgba(0, 212, 255, 0) 100%
  );
  /* box-shadow: inset 10px 0 60px rgba(255, 0, 0, 0.267); */
  width: 15%;
  height: 100vh;
  border-radius: 20px;
}
.profile {
  width: 100%;
  padding-top: 30px;
}
.image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #2096f3;
  padding: 3px;
}
.name {
  margin-top: 15px;
  font-weight: bold;
  font-size: 20px;
}
.role {
  font-size: 16px;
  margin-bottom: 20%;
}
.link {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}

.link a.router-link-exact-active {
  color: #2096f3;
}
.navLink {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10%;
  cursor: pointer;
  height: 40px;
}
.navLink p {
  font-size: 16px;
  font-weight: bold;
  margin-left: 20px;
  color: #909090;
}
.fas {
  font-size: 16px;
  color: #909090;
}
.product:hover,
.product:active {
  background: #f5f6fa;
}
.user:hover,
.user:active {
  background: #f5f6fa;
}
.logout {
  margin-left: 10%;
  width: 80%;
  padding-left: 8%;
}
.logout:hover,
.logout:active {
  background: #f5f6fa;
}
.navLink p:hover,
.navlink p:active {
  color: #2096f3;
}
.fas:active,
.fas:hover {
  color: #2096f3;
}
.notif,
.error {
  margin-left: -45vw;
  margin-top: 6vh;
}
</style>
