<script setup lang="ts">
import select from './../../fake-data/select'
import congoImg from '@images/misc/3d-safe-box-with-golden-dollar-coins.png'

const router = useRouter()

function buyBalance() {
  router.push('/balance')
}
</script>

<template>
  <VCard>
    <VRow no-gutters>
      <VCol cols="8">
        <VCardText>
          <h6 class="text-lg text-no-wrap font-weight-medium">
            <VIcon
              color="warning"
              icon="tabler-messages"
              class="mx-2"
            />
            رصيد الرسائل الكلي
          </h6>
          <p class="mb-2 mt-3 ">
            <span
              v-for="(item, index) in select.messageType"
              :key="item.id"
              class="font-weight-bold "
            >
              {{ item.name }}
              <span
                v-if=" index + 1 !== select.messageType.length"
                class="ml-1"
              >-</span>

            </span>
          </p>

          <h4 class="text-h4 font-weight-medium text-primary mb-1">
            50
          </h4>
          <VBtn @click="buyBalance">
            شراء رصيد
          </VBtn>
        </VCardText>
      </VCol>

      <VCol cols="4">
        <VCardText class="pb-0 px-0 position-relative h-100">
          <VImg
            :src="congoImg"
            class="congo-john-img w-100"
          />
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.congo-john-img {
  position: absolute;
  inset-block-end: 0;
  inset-inline-end: 1.25rem;
}
</style>
