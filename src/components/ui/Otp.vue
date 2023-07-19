<template>
  <div ref="otpCont" class="otp">
    <input
      v-for="(el, ind) in digits"
      :key="el + ind"
      v-model="digits[ind]"
      type="text"
      class="digit-box h-8 w-8 md:h-10 md:w-10 lg:h-10 lg:w-10"
      :autofocus="ind === 0"
      maxlength="1"
      :class="{ bounce: digits[ind] !== null }"
      @keydown="handleKeyDown($event, ind)"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const props = defineProps({
  default: String,
  digitCount: {
    type: Number,
    required: true,
  },
});
const digits = reactive([]);
if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i);
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null;
  }
}
const otpCont = ref(null);
const emit = defineEmits(["update:otp"]);
// const isDigitsFull = function () {
//   for (const elem of digits) {
//     if (elem == null || elem == undefined) {
//       return false
//     }
//   }
//   return true
// }
const handleKeyDown = function (event, index) {
  if (
    event.key !== "Tab" &&
    event.key !== "ArrowRight" &&
    event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    digits[index] = null;

    if (index != 0) {
      otpCont.value.children[index - 1].focus();
    }
    return;
  }
  if (new RegExp("^([0-9])$").test(event.key)) {
    digits[index] = event.key;
    if (index != props.digitCount - 1) {
      otpCont.value.children[index + 1].focus();
    }
    emit("update:otp", digits.join(""));
  }
};
</script>

<style scoped>
.otp {
  direction: ltr !important;
}
.digit-box {
  border: 1px solid #c7c7c7;
  display: inline-block;
  border-radius: 5px;
  margin: 5px;
  padding: 16px;
  font-size: 14px;
  text-align: center;
}
.digit-box:focus {
  outline: 1px solid black;
}
.bounce {
  animation: pulse 0.3s ease-in-out alternate;
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
