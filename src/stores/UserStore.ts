export const useUserStore = defineStore('users', () => {
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

  const logout = () => {
    user.value = {} as User
    localStorage.removeItem('userData')
    localStorage.removeItem('accessToken')
  }

  return { user, setUser, accessToken, logout }
})
interface User {
  id: string
  fullName: string
  email: string
  token: string
  role: string
  officeId?: string
}
