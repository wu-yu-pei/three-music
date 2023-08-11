<template>
  <div class="music-left">
    <div class="music-left-title">{{ appStore.currentMusicInfo.name }}</div>
    <div class="music-left-body" ref="bodyRef">
      <template v-for="(item, index) in lyric" :key="index">
        <div class="music-left-body-lyric" :class="{ active: currentIndex == index }" :style="{ marginTop: index == 0 ? '200px' : '20px', marginBottom: index == lyric.length - 1 ? '200px' : '20px' }">
          {{ item.lyric }}
        </div>
      </template>
    </div>
    <div class="music-left-time">
      <input type="range" name="" id="" :value="dt" @click="dtClick" />
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
import useAppStore, { AppState } from '../store/app';
import { computed, ComputedRef, ref } from 'vue';
const appStore: AppState = useAppStore();
const { currentMusicLyric, audioRef, currentTime, currentMusicInfo } = storeToRefs(appStore);
import { useMouseInElement } from '@vueuse/core';
let bodyRef = ref<HTMLElement>();
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

  return lyricData;
}

const lyric: ComputedRef<{ time: number; lyric: string }[]> = computed(() => {
  return handleLyric(currentMusicLyric.value);
});

function handleIconClick() {
  appStore.isPlaying = !appStore.isPlaying;
}

const currentIndex = computed(() => {
  const index = lyric.value.findIndex((item) => appStore.currentTime < item.time);

  if (bodyRef.value && isOutside.value) {
    console.log('---');

    bodyRef.value.scrollTop = index * 20;
  }
  return lyric.value.findIndex((item, _) => appStore.currentTime < item.time);
});

const { isOutside } = useMouseInElement(bodyRef);

const dt = computed(() => {
  return (currentTime.value / currentMusicInfo.value.dt) * 100;
});

function dtClick(e: any) {
  currentTime.value = (e.target.value / 100) * currentMusicInfo.value.dt;

  audioRef.value.currentTime = currentTime.value / 1000;
}
</script>

<style scoped lang="less">
.music-left {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr 50px 80px;
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
    scroll-behavior: smooth;
    &-lyric {
      height: 20px;
      margin: 20px 0;
      text-align: center;
      transition: all linear 0.2s;
      overflow: hidden;
      text-overflow: ellipsis;
      &.active {
        color: yellow;
        transform: scale(1.3);
      }
    }
  }
  &-time {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    input {
      display: block;
      width: 100%;
      height: 100%;
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

input[type='range'] {
  -webkit-appearance: none;
  height: 10px;
  border-radius: 5px;
  background: #ccc;
}
</style>
