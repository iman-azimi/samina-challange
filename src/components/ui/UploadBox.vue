<template>
  <div>
    <div
      class="flex flex-col text-center p-4 align-middle bg-gray-100 dark:bg-dark-900 rounded-lg border-2 border-gray-200 dark:border-dark-700 text-gray-300 cursor-pointer border-dashed"
      @click="chooseFile"
    >
      <template v-if="!preview">
        <div><i class="i-document-text text-[50px]" /></div>
        <span> یک فایل انتخاب کنید </span>
      </template>
      <img v-else :src="preview" class="h-32 rounded-lg object-contain" />
    </div>
    <input
      id="fileUpload"
      ref="inputFile"
      type="file"
      hidden
      :accept="accept"
      @change="previewImage"
    />
    <div v-if="name" class="text-gray-500 mt-2">
      فایل انتخاب شده: {{ name }}
    </div>
    <div class="text-center mt-4">
      {{ lable }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(["modelValue", "lable", "accept"]);
const emit = defineEmits(["update:modelValue"]);
const inputFile = ref();
const file = ref();
const preview = ref();
const name = ref("");
const chooseFile = () => {
  inputFile.value.click();
};
const previewImage = (event: any) => {
  const input = event.target;
  if (input.files) {
    if (props.accept == "images/*") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        preview.value = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
      name.value = "";
    } else {
      name.value = input.files[0].name;
      preview.value = null;
    }
    file.value = input.files[0];
    emit("update:modelValue", file.value);
  }
};
</script>

<style scoped></style>
