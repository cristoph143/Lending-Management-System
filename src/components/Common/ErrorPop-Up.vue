<template>
  <teleport to="body">
    <div class="error-message" :style="{ backgroundColor: bgColor }">
      {{ errorMessage }}
      <button class="close-button" @click="closeError">
        {{ closeButtonLabel }}
      </button>
      <div class="timer">{{ remainingTime }}</div>
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
      duration: {
        type: Number,
        required: true,
      },
    },
    emits: ["close", "countdownFinished"],
    data() {
      return {
        remainingTime: this.formatTime(this.duration),
        timer: null,
        localDuration: this.duration,
      };
    },
    created() {
      const data = {
        message: "Countdown has finished",
        count: 0,
      };
      this.countdownTimer = setInterval(() => {
        if (this.localDuration > 0) {
          this.localDuration--;
        } else {
          clearInterval(this.countdownTimer);
          this.$emit("countdownFinished", data);
          this.$emit("close");
        }
      }, 1000);
    },
    beforeUnmount() {
      clearInterval(this.countdownTimer);
    },
    mounted() {
      this.startTimer();
    },
    methods: {
      startTimer() {
        this.timer = setInterval(() => {
          if (this.localDuration > 0) {
            this.localDuration -= 1000;
            this.remainingTime = this.formatTime(this.localDuration);
          } else {
            clearInterval(this.timer);
            this.$emit("countdownFinished");
            this.$emit("close");
          }
        }, 1000);
      },

      closeError() {
        clearInterval(this.timer);
        this.$emit("close");
      },
      formatTime(duration) {
        const minutes = Math.floor(duration / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
