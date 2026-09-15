<template>
  <input v-model="model" v-bind="attrs" :class="INPUT_BASE_CLASSES" :type="type" />
</template>

<script setup lang="ts">
import { INPUT_BASE_CLASSES, INPUT_TYPE_DEFAULT, type InputType } from "@/constants/ui";
import { useAttrs } from "vue";

defineOptions({
  inheritAttrs: false,
});

const { type = INPUT_TYPE_DEFAULT } = defineProps<{
  type?: InputType;
}>();

const model = defineModel<string | number>({ default: "" });

/* Emits
Native events (@blur, @focus, @change, @input) do not need defineEmits.
defineModel gives us emit: update:modelValue 
*/

const attrs = useAttrs();
</script>
