<script setup lang="ts">
const slots = useSlots()
const hasSlot = (name: string) => !!slots[name]
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
              <img src="@images/logo.svg">
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
              <slot name="formPage" />
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
