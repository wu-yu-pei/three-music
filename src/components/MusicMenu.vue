<template>
  <div class="music-menu">
    <div class="music-menu-item music-menu-item-title">
      <div class="music-menu-item-index"></div>
      <div class="music-menu-item-bg">图片</div>
      <div class="music-menu-item-name">歌曲名称</div>
    </div>
    <div class="music-menu-item" :class="{ active: appStore.currentMusicInfo.id === item.id && appStore.isPlaying }" v-for="(item, index) in list.concat(list)" :key="index">
      <div class="music-menu-item-index">{{ index + 1 }}</div>
      <div class="music-menu-item-bg">
        <img :src="item.al.picUrl" alt="" />
      </div>
      <div class="music-menu-item-name">{{ item.name }}</div>
      <div class="music-menu-item-control" @click="handleMusicItemClick(item)">
        <template v-if="appStore.currentMusicInfo.id == item.id && appStore.isPlaying">
          <span class="i-mdi-pause"></span>
        </template>
        <template v-else>
          <span class="i-mdi-step-forward"></span>
        </template>
      </div>
      <div class="music-menu-item-add">
        <span class="i-mdi-plus"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useAppStore from '../store/app';

const list = ref<any[]>([]);
const appStore = useAppStore();

//  获取歌曲列表数据
fetch('http://localhost:3000/playlist/detail?id=49242031')
  .then((response) => response.json())
  .then((data) => {
    list.value = data.playlist.tracks;
    appStore.currentMusicInfo = list.value[0];
    getSongUrl(list.value[0].id);
  });

// 歌曲点击
function handleMusicItemClick(item: any) {
  if (item.id === appStore.currentMusicInfo.id) {
    appStore.isPlaying = !appStore.isPlaying;
  } else {
    appStore.currentMusicInfo = item;
    appStore.isPlaying = false;
    // 这里需要放进timeout里一下
    setTimeout(() => {
      appStore.isPlaying = true;
    });
  }

  // 获取播放链接
  getSongUrl(item.id);
  // 获取音乐歌词
  getSongLyric(item.id);
}

// 获取歌曲播放url
function getSongUrl(id: number) {
  fetch(`http://localhost:3000/song/url?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      appStore.currentMusicInfo.songUrl = data.data[0].url;
    });
}

// 获取歌曲播放url
function getSongLyric(id: number) {
  fetch(`http://localhost:3000/lyric?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      appStore.currentMusicLyric = data.lrc.lyric;
    });
}
</script>

<style scoped lang="less">
.music-menu {
  height: 70%;
  overflow: scroll;
  font-size: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);

  &-item {
    display: grid;
    gap: 0 40px;
    grid-template-columns: 10px 50px 1fr 20px 20px;
    align-items: center;
    padding: 0 30px;
    margin-bottom: 10px;
    height: 50px;
    cursor: pointer;
    &-title {
      background-color: transparent;
      cursor: auto !important;
      &:hover {
        background-color: transparent !important;
      }
    }
    &:first-child {
      position: sticky;
      top: 0;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
    &.active {
      background-color: rgba(0, 0, 0, 0.2);
    }
    &-index {
      width: 10px;
    }
    &-bg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-control,
    &-add {
      span {
        display: block;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
