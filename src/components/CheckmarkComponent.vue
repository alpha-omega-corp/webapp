<script lang="ts" setup>
import { CheckCircleIcon, NoSymbolIcon } from '@heroicons/vue/20/solid'

const props = defineProps([
    'checked'
])
</script>

<template>
    <div class="flex items-center">
        <CheckCircleIcon
            v-show="props.checked"
            class="w-5 h-5 text-green-500"
        />
        <NoSymbolIcon
            v-show="!props.checked"
            class="w-5 h-5 text-red-500"
        />
    </div>

</template>