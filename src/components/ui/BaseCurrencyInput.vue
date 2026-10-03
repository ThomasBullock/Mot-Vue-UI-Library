<template>
  <div :class="CURRENCY_FIELD_WRAPPER_CLASSES">
    <span :class="CURRENCY_ADORNMENT_CLASSES" aria-hidden="true">$</span>
    <BaseInput
      v-model="display"
      v-bind="$attrs"
      :class="CURRENCY_INPUT_CLASSES"
      inputmode="numeric"
      @input="handleInput"
      @focus="focused = true"
      @blur="handleBlur"
    />
  </div>
</template>
<script setup lang="ts">
import BaseInput from '@/components/ui/BaseInput.vue';
import {
  CURRENCY_ADORNMENT_CLASSES,
  CURRENCY_FIELD_WRAPPER_CLASSES,
  CURRENCY_INPUT_CLASSES,
} from '@/constants/ui';
import { formatCurrency, parseCurrency } from '@/utils/currency';
import { ref, watch } from 'vue';

defineOptions({ inheritAttrs: false });

const model = defineModel<number | null>({ default: null });
const emit = defineEmits(['blur']);

/* Refs */
const focused = ref(false);

const display = ref(formatCurrency(model.value));

/* Methods */

// Our handler and BaseInput's own @input both fire on the native input; we own
// the shown value, so BaseInput's update:modelValue emission is left unheard.
function handleInput(event: Event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) {
    return;
  }
  const value = parseCurrency(input.value);
  model.value = value;
  const digits = value == null ? '' : String(value);
  // Re-assert the field value so stripped characters actually disappear
  if (input?.value !== digits) {
    input.value = digits;
  }
  display.value = digits;
}

function handleBlur(event: Event) {
  display.value = formatCurrency(model.value);
  emit('blur', event);
}

watch(model, (value) => {
  if (focused.value) return; // optional: don’t stomp mid-edit
  display.value = formatCurrency(value);
});
</script>
