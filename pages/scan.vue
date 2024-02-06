<script setup lang="ts">
// https://github.com/gruhn/vue-qrcode-reader
// https://www.npmjs.com/package/vue-qrcode-reader
// https://vue-qrcode-reader.netlify.app/demos/Validate.html
import { QrcodeStream } from 'vue-qrcode-reader';

definePageMeta({ middleware: ['admin-route'] });

const { auth } = useSupabaseClient();
const authUser = ref();

onMounted(async () => {
  const { data } = await auth.getUser();
  authUser.value = data.user;
});

const user = ref();
const isPaused = ref(false);
const isLoading = ref(true);
const errorMessage = ref();

const cameraReady = ref(false);

function paintTracking([qrCode]: any, ctx: CanvasRenderingContext2D) {
  const { boundingBox: { x, y, width, height } } = qrCode;
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#007bff';
  ctx.strokeRect(x, y, width, height);
}

async function onDetect([qrCode]: any) {
  try {
    navigator.vibrate(200);
    isLoading.value = true;
    showDialog();
    const userResult = await $fetch('/api/addPoint', {
      method: 'POST',
      body: { id: qrCode.rawValue, callee: authUser.value.id }
    });
    user.value = userResult;
    isLoading.value = false;
  } catch(error: any) {
    isLoading.value = false;
    if(error.statusCode === 403)
      errorMessage.value = "Error 403: You are not authorized to perform this action!";
    else if(error.statusCode === 404)
      errorMessage.value = "Error: Could not find member!";
    else
      errorMessage.value = "Error: Something went horribly wrong. Please try again.";
  }
}

const dialog = ref();

function showDialog() {
  dialog.value.showModal();
  isPaused.value = true;
}

function hideDialog() {
  user.value = null;
  errorMessage.value = null;
  dialog.value.close();
  setTimeout(() => { isPaused.value = false; }, 500);
}
</script>

<template>
  <div>
    <div class="camera-wrapper">
      <LoadingSpinner class="center"/>
      <QrcodeStream
        :paused="isPaused"
        :track="paintTracking"
        @camera-on="cameraReady = true"
        @detect="onDetect"
      />
    </div>
    
    <button @click="showDialog()">open dialog</button>
    <dialog ref="dialog">
      <div class="dialog-content">
        <LoadingSpinner v-if="isLoading" />
        <span v-else-if="user?.name">{{ user.name }}</span>
        <span v-else-if="errorMessage" class="error">{{ errorMessage }}</span>
        <button @click="hideDialog()">continue</button>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.camera-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius);
  font-size: 0px;
  width: 100%;
  height: 95vw;
  max-height: 80vh;
  box-shadow: var(--box-shadow);
  aspect-ratio: 1/1;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

dialog {
  position: relative;
  border-radius: var(--border-radius);
  border: none;
  width: 80vw;
  box-shadow: var(--box-shadow);
  background-color: var(--secondary);
}

.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  
  span {
    font-size: x-large;
    color: var(--text);

    &.error {
      color: var(--warning);
    }
  }

  button {
    background-color: var(--primary);
    border-radius: var(--border-radius);
    border: none;
    height: 60px;
    width: 80%;
    box-shadow: var(--box-shadow);
    font-family: var(--font-family);
    font-weight: 500;
    font-size: large;
    color: var(--background)
  }
}

dialog::backdrop {
  background-color: black;
  opacity: 0.4;
}

dialog[open] {
  animation: modal-in 500ms forwards ease;
}

@keyframes modal-in {
  from {
    translate: 0 100%;
    opacity: 0;
  }
}
</style>