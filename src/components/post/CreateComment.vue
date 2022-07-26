<template>
  <section class="comment-area">
    <form @submit.prevent="createComment()">
      <h3 class="title">
        Puslish Your Comment
      </h3>

      <input
        v-model="comment.name"
        type="text"
        placeholder="Nome"
        required
      >

      <input
        v-model="comment.email"
        type="email"
        placeholder="Email"
        required
      >

      <textarea
        v-model="comment.body"
        placeholder="Comentário"
      />

      <button type="submit">
        Publicar
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from '@/axios-setup'

interface Post {
  // eslint-disable-next-line camelcase
  post_id: number
  name: string
  email: string
  body: string
}

const comment = ref<Post>({
  post_id: 0,
  name: '',
  email: '',
  body: ''
})

export default defineComponent({
  props: {
    postId: {
      type: Number,
      required: true
    }
  },

  setup (props, { emit }) {
    const createComment = async () => {
      await axios.post(`/posts/${props.postId}/comments`, comment.value)
        .then(() => {
          emit('comment-created')
        })
    }

    return {
      comment,
      createComment
    }
  }
})
</script>

<style lang="scss">
  @import "@/assets/components/post/create-comment";
</style>
