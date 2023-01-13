<script setup>
import { ref, defineAsyncComponent, onMounted } from 'vue'

// Components
const Menu = defineAsyncComponent(() => import('../components/Menu.vue'))
const Result = defineAsyncComponent(() => import('../components/Result.vue'))
const Footer = defineAsyncComponent(() => import('../components/Footer.vue'))
const Header = defineAsyncComponent(() => import('../components/Header.vue'))
const ErrorC = defineAsyncComponent(() => import('../components/ErrorC.vue'))

//props

const props = defineProps({
  id: String
})

// Refs
const obj = ref(null)
const searching = ref(false)
const isError = ref(false)

const history = ref(null)

// Non refs
const months = ['Jan', 'Feb', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

// Methods

const getDate = () => {
  const date = new Date()
  return date.getDate()
}

const getMonth = () => {
  const date = new Date()
  return date.getMonth()
}

const getYear = () => {
  const date = new Date()
  return date.getFullYear()
}

const getTime = () => {
  const date = new Date()
  return date.getTime()
}

const searchWord = async (word) => {
  try {
    obj.value = null
    isError.value = false
    searching.value = true
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase().trim()}`)
    const array = await response.json()
    obj.value = await array[0]
    if(!obj.value) {
      isError.value = true
    }
    const day = getDate()
    const month = months[getMonth()]
    const year = getYear()
    const time = getTime()
    const dateStr = `${day} ${month}, ${year}`
    const object = {
      name: word, date: dateStr, createdAt: time
    }
    history.value = JSON.parse(localStorage.getItem('history')) || []
    history.value.push(object)
    localStorage.setItem('history', JSON.stringify(history.value))
  } catch(err) {
    isError.value = true
  }
}

const findWord = data => {
  searchWord(data)
}

onMounted(async () => {
  if (props.id) {
    await searchWord(props.id)
  }
})

</script>

<template>
  <Header @search="searchWord" />
  <main>
    <ErrorC v-if="isError" />
    <Result v-else-if="obj && !isError" :data="obj" @find="findWord" />
    <Menu :show="searching" v-else />
  </main>
  <Footer />
</template>