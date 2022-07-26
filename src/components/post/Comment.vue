<template>
  <section class="comment">
    <div class="header">
      <div class="details">
        <span class="author">
          {{ nameWord }}
        </span>

        <span>
          {{ comment.name }}
        </span>
      </div>

      <button
        class="delete"
        @click="deleteComment()"
      >
        Deletar
      </button>
    </div>

    <div class="content">
      <p class="text-content">
        {{ comment.body }}
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  setup (props, { emit }) {
    const nameWord = computed(() => props.comment ? `${props.comment.name.split(' ')[0][0]}` : '')

    const deleteComment = async () => {
      emit('delete-comment', props.comment.id)
    }

    return {
      nameWord,
      deleteComment
    }
  }
})
</script>

<style lang="scss">
  @import "@/assets/components/post/comment";
</style>
