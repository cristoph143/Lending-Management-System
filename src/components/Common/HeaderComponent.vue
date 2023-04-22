<template>
  <header>
    <nav class="nav-desktop">
      <div class="logo-company">
        <img src="/path/to/logo.png" alt="Logo" />
        <h1>Company Name</h1>
      </div>
      <NavLinks />
      <div class="apply-now">
        <button class="accent">Apply Now</button>
      </div>
      <div class="account">
        <button class="account-button" @click="isAccountDropdownOpen = !isAccountDropdownOpen">
          <img v-if="isAuthenticated" :src="userAvatar" :alt="userName" />
          <span v-if="isAuthenticated">{{ userName }}</span>
          <span v-else>Account</span>
          <i class="fas fa-caret-down"></i>
        </button>
        <ul class="account-dropdown" v-if="isAccountDropdownOpen">
          <li v-if="isAuthenticated"><router-link :to="{ name: 'profile' }">Profile</router-link></li>
          <li v-if="isAuthenticated"><router-link :to="{ name: 'settings' }">Settings</router-link></li>
          <li v-if="isAuthenticated"><router-link :to="{ name: 'logout' }">Logout</router-link></li>
          <li v-else-if="!isAuthenticated"><router-link :to="{ name: 'login' }">Login</router-link></li>
          <li v-else><router-link :to="{ name: 'signup' }">Signup</router-link></li>
        </ul>
      </div>
      <button class="menu-button" @click="isNavLinksOpen = !isNavLinksOpen">
        <i class="fas fa-bars"></i>
      </button>
    </nav>
    <NavLinks :is-open="isNavLinksOpen" />
    <transition name="slide">
  <nav class="mobile-menu" v-if="isSmallScreen && !isNavLinksOpen">
    <a href="/" :class="{ active: activeLink === 'home' }">Home</a>
    <a href="/about" :class="{ active: activeLink === 'about' }">About</a>
    <a href="/contact" :class="{ active: activeLink === 'contact' }">Contact</a>
    <button class="accent-button">Apply Now</button>
    <div v-if="isAuthenticated">
      <a href="/profile">{{ userName }}</a>
      <a href="/logout">Logout</a>
    </div>
    <div v-if="!isAuthenticated">
      <a href="/login">Login</a>
      <a href="/signup">Signup</a>
    </div>
  </nav>
</transition>
  </header>
</template>


<script>
import NavLinks from './NavLinks.vue';

export default {
  name: 'HeaderComponent',
  components: {
    NavLinks
  },
  data() {
    return {
      isAccountDropdownOpen: false,
      isNavLinksOpen: false,
      isDrawerOpen: false,
    isSmallScreen: false,
    }
  },
  computed: {
    isAuthenticated() {
      // Replace with your authentication logic
      return true;
    },
    userAvatar() {
      // Replace with the URL of the user's avatar
      return 'https://via.placeholder.com/32';
    },
    userName() {
      // Replace with the user's name
      return 'John Doe';
    },
    activeLink() {
 return this.$route.name;  },
  },
  mounted() {
    // Show the drawer when the screen is too small
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenWidth);
  window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenWidth() {
      this.isDrawerOpen = window.innerWidth < 768;
    },
    checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768; // adjust the max width to fit your content
  },
  },
  created() {
  window.addEventListener("resize", this.checkScreenSize);
  this.checkScreenSize();
},
  watch: {
    isNavLinksOpen(newValue) {
      if (newValue) {
        // Close the account dropdown when the NavLinks are opened
        this.isAccountDropdownOpen = false;
      }
    }
  }
}
</script>
<style src="../../assets/styles/css/header.css"></style>
