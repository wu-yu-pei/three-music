<template>
  <div class="music-three">
    <audio ref="audioRef" crossOrigin="anonymous" :src="currentMusicInfo && currentMusicInfo.songUrl" controls></audio>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import useAppStore from '../store/app';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { currentMusicInfo, audioRef, isPlaying } = storeToRefs(appStore);

watch(
  () => appStore.isPlaying,
  (nVal, _) => {
    console.log(nVal);

    if (nVal) {
      audioRef.value?.play();
    } else {
      audioRef.value?.pause();
    }
  }
);

onMounted(() => {
  const containerEl = document.querySelector('.music-three')!;
  const audioEl = document.querySelector('audio')!;

  // 音频
  var dataArray: any = new Array(64).fill(10);
  var analyer: any;

  audioEl.addEventListener('play', () => {
    const audCtx = new AudioContext();
    const audSource = audCtx.createMediaElementSource(audioEl);
    analyer = audCtx.createAnalyser();
    analyer.fftSize = 64;
    dataArray = new Uint8Array(analyer.frequencyBinCount);
    audSource.connect(analyer);
    analyer.connect(audCtx.destination);
  });

  // 场景
  const scene = new THREE.Scene();

  // 相机
  const camera = new THREE.PerspectiveCamera(60, containerEl.clientWidth / containerEl.clientHeight, 0.1, 3000);
  camera.position.set(0, 0, 800);

  // 渲染器
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });

  renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
  document.querySelector('.music-three')!.appendChild(renderer.domElement);
  renderer.setClearAlpha(0.0);

  // 创建一个控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // 坐标系
  const axesHelper = new THREE.AxesHelper(containerEl.clientWidth / 2);
  scene.add(axesHelper);

  const cubes: any[] = [];
  const cubeWidth = 5;
  const cubeDepth = 10;
  const cubeY = 0;
  const cuveZ = containerEl.clientWidth / 4;
  const gap = 15;
  const count = dataArray.length;

  function initCube() {
    for (let i = 0; i < count; i++) {
      const cube = new Cube(cubeWidth, dataArray[i], cubeDepth, i * 15 + gap, cubeY, cuveZ, getRandomColor());
      scene.add(cube.cube);
      cubes.push(cube);
    }

    for (let i = 0; i > -count; i--) {
      const cube = new Cube(cubeWidth, dataArray[-i], cubeDepth, i * 15 + gap, cubeY, cuveZ, getRandomColor());
      scene.add(cube.cube);
      cubes.push(cube);
    }
  }

  initCube();

  function updateCube() {
    for (let i = 0; i < count; i++) {
      cubes[i].setHeight(dataArray[i]);
    }

    for (let i = count; i < count * 2; i++) {
      cubes[i].setHeight(dataArray[i - count]);
    }
  }

  function animate() {
    if (analyer && isPlaying.value) {
      analyer.getByteFrequencyData(dataArray);
      updateCube();
    }

    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = containerEl.clientWidth / containerEl.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
  });
});

class Cube {
  cube: THREE.Mesh;
  width: number;
  height: number;
  depth: number;
  x: number;
  y: number;
  z: number;
  color: string;

  constructor(width: number, height: number, depth: number, x: number, y: number, z: number, color: string) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);

    this.cube = cube;
  }

  setPosition(x: number, y: number, z: number) {
    this.cube.position.set(x, y, z);
  }

  setHeight(height: number) {
    this.cube.scale.set(1, height / this.height, 1);
  }
}

function getRandomColor() {
  return `rgb(${0},${255},${0})`;
}
</script>

<style scoped lang="less">
.music-three {
  width: 100%;
  height: 30%;
}
audio {
  position: absolute;
  width: 500px;
  height: 100px;
  display: none;
}
</style>
