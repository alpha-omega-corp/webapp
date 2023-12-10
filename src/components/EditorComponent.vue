<script lang="ts" setup>
import {ref} from "vue";
import 'ace-builds/src-noconflict/mode-dockerfile';
import 'ace-builds/src-noconflict/theme-twilight';


const props = defineProps([
    'inputName',
    'inputValue'
])
const emits = defineEmits([
    "editorInput"
])

const content = ref<string>('')
const editor = ref<AceAjax.Editor>()
const initEditor = () => {
  editor.value = ace.edit("editor");
}

</script>

<template>
  <v-ace-editor
      id="editor"
      :value="inputValue ?? ''"
      @change="$emit('editorInput', content)"
      v-model:value="content"
      @init="initEditor"
      theme="twilight"
      lang="dockerfile"
  />
</template>

<style>
#editor {
  width: 100%;
  height: 200px;
}
</style>
