import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
  state: () => {
    return {
      appBg: '',

      musicList: [],

      currentMusic: {},
    };
  },
  actions: {},
});

export default useAppStore;
