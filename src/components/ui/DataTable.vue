<template>
  <div class="overflow-x-auto pb-4">
    <template v-if="items && !loading">
      <table class="min-w-full text-center">
        <thead class="dark:bg-zinc-700 bg-white">
          <tr>
            <th
              v-if="withNumber"
              class="text-sm text-center first:rounded-tr-xl last:rounded-tl-xl font-medium text-gray-900 px-6 py-2"
            >
              #
            </th>
            <th
              v-for="header in headers"
              :key="header.i"
              scope="col"
              class="text-sm text-center first:rounded-tr-xl last:rounded-tl-xl font-medium text-gray-900 px-6 py-2"
            >
              {{ header.name }}
            </th>
          </tr>
        </thead>
        <tbody class="top-3">
          <tr
            v-for="(item, index) in getItemPerPage"
            :key="item.i"
            class="even:bg-slate-50 odd:bg-slate-100"
          >
            <td
              v-if="withNumber"
              class="py-5 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ tableCounter(item) + index + 1 }}
            </td>
            <td
              v-for="header in headers"
              :key="header.i"
              class="py-5 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              <slot :name="`item-${header.value}`" :item="item">
                {{ item[header.value] }}
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
import { ref, computed } from "vue";
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
  loading: false
});
const emit = defineEmits(["update:currentPage"]);
const current = ref(props.currentPage);
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
</script>

<style scoped>
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
</style>
