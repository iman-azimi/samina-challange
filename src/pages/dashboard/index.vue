<template>
  <section class="col-span-4 p-6">
    <div
      class="bg-gray-50 rounded-xl mt-8 py-4 px-10 flex justify-between border-b-2 border-orange-500"
    >
      <p class="text-lg">
        متاسفانه پروفایل شما کامل نیست، لطفا جهت تکمیل پروفایل خود اقدام نمایید
      </p>
      <router-link to="/dashboard/profile">
        <i class="i-edit-2 align-middle"></i>
        تکمیل پروفایل</router-link
      >
    </div>
    <div>
      <OverviewBox />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCookie } from "vue-cookie-next";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";

const router = useRouter();
const cookie = useCookie();
const toast = useToast();
</script>

<style scoped></style>
