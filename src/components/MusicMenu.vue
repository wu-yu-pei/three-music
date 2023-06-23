<template>
  <div class="music-menu">
    <div class="music-menu-item music-menu-item-title">
      <div class="music-menu-item-index"></div>
      <div class="music-menu-item-bg">图片</div>
      <div class="music-menu-item-name">歌曲名称</div>
    </div>
    <div class="music-menu-item" v-for="(item, index) in list.concat(list)" :key="index">
      <div class="music-menu-item-index">{{ index + 1 }}</div>
      <div class="music-menu-item-bg">
        <img :src="item.al.picUrl" alt="" />
      </div>
      <div class="music-menu-item-name">{{ item.name }}</div>
      <div class="music-menu-item-control" @click="handleMusicItemClick(index)">
        <span class="i-mdi-step-forward"></span>
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
import Add from '../icon/Add.vue';

const list = ref<any[]>([]);
const appStore = useAppStore();

//  获取数据
fetch('http://localhost:3000/playlist/detail?id=26467411')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    list.value = data.playlist.tracks;
  });

function handleMusicItemClick(index: number) {
  appStore.appBg = list.value[index].al.picUrl;
}
</script>

<style scoped lang="less">
.music-menu {
  height: 70%;
  border-right: 1px solid red;
  overflow: scroll;
  font-size: 12px;

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
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }
    &:hover {
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
