<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
// import { handleCompressFile } from "./util/compressImg.js";
import { handleCompressFile } from './util/compressImg2.js';
const upFileRef = ref();
const config = {
	headers: {
		'Content-Type': 'multipart/form-data',
	},
};
const uploadImg = async () => {
	let file = upFileRef.value.files[0];

	const forms = new FormData();
	file = await handleCompressFile(file);
	console.log(file);
	forms.append('data', file);
	axios.post('/api/img/comprocess', forms, config).then((res) => {
		console.log(res.data.fileData[0]);
	});
};

const test = () => {
	const offscreen = new OffscreenCanvas(256, 256);
	const gl = offscreen.getContext('webgl');
	offscreen.convertToBlob().then((blob) => {
		const forms = new FormData();
    const file = new window.File([blob],'a.png')
    const file = new File([blob],'a.png')
    
		// forms.append('data', blob,'aaaa.png');
		forms.append('data', file);
		axios.post('/api/img/comprocess', forms, config).then((res) => {
			console.log(res.data.fileData[0]);
		});
	});
};

test();
</script>

<template>
	<div>
		<input ref="upFileRef" type="file" name="" id="upFileId" />
		<div @click="uploadImg">上传</div>
	</div>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
