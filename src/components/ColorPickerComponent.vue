<script lang="ts" setup>

defineProps<{
  label: string
}>()

</script>

<template>

<div class="relative">
  <input :id="label" class="color-picker" type="color"/>
  <label @click="" class="color-picker-label">{{label}}</label>
</div>

</template>

<style scoped>

.color-picker {
  width: 100%;
  height: 40px;
  padding: 0;
  border-radius: 5px;
  border: 1px solid #000000;
}

.color-picker-label {
  position: absolute;
  padding-top: 5px;
  color: #ffffff;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  text-align: center;
}

</style>