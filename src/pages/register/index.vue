<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import UnAuthPageLayout from './../../components/reusable-page/UnAuthPageLayout.vue'

import { emailValidator, requiredValidator } from '@/@core/utils/validators'
import type { LoginBody } from '@/models/login'
import { useUserStore } from '@/stores/UserStore'

const router = useRouter()
const isPasswordVisible = ref(false)
const userStore = useUserStore()

const refVForm = ref<VForm>()

const body = ref<LoginBody>({
  email: '',
  password: '',
})

const isError = ref(false)
const isLoading = ref(false)

const submit = async () => {
  if ((await refVForm.value?.validate())?.valid) {
    try {
      isError.value = false
      isLoading.value = true
      let datat
      if (body.value.email === 'admin@mail.com') {
        datat = {
          id: 'f5049358-bef9-4e48-bba0-c7719cc2b857',
          name: 'Admin',
          email: 'admin@mail.com',
          phoneNamber: '0771261666',
          insertDate: '2023-08-12T13:07:17.710359',
          governorate: 'بغداد',
          role: 'admin',
          cordinterId: null,
        }
      }

      // const res = await axios.post('/Auth/Login', body.value)
      userStore.setUser(datat)

      // localStorage.setItem('accessToken', res.data.token)
      localStorage.setItem('accessToken', '5455555')

      router.push(pushTo(userStore.user.role))
    }
    catch (error) {
      isError.value = true
      console.log(error)
    }
    finally {
      isLoading.value = false
    }
  }
}

const pushTo = (role: string) => {
  if (role == 'CallCenter')
    return '/qr'

  else
    return '/'
}

onMounted(() => {
  if (localStorage.getItem('accessToken'))
    router.push(pushTo(userStore.user.role))
})
</script>

<template>
  <UnAuthPageLayout>
    <template #formPage>
      <VCardTitle class="d-flex flex-column text-centerن">
        <span class="my-5">   انشاء حساب </span>
      </VCardTitle>
      <VCardText>
        <VForm
          ref="refVForm"
          lazy-validation
          @submit.prevent="submit"
        >
          <VTextField
            v-model="body.email"
            :rules="[requiredValidator, emailValidator]"
            outlined
            label="البريد الالكتروني او اسم المستخدم"
            required
            prepend-inner-icon="tabler-mail"
          />
          <VTextField
            v-model="body.password"
            :rules="[requiredValidator]"
            label="كلمة المرور"
            class="my-5"
            :type="isPasswordVisible ? 'text' : 'password'"
            outlined
            required
            prepend-inner-icon="tabler-lock"
          >
            <template #append-inner>
              <VIcon
                :color="isPasswordVisible ? 'primary' : ''"
                @click="isPasswordVisible = !isPasswordVisible"
              >
                {{ isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off' }}
              </VIcon>
            </template>
          </VTextField>
          <h4
            v-if="isError"
            class="text-error mx-2 "
          >
            غير مخول بالدخول للنظام
          </h4>
          <div class="d-flex justify-end align-end mb-4">
            <VBtn
              class="mt-5"
              color="info"
              block
              type="submit"
            >
              انشاء حساب
            </VBtn>
          </div>

          <!-- create account -->
          <VCol
            cols="12"
            class="text-center"
          >
            <span> هل لديك حساب بالفعل
              ؟</span>
            <RouterLink
              class="text-info ms-2"
              :to="{ name: 'login' }"
            >
              تسجيل الدخول
            </RouterLink>
          </VCol>
        </VForm>
      </VCardText>
    </template>
  </UnAuthPageLayout>
</template>

<route lang="yaml">
meta:
  layout: blank
</route>
