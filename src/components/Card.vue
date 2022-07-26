<template>
  <router-link
    class="card"
    :to="`/posts/${post.id}`"
  >
    <div class="card-header">
      <h2 class="title">
        {{ post.title }}
      </h2>
    </div>

    <div class="card-body">
      <div class="details">
        <p class="user-name">
          {{ user.name }}
        </p>

        <span>
          {{ user.email }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from '@/axios-setup'

const user = ref<Record<string, unknown>>({})

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true
    }
  },

  setup (props) {
    const getUserAuthor = async () => {
      await axios.get(`/users/${props.post.user_id}`)
        .then(({ data }) => {
          user.value = data
        })
    }

    onMounted(() => {
      getUserAuthor()
    })

    return {
      user
    }
  }
})
</script>

<style scoped lang="scss">
  @import "@/assets/components/card";
</style>
