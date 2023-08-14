<template>
  <div class="h-full w-full backdrop-blur-lg bg-white/30 dark:bg-dark-700/30">
    <aside
      class="flex flex-col justify-between w-72 sticky bg-white dark:bg-dark-900 h-full p-4 border-l-2 border-gray-200"
    >
      <div class="overflow-y-auto">
        <div class="mt-8">
          <img
            src="@/assets/images/logo.png"
          />
        </div>
        <div class="bg-gray-100 flex items-center justify-between p-4 rounded-md mt-6 cursor-pointer">
          <div class="flex">
            <img
              src="@/assets/images/apple.png"
            />
            <div class="mr-4 font-bold">
              شرکت اپل
            </div>
          </div>
          <img
            src="@/assets/images/bank-card.svg"
          />
        </div>
        <div class="w-12/12 mt-10 flex flex-col justify-between">
          <ul class="text-gray-700">
            <li v-for="item in getMenuItem" :key="item.i" class="py-4 text-sm">
              <div
                :class="[activeRoute === item.link ? getActiveItemClass : '']"
                class="px-1 flex justify-between items-center cursor-pointer"
              >
                <div>
                  <i
                    :class="[
                      activeRoute === item.link ? 'text-purple-500' : '',
                      `i-${item.icon} text-xl align-middle mr-1 ml-2`
                    ]"
                  />
                  <span class="font-semibold">{{ item.title }}</span>
                </div>
                <i class="i-arrow-down" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="mb-6">
        <div>
          <img
            src="@/assets/images/icons/message-question.svg"
            class="inline-block"
          />
          <span class="mr-3 font-semibold">راهنما</span>
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <img
              src="@/assets/images/icons/comment.svg"
              class="inline-block"
            />
            <span class="mr-3 font-semibold">پشتیبانی</span>
          </div>
          <span>ورژن ۱.۰.۴</span>
        </div>
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

const route = useRoute();

const mainItem = reactive([
  {
    title: "داشبورد",
    icon: "category",
    link: "/dashboard"
  },
  {
    title: "طرف حساب",
    icon: "profile",
    link: "/dashboard/profile"
  },
  {
    title: "کالا و خدمات",
    icon: "box",
    link: "/dashboard/profile"
  },
  {
    title: "انبارداری",
    icon: "home-2",
    link: "/dashboard/profile"
  },
  {
    title: "فروش",
    icon: "coin",
    link: "/dashboard/profile"
  },
  {
    title: "خزانه داری",
    icon: "bag",
    link: "/dashboard/profile"
  },
  {
    title: "تعریف حساب بانکی",
    icon: "setting-2",
    link: "/dashboard/profile"
  }
]);
const getMenuItem = computed(() => {
  return mainItem;
});
</script>
