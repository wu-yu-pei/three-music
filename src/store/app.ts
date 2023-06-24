import { defineStore } from 'pinia';

interface AppState {
  appBg: string;
  musicList: any[];
  isPlaying: boolean;
  audioRef: HTMLAudioElement | null;
  currentMusicInfo: any;
  currentMusicLyric: string;
}

const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      appBg: '',
      musicList: [],
      audioRef: null,
      isPlaying: false,
      currentMusicInfo: {},
      currentMusicLyric: '',
    };
  },
  actions: {},
});

export default useAppStore;
