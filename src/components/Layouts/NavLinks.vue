<template>
  <div class="nav-links">
    <a href="/" :class="{ active: activeLink === '/' }">Home</a>
    <a href="/about" :class="{ active: activeLink === '/about' }">About Us</a>
    <a href="/services" :class="{ active: activeLink === '/services' }">Services</a>
    <a href="/contact" :class="{ active: activeLink === '/contact' }">Contact Us</a>
    <a href="/calculate" :class="{ active: activeLink === '/calculate' }">Calculate Loan</a>
  </div>
</template>

<script>
export default {
  name: 'NavLinks',
  props: {
    activeLink: String,
  },
};
</script>

<style>
.nav-links {
  display: flex;
}

.nav-links a {
  display: block;
  padding: 10px 20px;
  font-size: 16px;
  color: #333;
  text-decoration: none;
}

.nav-links a:hover {
  background-color: #f2f2f2;
}

.nav-links .active {
  font-weight: bold;
}
</style>
