<script lang="ts" setup>
import EcommerceEarningReports from './EcommerceEarningReports.vue'
import Balance from './balance.vue'
import MessageRate from './messageRate.vue'
import MessagesSentRate from './messagesSentRate.vue'

// import EcommerceInvoiceTable from './EcommerceInvoiceTable.vue'
import EcommerceOrder from './EcommerceOrder.vue'
import EcommercePopularProducts from './EcommercePopularProducts.vue'
import EcommerceTransactions from './EcommerceTransactions.vue'
import MessageTypes from './messageTypes.vue'
import MessagesSentRateLastMonth from './messagesSentRateLastMonth.vue'
import RevenueReport from './revenueReport.vue'
</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Balance -->
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <Balance />
    </VCol>

    <!-- 👉 MessageTypes -->
    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <MessageTypes class="h-100" />
    </VCol>

    <VCol
      cols="12"
      lg="4"
    >
      <VRow>
        <!-- 👉 messagesSentRate -->
        <VCol
          cols="12"
          lg="6"
          md="3"
          sm="6"
        >
          <MessagesSentRate />
        </VCol>
        hh
        <!-- 👉 messagesSentRateLastMonth -->
        <VCol
          cols="12"
          lg="6"
          md="3"
          sm="6"
        >
          <MessagesSentRateLastMonth />
        </VCol>

        <!-- 👉 messageRate -->
        <VCol
          cols="12"
          md="6"
          lg="12"
        >
          <MessageRate />
        </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Revenue Report -->
    <VCol
      cols="12"
      lg="8"
    >
      <RevenueReport />
    </VCol>

    <!-- 👉 Earning Reports -->
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <EcommerceEarningReports />
    </VCol>

    <!-- 👉 Popular Products -->
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <EcommercePopularProducts />
    </VCol>

    <!-- 👉 Order -->
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <EcommerceOrder />
    </VCol>

    <!-- 👉 Transaction -->
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <EcommerceTransactions />
    </VCol>

    <!-- 👉 Invoice Table -->
    <VCol
      cols="12"
      lg="8"
    >
      <!-- <EcommerceInvoiceTable /> -->
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
