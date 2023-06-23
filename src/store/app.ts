import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
  state: () => {
    return {
      appBg: '',
    };
  },
  actions: {},
});

export default useAppStore;
