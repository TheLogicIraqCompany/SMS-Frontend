<script setup lang="ts">
import type { FieldTypes } from '../app-form/types'
import type { Response } from './../../models/Response'
import type { TableField } from './types'
import { ViewType } from './types'
import type { ApiUrls } from '@/models/apiUrls'
import { useTableStore } from '@/stores/AppTableStore'
import axios from '@axios'
// eslint-disable-next-line import/order
import _ from 'lodash'

const props = defineProps<Props>()
const emit = defineEmits(['update:filterModel'])
const tableStore = useTableStore()
const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]

interface Props {
  fields: TableField[]
  pagination: boolean
  haveActions?: boolean
  title: string
  addBtnText?: string
  urls?: ApiUrls
  removeCard?: boolean
  hideEdit?: boolean
  hideCreate?: boolean
  disableCrud?: boolean
  hideDelete?: boolean
  isSingle?: boolean
  filterModel?: object[]
  fakeData?: any[]
  hideHeader?: boolean
  formData?: boolean
  openForm?: () => void
  onRowClick?: (item: any) => void
  viewType?: ViewType
  hideViewType?: boolean

}

const isLoading = ref(false)
const data = ref([])
const pagesCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const isFilterOpen = ref(false)
const viewType = ref<ViewType>(props.viewType ?? ViewType.Cards)

const headers = computed(() => props.fields.map(field => {
  return {
    text: field.label,
    value: field.key,
    hideInTable: field.hideInTable,
  }
}))

const filterFields = ref(props.fields.filter(x => x.filterable).map(field => {
  return {
    field,
    hideInFilter: field.hideInFilter,
    value: field.field?.defualtValue ?? '',
  }
}))

watch(() => filterFields.value, () => {
  emit('update:filterModel', filterFields.value)
}, { deep: true })

const getData = async () => {
  isLoading.value = true
  try {
    data.value = []
    if (!props.fakeData) {
      const params = filterFields.value.reduce((acc, curr) => {
        if (curr.value)
          acc[curr.field.key] = curr.value

        return acc
      }, {} as any)

      const response = await axios.get<Response<any>>(props.urls.get, {
        params: {
          ...params,

          // take: pageSize.value,
          // skip: (currentPage.value - 1),
          // deleted: false,
        },
      })

      if (props.isSingle)
        data.value = response.data as any
      else
        data.value = response.data.result.data as any

      if (props.pagination)
        pagesCount.value = response.data.result.count / pageSize.value
    }
    else {
      data.value = props.fakeData
    }
  }
  catch (error) {
    console.log(error)
  }
  finally {
    isLoading.value = false
  }
}

watch(() => tableStore.refresh, val => {
  if (val) {
    getData()
    tableStore.setRefresh(false)
  }
})

const deleteItem = (id: string | number) => {
  tableStore.setDeleteDialog(true)
  tableStore.setDeletedItemId(id)
}

const openCreate = () => {
  tableStore.setFields(props.fields.filter(x => x.create).map(field => {
    const customField = field.field as FieldTypes

    customField.label = field.label
    customField.modelValueKey = field.key

    return customField
  }))
  tableStore.setDialogTitle(props.addBtnText ?? 'اضافة')
  tableStore.setFormDialog(true)
  tableStore.setEdit(undefined)

  const initialData = tableStore.createFields.reduce((acc, curr) => {
    acc[curr.modelValueKey] = null

    return acc
  }, {} as any)

  tableStore.setInitialData(initialData)
}

const openEdit = item => {
  tableStore.setFields(props.fields.filter(x => x.create && !x.hideInEdit).map(field => {
    const customField = field.field as FieldTypes

    customField.label = field.label
    customField.modelValueKey = field.key

    return customField
  }))
  tableStore.setDialogTitle(props.addBtnText ?? 'اضافة')
  tableStore.setEdit(item.id)

  tableStore.setFormDialog(true)

  const initialData = tableStore.createFields.reduce((acc, curr) => {
    if (curr.options?.valueFrom)

      acc[curr.modelValueKey as string] = _.get(item, curr.options?.valueFrom)

    else
      acc[curr.modelValueKey as string] = item[curr.modelValueKey as string]

    return acc
  }, {} as any)

  tableStore.setInitialData(initialData)
}

const resetFilters = () => {
  filterFields.value.forEach(field => {
    field.value = ''
  })
  getData()
}

const getSlottedFields = () => {
  return props.fields.filter(field => hasSlot(field.key))
}

onMounted(() => {
  getData()
  tableStore.setUrls(props.urls)
  emit('update:filterModel', filterFields.value)
})
</script>

<template>
  <VCard
    :loading="isLoading"
    class="pa-2 position-relative  transparent"
    flat
  >
    <h1
      v-if="!hideViewType"
      class="text-h3 font-weight-regular"
    >
      {{ title }}
    </h1>

    <VCardTitle
      v-if="!props.hideHeader"
      class="my-5 pa-5 bg-white"
      style="border-radius: 20px;"
    >
      <div
        class="d-flex align-center view-type"
        style="font-size: 24px;"
      >
        <VBtn
          v-if="!hideViewType"
          :variant="viewType === ViewType.Cards ? 'tonal' : 'elevated'"
          :color="viewType === ViewType.Cards ? 'blue' : 'white'"
          @click="viewType = ViewType.Cards"
        >
          <VIcon>
            mdi-cards-variant
          </VIcon>
        </VBtn>
        <VBtn
          v-if="!hideViewType"
          :variant="viewType === ViewType.Table ? 'tonal' : 'elevated'"
          :color="viewType === ViewType.Table ? 'blue' : 'white'"
          class="mx-2"
          @click="viewType = ViewType.Table"
        >
          <VIcon>
            mdi-table
          </VIcon>
        </VBtn>
        <span
          v-if="hideViewType"
          class="text-h4"
        >
          {{ title }}
        </span>
        <VRow>
          <VCol
            v-for="filter in filterFields.filter(v => v.field.isMainFilter)"
            :key="filter.field.key"
            md="8"
            cols="12"
          >
            <AppField
              v-model="filter.value"
              :field="filter.field.field"
              :icon="filter.field.field?.icon"
              :placeholder="filter.field.label"
              is-filter
              @update:model-value="getData"
            />
          </VCol>
        </VRow>

        <VSpacer />
        <VBtn
          v-if="filterFields.length > 0"
          class="mx-2"
          :variant="isFilterOpen ? 'elevated' : 'text'"
          color="secondary"
          @click="isFilterOpen = !isFilterOpen"
        >
          <VIcon>
            mdi-filter
          </VIcon>
          فلتر
        </VBtn>
        <template v-if="!hideCreate || !props.hideHeader">
          <VBtn
            v-if="!disableCrud"
            color="primary"
            @click="openCreate"
          >
            <VIcon>mdi-plus</VIcon>
            {{ addBtnText ?? 'اضافة' }}
          </VBtn>
        </template>

        <slot name="headerActions" />
      </div>
    </VCardTitle>
    <VSlideYTransition v-if="filterFields.length > 0">
      <VCard
        v-if="isFilterOpen"
        class="my-5"
      >
        <VCardTitle>
          الفلاتر
        </VCardTitle>
        <VDivider />
        <VCardText>
          <VRow class="mt-2">
            <VCol
              v-for="(filter, index) in filterFields"
              :key="`filter${index}`"
              :class="{ 'd-none': filter.field.hideInFilter }"
              :cols="12"
              :md="3"
            >
              <AppField
                v-if="!hasSlot(`filter.${filter.field.key}`)"
                v-model="filter.value"
                :field="filter.field.field"
                :icon="filter.field.field?.icon"
                :label="filter.field.label"
                is-filter
                @update:model-value="getData"
              />
              <slot
                v-else
                :name="`filter.${filter.field.key}`"
                :filter="filter"
                :get-data="getData"
              />
            </VCol>
            <VCol cols="12">
              <div class="d-flex justify-end">
                <VBtn
                  variant="outlined"
                  color="primary"
                  @click="resetFilters"
                >
                  <VIcon>mdi-reload</VIcon>
                  اعادة تعيين الفلاتر
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VSlideYTransition>
    <!-- <VDivider class="my-1" /> -->
    <PerfectScrollbar
      :options="{ wheelPropagation: true, suppressScrollY: true }"
      class="h-100 w-100"
    >
      <VSlideXReverseTransition>
        <VTable
          v-if="viewType == ViewType.Table"
          class="table"
        >
          <thead>
            <tr>
              <th>
                #
              </th>
              <template v-for="header in headers">
                <th
                  v-if="!header.hideInTable"
                  :key="header.value"
                  :value="header.value"
                  class="text-center"
                >
                  {{ header.text }}
                </th>
              </template>
              <th
                v-if="haveActions"
                class="text-center"
              >
                الاجراءات
              </th>
            </tr>
          </thead>
          <template v-if="isLoading">
            <div class="d-flex justify-center align-center text-center pa-5">
              <p class="text-center">
                يتم التحميل ...
              </p>
            </div>
          </template>
          <template v-else>
            <tbody>
              <tr
                v-for="(item, i) in data"
                :key="item.id"
                @click="onRowClick ? onRowClick(item) : undefined"
              >
                <td>
                  {{ i + 1 }}
                </td>
                <template v-for="header in headers">
                  <td
                    v-if="!header.hideInTable"
                    :key="header.value"
                    class="text-center"
                  >
                    <template v-if="hasSlot(header.value)">
                      <slot
                        :name="header.value"
                        :item="item"
                      />
                    </template>
                    <template v-else>
                      {{ _.get(item, header.value) }}
                    </template>
                  </td>
                </template>
                <td>
                  <div class="d-flex align-center justify-center">
                    <template v-if="haveActions">
                      <VBtn
                        v-if="!hideEdit"
                        color="primary"
                        size="small"
                        variant="text"
                        @click="openEdit(item)"
                      >
                        <VIcon size="20">
                          mdi-pencil
                        </VIcon>
                      </VBtn>
                      <VBtn
                        v-if="!hideDelete"
                        color="error"
                        variant="text"
                        size="small"
                        @click="deleteItem(item.id)"
                      >
                        <VIcon size="20">
                          mdi-delete
                        </VIcon>
                      </VBtn>
                    </template>
                    <slot
                      name="actions"
                      :item="item"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </VTable>
        <div
          v-else-if="viewType == ViewType.Cards"
          class="mt-5"
        >
          <h4
            v-if="data.length <= 0"
            class="text-center"
          >
            لا توجد نتائج
          </h4>
          <VRow>
            <VCol
              v-for="(item, i) in data"
              :key="`card${i}`"
              cols="12"
              md="4"
            >
              <CardView
                v-if="!hasSlot('cards')"
                :hide-delete="hideDelete"
                :hide-edit="hideEdit"
                :item="item"
                :fields="fields"
                :edit="openEdit"
                :delete-item="deleteItem"
                @click="onRowClick ? onRowClick(item) : undefined"
              >
                <template #headerBtns="{ data }">
                  <slot
                    name="headerBtns"
                    :item="data"
                  />
                </template>
                <template
                  v-for="field in getSlottedFields()"
                  #[`field(${field.key})`]="{ data }"
                >
                  <slot
                    :name="field.key"
                    :item="data"
                  />
                </template>
                <template
                  v-if="hasSlot('cardHeader')"
                  #cardHeader="{ data }"
                >
                  <slot
                    name="cardHeader"
                    :item="data"
                  />
                </template>
                <template
                  v-if="hasSlot('headerActions')"
                  #headerActions="{ data }"
                >
                  <slot
                    name="headerActions"
                    :item="data"
                  />
                </template>
                <template
                  v-if="hasSlot('footer')"
                  #footer="{ data }"
                >
                  <slot
                    name="footer"
                    :item="data"
                  />
                </template>
                <template
                  v-if="hasSlot('cardData')"
                  #cardData="{ data }"
                >
                  <slot
                    name="cardData"
                    :item="data"
                  />
                </template>
              </CardView>
            </VCol>
          </VRow>
          <slot
            name="cards"
            :data="data"
          />
        </div>
      </VSlideXReverseTransition>
    </PerfectScrollbar>

    <div class="d-flex align-end justify-end mt-5">
      <VPagination
        v-if="pagination"
        v-model="currentPage"
        :length="pagesCount"
        :total-visible="5"
        @update:model-value="getData"
      />
    </div>

    <DeleteConfirmDialog @success="getData" />
    <slot
      v-if="hasSlot('customForm')"
      name="customForm"
    />
    <FormDialog
      v-if="!hasSlot('customForm')"
      :urls="urls"
      :form-data="formData"
      @save="getData"
    />
  </VCard>
</template>gt
