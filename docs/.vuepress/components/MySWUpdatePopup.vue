<template>
  <SWUpdatePopup v-slot="{ enabled, reload, message, buttonText }">
    <div
      v-if="enabled"
      class="my-sw-update-popup">
      {{ message }}<br>
      <button @click="reload">{{ buttonText }}</button>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue'

export default {
  components: { SWUpdatePopup }
}
</script>

<style>
.my-sw-update-popup {
  text-align: right;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  font-size: 20px;
  padding: 10px;
  border: 5px solid #4569d4;
}

.my-sw-update-popup button {
  color: #fff;
  background-color: #4569d4;
  border-bottom: 1px solid #4569d4;
  transition: background-color .1s ease;
  border-radius: 4px;
}
</style>