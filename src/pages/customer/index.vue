<template>
  <div>
    <div class="container mx-auto">
      <div class="flex justify-between items-center mb-2">
        <div>
          <div
            class="bg-white inline-block px-2 py-1 rounded-xl cursor-pointer hover:bg-teal-500 hover:text-white text-sm"
            @click="showFilter = !showFilter"
          >
            <i class="i-search-normal ml-2 align-middle" />

            <span>فیلتر</span>
          </div>
          <transition name="fade" appear>
            <template v-if="showFilter">
              <div class="inline-block">
                <div
                  class="mx-2 bg-white border border-teal-500 px-4 rounded-full inline-block cursor-pointer text-xs py-1"
                  :class="{ 'bg-teal-500 text-white': selectStatus == 'ALL' }"
                  @click="selectStatus = 'ALL'"
                >
                  همه
                </div>
                <div
                  class="mx-2 bg-white border border-teal-500 px-4 rounded-full inline-block cursor-pointer text-xs py-1"
                  :class="{
                    'bg-teal-500 text-white': selectStatus == 'PENDING'
                  }"
                  @click="selectStatus = 'PENDING'"
                >
                  در حال برسی
                </div>
                <div
                  class="mx-2 bg-white border border-teal-500 px-4 rounded-full inline-block cursor-pointer text-xs py-1"
                  :class="{
                    'bg-teal-500 text-white': selectStatus == 'ACCEPTED'
                  }"
                  @click="selectStatus = 'ACCEPTED'"
                >
                  تایید شده
                </div>
                <div
                  class="mx-2 bg-white border border-teal-500 px-4 rounded-full inline-block cursor-pointer text-xs py-1"
                  :class="{
                    'bg-teal-500 text-white': selectStatus == 'REJECTED'
                  }"
                  @click="selectStatus = 'REJECTED'"
                >
                  رد شده
                </div>
              </div>
            </template>
          </transition>
        </div>
        <r-button
          label="ایجاد درخواست"
          size="sm"
          class="text-xs py-0 px-2"
          @click="goToCreeateRequest"
        />
      </div>
      <div class="grid grid-cols-4 gap-4">
        <template v-if="!loading">
          <template v-if="requests.length">
            <div
              v-for="item in requests"
              :key="item.i"
              class="lg:col-span-4 col-span-4"
            >
              <request-card
                :request="item"
                is-mine="true"
                @delete="deleteRequestItem(item)"
              />
            </div>
          </template>
          <div
            v-else
            class="text-center col-span-4 bg-white dark:bg-dark-700 dark:text-white py-4 rounded-xl m-4"
          >
            محتوایی وجود ندارد
          </div>
        </template>
        <div v-else class="col-span-4">
          <div v-for="i in 15" :key="i" class="mt-4">
            <request-card-skeleton />
          </div>
        </div>
      </div>
      <r-modal :show="deleteModal" :width="500" @close="deleteModal = false">
        <p class="mb-2 text-orange-500">آیا از حذف مطمئن هستید؟</p>
        <div class="text-left">
          <r-button
            label="خیر"
            class="text-sm px-4 bg-teal-500 rounded-lg mx-2 w-20 text-white"
            @click="deleteModal = false"
          />
          <r-button
            label="بله"
            class="text-sm px-4 bg-orange-500 rounded-lg mx-2 w-20 text-white"
            @click="onDeleteRequest()"
          />
        </div>
      </r-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import {
  fetchMyAdvertiseList,
  deleteAdvertise
} from "@/api/advertiseApiManager";
import { useToast } from "vue-toastification";
const router = useRouter();
const headers = reactive([
  {
    name: "درخواست فعالیت در",
    value: ""
  },
  {
    name: "استان",
    value: ""
  },
  {
    name: "شهرستان",
    value: ""
  },
  {
    name: "محدوده",
    value: ""
  },
  {
    name: "نحوه پرداخت",
    value: ""
  },
  {
    name: "قیمت",
    value: ""
  },
  {
    name: "نوع درخواست",
    value: ""
  },
  {
    name: "شیفت",
    value: ""
  },
  {
    name: "تاریخ شروع",
    value: ""
  },
  {
    name: "تاریخ پایان",
    value: ""
  },
  {
    name: "وضعیت",
    value: ""
  }
]);
onMounted(() => {
  fetchMyRequestList();
});
const deleteModal = ref(false);
const requests = ref({});
const loading = ref(false);
const selectStatus = ref("ALL");
const selectedRequest = ref({});
const toast = useToast();
const showFilter = ref(false);
const goToCreeateRequest = () => {
  router.push("/dashboard/my-requests/create");
};
const fetchMyRequestList = async () => {
  loading.value = true;
  const params = {
    status: selectStatus.value == "ALL" ? "" : selectStatus.value
  };
  const { data: reqItems } = await fetchMyAdvertiseList(params);
  requests.value = reqItems;
  loading.value = false;
};
const deleteRequestItem = (item: object) => {
  selectedRequest.value = item;
  deleteModal.value = true;
};

const onDeleteRequest = async () => {
  const index = requests.value.findIndex((item) => {
    item == selectedRequest.value;
  });
  try {
    await deleteAdvertise(selectedRequest.value.id);
    deleteModal.value = false;
    requests.value.splice(index, 1);
    toast.success(" با موفقیت حذف شد");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
watch(selectStatus, () => {
  fetchMyRequestList();
});
</script>

<style scoped></style>
