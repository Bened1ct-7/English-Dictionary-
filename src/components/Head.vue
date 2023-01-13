<script setup>
import { ref } from 'vue'

const props = defineProps({
  header: String
})

</script>

<template>
  <header class="shadow-sm flex-center">
    <div class="container-md flex-between">
      <div class="flex">
        <router-link to="/" class="me-2">
          <i class="bi bi-arrow-left"></i>
        </router-link>
        <span class="ms-2">{{ header }}</span>
      </div>
      <button @click="$emit('delete')" class="shadow-sm btn btn-dark btn-sm">Clear All</button>
    </div>
  </header>
</template>

<style scoped>
header {
  min-height: 60px;
  font-size: 1.3rem;
  color: #fff;
}

a {
  color: #fff;
  text-decoration: none;
}

span {
  font-size: 1.1rem;
}

a:hover {
  color: #fff;
}

button {
  
}
</style>