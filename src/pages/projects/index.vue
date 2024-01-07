<script setup lang="ts">
import type { TableField } from '../../components/app-table/types'
import { FieldType } from './../../components/app-form/types'
import AppTable from './../../components/app-table/AppTable.vue'

import { requiredValidator } from './../../@core/utils/validators'

const fields: TableField[] = [
  {
    key: 'projectName',
    label: 'اسم المشروع ',
    create: true,
    field: {
      validations: [requiredValidator],
      cols: 12,
      type: FieldType.Text,
    },
  },
]

const urls: ApiUrls = {
  get: '/Project',
  delete: '/Project',
  create: '/Project',
  update: '/Project',
}
</script>

<template>
  <AppTable
    :fields="fields"
    pagination
    title="المشاريع"
    :urls="urls"
    add-btn-text="اضافة مشروع"
    have-actions
  />
</template>
