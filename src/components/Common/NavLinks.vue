<template>
  <nav class="nav-links" :class="{ open: isOpen }">
    <a href="/" :class="{ active: activeLink === 'home' }">Home</a>
    <a href="/about" :class="{ active: activeLink === 'about' }">About</a>
    <a href="/contact" :class="{ active: activeLink === 'contact' }">Contact</a>
  </nav>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    activeLink: {
      type: String,
      default: '',
    },
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  }
};
</script>
<style>
  .nav-links {
  display: flex;
  justify-content: flex-end;
}

.nav-links ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-right:
  20px;
}

.nav-links li:last-child {
margin-right: 0;
}

.nav-links li a {
display: block;
padding: 10px;
color: #333;
text-decoration: none;
transition: background-color 0.3s ease-in-out;
}

.nav-links li.active a {
font-weight: bold;
}

.nav-links li:hover a {
background-color: #f4f4f4;
}

  </style>

