<template>
  <div class="flex items-center justify-center my-10">
    <div
      class="max-w-xl bg-gray-100 w-5/6 md:w-2/3 rounded-xl overflow-hidden shadow-2xl text-center p-4"
    >
      <h1 class="text-base lg:text-xl border-b-2 p-2">ایجاد</h1>
      <Form
        :validation-schema="schema"
        class="px-4 md:px-8 mt-8"
        @submit="handleSumbitCustomer"
      >
        <r-input
          v-model="customer.name"
          class="mb-4"
          name="name"
          type="text"
          label="نام"
          error-message
        />
        <r-input
          v-model="customer.lastname"
          class="mb-4"
          name="lastName"
          type="text"
          label="نام خانوادگی"
          error-message
        />
        <r-input
          v-model="customer.phone"
          class="mb-4"
          name="phone"
          type="text"
          label="شماره همراه"
          error-message
        />
        <r-input
          v-model="customer.email"
          class="mb-4"
          name="email"
          type="text"
          label="ایمیل"
          error-message
        />
        <r-input
          v-model="customer.bankAccountNumber"
          class="mb-4"
          name="bankAccountNumber"
          type="text"
          label="کارت بانکی"
          error-message
        />
        <r-input
          v-model="customer.dateOfBirth"
          type="text"
          label="تاریخ تولد"
          name="birth"
          class="shift_end_date lg:w-full mx-1 shift_end_hour"
        />
        <date-picker
          v-model="customer.dateOfBirth"
          simple
          custom-input=".shift_end_hour"
        />
        <div class="my-10">
          <r-button block label="ارسال" size="sm" :loading="loading" />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue";
import { Field, ErrorMessage, Form } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useCustomerStore } from "@/stores/customerStore.ts";
const router = useRouter();
const toast = useToast();
const loading = ref(false);
const customer = ref({});
const schema = yup.object({
  name: yup.string().required("وارد کردن نام الزامی میباشد"),
  lastName: yup.string().required("وارد کردن نام خانوادگی الزامی میباشد"),
  phone: yup
    .string()
    .required("شماره همراه الزامی میباشد")
    .min(11, "شماره همراه باید حداقل 11 کاراکتر باشد")
    .max(11, "شماره همراه نباید بیشتر از 11 کاراکتر باشد"),
  email: yup
    .string()
    .required(" ایمیل الزامی میباشد")
    .email("فرمت ایمیل وارد شده صحیح نیست"),
  bankAccountNumber: yup
    .string()
    .required("شماره کارت الزامی میباشد")
    .min(16, "شماره کارت باید حداقل 16 کاراکتر باشد")
    .max(16, "شماره کارت نباید بیشتر از 16 کاراکتر باشد")
});

const store = useCustomerStore();

const handleSumbitCustomer = async () => {
  try {
    loading.value = true;
    await store.createCustomer(customer.value);
    loading.value = false;
    router.push("/");
  } catch (error) {
    loading.value = false;
  }
};
</script>
<style scoped></style>
