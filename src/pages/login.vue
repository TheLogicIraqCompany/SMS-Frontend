<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'

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
  <div>
    <div class="header">
      <div class="inner-header flex py-md-0   px-10">
        <VRow
          align="center"
          class="mx-10"
          justify="center"
        >
          <VCol
            cols="12"
            md="8"
          >
            <div class="d-md-flex align-center flex-md-row flex-column d-none">
              <img src="../assets/images/logo.svg">
              <div class="d-md-flex align-start flex-column mx-2 d-none">
                <h1 class=" text-white">
                  SMS Service
                </h1>
                <div class="border my-5" />
                <h4 class="text-white font-weight-medium">
                  خدمة ارسال الرسائل النصية
                </h4>
              </div>
            </div>
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VCard
              :loading="isLoading"
              class="mt-10 mx-md-10"
            >
              <VCardTitle class="d-flex flex-column text-centerن">
                <span class="my-5"> تسجيل الدخول </span>
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
                  <div class="d-flex justify-end align-end mt-8">
                    <VBtn
                      class="mt-5"
                      block
                      color="primary"
                      type="submit"
                    >
                      تسجيل الدخول
                    </VBtn>
                  </div>
                </VForm>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </div>

      <!-- Waves Container -->
      <div class="mt-10">
        <svg
          class="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g class="parallax">
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="7"
              fill="#fff"
            />
          </g>
        </svg>
      </div>
      <!-- Waves end -->
    </div>
    <!-- Header ends -->

    <!-- Content starts -->
    <div class="content flex font-weight-bold">
      <p>
        © {{ new Date().getFullYear() }} -
        <a
          href="https://digital-logic.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >Digital Logic</a>
      </p>
    </div>
    <!-- Content ends -->
  </div>
</template>

<style>
body {
  margin: 0;
}

.border {
  border-radius: 5px;
  background: #fff;
  block-size: 5px;
  inline-size: 75%;
}

h1 {
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 2px;
}

p {
  color: #333;
  font-family: Cairo, sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
}

.header {
  position: relative;
  background: linear-gradient(30deg, #57b595 0, #539799);
  color: white;
}

.logo {
  display: inline-block;
  fill: white;
  inline-size: 50px;
  padding-inline-end: 15px;
  vertical-align: middle;
}

.inner-header {
  padding: 0;
  margin: 0;
  block-size: 65vh;
  inline-size: 100%;
}

.flex {
  /* Flexbox for containers */
  display: flex;
  align-items: center;
  justify-content: center;
}

.waves {
  position: relative;
  block-size: 15vh;
  inline-size: 100%;
  margin-block-end: -7px;
  max-block-size: 150px;

  /* Fix for safari gap */
  min-block-size: 100px;
}

.content {
  position: relative;
  background-color: white;
  block-size: 20vh;
  text-align: center;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/* Shrinking for mobile */
@media (max-width: 768px) {
  .waves {
    block-size: 40px;
    min-block-size: 40px;
  }

  .content {
    block-size: 30vh;
  }

  h1 {
    font-size: 24px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
