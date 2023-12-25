<script lang="ts" setup>
import EditorComponent from "@Components/EditorComponent.vue";
import {CheckCircleIcon} from '@heroicons/vue/24/solid'
import {ref} from "vue";
import {apiPostFormData} from "@/axios";
import InputComponent from "@Components/InputComponent.vue";

const editorContent = ref<string>('')
const workDir = ref<string>('')
const tag = ref<string>('')

const editorCallback = (content: string) => {
  editorContent.value = content
}

function download(url: string) {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'file.txt');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function toFile() {
  const blob = new Blob([editorContent.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob)

  const formData = new FormData();
  formData.append('dockerfile', blob, url);
  formData.append('workdir', workDir.value.toLowerCase());
  formData.append('tag', tag.value)

  apiPostFormData('/package', formData)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
}
</script>

<template>

  <h1 class="text-center font-bold uppercase mb-10">New Container</h1>

  <div class="mb-10">
    <EditorComponent name="editor" input-value="" @editor-input="editorCallback"/>

    {{editorContent}}
  </div>

  <div class="flex">
    <InputComponent
        type="text"
        label="Working Directory"
        hint="The working directory of the dockerfile"
        v-model:value="workDir" />

    <InputComponent
        type="text"
        label="Image Tag"
        v-model:value="tag" />
  </div>
  <br>
  <button type="button"
          @click="toFile()"
          class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
    Test
  </button>

</template>

