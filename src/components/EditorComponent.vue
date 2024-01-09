<script lang="ts" setup>
import {computed, ref} from "vue";
import 'ace-builds/src-noconflict/mode-dockerfile';
import 'ace-builds/src-noconflict/mode-makefile';
import 'ace-builds/src-noconflict/mode-yaml';

import 'ace-builds/src-noconflict/theme-twilight';

defineEmits(['update:content'])
const props = defineProps<{
  content?: string
  name: string
  lang: string
}>()

const editor = ref<AceAjax.Editor>()
const contentValue = props.content

const initEditor = () => {
  editor.value = ace.edit(props.name);
}

</script>

<template  v-if="content">
    <v-ace-editor
        :id="name"
        class="editor"
        @init="initEditor"
        @change="$emit('update:content', contentValue)"
        v-model:value="contentValue"
        theme="twilight"
        :lang="lang"
    />
</template>

<style>
.editor {
  width: 100%;
  height: 200px;
}
</style>
