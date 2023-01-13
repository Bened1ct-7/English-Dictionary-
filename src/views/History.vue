<script setup>
import { ref, defineAsyncComponent, onMounted } from 'vue'
import uniqueId from 'lodash.uniqueid'


const Head = defineAsyncComponent(() => import('../components/Head.vue'))
const Footer = defineAsyncComponent(() => import('../components/Footer.vue'))

const history = ref([])

const remove = (item, index) => {
  history.value = history.value.filter((hist, ind) => {
    return ind !== index
  })
  localStorage.setItem('history', JSON.stringify(history.value))
}

const link = (prop) => {
  return `/word/${prop.toLowerCase().trim()}`
}

const removeAll = () => {
  history.value = []
  localStorage.setItem('history', JSON.stringify(history.value))
}

onMounted(async () => {
  history.value = await JSON.parse(localStorage.getItem('history')).sort((a, b) => {
  return b.createdAt - a.createdAt
 }) || []
})

</script>

<template>
  <Head @delete="removeAll" header="History" />
  <main>
    <div v-if="history.length > 0" class="container-md" >
      <div class="history flex-between" v-for="(hist, ind) in history" :key="uniqueId('hist-1')">
        <router-link :to="link(hist.name)" class="detail ms-2">
          <span class="name roboto">{{ hist.name }}</span>
          <span class="small text-muted nunito">{{ hist.date }}</span>
        </router-link>
        <i @click="remove(hist.name, ind)" class="bi bi-x"></i>
      </div>
    </div>
    <div v-else class="container-md">
      <div class="text-center my-5">No history</div>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
header {
  background: #62b162;
}

.history {
  height: 60px;
  color: #111;
  text-decoration: none;
  background: rgba(230, 230, 230, 0.7);
  border-bottom: 1px solid rgba(200, 200, 200, 1);
}

.history {
  color: #111;
}

a {
  color: #111;
}

a:hover {
  color: #111;
}

.history i {
  font-size: 2.5rem;
}

.detail {
  height: 100%;
  width: 70%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
}

</style>