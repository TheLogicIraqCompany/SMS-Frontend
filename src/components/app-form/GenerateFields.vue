<script lang="ts" setup>
import type { FieldTypes } from './types'

interface Props {
  fields: FieldTypes[]
  body: any
}
const props = defineProps<Props>()
const emit = defineEmits(['update:body'])

const body = computed({
  get: () => props.body,
  set: val => emit('update:body', val),
})
</script>

<template>
  <VCol
    v-for="(field, index) in fields"
    :key="`field${index}`"
    cols="12"
    :class="{ 'd-none': field.isHidden }"
    :md="field.cols ?? 4"
  >
    <AppField
      v-model="body[field.modelValueKey as keyof typeof body]"
      :field="field"
    />
  </VCol>
</template>
