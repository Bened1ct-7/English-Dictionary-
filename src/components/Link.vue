<script setup>
import { ref, onMounted } from "vue"

const icon = ref(null)
const text = ref(null)

const props = defineProps({
  icon: String,
  text: String,
  path: String
})

onMounted(() => {
  if (props) {
    icon.value = props.icon
    text.value = props.text
  }
})
</script>

<template>
  <router-link :to="path" class="flex my-3">
    <div class="icon flex-center me-2">
      <i :class="icon"></i>
    </div>
    <span class="ms-2 roboto">{{ text }}</span>
  </router-link>
</template>

<style scoped>
a {
  color: #111;
  font-size: 1.1rem;
}

a .icon {
  height: 3.2rem;
  width: 3.2rem;
  background-color: var(--primary);
  border-radius: 50%;
  color: #fff;
}

a i {
  font-size: 1.5rem;
}

a:hover {
  color: #111;
}
</style>
