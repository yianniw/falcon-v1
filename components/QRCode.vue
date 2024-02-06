<script setup lang="ts">
// https://www.npmjs.com/package/qrcode-generator
import QRCode from 'qrcode-generator';
const props = defineProps(['value']);
const qrString = ref();

onMounted(() => {
  const qrObj = QRCode(3, 'L');
  qrObj.addData(props.value);
  qrObj.make();
  qrString.value = qrObj.createDataURL();
});
</script>

<template>
  <img :src="qrString" />
</template>