<script lang="ts" setup>
import {ref} from "vue";
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/mode-dockerfile';
import 'ace-builds/src-noconflict/mode-makefile';
import 'ace-builds/src-noconflict/mode-yaml';

defineEmits(['update:content'])
const props = defineProps<{
  content?: string
  name: string
  lang: string
}>()

const editor = ref<AceAjax.Editor>()
const contentValue = props.content ? props.content : ''

const initEditor = () => {
  editor.value = ace.edit(props.name);
}
</script>

<template>
  <div class="editor-container">
    <v-ace-editor
        :id="name"
        v-model:value="contentValue"
        :lang="lang"
        class="editor"
        theme="twilight"
        @change="$emit('update:content', contentValue)"
        @init="initEditor"
    />

    <div class="editor-actions">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-container {
  padding: 20px;
  background-color: #232323;
  display: flex;
  gap: 20px;

  .editor-actions {
    margin-bottom: 40px;
  }

  .editor {
    width: 100%;
    height: 200px;
    font-size: medium;
  }
}
</style>
