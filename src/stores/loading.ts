import { defineStore } from 'pinia'

export const useLoadongStore = defineStore({
  id: 'loading',
  state: () => ({
    loading: false,
  }),
  getters: {
    getLoading: (state) => state.loading,
  },
  actions: {
    showLoading(value: boolean) {
      this.loading = value
    },
  },
})
