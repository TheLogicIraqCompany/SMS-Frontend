import type { Office } from '@/models/Office'

export const useOfficeStore = defineStore('office', () => {
  const office = ref<Office>()
  const isOfficeHolidayOpen = ref<boolean>(false)
  const dateDialog = ref<boolean>(false)

  const setDateDialog = (value: boolean) => {
    dateDialog.value = value
  }
  const setOffice = (value: Office) => {
    office.value = value
  }

  const setOfficeHoliday = (value: boolean) => {
    isOfficeHolidayOpen.value = value
  }

  return { office, setOffice, isOfficeHolidayOpen, setOfficeHoliday,setDateDialog,dateDialog }
})
