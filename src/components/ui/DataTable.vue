<template>
  <div class="overflow-x-auto">
    <template v-if="items && !loading">
      <table class="min-w-full text-center">
        <thead class="dark:bg-zinc-700 bg-gray-50">
          <tr class="">
           <th class="w-12">
              <input type="checkbox" id="itemCheckbox" value="checked" class="relative peer rounded-md shrink-0 appearance-none w-5 h-5 border-2 bg-white mt-1 checked:bg-blue-100 checked:border-blue-500"
              @click="slectAllItems()"
              />
              <svg
                class="absolute top-1 right-4 w-3 h-3 mt-3 hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#155EEF"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </th>
            <th
              v-for="header in headers"
              :key="header.i"
              scope="col"
              class="text-sm text-center first:rounded-tr-xl last:rounded-tl-xl font-medium text-gray-900 px-6 py-3"
            >
              {{ header.name }}
            </th>
            <th
              class="sticky-col-th text-sm text-center first:rounded-tr-xl last:rounded-tl-xl font-medium text-gray-900 px-6 py-3"
            >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in getItemPerPage"
            :key="index"
            class="bg-white border-b border-r border-l"
          >
            <td class="w-12">
              <input v-model="selection" type="checkbox" :value="index" class="relative peer rounded-md shrink-0 appearance-none w-5 h-5 border-2 bg-white mt-1 checked:bg-blue-100 checked:border-blue-500"
              />
              <svg
                class="absolute top-4 right-4 w-3 h-3 mt-2 hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#155EEF"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </td>
            <td
              v-if="withNumber"
              class="py-5 whitespace-nowrap font-medium text-gray-900"
            >
              {{ tableCounter(item) + index + 1 }}
            </td>
            <td
              v-for="header in headers"
              :key="header.i"
              class="py-5 whitespace-nowrap font-medium text-gray-900"
            >
              <slot :name="`item-${header.value}`" :item="item">
                {{ item[header.value] }}
              </slot>
            </td>
            <td class="sticky-col py-5 whitespace-nowrap font-medium text-gray-900"
            >
              <slot name="item-actions" :item="item">
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="paginate && items.length"
        class="mt-8 p-2 text-dark-800 cursor-pointer text-center"
      >
        <i class="icon-arrow-left align-middle" @click="perPage()" />

        <ul class="inline-block">
          <li
            v-for="i in getPages"
            :key="i"
            class="inline-block mx-3"
            :class="{
              'bg-purple-500 text-white rounded-full py-1 px-3': current === i
            }"
            @click="setPage(i)"
          >
            {{ i }}
          </li>
        </ul>
        <i class="icon-arrow-right align-middle" @click="nextPage()" />
      </div>
    </template>
    <tableSkeleton v-else />
    <div
      v-if="!loading && items.length == 0"
      class="text-center bg-white py-4 rounded-b-lg"
    >
      محتوایی وجود ندارد !
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
export interface Props {
  headers: [];
  items: [];
  withNumber?: boolean;
  paginate?: boolean;
  serverSync?: boolean;
  itemPerPage?: number;
  totalPage?: number;
  currentPage?: number;
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
  items: () => [],
  withNumber: false,
  paginate: false,
  serverSync: false,
  itemPerPage: 5,
  totalPage: 0,
  currentPage: 1,
  loading: false,
});
const emit = defineEmits(["update:currentPage", 'select']);
const current = ref(props.currentPage);
const selection = ref([])
function perPage() {
  if (current.value <= 1) {
    return;
  }
  current.value = current.value - 1;
  emit("update:currentPage", current.value);
}
function nextPage() {
  if (props.currentPage === props.totalPage) return;
  current.value = current.value + 1;
  emit("update:currentPage", current.value);
}
function setPage(i: number) {
  current.value = i;
  emit("update:currentPage", i);
}
const getPageCount = computed(() => {
  if (props.serverSync && props.totalPage) return props.totalPage;
  return Math.ceil(props.items.length / props.itemPerPage);
});

const getItemPerPage = computed(() => {
  if (!props.paginate || (props.paginate && props.serverSync)) {
    return props.items;
  }
  const start = (current.value - 1) * props.itemPerPage;

  return props.items.slice(start, start + props.itemPerPage);
});
const getPages = computed(() => {
  const numShown = Math.min(6, getPageCount.value);
  let first = current.value - Math.floor(numShown / 2);
  first = Math.max(first, 1);
  first = Math.min(first, getPageCount.value - numShown + 1);
  return [...Array(numShown)].map((_k, i) => i + first);
});
const tableCounter = () => {
  return (props.currentPage - 1) * props.itemPerPage;
};
const slectAllItems = () => {
  const el = document.getElementById('itemCheckbox')
  if (el.checked) {
    selection.value = []
    props.items.map((item, index) => selection.value.push(index))
  } else {
    selection.value = []
  }
}
watch(selection, async () => {
  emit('select', selection.value)
})
</script>

<style scoped>
table {
  @apply overflow-scroll
}
tr:first-child td:first-child {
  @apply rounded-tr-xl;
}

tr:first-child td:last-child {
  @apply rounded-tl-xl;
}

tr:last-child td:first-child {
  @apply rounded-br-xl;
}

tr:last-child td:last-child {
  @apply rounded-bl-xl;
}
.sticky-col {
  position: -webkit-sticky;
  position: sticky;
  background-color: white;
  width: 300px;
  min-width: 100px;
  max-width: 300px;
  left: 0px;
}
.sticky-col-th {
  position: -webkit-sticky;
  position: sticky;
  background-color: #f9fafb;
  width: 300px;
  min-width: 100px;
  max-width: 300px;
  left: 0px;
}

</style>
