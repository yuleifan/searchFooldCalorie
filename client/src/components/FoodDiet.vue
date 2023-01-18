<script setup lang="ts">
import { ref } from 'vue';

let url = 'http://localhost:3001/fooddiet/name/';
let name = '';
const count = ref(0);
let list = ref([]);
const itemRefs = ref([]);
const colorMaps = ['lightblue', 'lavenderblush'];

const getFoods = async () => {
  if (name === '') {
    list.value = [];
    count.value = 0;
  } else {
    fetch(`${url}${name}`)
      .then((res) => res.json())
      .then((data) => {
        list.value = data;
        console.log('list', list.value);
        count.value = 0;
        data.forEach((element) => {
          count.value = count.value + element.calorie;
        });
      });
  }
};

defineProps<{ msg: string }>();
</script>

<template>
  <h3>{{ msg }}</h3>

  <div class="card">
    <div>
      <form>
        <label for="foodname">Name:</label>
        <input
          v-model="name"
          type="text"
          id="foodname"
          placeholder="food name"
        />
        <button type="button" @click="getFoods">Submit</button>
      </form>
    </div>
    <div
      id="foods"
      v-for="(item, index) in list"
      :ref="(el) => itemRefs.push(el)"
    >
      <div id="food">
        <div :style="{ 'background-color': colorMaps[index % 2] }">
          Name:{{ item.name }}
        </div>
        <div :style="{ 'background-color': colorMaps[index % 2] }">
          Calorie:{{ item.calorie }}
        </div>
      </div>
    </div>
    <p>Total calorie: {{ count }}</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

#food {
  width: 300px;
  display: flex;
}

#food div {
  flex: 1;
}
</style>
