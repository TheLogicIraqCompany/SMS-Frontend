<script setup lang="ts">
import type { TableField } from '../../components/app-table/types'
import AppTable from './../../components/app-table/AppTable.vue'

const fields: TableField[] = [
  {
    key: 'project-name',
    label: ' الاسم المشروع',
  },
  {
    key: 'type',
    label: 'نوع الرسالة',
  },
  {
    key: 'message',
    label: 'الرسالة',
  },
]
</script>

<template>
  <AppTable
    :fields="fields"
    title="الرسائل    "
    pagination
    disable-crud
    hide-delete
    hide-edit
    add-btn-text="s"
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
