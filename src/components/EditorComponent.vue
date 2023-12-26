<script lang="ts" setup>
import {computed, ref} from "vue";
import 'ace-builds/src-noconflict/mode-dockerfile';
import 'ace-builds/src-noconflict/theme-twilight';

const props = defineProps<{
  content?: string
  name: string
  lang: string
}>()

defineEmits(['update:content'])


const editor = ref<AceAjax.Editor>()
const contentValue = props.content || ''

const initEditor = () => {
  editor.value = ace.edit(props.name);
  editor.value?.setValue(props.content || '', -1)
}

</script>

<template>
  <template v-if="content">

    <v-ace-editor
        :id="props.name"
        @init="initEditor"
        @change="$emit('update:content', contentValue)"
        v-model:value="contentValue"
        theme="twilight"
        :lang="lang"
    />

  </template>

</template>

<style>
#editor {
  width: 100%;
  height: 200px;
}
</style>
