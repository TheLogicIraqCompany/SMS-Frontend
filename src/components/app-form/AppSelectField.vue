<script setup lang="ts">
import type { SelectableFieldType } from './types'
import { isEmpty } from '@/@core/utils'

import type { Response } from '@/models/Response'
import { useDependStore } from '@/stores/DependStore'
import axios from '@axios'

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const dependStore = useDependStore()
const isLoading = ref<boolean>(false)
const searchInput = ref<string>('')
interface Props {
  itemValue: string
  itemLabel: string
  items?: SelectableFieldType[]
  label?: string
  modelValue?: string | SelectableFieldType
  getUrl?: string
  dependOn?: string
  rules?: any[]
  multiple?: boolean
  fetchOnSearch?: boolean
  searchKey?: string
}
const itemsProps = ref(props.items)

const modelValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const getData = async () => {
  if (props.getUrl) {
    try {
      isLoading.value = true
      let params = {
        deleted: false,
      }
      if (props.dependOn) {
        params = {
          [props.dependOn]: dependStore.dependValue,
          deleted: false,

        }
      }
      if (props.fetchOnSearch) {
        if (props.searchKey)
          params[props.searchKey] = searchInput.value
      }

      const { data } = await axios.get<Response<SelectableFieldType>>(props.getUrl, { params })

      itemsProps.value = data.result.data
    }
    catch (e) {
      console.log(e)
    }
    finally {
      isLoading.value = false
    }
  }
}

const isDisabled = computed(() => {
  if (!modelValue.value && props.dependOn)
    return !(dependStore.dependValue)

  else
    return false
})

onMounted(() => {
  if (isDisabled.value)
    return

  if (!props.dependOn)
    getData()
})
watch(() => dependStore.dependValue, () => {
  if (props.dependOn)
    getData()
})
watch(() => searchInput.value, () => {
  if (props.fetchOnSearch && !isEmpty(searchInput.value))
    getData()
})

const menu = ref(true)

watch(() => menu.value, () => {
  if (!menu.value)
    menu.value = true
})
</script>

<template>
  <div
    class="app-select flex-grow-1"
    :class="$attrs.class"
  >
    <VLabel
      v-if="label"
      class="mb-1 text-body-2 text-high-emphasis"
      :text="label"
    />
    <AppAutocomplete
      v-model="modelValue"
      v-model:search="searchInput"
      :loading="isLoading"
      variant="outlined"
      :items="itemsProps"
      :item-value="itemValue"
      :rules="rules"
      no-data-text="لا يوجد بيانات"
      :multiple="multiple"
      :chips="multiple"
      :item-title="itemLabel"
      :disabled="isDisabled"
      clearable
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="slotProps"
      >
        <slot
          :name="name"
          v-bind="slotProps || {}"
        />
      </template>
    </AppAutocomplete>
  </div>
</template>
