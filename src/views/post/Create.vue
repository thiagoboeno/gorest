<template>
  <section class="posts-create">
    <form @submit.prevent="createPost()">
      <h2 class="title">
        Edit post
      </h2>

      <select
        id="users"
        name="author"
        v-model="post.user_id"
        required
      >
        <option value="0" disabled selected>Selecione uma opção</option>

        <option
          v-for="(user, index) in users"
          :key="index"
          :value="user.id"
        >
          {{ user.name }}
        </option>
      </select>

      <input
        v-model="post.title"
        type="text"
        placeholder="Título"
        required
      >

      <textarea
        v-model="post.body"
        type="text"
        placeholder="Texto"
        required
      />

      <button type="submit">
        Confirmar
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/axios-setup'

interface Post {
  // eslint-disable-next-line camelcase
  user_id: number
  title: string
  body: string
}

const post = ref<Post>({
  user_id: 0,
  title: '',
  body: ''
})

const users = ref<Record<string, unknown>[]>()

export default defineComponent({
  setup () {
    const router = useRouter()

    const getUsers = async () => {
      await axios.get('/users')
        .then(({ data }) => {
          users.value = data
        })
    }

    const createPost = async () => {
      await axios.post('/posts', post.value)
        .then(({ data }) => {
          router.push(`/posts/${data.id}`)
        })
    }

    onMounted(() => {
      getUsers()
    })

    return {
      users,
      post,
      createPost
    }
  }
})
</script>

<style scoped lang="scss">
  @import "@/assets/pages/post/create";
</style>
