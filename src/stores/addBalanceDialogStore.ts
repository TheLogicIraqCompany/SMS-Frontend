export const addBalanceDialogStore = defineStore('addBalanceDialog', () => {
  const showAddBalanceDialog = ref(false)
  const accountsData = ref({})
  const isEdit = ref<boolean>(false)
  const itemId = ref<string>('')

  const openEdit = (id: string) => {
    isEdit.value = true
    itemId.value = id
    showAddBalanceDialog.value = true
  }

  const closeEdit = () => {
    isEdit.value = false
    itemId.value = ''
  }

  const setAddBalanceDialog = (value: boolean) => {
    showAddBalanceDialog.value = value
  }

  const setAccounts = (value: any) => {
    accountsData.value = value
  }

  return {
    setAddBalanceDialog,
    showAddBalanceDialog,
    accountsData,
    setAccounts,
    openEdit,
    closeEdit,
  }
})
