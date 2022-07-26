<template>
  <section class="posts-grid">
    <card
      v-for="(item, index) in posts"
      :key="index"
      :post="item"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from '@/axios-setup'
import Card from '@/components/Card.vue'

type Posts = {
  id: number
  // eslint-disable-next-line camelcase
  user_id: number
  title: string
  body: string
}

const posts = ref<Posts[]>([])

export default defineComponent({
  name: 'Home',
  components: {
    Card
  },

  setup () {
    const getPosts = async () => {
      await axios.get('/posts')
        .then(({ data }) => {
          posts.value = data
        })
    }

    onMounted(() => {
      getPosts()
    })

    return {
      posts
    }
  }
})
</script>

<style scoped lang="scss">
  @import "@/assets/pages/home.scss";
</style>
