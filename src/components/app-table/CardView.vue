<script setup lang="ts">
import _ from 'lodash'
import type { TableField } from './types'
import { isEmpty } from '@/@core/utils'
import navigations from '@/navigation/vertical'

const props = defineProps<Props>()

const routes = useRoute()

interface Props {
  item: any
  fields: TableField[]
  edit: (item: any) => void
  deleteItem: (id: string | number) => void
  hideDelete?: boolean
  hideEdit?: boolean
  haveActions?: boolean

}
const item = ref(props.item)
const fields = ref(props.fields)
const mainField = ref(fields.value.find(v => v.isMain) ?? fields.value[0])

watch(() => props.fields, () => {
  item.value = props.item
  mainField.value = fields.value.find(v => v.isMain) ?? fields.value[0]
})
watch(() => props.item, () => {
  item.value = props.item
})

const findRoute = (name: string, navs: any[]) => {
  for (const r of navs) {
    if (r.children) {
      const found = findRoute(name, r.children)
      if (found)
        return found
    }
    else {
      if (r.to.name === name)
        return r
    }
  }

  return null
}

const currentRoute = ref(findRoute(routes.name, navigations))

onMounted(async () => {
  currentRoute.value = findRoute(routes.name, navigations)
})

const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
function isDate(val: any) {
  return Object.prototype.toString.call(val) === '[object Date]'
}
</script>

<template>
  <!-- {{ currentRoute.icon.icon }} -->
  <VCard flat>
    <VCardTitle class="d-flex   align-center  ma-3 mb-0 rounded">
      <template v-if="!hasSlot('cardHeader')">
        <span class="icon-container bg-secondary ml-2">

          <VIcon
            size="30"
            :icon="currentRoute ? currentRoute.icon.icon : 'mdi-book'"
          />
        </span>
        <div class="d-flex flex-column align-s">
          <span>
            {{ mainField?.label }}
          </span>
          <h4 class="text-primary">
            {{ _.get(item, mainField?.key) }}
          </h4>
        </div>
      </template>
      <slot
        name="cardHeader"
        :data="item"
      />
      <VSpacer />
      <VBtn
        v-if="!hideEdit"
        color="primary"
        size="small"
        variant="text"
        icon
        @click.stop="edit(item)"
      >
        <VIcon>
          tabler-edit
        </VIcon>
      </VBtn>
      <VBtn
        v-if="!hideDelete"
        color="error"
        size="small"
        icon
        variant="text"
        @click.stop="deleteItem(item.id)"
      >
        <VIcon>
          tabler-trash
        </VIcon>
      </VBtn>
      <slot
        name="headerBtns"
        :data="item"
      />
    </VCardTitle>
    <VDivider class="mx-5 " />
    <VCardText class="pa-3 py-2">
      <VRow
        v-if="!hasSlot('cardData')"
        class="mt-1"
      >
        <template v-for="(field, i) in fields.filter(v => v.key != mainField.key && !v.hideInTable)">
          <VCol
            v-if="!field.hideInTable"
            :key="field.key"
            cols="12"
            :md="(i == fields.filter(v => v.key != mainField.key && !v.hideInTable).length - 1 && i % 2 == 0) ? 12 : 6
            "
            class="py-1"
          >
            <div class="d-flex gap-2">
              <div class="icon-container bg-light-primary text-primary">
                <VIcon
                  size="25"
                  :icon="field.icon ?? 'tabler-info-circle'"
                />
              </div>
              <div class="d-flex flex-column">
                <span class="card-subtitle mb-1">
                  {{ field.label }}
                </span>
                <p class="font-weight-bold text-break">
                  <template v-if="!hasSlot(`field(${field.key})`)">
                    {{ isEmpty(_.get(item, field.field?.options?.takeFrom ?? field.key)) ? 'لا يوجد' : _.get(item,
                                                                                                             field.field?.options?.takeFrom ?? field.key) }}
                  </template>
                  <slot
                    v-else
                    :name="`field(${field.key})`"
                    :data="item"
                  />
                </p>
              </div>
            </div>
          </VCol>
        </template>
      </VRow>
      <slot
        name="cardData"
        :data="item"
      />
    </VCardText>
    <VCol
      v-if="hasSlot('footer')"
      cols="12"
      class=""
    >
      <VDivider class="mx-5 " />
      <slot
        name="footer"
        :data="item"
      />
    </VCol>
  </VCard>
</template>
