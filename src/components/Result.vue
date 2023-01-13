<script setup>
import { ref, onMounted } from "vue"
import uniqueId from 'lodash.uniqueid';

// refs
const dataObject = ref(null)
const sounds = ref(null)
const descs = ref(null)
const url = ref(null)
const bookmark = ref(null)
const icon = ref(null)

const props = defineProps({
  data: Object,
})


// Non refs
const months = ['Jan', 'Feb', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

// Methods
const assign = async () => {
  if (props.data) {
    dataObject.value = await props.data
  }

  sounds.value = await dataObject.value.phonetics.filter((item) => {
    return item.text
  })

  descs.value = await dataObject.value.meanings
  
  const links = await dataObject.value.sourceUrls
  
  url.value = await links[0]
  
  bookmark.value = JSON.parse(localStorage.getItem('bookmark')) || []
}

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

const addBookmark = word => {
  if (!hasName(bookmark.value, word)) {
    const day = getDate()
    const month = months[getMonth()]
    const year = getYear()
    const time = getTime()
    
    icon.value.classList.add('gold')
      
    const dateStr = `${day} ${month}, ${year}`
    const object = {
      name: word, date: dateStr, createdAt: time
    }
    bookmark.value = JSON.parse(localStorage.getItem('bookmark')) || []
    bookmark.value.push(object)
    localStorage.setItem('bookmark', JSON.stringify(bookmark.value))
  } else {
    bookmark.value = bookmark.value.filter((book) => {
      return book.name !== word
    })
    localStorage.setItem('bookmark', JSON.stringify(bookmark.value))
    icon.value.classList.remove('text-warning')
  }
}

const link = (prop) => {
  return `/word/${prop.toLowerCase().trim()}`
}

function hasName(array, word) {
  if(array) {
    return array.some(obj => obj.name === word);
  }
}

onMounted(async () => {
  await assign()
})
</script>

<template>
  <div v-if="dataObject" class="parent">
    <div class="highlight">
      <div class="container-md flex-between py-3">
        <span class="text-capitalize">{{ dataObject.word }}</span>
        <i ref="icon" @click="addBookmark(dataObject.word)" class="bi bi-star-fill" :class="{gold: hasName(bookmark, dataObject.word)}"></i>
      </div>
    </div>
    <div class="container-md my-4">
      <div class="pronun" v-if="sounds.length > 0">
        <h5 class="inter">Pronunciation</h5>
        <ul class="py-2">
          <li class="roboto" v-for="sound in sounds" :key="uniqueId('sound-')">
            {{ sound.text }}
          </li>
        </ul>
      </div>
      <div class="meanings my-4">
        <div v-for="desc in descs" :key="uniqueId('desc-')" class="my-5">
          <h5 class="text-capitalize nunito">{{ desc.partOfSpeech }}</h5>
          <div class="mt-3">
            <ol>
              <li v-for="meaning in desc.definitions" :key="uniqueId('meaning-')" class="my-3">
                <p> {{ meaning.definition }} </p>
                <p v-if="meaning.example" class="text-muted example mt-1 roboto">
                  {{ meaning.example }}
                </p>
              </li>
            </ol>
          </div>
          <div class="small" v-if="desc.synonyms.length > 0">
            <h6 class="mb-1 nunito">Synonyms</h6>
            <ul>
              <li class="small my-1" v-for="syn in desc.synonyms" :key="uniqueId('syn-')">
                <p @click="$emit('find', syn)" class="link roboto">
                  {{ syn }}
                </p>
              </li>
            </ul>
          </div>
          <div class="small" v-if="desc.antonyms.length > 0">
            <h6 class="mb-1 nunito">Antonyms</h6>
            <ul>
              <li class="small my-1" v-for="ant in desc.antonyms" :key="uniqueId('ant-')">
                <p @click="$emit('find', ant)" class="link roboto">
                  {{ ant }}
                </p>
              </li>
            </ul>
          </div>
          <hr>
        </div>
      </div>
      <div class="my-4 text-center">
        <a class="ref-link" :href="url" target="_blank">Learn more about this word </a>
      </div>
    </div>
  </div>
  <div v-else class="container-md my-5 texr-center">Loading data...</div>
</template>

<style scoped>
.highlight {
  color: #fff;
  background: #1156d2;
}

.highlight i {
  font-size: 1.3rem;
}

.example {
  font-size: 0.9rem;
  font-style: italic;
}

.small {
  font-size: 0.9rem;
}

.italic {
  font-style: italic;
}

ul li {
  list-style-type: bullet;
}

ul li p {
  color: var(--primary);
  transition: all 0.3s ease;
}

ul li p:hover {
  color: #111;
  text-decoration: underline;
}

h6 {
  font-size: 0.92rem;
}

.ref-link {
  color: #111;
  text-decoration: underline;
}

.gold {
  color: #f6ca13;
}
</style>
