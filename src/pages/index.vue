<template>
  <div class="container mx-auto px-8">
    <div class="flex items-center">
      <div>
        <i class="i-category align-middle" />
      </div>
      <i class="i-arrow-left mx-3" />
      <div>
        خزانه داری
      </div>
      <i class="i-arrow-left mx-3" />
      <div class="text-[#155EEF]">
        تعریف حساب بانکی
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div>
        <div class="mt-8">
          <h1 class="text-2xl font-bold inline-block">تعریف حساب بانکی</h1>
          <span class="rounded-full bg-gray-100 mr-2 px-2 text-sm">{{ items.length }} حساب</span>
        </div>
        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است</p>
      </div>
      <div>
        <button class="border rounded-md px-3 py-2">
          <img
            src="@/assets/images/icons/pdf.svg"
            class="inline-block"
          />
        </button>
        <button class="border rounded-md px-4 py-2 mr-2">
          <img
            src="@/assets/images/icons/video.svg"
            class="inline-block"
          />
          <span class="mr-4">آموزشی ویدیویی</span>
        </button>
      </div>
    </div>
    <div class="flex justify-between my-6">
      <div class="flex items-center"> 
        <div class="w-60">
          <r-input
            v-model="search"
            class="my-0"
            name="name"
            color="bg-white border rounded-md"
            type="text"
            label="جستجو"
            error-message
          />
        </div>
        <button
          class="text-sm p-3 bg-white border rounded-lg mr-2"
          @click="showFilterModal = true"
        >
          <img
            src="@/assets/images/icons/filter.svg"
          />
        </button>
      </div>
      <div>
        <div class="inline-block align-middle">
          <button
            class="text-lg px-3 py-2 bg-white border rounded-lg ml-2"
            :disabled="!selectedItems.length"
            :class="selectedItems.length ? 'text-red-500 border-red-500' : ''"
            @click="showDeleteModal = true"
          >
            <i class="i-trash"></i>
          </button>
        </div>
        <button
          class="text-sm px-4 bg-[#155EEF] rounded-lg py-3 text-white"
        >
          <i class="i-add-circle align-middle ml-2" />
          حساب جدید
        </button>
      </div>
    </div>
    <data-table :headers="header" :items="getBankAccounts" @select="handleOnSelectItem">
      <template #item-accountTitle="{ item }">
        {{ item.accountTitle.length > 20 ? item.accountTitle.substring(0, 20) + "..." : item.accountTitle }}
      </template>
      <template #item-portalStatus="{ item }">
        {{ item.portalStatus ? 'فعال' : 'غیرفعال'}}
      </template>
      <template #item-cardReaderStatus="{ item }">
        {{ item.cardReaderStatus ? 'فعال' : 'غیرفعال'}}
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
    <div v-if="items.length && items.length > 10" class="text-center py-4 border border-t-0 rounded-b-xl cursor-pointer" @click="handleShowMore">
      مشاهده بیشتر
      <i class="i-arrow-down align-middle"/>
    </div>
    <r-modal
      :show="showDeleteModal"
      :width="500"
      @close="showDeleteModal = false"
    >
      <p class="mb-2 text-orange-500">آیا از حذف آیتم های انتخابی مطمئن هستید؟</p>
      <div class="text-left">
        <r-button
          label="خیر"
          class="text-sm px-4 bg-teal-500 rounded-lg mx-2 w-20 text-white"
          @click="showDeleteModal = false"
        />
        <r-button
          label="بله"
          class="text-sm px-4 bg-orange-500 rounded-lg mx-2 w-20 text-white"
          @click="deleteItems()"
        />
      </div>
    </r-modal>
    <r-modal
      :show="showFilterModal"
      :width="500"
      @close="showFilterModal = false"
      class="p-0"
    >
      <div class="text-xl border-b pb-4">
        <button
          class="text-sm p-3 bg-white border rounded-lg mr-2"
        >
          <img
            src="@/assets/images/icons/filter.svg"
          />
        </button>
        فیلتر ها 
      </div>
      <div class="px-6 mt-6">
        <span class="font-semibold">وضعیت کارتخوان</span>
        <select v-model="cardReaderStatus" class="px-4 h-10 w-full border rounded-md mt-3">
          <option :value="true">فعال</option>
          <option :value="false">غیرفعال</option>
        </select>
      </div>
      <div class="px-6 mt-6">
        <span class="font-semibold">وضعیت درگاه</span>
        <select v-model="portalStatus" class="px-4 h-10 w-full border rounded-md mt-3">
          <option :value="true">فعال</option>
          <option :value="false">غیرفعال</option>
        </select>
      </div>
      <div class="flex px-6 mt-6 border-t py-4">
        <button
          class="text-sm p-3 bg-[#155EEF] border rounded-lg w-1/2 text-white"
          @click="filterAccounts"
        >
          تایید
        </button>
        <button
          class="text-sm p-3 border rounded-lg mr-2 w-1/2"
          @click="showFilterModal = false"
        >
          انصراف
        </button>
      </div>
    </r-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed, watch } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { accounts } from '../assets/accounts.js'

const router = useRouter();
const showDeleteModal = ref(false);
const showFilterModal = ref(false)
const showEditModal = ref(false);
const toast = useToast();
const search = ref("");
const selectedItems = ref([]);
const displayCount = ref(10)
const items = ref(accounts)
const cardReaderStatus = ref(true)
const portalStatus = ref(true)
const header = reactive([
  {
    name: "عنوان حساب",
    value: "accountTitle"
  },
  {
    name: "کد حساب",
    value: "accountCode"
  },
  {
    name: "شماره حساب",
    value: "accountNumber"
  },
  {
    name: "شماره شبا",
    value: "shaba"
  },
  {
    name: "شماره کارت",
    value: "cardNumber"
  },
  {
    name: "وضعیت درگاه",
    value: "portalStatus"
  },
  {
    name: "وضعیت کارتخوان",
    value: "cardReaderStatus"
  }
]);
const getBankAccounts = computed(() => {
  return items.value.slice(0, displayCount.value)
})
const handleShowMore = () => {
  if (items.value.length <= displayCount.value) {
    toast.info('سطر بیشتری وجود ندارد...')
    return
  } 
  displayCount.value = displayCount.value + 10
}
const handleOnSelectItem = (item) => {
  selectedItems.value = item
}
const deleteItems = () => {
  selectedItems.value.map((item) => {
    items.value.splice(item, 1)
  })
  showDeleteModal.value = false
  selectedItems.value = []
  toast.success('آیتم های مورد نظر حذف شد')
}
watch(search, async () => {
  searchItems()
})
const searchItems = () => {
  items.value = accounts
  const res = items.value.filter((item)=>{
    return item.accountTitle.includes(search.value) || item.accountCode.includes(search.value) || item.accountNumber.includes(search.value) || item.shaba.includes(search.value) || item.cardNumber.includes(search.value)
  })
  items.value = res
}
const filterAccounts = () => {
  items.value = accounts
  
  const res = items.value.filter((item)=>{
    console.log(item.portalStatus, portalStatus.value);
    return item.portalStatus === portalStatus.value && item.cardReaderStatus === cardReaderStatus.value
  })
  console.log(res)
  items.value = res
  showFilterModal.value = false
}
</script>
<style scoped></style>
