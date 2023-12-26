export const useCargoStore = defineStore('cargo', () => {
  const addDialog = ref(false)

  const setAddDialog = (value: boolean) => {
    addDialog.value = value
  }

  return {
    addDialog,
    setAddDialog,
  }
})
