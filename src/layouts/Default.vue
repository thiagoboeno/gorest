<template>
  <main class="default-layout">
    <TopBar />

    <section class="container">
      <router-view/>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopBar from '@/components/base/TopBar.vue' // @ is an alias to /src

export default defineComponent({
  name: 'App',
  components: {
    TopBar
  }
})
</script>

<style scoped lang="scss">
  @import "@/assets/layouts/default";
  @import "@/assets/container";
</style>
