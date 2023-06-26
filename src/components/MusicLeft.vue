<template>
  <div class="music-left">
    <div class="music-left-title">{{ appStore.currentMusicInfo.name }}</div>
    <div class="music-left-body">
      <template v-for="(item, index) in lyric" :key="index">
        <div class="music-left-body-lyric" :style="{ marginTop: index == 0 ? '200px' : '20px', marginBottom: index == lyric.length - 1 ? '200px' : '20px' }">
          {{ item.lyric }}
        </div>
      </template>
    </div>
    <div class="music-left-control">
      <div class="music-left-control-pre">
        <span class="i-mdi-skip-previous"></span>
      </div>
      <div class="music-left-control-icon" @click="handleIconClick">
        <template v-if="appStore.isPlaying">
          <span class="i-mdi-pause"></span>
        </template>
        <template v-else>
          <span class="i-mdi-step-forward"></span>
        </template>
      </div>
      <div class="music-left-control-next">
        <span class="i-mdi-skip-next"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useAppStore from '../store/app';
import { computed } from 'vue';
const appStore = useAppStore();
const { currentMusicLyric } = storeToRefs(appStore);

function handleLyric(lyric: string) {
  const lyrics = lyric.split('\n');
  const reg = /\[(\d{2}).(\d{2}).(\d{2,3})\]/;
  const lyricData = [];
  for (let i = 0; i < lyrics.length; i++) {
    if (!lyrics[i]) break;
    let timeResult: any = reg.exec(lyrics[i]);
    const m = timeResult[1] * 60 * 1000;
    const s = timeResult[2] * 1000;
    const msT = timeResult[3];
    const ms = msT.length === 2 ? msT * 10 : msT * 1;
    const time = m + s + ms;
    let lyric = lyrics[i].replace(reg, '');
    lyricData.push({ time, lyric });
  }
  console.log(lyricData);

  return lyricData;
}

const lyric = computed(() => {
  return handleLyric(currentMusicLyric.value);
});

function handleIconClick() {
  appStore.isPlaying = !appStore.isPlaying;
}
</script>

<style scoped lang="less">
.music-left {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr 80px;
  width: 30%;
  height: 100%;
  &-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 24px;
  }
  &-body {
    overflow-y: scroll;
    &-lyric {
      height: 20px;
      margin: 20px 0;
      text-align: center;
    }
  }
  &-control {
    display: flex;
    justify-content: space-around;
    align-items: center;
    > div {
      span {
        display: block;
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
    &-pre {
    }
    &-icon {
      span {
        width: 50px !important;
        height: 50px !important;
      }
    }
    &-next {
    }
  }
}
</style>
