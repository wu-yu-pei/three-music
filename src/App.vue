<template>
  <div class="body" :style="{ backgroundImage: `url(${appStore.currentMusicInfo.al && appStore.currentMusicInfo.al.picUrl})` }">
    <div class="wrapper">
      <MusicLeft></MusicLeft>
      <MusicRight></MusicRight>
    </div>
  </div>
</template>

<script setup lang="ts">
import MusicLeft from './components/MusicLeft.vue';
import MusicRight from './components/MusicRight.vue';
import useAppStore from './store/app';

const appStore = useAppStore();
</script>

<style scoped lang="less">
.body {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('/src/assets/bg.jpg');
  background-size: cover;
  transition: background-image linear 0.4s;
}

.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(20px) drop-shadow(4px 4px 10px blue);
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
