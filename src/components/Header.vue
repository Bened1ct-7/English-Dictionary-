<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['search'])

// Refs
const notSearch = ref(true)
const searchTerm = ref('')
const showNav = ref(false)

// Custom modifier
const vFocus = {
  mounted: (el) => el.focus()
}

// Methods
const toggleSearch = () => {
  notSearch.value = !notSearch.value
}

const toggleNav = e => {
  showNav.value = !showNav.value
  e.target.className = (showNav.value == true)? 'bi bi-x menu-bar' : 'bi bi-list menu-bar'
}

const emitSearch = () => {
  if (searchTerm.value !== '') {
    emit('search', searchTerm.value)
    searchTerm.value = ''
  }
}

</script>

<template>
  <header class="shadow-sm flex-center">
    <div v-if="notSearch" class="container-md flex-between">
      <i @click="toggleNav" class="bi bi-list menu-bar"></i>
      <div class="flex">
        <i class="bi bi-book me-1"></i>
        <span class="ms-1">Dictionary</span>
      </div>
      <i @click="toggleSearch" class="bi bi-search"></i>
      <nav class="py-5" v-if="showNav">
        <ul class="mt-5">
          <li class="my-4 mx-auto">
            <router-link to="/">Home </router-link>
          </li>
          <li class="my-4 mx-auto">
            <router-link to="/history">History </router-link>
          </li>
          <li class="my-4 mx-auto">
            <router-link to="/bookmark">Bookmark </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div v-else class="container-md flex-between">
      <i @click="toggleSearch" class="bi bi-arrow-left"></i>
      <div class="input flex-between">
        <input v-focus type="text" @keyup.enter = "emitSearch" v-model="searchTerm" placeholder="Search a word..">
        <i @click="emitSearch" class="bi bi-search search"></i>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: var(--primary);
  color: var(--text-light);
  font-size: 1.2rem;
  min-height: 70px;
}

header i {
  cursor: pointer;
  font-size: 1.5rem;
}

div.input {
  height: 50px;
  width: 90%;
}

div.input input {
  appearance: none;
  height: 100%;
  border: none;
  width: 80%;
  outline: none;
  background: transparent;
  font-size: 0.9rem;
  padding: 0 0.5rem;
  color: #fff;
}

div.input input:focus {
  border: none;
  outline: none;
}

div.input input::placeholder {
  color: var(--text-light);
  font-size: 0.9rem;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background: #111;
  color: #fff;
  z-index: 6;
}

nav ul li {
  list-style-type: none;
  display: block;
  text-align: center;
}

nav ul li a {
  display: inline-block;
  color: #fff;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #ca6f25;
}

.menu-bar {
  z-index: 9;
}

</style>
