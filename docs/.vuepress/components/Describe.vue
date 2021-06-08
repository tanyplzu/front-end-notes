<template>
  <p class="demo">
    <slot></slot>
  </p>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {};
  },
};
</script>