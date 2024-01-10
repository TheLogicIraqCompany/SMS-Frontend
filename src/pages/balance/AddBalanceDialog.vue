<script setup lang="ts">
import { addBalanceDialogStore } from '@/stores/addBalanceDialogStore'
import { requiredValidator } from '@validators'

const addBalanceStore = addBalanceDialogStore()
const isVisibleDialog = computed(() => addBalanceStore.showAddBalanceDialog)
const messageNo = ref(null)
const whatsappNo = ref(null)
const telegramNo = ref(null)
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : '60%'"
    :model-value="isVisibleDialog"
    persistent
    style="overflow-y: hidden !important;"
  >
    <VCard class="bg-grey-100">
      <VCardTitle class="py-5 d-flex align-center justify-start card-header bg-secondary light-text">
        <h5 class="text-white text-h5">
          اضافة رصيد
        </h5>
        <VSpacer />
        <VBtn
          color="error"
          rounded="xl"
          icon="mdi-close"
          size="md"
          class="pa-1"
          @click="addBalanceStore.setAddBalanceDialog(false)"
        />
      </VCardTitle>
      <VCol
        cols="12"
        class="card-body"
      >
        <div
          flat
          class=" sticky-footer"
        >
          <VContainer>
            <VRow>
              <VCol
                cols="12"
                lg="6"
              >
                <AppTextField
                  v-model="messageNo"
                  type="text"
                  label="   عدد الرسائل النصية"
                  :rules="[requiredValidator]"
                  prepend-inner-icon="tabler-messages"
                />
              </VCol>
              <VCol
                cols="12"
                lg="6"
              >
                <AppTextField
                  v-model="whatsappNo"
                  type="text"
                  label="   عدد رسائل الواتساب"
                  :rules="[requiredValidator]"
                  prepend-inner-icon="tabler-brand-whatsapp"
                />
              </VCol>
              <VCol
                cols="12"
                lg="6"
              >
                <AppTextField
                  v-model="telegramNo"
                  type="text"
                  label="   عدد الرسائل التلكرام"
                  :rules="[requiredValidator]"
                  prepend-inner-icon="tabler-brand-telegram"
                />
              </VCol>
            </VRow>
          </VContainer>
          <VCardText>
            <div class="d-flex align-center justify-end">
              <VBtn
                color="error"
                class="mx-2"
                @click="addBalanceStore.setAddBalanceDialog(false)"
              >
                <VIcon>mdi-close</VIcon>
                اغلاق
              </VBtn>
              <VBtn
                color="primary"
                class="mx-2"
              >
                <VIcon class="ml-2">
                  mdi-content-save
                </VIcon>
                اضافة
              </VBtn>
            </div>
          </VCardText>
        </div>
      </VCol>
    </VCard>
  </VDialog>
</template>
