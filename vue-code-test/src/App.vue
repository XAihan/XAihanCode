<script setup lang="ts">
import axios from 'axios';
import { ref } from "vue";
import { handleCompressFile } from "./util/compressImg.js";
const upFileRef = ref();
const uploadImg = async () => {
  let file = upFileRef.value.files[0]
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
	const forms = new FormData();
  file = await handleCompressFile(file)
  console.log(file);
	forms.append('data', file);
	axios.post('/api/img/comprocess', forms, config);
};

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
