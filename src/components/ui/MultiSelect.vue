<template>
  <div class="w-full flex flex-col items-center mx-auto">
    <div v-click-out="handleClickOut" class="w-full">
      <div class="flex flex-col items-center relative">
        <div class="w-full">
          <div
            class="my-2 p-1 flex border border-gray-200 bg-white rounded-full"
            @click="show = !show"
          >
            <div class="flex flex-auto flex-wrap">
              <label
                for="mobile"
                class="-mt-3 mr-3 text-xs text-black absolute rounded-full peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-mt-8 peer-placeholder-shown:text-base duration-300 peer-placeholder-shown:bg-transparent peer-placeholder-shown:p-0"
              >
                متقاضی
              </label>

              <template v-if="multi">
                <div
                  v-for="item in selectedItem"
                  :key="item.i"
                  class="flex justify-center items-center m-1 font-medium px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300 cursor-pointer"
                  @click="removeItem(item)"
                >
                  <div
                    class="text-xs font-normal leading-none max-w-full flex-initial"
                  >
                    {{ item.title }}
                  </div>
                  <div class="flex flex-auto flex-row-reverse">
                    <div v-if="multi">
                      <i class="i-add-circle text-2xl" />
                    </div>
                  </div>
                </div>
              </template>
              <template v-else-if="selectedItem.length !== 0">
                <div
                  class="flex justify-center items-center m-1 font-medium px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300 cursor-pointer"
                >
                  <div
                    class="text-xs font-normal leading-none max-w-full flex-initial"
                  >
                    {{ selectedItem.title }}
                  </div>
                </div>
              </template>
              <div class="flex-1">
                <input
                  placeholder=""
                  class="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                />
              </div>
            </div>
            <div
              class="text-gray-300 w-8 py-1 pl-2 pr-1 flex items-center border-gray-200"
            >
              <div
                class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
              >
                <i v-if="show" class="i-arrow-up" />
                <i v-else class="i-arrow-down" />
              </div>
            </div>
          </div>
        </div>
        <template v-if="show">
          <transition name="fade-up" appear>
            <div
              class="absolute shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
            >
              <div class="flex flex-col w-full">
                <div
                  v-for="item in items"
                  :key="item.i"
                  class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
                  @click="selectItem(item)"
                >
                  <div
                    class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100"
                  >
                    <div class="w-full items-center flex">
                      <div class="mx-2 leading-6">
                        {{ item.title }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const show = ref(false);
const props = defineProps(["items", "multi"]);
const emit = defineEmits(["update:modelValue"]);

const vClickOut = {
  mounted(el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  }
};
const handleClickOut = () => {
  show.value = false;
};
const selectedItem = ref([]);
const selectItem = (item) => {
  if (props.multi) {
    const hasItem = selectedItem.value.find((i) => i == item);
    (!hasItem && selectedItem.value.push(item)) || removeItem(item);
  } else {
    selectedItem.value = item;
  }
  if (props.multi) {
    const items = selectedItem.value.map((i) => {
      return i.value;
    });
    emit("update:modelValue", items);
    return;
  }
  emit("update:modelValue", item.value);
};
const removeItem = (item) => {
  const index = selectedItem.value.indexOf(item);
  selectedItem.value.splice(index, 1);
};
</script>

<style scoped>
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>
