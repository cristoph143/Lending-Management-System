<template>
  <teleport to="body">
    <div class="error-message" :style="{ backgroundColor: bgColor }">
      {{ errorMessage }}
      <button class="close-button" @click="closeError">
        {{ closeButtonLabel }}
      </button>
    </div>
  </teleport>
</template>

<script>
  export default {
    name: "ErrorPopUp",
    props: {
      errorMessage: String,
      closeButtonLabel: {
        type: String,
        default: "Close",
      },
      bgColor: {
        type: String,
        default: "red",
      },
    },
    emits: ["close"],
    methods: {
      closeError() {
        this.$emit("close");
      },
    }
  };
</script>

<style>
  .error-message {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    max-width: 500px;
    box-sizing: border-box;
  }

  .error-message .close-button {
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
  }

  .error-message .timer {
    font-size: 12px;
    margin-left: 10px;
  }
</style>
