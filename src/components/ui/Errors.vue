<template>
  <div v-if="errors" class="bg-red-100 p-4 rounded-md">
    <p v-for="error in errors" :key="error.i" class="mb-2 text-red-700 text-xs">
      {{ error[0] }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  errors: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped></style>
