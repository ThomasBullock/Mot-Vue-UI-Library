<template>
  <div class="rounded-xl border-2 border-grey-800 bg-grey-50 p-4 sm:p-6">
    <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
      <p class="text-xs font-semibold uppercase tracking-wide text-grey-700">Parent scope</p>
      <p class="font-mono text-xs text-grey-500">RenderScopeDemo.vue</p>
    </div>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
      <label class="block min-w-0 flex-1 text-sm font-medium text-grey-900">
        parentName
        <input v-model="parentName" :class="inputClasses" />
      </label>
      <div class="flex items-center gap-2">
        <p class="text-sm font-medium text-grey-900">parentCount: {{ parentCount }}</p>
        <BaseButton variant="secondary" @click="parentCount += 1">+1</BaseButton>
      </div>
    </div>

    <p class="mt-3 text-sm text-grey-600">
      Slot content below is written here, in the parent. It always sees
      <span class="font-mono text-grey-900">parentName</span> /
      <span class="font-mono text-grey-900">parentCount</span>. Child data is only visible when the
      child passes it as slot props.
    </p>

    <div class="mt-6 grid gap-4 lg:grid-cols-2">
      <div>
        <h3 class="mb-2 text-sm font-semibold text-grey-900">Plain slot</h3>
        <PlainSlotHost>
          <div class="rounded-md border-2 border-dashed border-grey-600 bg-white p-3">
            <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-grey-700">
              Slot content — compiled in parent
            </p>
            <dl class="space-y-2">
              <div class="flex items-baseline justify-between gap-3">
                <dt class="font-mono text-xs text-grey-600">parentName</dt>
                <dd class="text-right text-sm">
                  <span class="font-medium text-grey-900">{{ parentName }}</span>
                  <span class="ml-2 text-xs font-medium text-success-700">available</span>
                </dd>
              </div>
              <div class="flex items-baseline justify-between gap-3">
                <dt class="font-mono text-xs text-grey-600">parentCount</dt>
                <dd class="text-right text-sm">
                  <span class="font-medium text-grey-900">{{ parentCount }}</span>
                  <span class="ml-2 text-xs font-medium text-success-700">available</span>
                </dd>
              </div>
              <div class="flex items-baseline justify-between gap-3">
                <dt class="font-mono text-xs text-grey-600">secret</dt>
                <dd class="text-right text-sm">
                  <span class="text-grey-400">—</span>
                  <span class="ml-2 text-xs font-medium text-danger-700">not in this scope</span>
                </dd>
              </div>
              <div class="flex items-baseline justify-between gap-3">
                <dt class="font-mono text-xs text-grey-600">count</dt>
                <dd class="text-right text-sm">
                  <span class="text-grey-400">—</span>
                  <span class="ml-2 text-xs font-medium text-danger-700">not in this scope</span>
                </dd>
              </div>
            </dl>
          </div>
        </PlainSlotHost>
        <pre
          v-pre
          class="mt-3 overflow-x-auto rounded-md bg-grey-900 p-3 font-mono text-xs text-grey-100"
        ><code>&lt;!-- child --&gt;
&lt;slot /&gt;

&lt;!-- parent: slot content cannot see child data --&gt;
&lt;PlainSlotHost&gt;
  {{ parentName }}
&lt;/PlainSlotHost&gt;</code></pre>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold text-grey-900">Scoped slot</h3>
        <ScopedSlotHost #default="{ secret, count }">
          <div class="rounded-md border-2 border-dashed border-grey-600 bg-white p-3">
            <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-grey-700">
              Slot content — compiled in parent
            </p>
            <dl class="space-y-2">
              <div class="flex items-baseline justify-between gap-3">
                <dt class="font-mono text-xs text-grey-600">parentName</dt>
                <dd class="text-right text-sm">
                  <span class="font-medium text-grey-900">{{ parentName }}</span>
                  <span class="ml-2 text-xs font-medium text-success-700">available</span>
                </dd>
              </div>
              <div class="flex items-baseline justify-between gap-3">
                <dt class="font-mono text-xs text-grey-600">parentCount</dt>
                <dd class="text-right text-sm">
                  <span class="font-medium text-grey-900">{{ parentCount }}</span>
                  <span class="ml-2 text-xs font-medium text-success-700">available</span>
                </dd>
              </div>
              <div class="flex items-baseline justify-between gap-3">
                <dt class="font-mono text-xs text-grey-600">secret</dt>
                <dd class="text-right text-sm">
                  <span class="font-medium text-grey-900">{{ secret }}</span>
                  <span class="ml-2 text-xs font-medium text-success-700">slot prop</span>
                </dd>
              </div>
              <div class="flex items-baseline justify-between gap-3">
                <dt class="font-mono text-xs text-grey-600">count</dt>
                <dd class="text-right text-sm">
                  <span class="font-medium text-grey-900">{{ count }}</span>
                  <span class="ml-2 text-xs font-medium text-success-700">slot prop</span>
                </dd>
              </div>
            </dl>
          </div>
        </ScopedSlotHost>
        <pre
          v-pre
          class="mt-3 overflow-x-auto rounded-md bg-grey-900 p-3 font-mono text-xs text-grey-100"
        ><code>&lt;!-- child --&gt;
&lt;slot :secret="secret" :count="count" /&gt;

&lt;!-- parent: still parent scope, plus slot props --&gt;
&lt;ScopedSlotHost #default="{ secret, count }"&gt;
  {{ parentName }} {{ secret }}
&lt;/ScopedSlotHost&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import { CONTROL_BASE_CLASSES, CONTROL_FOCUS_CLASSES, CONTROL_SIZE_CLASSES } from '@/constants/ui';
import { ref } from 'vue';
import PlainSlotHost from './PlainSlotHost.vue';
import ScopedSlotHost from './ScopedSlotHost.vue';

const parentName = ref('Ada');
const parentCount = ref(0);

const inputClasses = [
  'mt-1 w-full border-grey-300 bg-white px-3 text-grey-900',
  CONTROL_BASE_CLASSES,
  CONTROL_SIZE_CLASSES,
  CONTROL_FOCUS_CLASSES,
].join(' ');
</script>
