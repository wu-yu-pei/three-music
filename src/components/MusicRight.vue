<template>
  <div class="music-right">
    <MusicMenu></MusicMenu>
    <MusicThree></MusicThree>
  </div>
</template>

<script setup lang="ts">
import MusicMenu from './MusicMenu.vue';
import MusicThree from './MusicThree.vue';
</script>

<style scoped lang="less">
.music-right {
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  box-shadow: -1px 0px 2px rgba(0, 0, 0, 0.4);
}
</style>
