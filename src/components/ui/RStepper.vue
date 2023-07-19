<template>
  <div>
    <div class="h-full w-5/6 my-6 mx-6">
      <div class="container">
        <div class="lg:w-6/6">
          <div v-for="step in steps" :key="step">
            <div class="flex">
              <div
                class="w-1 rounded"
                :class="[
                  currentStep >= step ? 'bg-teal-500' : 'bg-gray-400',
                  step == 3 && 'h-0',
                  (currentStep === step && 'h-auto') ||
                    (currentStep !== step && 'h-16')
                ]"
              >
                <div
                  class="h-7 w-7 rounded-full shadow-xm inline-block left-3 border-2 border-white font-"
                  :class="[currentStep >= step ? 'bg-teal-500' : 'bg-gray-400']"
                >
                  <span class="text-white">{{ step }}</span>
                </div>
              </div>
              <div v-if="step === currentStep" class="mx-6 my-10 w-full">
                <slot :name="`step-${step}`" />
              </div>
            </div>
            <span
              class="absolute top-1 right-6 w-100"
              :class="
                currentStep >= step ? 'font-medium' : 'text-gray-400 text-sm'
              "
            >
              <slot :name="`step-title-${step}`" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  steps: {
    type: Number,
    default: 1
  },
  currentStep: {
    type: Number,
    default: 1
  }
});
</script>

<style scoped></style>
