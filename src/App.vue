<template>
  <Default />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Default from '@/layouts/Default.vue' // @ is an alias to /src

export default defineComponent({
  name: 'App',
  components: {
    Default
  }
})
</script>

<style lang="scss">
  @import "@/assets/general";
</style>
