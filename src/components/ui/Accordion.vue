<template>
  <li class="relative">
    <button
      type="button"
      class="w-full text-left"
      @click="selected = !selected"
    >
      <div
        class="flex items-center justify-between px-2 py-2 rounded-md"
        :class="{ 'bg-stone-900': selected }"
      >
        <div>
          <i :class="[icon, 'text-xl align-middle']" />
          <span class="mr-5">{{ title }}</span>
        </div>
        <i v-if="selected" class="i-arrow-up text-base" :size="16" />
        <i v-else class="i-arrow-down text-base" :size="16" />
      </div>
    </button>

    <div v-if="selected" class="relative overflow-hidden">
      <div>
        <slot />
      </div>
    </div>
  </li>
</template>
<script>
export default {
  name: "BaseAccordion",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
    accordion: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: false,
    };
  },
};
</script>
