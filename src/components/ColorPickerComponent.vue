<script lang="ts" setup>

import ButtonComponent from "@components/ButtonComponent.vue";
import {ActionType} from "@enums/action";
import {ref} from "vue";

const colorPicker = ref()

defineProps<{
  label: string
}>()

</script>

<template>

<div class="flex justify-between gap-4">
  <div class="relative color-picker-container">
    <input :id="label" ref="colorPicker" class="color-picker" type="color"/>
    <label @click="" class="color-picker-label">{{label}}</label>
  </div>

  <ButtonComponent
      text="Color"
      :action="ActionType.UPDATE"
      @click="colorPicker.click()"/>

</div>
</template>

<style scoped>

.color-picker {
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: 40px;
}

.color-picker-container {
  width: 75px;
  height: 32px;
}

.color-picker-label {
  position: absolute;
  color: #ffffff;
  left: 0;
  right: 0;
  width: 100%;
  height: 32px;
  text-align: center;
  font-size: small;
  top: 0;
  bottom: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>