<template>
  <div
    class="flex w-full h-4 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-700"
  >
    <div
      class="flex flex-col justify-center overflow-hidden text-sm text-white text-center duration-1000"
      :class="[progress === 100 ? 'bg-teal-500' : 'bg-purple-500 ']"
      role="progressbar"
      :style="`width: ${progress}%`"
      aria-valuenow="57"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {{ progress !== 0 ? `${Math.floor(progress)}%` : "" }}
    </div>
    <div v-if="progress == 0" class="text-center w-full -mt-1">
      {{ progress }} %
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  progress: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped></style>
