<script setup lang="ts">
import type { TableField } from '../../components/app-table/types'
import AppTable from './../../components/app-table/AppTable.vue'
import AddBalanceDialog from './addBalanceDialog.vue'
import StatisticsCard from '@/components/reusable-page/statisticsCard.vue'
import balanceDatafrom from '@/fake-data/balanceData'
import { addBalanceDialogStore } from '@/stores/addBalanceDialogStore'

const urls: ApiUrls = {
  get: '/Message/Message-History',
  delete: '/Message/Message-History',
  create: '/Message/Message-History',
  update: '/Message/Message-History',
}

const tableStore = addBalanceDialogStore()

const fields: TableField[] = [
  // {
  //   key: 'ProjectId',
  //   label: ' اسم المشروع',
  //   filterable: true,
  //   create: true,
  //   field: {
  //     cols: 6,
  //     type: FieldType.Select,
  //     validations: [requiredValidator],
  //     options: {
  //       items: [],
  //     },
  //   },
  // },
  {
    key: 'ProjectId',
    label: 'نوع الرسالة',
  },
  {
    key: 'ListPhoneNumberExcel',
    label: 'رقم الهاتف',
  },
  {
    key: 'Messagetext',
    label: 'الرسالة',
  },
  {
    key: 'Messagetext',
    label: 'تاريخ الارسال',
  },
]

const openAddBalance = () => {
  tableStore.setAddBalanceDialog(true)
}
</script>

<template>
  <StatisticsCard :data="balanceDatafrom" />

  <AppTable
    :fields="fields"
    pagination
    title="الرسائل    "
    :urls="urls"
    hide-create
    disable-crud
    view-type="0"
  >
    <template #headerActions>
      <VBtn
        color="primary"
        @click="openAddBalance"
      >
        <VIcon>mdi-plus</VIcon>
        اضافة رصيد رسائل
      </VBtn>
    </template>
  </AppTable>
  <AddBalanceDialog />
</template>
