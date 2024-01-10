<script setup lang="ts">
import { useDisplay, useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => ([]),
  },
})

const vuetifyTheme = useTheme()
const display = useDisplay()

const chartOptions = computed(() => {
  return index => {
    const currentTheme = vuetifyTheme.current.value.colors
    const variableTheme = vuetifyTheme.current.value.variables

    // getColorChartrgba(var(--v-theme-primary)
    const labelSuccessColor = `${getColorChart(index)}, 0.2)`

    const headingColor = `rgba(${hexToRgb(
      currentTheme['on-background'],
    )},${variableTheme['high-emphasis-opacity']})`

    const chartColors = {
      donut: {
        series1: getColorChart(index),
        series2: labelSuccessColor,
      },
    }

    return {
      chart: {
        parentHeightOffset: 0,
        type: 'donut',
      },
      colors: [
        chartColors.donut.series1,
        chartColors.donut.series2,
      ],
      stroke: {
        width: 0,
      },
      dataLabels: {
        enabled: false,
        formatter(val: string) {
          return `${parseInt(val)}%`
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        theme: false,
      },
      grid: {
        padding: {
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        },
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              value: {
                fontSize: '0.6rem',
                fontFamily: 'Public Sans',
                color: headingColor,
                fontWeight: 600,
                offsetY: -10,
                formatter(val: string) {
                  return `${parseInt(val)}%`
                },
              },
              name: {
                offsetY: 20,
                fontFamily: 'Public Sans',
              },
              total: {
                show: true,
                showAlways: true,
                color: currentTheme.success,
                fontSize: '.6125rem',
                label: '',
                fontFamily: 'Public Sans',
                formatter() {
                  return '100%'
                },
              },
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: display.thresholds.value.lg,
          options: {
            chart: { width: 200, height: 160 },
          },
        },
        {
          breakpoint: 420,
          options: {
            chart: { width: 150, height: 120 },
          },
        },
      ],
    }
  }
})

const series = [45, 58]

onMounted(() => {
  console.log(props.data)
  console.log(chartOptions.value(0))
})

function getTextColor(index: number) {
  return getCardClass(['text-white', 'text-white', 'text-white'], index)
}

function getColor(index: number) {
  return getCardClass(['primary', 'primary', 'primary', 'primary'], index)
}
function getColorChart(index: number) {
  return getCardClass(['rgba(var(--v-theme-primary)', 'rgba(var(--v-theme-primary)', 'rgba(var(--v-theme-primary)', 'rgba(var(--v-theme-primary)'], index)
}
function getCardClass(colors: string[], index: number): string {
  const repeatIndex = index % colors.length

  // Assuming you have color classes defined in your styles
  return colors[repeatIndex]
}
</script>

<template>
  <VRow class="align-center my-3">
    <VCol
      v-for="(item, index) in props.data"
      :key="item.title"
      cols="12"
      sm="6"
      md="3"
      lg="3"
    >
      <VCard v-if="item.number !== 0">
        <VRow
          align="center"
          class="pr-5 py-4"
        >
          <VCol
            cols="3"
            lg="3"
            md="4"
            class="p-2"
          >
            <VAvatar
              variant="tonal"
              :size="55"
              rounded
              class=" me-2"
              :color="getColor(index)"
            >
              <VIcon
                size="35"
                :icon="item.icon"
                class="mx-2"
              />
            </VAvatar>
          </VCol>
          <VCol
            cols="9"
            sm="6"
            md="8"
            lg="9"
          >
            <h6 class="text-h6 text-secondary ">
              {{ item.title }}
            </h6>
            <h3 class="text-h3 text-grey-800 font-weight-medium ">
              {{ item.number }}
            </h3>
          </VCol>
          <!--
            <VCol
            cols="4"
            sm="6"
            md="6"
            lg="4"
            class="pl-3"
            >
            <div class="chart-container">
            <VueApexCharts
            :options="chartOptions(index)"
            :series="series"
            />
            </div>
            </VCol>
          -->
        </VRow>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.chart-container {
  block-size: inherit; /* You can use other values like 100% if needed */
  inline-size: inherit;  /* You can use other values like 100% if needed */
}
</style>
