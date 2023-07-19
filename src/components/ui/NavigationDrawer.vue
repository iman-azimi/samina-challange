<template>
  <div class="h-full w-full backdrop-blur-lg bg-white/30 dark:bg-dark-700/30">
    <aside
      class="flex flex-col justify-between w-72 sticky bg-teal-500 dark:bg-dark-900 h-full p-4 rounded-2xl"
      :class="{ 'bg-teal-600': admin }"
    >
      <div class="overflow-y-auto">
        <div class="flex-col items-center relative mt-6 text-center">
          <span
            class="w-3 h-3 bg-purple-600 rounded-full absolute top-4 z-10"
          />
          <div
            class="p-2 border-2 border-gray-500 rounded-full text-center inline-block"
          >
            <img
              src="@/assets/images/avatar.png"
              class="rounded-full w-16 h-16"
            />
          </div>
          <div class="dark:text-white text-black ml-3">
            <h2 class="text-lg text-white">ایمان عظیمی</h2>
            <div class="text-sm text-purple-600 font-semibold">خوش آمدید</div>
          </div>
        </div>
        <div class="w-12/12 mt-10 flex flex-col justify-between">
          <ul class="text-white">
            <li v-for="item in getMenuItem" :key="item.i" class="py-4 text-sm">
              <div
                :class="[activeRoute === item.link ? getActiveItemClass : '']"
                class="px-1"
              >
                <router-link :to="item.link" @click="activeItem(item.link)">
                  <i
                    :class="[
                      activeRoute === item.link ? 'text-purple-500' : '',
                      `i-${item.icon} text-xl align-middle mr-1 ml-2`
                    ]"
                  />
                  {{ item.title }}
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="mb-6 text-center">
        <button
          class="text-white font-semibold hover:bg-teal-400 dark:hover:bg-dark-700 w-full py-2 rounded-2xl"
          @click="handleLogout()"
        >
          <i class="i-logout align-middle ml-2 text-xl" />
          خروج از حساب
        </button>
        <dark-mode class="mt-6" />
      </div>
    </aside>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import apiManager from "@/api/apiServiceManager.service";
import { useCookie } from "vue-cookie-next";
import { useToast } from "vue-toastification";
const toast = useToast();
const cookie = useCookie();
import { useThemeStore } from "@/stores/theme";
const themeStore = useThemeStore();
const emit = defineEmits(["closeDrawer"]);
const admin = ref(false);

const route = useRoute();

const mainItem = reactive([
  {
    title: "داشبورد",
    icon: "category",
    link: "/dashboard"
  },
  {
    title: "پروفایل",
    icon: "profile",
    link: "/dashboard/profile"
  }
]);
function closeNavigation() {
  emit("closeDrawer");
}
const getMenuItem = computed(() => {
  return mainItem.value;
});
</script>
