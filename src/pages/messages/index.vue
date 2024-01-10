<script setup lang="ts">
import type { TableField } from '../../components/app-table/types'
import { FieldType } from './../../components/app-form/types'
import AppTable from './../../components/app-table/AppTable.vue'
import select from './../../fake-data/select'
import { requiredValidator } from '@/@core/utils/validators'

const urls: ApiUrls = {
  get: '/Message/Message-History',
  delete: '/Message/Message-History',
  create: '/Message/Message-History',
  update: '/Message/Message-History',
}

const fields: TableField[] = [
  {
    key: 'ProjectId',
    label: ' اسم المشروع',
    create: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      validations: [requiredValidator],
      options: {
        items: [],
      },
    },
  },
  {
    key: 'ProjectId',
    label: 'نوع الرسالة',
    create: true,
    field: {
      cols: 6,
      type: FieldType.Select,
      validations: [requiredValidator],
      options: {
        items: select.messageType,
      },
    },
  },
  {
    key: 'ListPhoneNumberExcel',
    label: 'رقم الهاتف',
    create: true,
    field: {
      cols: 6,
      type: FieldType.File,
      validations: [requiredValidator],

    },
  },
  {
    key: 'Messagetext',
    label: 'الرسالة',
    create: true,
    field: {
      cols: 12,
      type: FieldType.Textarea,
      validations: [requiredValidator],

    },
  },
]
</script>

<template>
  <AppTable
    :fields="fields"
    title="الرسائل    "
    pagination
    add-btn-text="اضافة رسالة"
    have-actions
    :urls="urls"
    view-type="0"
  >
    <template #status="{ item }">
      <VChip :color="item.status === 'pending' ? 'warning' : item.status === 'stopped' ? 'error' : item.status === 'moving' ? 'success' : 'primary'">
        <VIcon size="20">
          {{ item.status === 'pending' ? 'mdi-clock' : item.status === 'stopped' ? 'mdi-stop' : item.status === 'moving' ? 'mdi-train-car' : 'mdi-check' }}
        </VIcon>
        {{ item.status === 'pending' ? 'قيد الانتظار' : item.status === 'stopped' ? 'متوقف' : item.status === 'moving' ? 'متحرك' : 'مكتمل' }}
      </VChip>
    </template>
  </AppTable>
</template>
