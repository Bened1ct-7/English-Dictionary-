<script setup>
import { ref, defineAsyncComponent } from 'vue'

const Link = defineAsyncComponent(() => import('./Link.vue'))

const props = defineProps({
  show: Boolean
})


</script>

<template>
  <div class="container-md my-4" v-if="!props.show">
    <Link path="/history" icon="bi bi-clock-history" text="History" />
    <Link path="/bookmark" icon="bi bi-star-fill" text="Bookmarks" />
  </div>
  <div v-else class="flex-center text-center container-md my-5">
    <div class="text-center">Loading data...</div>
  </div>
</template>

<style scoped>

</style>