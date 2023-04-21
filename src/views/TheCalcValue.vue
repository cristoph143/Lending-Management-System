<template>
  <h1>{{ $route.params.slug }}</h1>
</template>

<script>
  export default {
    props: {
      destination: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style></style>
