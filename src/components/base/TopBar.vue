<template>
  <header class="header">
    <router-link to="/">
      <h1 class="brand">
        GoRest
      </h1>
    </router-link>

    <div class="navigation">
      <router-link
        class="create"
        to="/posts/create"
      >
        Criar Post
      </router-link>
    </div>
  </header>
</template>

<style scoped lang="scss">
  @import "@/assets/components/base/topbar";
</style>
