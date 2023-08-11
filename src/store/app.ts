import { defineStore } from 'pinia';

export interface AppState {
  appBg: string;
  musicList: any[];
  isPlaying: boolean;
  audioRef: HTMLAudioElement | null;
  currentMusicInfo: any;
  currentMusicLyric: string;
  currentTime: number;
  currentValue: number;
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
      currentTime: 0,
      currentValue: 0,
    };
  },
  actions: {},
});

export default useAppStore;
