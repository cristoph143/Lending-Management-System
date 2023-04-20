<template>
  <!-- navigation bar -->
  <nav id="nav">
    <ul class="nav-links">
      <li class="links">
        <router-link to="/">Home</router-link>
      </li>
      <li class="links">
        <router-link to="/diminishing">Diminishing Interest</router-link>
      </li>
      <li class="links">
        <router-link to="/fixed">Fixed Interest</router-link>
      </li>
      <li class="links">
        <router-link to="/lumpsum">Lump Sum Payment</router-link>
      </li>
      <li class="links">
        <router-link to="/penalty">Penalty Calculator</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
#nav {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: rgb(252, 252, 252);
  border-bottom: 1px solid grey;
  z-index: 1;
}
#nav a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}
#nav a.vue-school-active-class {
  color: #ab26ab;
}
.nav-links {
  display: flex;
}
.links {
  padding-right: 20px;
  list-style: none;
}
.links:hover {
  text-decoration: underline;
}
</style>
