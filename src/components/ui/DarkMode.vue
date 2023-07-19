<template>
  <section>
    <div
      class="flex justify-between items-center cursor-pointer text-black dark:text-white"
      @click="changeColorMode()"
    >
      <div
        class="w-4/12 h-11 flex items-center p-px duration-300 ease-in-out rounded-full mx-auto"
        :class="[toggleActive ? 'bg-dark-700' : 'bg-teal-300']"
      >
        <span v-if="toggleActive" class="leading-9 absolute right-3">
          <img src="@/assets/images/icons/sun.svg" class="inline" />
        </span>

        <div
          class="w-3/5 h-10 rounded-full transform duration-300 ease-in-out text-center border dark:border-white border-dark-700"
          :class="[
            toggleActive ? 'bg-dark-900 translate-x-[-3rem]' : 'bg-white-400'
          ]"
        >
          <span class="leading-9">
            <img
              v-if="toggleActive"
              src="@/assets/images/icons/moon.svg"
              class="inline"
            />
            <img
              v-if="!toggleActive"
              src="@/assets/images/icons/sun.svg"
              class="inline"
            />
          </span>
        </div>

        <div class="text-center w-3/5 h-10 rounded-full">
          <span v-if="!toggleActive" class="leading-9">
            <img src="@/assets/images/icons/moon.svg" class="inline" />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useThemeStore } from "@/stores/theme";

const toggleActive = ref(false);
const themeStore = useThemeStore();
function changeColorMode() {
  toggleActive.value = !toggleActive.value;
  const theme = toggleActive.value ? "dark" : "light";
  localStorage.setItem("theme", theme);
  themeStore.changeTheme(theme);
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

onMounted(async () => {
  const theme = localStorage.getItem("theme") || "light";
  themeStore.changeTheme(theme);
  if (theme && theme === "dark") {
    toggleActive.value = true;
    document.body.classList.add("dark");
  }
});
</script>

<style lang="scss" scoped></style>
