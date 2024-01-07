import type { Permission } from '@/views/pages/roles/types'

export const useUserStore = defineStore('users', () => {
  const rolePermissions = computed<Permission[]>({
    get() {
      const rolePermissionsData = localStorage.getItem('rolePermissions')
      if (rolePermissionsData)
        return JSON.parse(rolePermissionsData)

      return [] as Permission[]
    },
    set(value) {
      localStorage.setItem('rolePermissions', JSON.stringify(value))
    },
  })

  const user = computed<User>({
    get() {
      const userData = localStorage.getItem('userData')
      if (userData)
        return JSON.parse(userData)

      return {} as User
    },
    set(value) {
      localStorage.setItem('userData', JSON.stringify(value))
    },
  })

  const accessToken = computed<string>({
    get() {
      return user.value.token
    },
    set(value) {
      user.value.token = value
    },
  })

  const setUser = (value: User) => {
    user.value = value
  }

  const setRolePermissions = (value: Permission[]) => {
    rolePermissions.value = value
  }

  const logout = () => {
    user.value = {} as User
    rolePermissions.value = [] as Permission[]
    localStorage.removeItem('userData')
    localStorage.removeItem('accessToken')
  }

  const havePermission = (permission: string) => {
    if (!permission)
      return true

    const have = rolePermissions.value.findIndex(p => p.name === permission)

    return have >= 0
  }

  return { user, setUser, accessToken, logout, rolePermissions, setRolePermissions, havePermission }
})
interface User {
  id: string
  fullName: string
  email: string
  token: string
  role: string
  officeId?: string
}
