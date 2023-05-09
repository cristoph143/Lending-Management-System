<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <router-link to="/">
      <button class="goToButton btn">
        <i class="fas fa-arrow-left"></i> Go back to Home
      </button>
    </router-link>
  </div>
</template>

<style>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }
  button {
    margin-top: 20px;
  }
</style>
