<template>
  <div class="container mx-auto">
    <div class="flex justify-between my-6">
      <div class="flex items-center">
        <h1 class="text-lg lg:text-lg dark:text-white">
          <i class="i-profile text-2xl text-teal-500 align-middle" /> مشتریان
        </h1>
        <r-input
          v-model="search"
          class="my-0 mr-6"
          name="name"
          color="bg-white"
          type="text"
          label="جستجو (موبایل)"
          error-message
        />
      </div>
      <button
        class="text-sm px-4 bg-teal-500 rounded-lg py-2 text-white"
        @click="handleCreateCustomer"
      >
        <i class="i-add-circle align-middle" />
        افزودن
      </button>
    </div>
    <data-table :headers="header" :items="getCustomers" :loading="tableLoading">
      <template #item-fullname="{ item }">
        {{ item.name + " " + item.lastname }}
      </template>
      <template #item-actions="{ item }">
        <i
          class="i-trash mx-2 cursor-pointer"
          @click="handleOnDeleteCustomer(item)"
        />
        <i
          class="i-edit-2 mx-2 cursor-pointer"
          @click="handleOnEditCustomer(item)"
        />
      </template>
    </data-table>
    <r-modal
      :show="showDeleteModal"
      :width="500"
      @close="showDeleteModal = false"
    >
      <p class="mb-2 text-orange-500">آیا از حذف این مشتری مطمئن هستید؟</p>
      <div class="text-left">
        <r-button
          label="خیر"
          class="text-sm px-4 bg-teal-500 rounded-lg mx-2 w-20 text-white"
          @click="showDeleteModal = false"
        />
        <r-button
          label="بله"
          class="text-sm px-4 bg-orange-500 rounded-lg mx-2 w-20 text-white"
          @click="onDeleteCustomer()"
        />
      </div>
    </r-modal>
    <r-modal :show="showEditModal" :width="500" @close="showEditModal = false">
      <Form
        :validation-schema="schema"
        class="px-4 md:px-8 mt-8"
        @submit="handleSumbitFormCustomer"
      >
        <r-input
          v-model="newCustomer.name"
          class="mb-4"
          name="name"
          color="bg-gray-100"
          type="text"
          label="نام"
          error-message
        />
        <r-input
          v-model="newCustomer.lastname"
          class="mb-4"
          name="lastName"
          color="bg-gray-100"
          type="text"
          label="نام خانوادگی"
          error-message
        />
        <r-input
          v-model="newCustomer.phone"
          class="mb-4"
          name="phone"
          color="bg-gray-100"
          type="text"
          label="شماره همراه"
          error-message
        />
        <r-input
          v-model="newCustomer.email"
          class="mb-4"
          name="email"
          color="bg-gray-100"
          type="text"
          label="ایمیل"
          error-message
        />
        <r-input
          v-model="newCustomer.bankAccountNumber"
          class="mb-4"
          name="bankAccountNumber"
          color="bg-gray-100"
          type="text"
          label="کارت بانکی"
          error-message
        />
        <r-input
          v-model="newCustomer.dateOfBirth"
          type="text"
          label="تاریخ تولد"
          color="bg-gray-100"
          name="birth"
          class="shift_end_date lg:w-full mx-1 shift_end_hour"
        />
        <date-picker
          v-model="newCustomer.dateOfBirth"
          simple
          custom-input=".shift_end_hour"
        />
        <div class="my-10">
          <r-button block label="ارسال" size="sm" :loading="loading" />
        </div>
      </Form>
    </r-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useCustomerStore } from "@/stores/customerStore.ts";
import * as yup from "yup";
import { Field, ErrorMessage, Form } from "vee-validate";

const router = useRouter();
const showDeleteModal = ref(false);
const showEditModal = ref(false);
const store = useCustomerStore();
const toast = useToast();
const search = ref("");
const getCustomers = computed(() => {
  const customers = store.getCustomers;
  if (search.value.length > 3) {
    return customers.filter((item) => item.phone.includes(search.value));
  }
  return customers;
});

const selectedCustomer = ref();
const newCustomer = ref({});

const header = reactive([
  {
    name: "نام",
    value: "fullname"
  },
  {
    name: "تاریخ تولد",
    value: "dateOfBirth"
  },
  {
    name: "شماره همراه",
    value: "phone"
  },
  {
    name: "شماره کارت",
    value: "bankAccountNumber"
  },
  {
    name: "عملیات",
    value: "actions"
  }
]);
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
const handleCreateCustomer = () => {
  router.push("/customer/create");
};
const handleOnDeleteCustomer = (customer) => {
  selectedCustomer.value = customer;
  showDeleteModal.value = true;
};
const onDeleteCustomer = async () => {
  try {
    await store.deleteCustomer(selectedCustomer.value);
    toast.success("مشتری با موفقیت حذف شد");
    showDeleteModal.value = false;
  } catch (error) {}
};
const handleOnEditCustomer = (customer) => {
  selectedCustomer.value = customer;
  newCustomer.value = { ...customer };
  showEditModal.value = true;
};
const handleSumbitFormCustomer = async () => {
  try {
    await store.editCustomer(selectedCustomer.value, newCustomer.value);
    toast.success("مشتری با موفقیت حذف شد");
    showDeleteModal.value = false;
  } catch (error) {}
};
</script>
<style scoped></style>
