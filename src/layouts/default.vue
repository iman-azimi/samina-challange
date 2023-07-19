<template>
  <main>
    <template v-if="isMobile">
      <transition name="fade" appear>
        <mobile-navigation-drawer
          v-show="showDrawer"
          class="duration-500"
          @close-drawer="closeDrawer"
        />
      </transition>
    </template>
    <div class="flex">
      <div v-if="!isMobile" class="h-screen sticky top-0">
        <transition name="fade" appear>
          <NavigationDrawer
            v-show="showDrawer"
            class="duration-500"
            @close-drawer="closeDrawer"
          />
        </transition>
      </div>
      <div class="w-full">
        <div class="p-6">
          <div class="flex justify-between">
            <div>
              <i
                class="i-menu text-2xl dark:text-white pl-1 cursor-pointer"
                @click="showDrawer = !showDrawer"
              />
            </div>
            <div class="flex">
              <span class="relative">
                <i
                  class="i-notification-bing text-white text-2xl bg-teal-500 p-2 align-middle rounded-full"
                />
                <span class="flex absolute h-3 w-3 -top-1 right-1 -mt-1 -mr-1">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"
                  ></span>
                </span>
              </span>
            </div>
          </div>
          <div class="mt-10">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { isMobile } from "mobile-device-detect";
const showDrawer = ref(false);
function closeDrawer() {
  showDrawer.value = false;
}
</script>
