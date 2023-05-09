<template>
  <div class="header">
    <div class="desktop-header" v-if="!isMobile">
      <div class="logo">
        <img src="../../assets/images/logo.png" class="responsive-img desktop-logo" alt="Logo" />
        <h1>Company Name</h1>
      </div>
      <NavLinks :activeLink="activeLink" />
      <button class="apply-now accent-button">Apply Now</button>
      <div class="account desktop-account">
        <button class="account-dropdown accent-button" @click="accountMenuOpen = !accountMenuOpen">
          <span v-if="auth">
            <img class="avatar" :src="user.avatar" :alt="user.name" />
            {{ user.name }}
          </span>
          <span v-else>
            Account
          </span>
        </button>
        <div class="account-menu" :class="{ open: accountMenuOpen }">
          <div v-if="auth">
            <button>Profile</button>
            <button>Settings</button>
            <button>Logout</button>
          </div>
          <div v-else>
            <button class="accent">Login</button>
            <button>Signup</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-header"  v-if="isMobile">
      <div class="logo-container" >
  <img src="../../assets/images/logo.png" class="responsive-img" alt="Logo" @click.prevent="drawerOpen = true" />
  <div class="company-name">
    <h1>Company Name</h1>
  </div>
  <img class="hamburger responsive-img" src="../../assets/images/hamburger.png" alt="Hamburger" @click="drawerOpen = true" />
</div>
    <div class="drawer" :class="{ open: drawerOpen }" @click.self="drawerOpen = false">
    <div class="drawer-header">
      <div class="logo">
        <img src="../../assets/images/logo.png" class="responsive-img" alt="Logo" />
        <h1>Company Name</h1>
      </div>
      <button class="close-button" @click="drawerOpen = false">
  <img src="../../assets/images/icon-close.png" alt="Close icon">
</button>
    </div>
    <div class="mobile-header">
      <div class="profile-info">
        <img class="avatar" src="../../assets/images/logo.png" alt="Profile Image" />
        <div class="profile-name">
          <h4>John Doe</h4>
          <a href="#">Profile</a>
        </div>
      </div>
      <NavLinks :activeLink="activeLink" />
      <div class="account mobile-account">
        <button v-if="auth" class="accent-button" @click="logout">Logout</button>
        <button v-else class="accent-button" @click="login">Login</button>
      </div>
    </div>
    <div class="account desktop-account">
      <button v-if="auth" class="accent-button" @click="logout">Logout</button>
      <button v-else class="accent-button" @click="login">Login</button>
    </div>
  </div>

    </div>
  </div>
</template>
<script>
import NavLinks from './NavLinks.vue';

export default {
  name: 'HeaderComponent',
  components: {
    NavLinks,
  },
  data() {
    return {
      activeLink: '',
      auth: true, // Replace with your authentication state
      user: {
        name: 'John Doe', // Replace with the user's name
        avatar: '../../assets/images/logo.png', // Replace with the path to the user's avatar
      },
      drawerOpen: false,
      accountMenuOpen: false,
    isMobile: false, // default to desktop
  };
},
mounted() {
  // Check screen size on mount
  this.checkScreenSize();
  // Add event listener to check on screen resize
  window.addEventListener('resize', this.checkScreenSize);
},
beforeUnmount() {
  // Remove event listener on component destroy
  window.removeEventListener('resize', this.checkScreenSize);
},
methods: {
  checkScreenSize() {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    if (mobileQuery.matches) {
      // Update isMobile to true if screen size is mobile
      this.isMobile = true;
    } else {
      // Update isMobile to false if screen size is desktop
      this.isMobile = false;
    }
  },
},
};
</script>

<style src="../../assets/styles/css/header.css">
</style>
