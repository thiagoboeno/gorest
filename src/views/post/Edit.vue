<template>
  <section class="posts-edit">
    <form @submit.prevent="updatePost()">
      <h3 class="title">
        Editar Post
      </h3>

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
import { useRoute, useRouter } from 'vue-router'
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
    const route = useRoute()
    const router = useRouter()

    const getPost = async () => {
      await axios.get(`/posts/${route.params.id}`)
        .then(({ data }) => {
          post.value = data
        })
    }

    const getUsers = async () => {
      await axios.get('/users')
        .then(({ data }) => {
          users.value = data
        })
    }

    const updatePost = async () => {
      await axios.put(`/posts/${route.params.id}`, post.value)
        .then(({ data }) => {
          router.push(`/posts/${data.id}`)
        })
    }

    onMounted(() => {
      getPost()
      getUsers()
    })

    return {
      users,
      post,
      updatePost
    }
  }
})
</script>

<style scoped lang="scss">
  @import "@/assets/pages/post/edit";
</style>
