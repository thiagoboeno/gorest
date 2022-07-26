<template>
  <section class="posts-view">
    <div class="header">
      <div class="details">
        <span class="author">
          {{ nameWord }}
        </span>

        <span>
          {{ user?.name }}
        </span>
      </div>

      <div class="actions">
        <router-link
          class="edit"
          :to="`/posts/${route.params.id}/edit`"
        >
          Editar
        </router-link>

        <button
          class="delete"
          @click="deletePost()"
        >
          Deletar
        </button>
      </div>
    </div>

    <div class="content">
      <h2 class="title">
        {{ post.title }}
      </h2>

      <p class="text-content">
        {{ post.body }}
      </p>
    </div>

    <CreateComment
      :post-id="route.params.id"
      @comment-created="getComments()"
    />

    <Comment
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
      @delete-comment="deleteComment"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/axios-setup'
import CreateComment from '@/components/post/CreateComment.vue'
import Comment from '@/components/post/Comment.vue'

type Comments = {
  id: number
  // eslint-disable-next-line camelcase
  post_id: number
  name: string
  email: string
  body: string
}

const post = ref<Record<string, unknown>>({})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const user = ref<any>()
const comments = ref<Comments[]>([])

export default defineComponent({
  components: {
    CreateComment,
    Comment
  },

  setup () {
    const route = useRoute()
    const router = useRouter()

    const nameWord = computed(() => user.value ? `${user.value.name.split(' ')[0][0]}` : '')

    const getPost = async () => {
      await axios.get(`/posts/${route.params.id}`)
        .then(({ data }) => {
          post.value = data
          getUserAuthor()
        })
    }

    const getUserAuthor = async () => {
      await axios.get(`/users/${post.value.user_id}`)
        .then(({ data }) => {
          user.value = data
        })
    }

    const getComments = async () => {
      await axios.get(`/posts/${route.params.id}/comments`)
        .then(({ data }) => {
          comments.value = data
        })
    }

    const deleteComment = async (id: number) => {
      await axios.delete(`/comments/${id}`)
        .then(() => {
          getComments()
        })
    }

    const deletePost = async () => {
      await axios.delete(`/posts/${route.params.id}`)
        .then(() => {
          router.push('/')
        })
    }

    onMounted(() => {
      getPost()
      getComments()
    })

    return {
      route,
      post,
      user,
      comments,
      nameWord,
      getComments,
      deletePost,
      deleteComment
    }
  }
})
</script>

<style scoped lang="scss">
  @import "@/assets/pages/post/view";
</style>
