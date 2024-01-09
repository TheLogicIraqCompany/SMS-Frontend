<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import UnAuthPageLayout from './../../components/reusable-page/UnAuthPageLayout.vue'

import { emailValidator, requiredValidator } from '@/@core/utils/validators'
import type { LoginBody } from '@/models/login'
import axiosIns from '@/plugins/axios'
import { useUserStore } from '@/stores/UserStore'
import 'vue3-tel-input/dist/vue3-tel-input.css'

const router = useRouter()
const isPasswordVisible = ref(false)
const userStore = useUserStore()
const refVForm = ref<VForm>()

const body = ref<LoginBody>({
  FullName: '',
  email: '',
  PhoneNumber: '',
  password: '',
})

const PhoneNumber = ref(null)
const isError = ref(false)
const isLoading = ref(false)
function onPhoneNumberChange(e) {
  PhoneNumber.value = e
  console.log(e)
  console.log('_____')
  console.log(PhoneNumber)
}

const submit = async () => {
  console.log(PhoneNumber)
  if ((await refVForm.value?.validate())?.valid) {
    try {
      const res = await axiosIns.post('/api/User/register', {
        FullName: body.value.FullName,
        Email: body.value.email,
        PhoneNumber: body.value.PhoneNumber,
        Password: body.value.password,
      })

      userStore.setUser(res.data.result)

      localStorage.setItem('accessToken', res.data.result.token)

      window.location.reload()
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
            v-model="body.FullName"
            :rules="[requiredValidator]"
            outlined
            label="الاسم الكامل"
            required
            prepend-inner-icon="tabler-user"
          />
          <!--
            <VueTelInput
            style="direction: ltr; text-align: end;"
            class="my-4"
            :input-options="{ placeholder: 'رقم الهاتف' }"
            :rules="[requiredValidator]"
            :model-value="PhoneNumber"
            @update:modelValue="onPhoneNumberChange"
            />
          -->
          <VTextField
            v-model="body.PhoneNumber"
            :rules="[requiredValidator]"
            outlined
            label="رقم الهاتف"
            required
            class="my-4"

            prepend-inner-icon="tabler-phone"
          />
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
