<script lang="ts" setup>

interface Props {
  label?: string
  modelValue: File[]
  dependOn?: string
  rules?: any[]
  multiple?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const isLoading = ref<boolean>(false)

const paths = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

</script>

<template>
  <!-- <VFileInput v-model:model-value="paths" variant="outlined" clearable :label="props.label" :multiple="props.multiple"
    chips :rules="props.rules" :loading="isLoading" /> -->
  <v-file-input v-model:model-value="paths" color="deep-purple-accent-4" counter :multiple="props.multiple"
    :label="props.label" prepend-icon="mdi-paperclip" variant="outlined" :show-size="1000" clearable :loading="isLoading"
    chips :rules="props.rules">
    <template v-slot:selection="{ fileNames }">
      <template v-for="(fileName, index) in fileNames" :key="fileName">
        <v-chip v-if="index < 2" color="deep-purple-accent-4" label size="small" class="me-2">
          {{ fileName }}
        </v-chip>

        <span v-else-if="index === 2" class="text-overline text-grey-darken-3 mx-2">
          +{{ paths.length - 2 }} File(s)
        </span>
      </template>
    </template>
  </v-file-input>
</template>
