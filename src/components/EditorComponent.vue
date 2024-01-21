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
  <v-ace-editor
      :id="name"
      v-model:value="contentValue"
      :lang="lang"
      class="editor"
      theme="twilight"
      @change="$emit('update:content', contentValue)"
      @init="initEditor"
  />
</template>

<style>
.editor {
  width: 100%;
  height: 200px;
}
</style>
