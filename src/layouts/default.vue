<template>
  <main>
    <div class="flex">
      <div v-if="!isMobile">
        <div class="absolute bg-white rounded-full p-2 -left-4 z-50 top-10 border-2 border-gray-200 cursor-pointer">
          <img
            src="@/assets/images/icons/arrow-right.svg"
          />
        </div>
        <div class="h-screen sticky top-0">
          <transition name="fade" appear>
            <NavigationDrawer
              v-show="showDrawer"
              class="duration-500"
              @close-drawer="closeDrawer"
            />
          </transition>
        </div>
      </div>
      <div class="w-full">
        <div>
          <div class="flex justify-between items-center bg-white py-4 px-10 border-b-2 border-gray-200">
            <div class="flex justify-between">
              <div class="flex">
                <div>
                  <img
                    src="@/assets/images/icons/clock.svg"
                    class="inline-block ml-3"
                  />
                  ساعت: {{ new Intl.DateTimeFormat('fa-IR', {hour: 'numeric', minute: 'numeric'}).format(d) }}
                </div>
                <div class="mr-8">
                  <img
                    src="@/assets/images/icons/calendar.svg"
                    class="inline-block ml-3"
                  />
                  {{ new Intl.DateTimeFormat('fa-IR', {dateStyle: 'full'}).format(d) }}
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="bg-gray-100 flex items-center justify-between px-2 py-2 rounded-md cursor-pointer">
                <div>
                  <div class="flex justify-between items-center">
                    <img
                      src="@/assets/images/icons/calendar-chart.svg"
                      class="inline-block ml-3"
                    />
                    سالی مالی ۱۴۰۲
                    <i class="i-arrow-down mr-4" />
                  </div>
                </div>
              </div>
              <img
                src="@/assets/images/icons/phone.svg"
                class="inline-block ml-4 mr-8"
              />
              <img
                src="@/assets/images/icons/ringtone.svg"
                class="inline-block ml-4"
              />
              <img
                src="@/assets/images/avatar.png"
                class="inline-block ml-4"
              />
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
import moment from "moment-jalaali"
const showDrawer = ref(true);
function closeDrawer() {
  showDrawer.value = false;
}
</script>
