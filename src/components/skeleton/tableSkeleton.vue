<template>
  <div class="rounded-xl sm:mr-4">
    <div
      class="animate-pulse mt-14 h-16 py-4 w-full bg-gray-300 dark:bg-zinc-700 rounded-lg mb-3"
    ></div>
    <div
      v-for="item in 6"
      :key="item.i"
      class="even:bg-slate-50 odd:bg-slate-100 dark:odd:bg-dark-700 dark:even:bg-dark-900 h-16 animate-pulse"
    ></div>
    <div
      class="animate-pulse mt-8 h-4 w-48 bg-zinc-100 dark:bg-zinc-700 rounded-lg mb-3"
    ></div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
