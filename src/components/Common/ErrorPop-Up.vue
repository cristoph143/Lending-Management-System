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
      animationDelay: {
        type: Number,
        default: 0,
      },
      animationIterationCount: {
        type: String,
        default: "1",
      },
    },
    emits: ["close"],
    methods: {
      closeError() {
        this.$emit("close");
      },
    },
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
    animation: slide-in 0.5s ease-out forwards;
  }

  .error-message .close-button {
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
    animation: slide-out 0.5s ease-out forwards;
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(-50%);
    }
  }

  @keyframes slide-out {
    from {
      opacity: 1;
      transform: translateX(-50%);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }

  .error-message:not(:last-of-type) {
    animation-delay: calc(var(--error-delay) * (var(--error-count) - 1));
    animation-iteration-count: var(--error-iteration-count);
  }
</style>
