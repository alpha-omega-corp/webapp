<script lang="ts" setup>
import {ActionType} from "@enums/action";
import {ref} from "vue";
import DeleteIcon from "@/icons/DeleteIcon.vue";
import UpdateIcon from "@/icons/UpdateIcon.vue";
import CreateIcon from "@/icons/CreateIcon.vue";

interface Button {
  action?: ActionType
  text?: string
  submit?: boolean
  background?: boolean
}

const props = withDefaults(defineProps<Button>(), {
  action: ActionType.DISPLAY,
  background: true,
  submit: false,
})

const actionStyles = ref<string>('flex gap-2 items-center ')
  switch (props.action) {
    case ActionType.DELETE:
      setColor('delete')
      break
    case ActionType.UPDATE:
      setColor('update')
      break
    case ActionType.CREATE:
      setColor('create')
      break
    case ActionType.DISPLAY:
      setColor('display')
      break
  }

function setColor(color: string) {
  if (props.background) {
    actionStyles.value += `btn-${color}`
  } else {
    actionStyles.value += `btn-icon-${color}`
  }
}

</script>

<template>
  <!-- Action Buttons -->
  <button :type="submit ? 'submit' : 'button'" :class="actionStyles">

    <!-- Icons -->
    <span v-if="action">
        <DeleteIcon v-if="action == ActionType.DELETE"/>
        <UpdateIcon v-if="action == ActionType.UPDATE"/>
        <CreateIcon v-if="action == ActionType.CREATE"/>
      </span>

    <slot/>

    <span v-if="text">{{ text }}</span>
  </button>
</template>