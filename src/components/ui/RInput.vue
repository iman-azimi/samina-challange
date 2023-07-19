<template>
  <div class="my-10">
    <div class="flex flex-col items-start h-8 w-full">
      <div class="relative w-full">
        <Field
          :id="name"
          v-model="model"
          :type="props.type"
          :placeholder="label"
          :name="name"
          :disabled="disabled"
          class="w-full p-3 pt-2 placeholder-transparent rounded-full peer focus:outline-none focus:shadow-sm disabled:bg-green-50 focus:border-b-2 focus:border-b-teal-500"
          :class="getClasses"
        />
        <label
          :for="name"
          class="absolute -top-3 right-0 h-full px-3 py-5 text-sm transition-all duration-500 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-4 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:-top-4 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
        >
          {{ label }}
        </label>
      </div>
    </div>
    <div v-if="errorMessage" class="mt-4">
      <ErrorMessage :name="name" class="text-red-500 text-xs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Field, ErrorMessage, Form } from "vee-validate";
import { toEnglishDigit } from "@/utilities/toPersianDigit";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ""
  },
  label: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  errorMessage: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  number: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ""
  }
});
const emit = defineEmits(["update:modelValue"]);

const getClasses = computed(() => {
  return [props.color && `${props.color}`];
});
const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (props.number) {
      return emit("update:modelValue", toEnglishDigit(value));
    }
    return emit("update:modelValue", value);
  }
});
</script>

<style scoped></style>
