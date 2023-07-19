<template>
  <div
    v-if="show"
    class="fixed md:flex justify-center items-center top-0 left-0 w-full h-screen overflow-y-scroll sm:z-50 bg-gray-900/80 backdrop-blur-sm z-50"
  >
    <div class="flex justify-center pt-7">
      <transition name="fade" appear>
        <div
          v-click-out-side="closeModal"
          class="inline-block dark:bg-dark-900 p-4 bg-white rounded-lg py-8 mt-12 border border-teal-500 m-4 md:m-0"
          :style="`width:${width}px`"
        >
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show?: false;
  width: 500;
}>();
const emit = defineEmits(["close"]);

const vClickOutSide = {
  beforeMount(el: any, binding: any) {
    el.clickOutsideEvent = (evt: any) => {
      evt.stopPropagation();
      if (!(el === evt.target || el.contains(evt.target))) {
        binding.value(evt, el);
      }
    };
    window.requestAnimationFrame(() => {
      document.addEventListener("click", el.clickOutsideEvent);
    });
  },
  unmounted(el: any) {
    document.removeEventListener("click", el.clickOutsideEvent);
  }
};
function closeModal() {
  emit("close");
}
</script>

<style></style>
