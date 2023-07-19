<script setup lang="ts">
import { RouterView } from "vue-router";
import { useLoadongStore } from "@/stores/loading";

const loading = useLoadongStore();
</script>

<template>
  <loading-page v-if="loading.getLoading" />
  <RouterView />
</template>
