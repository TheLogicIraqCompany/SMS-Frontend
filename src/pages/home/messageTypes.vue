<script setup lang="ts">
const statistics = [
  {
    title: '  الرصيد الكلي',
    stats: '50',
    icon: 'tabler-messages',
    color: 'primary',
  },
  {
    title: 'الرسائل النصية',
    stats: '15',
    icon: 'tabler-brand-messenger',
    color: 'warning',
  },
  {
    title: 'واتساب',
    stats: '15',
    icon: 'tabler-brand-whatsapp',
    color: 'error',
  },
  {
    title: 'تلكرام',
    stats: '20',
    icon: 'tabler-brand-telegram',
    color: 'success',
  },
]
</script>

<template>
  <VCard title="الرسائل">
    <VCardText class="pt-6">
      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="6"
          md="3"
        >
          <div class="d-flex align-center gap-4">
            <VAvatar
              :color="item.color"
              variant="tonal"
              size="42"
            >
              <VIcon :icon="item.icon" />
            </VAvatar>

            <div class="d-flex flex-column">
              <span class="text-h5 font-weight-medium">{{ item.stats }}</span>
              <span class="text-sm">
                {{ item.title }}
              </span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
