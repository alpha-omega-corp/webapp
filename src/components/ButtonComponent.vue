<script lang="ts" setup>
import {ActionType} from "@enums/action";
import {ref} from "vue";
import DeleteIcon from "@/icons/DeleteIcon.vue";
import UpdateIcon from "@/icons/UpdateIcon.vue";
import CreateIcon from "@/icons/CreateIcon.vue";
import DisplayIcon from "@/icons/DisplayIcon.vue";

interface Button {
  action: ActionType
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
    setColor('red')
    break
  case ActionType.UPDATE:
    setColor('blue')
    break
  case ActionType.CREATE:
    setColor('orange')
    break
  case ActionType.DISPLAY:
    setColor('cyan')
    break
}

function setColor(color: string) {
  if (props.background) {
    actionStyles.value += `btn-light-${color}`
  } else {
    actionStyles.value += `btn-icon-${color}`
  }


}
</script>

<template>

  <!-- Action Buttons -->
  <button :type="submit ? 'submit' : 'button'" :class="actionStyles">

    <!-- Icons -->
    <span v-if="!submit">
      <DeleteIcon v-if="action == ActionType.DELETE"/>
      <UpdateIcon v-if="action == ActionType.UPDATE"/>
      <CreateIcon v-if="action == ActionType.CREATE"/>
      <DisplayIcon v-if="action == ActionType.DISPLAY"/>
    </span>


    <span v-if="text">{{ text }}</span>
  </button>

</template>