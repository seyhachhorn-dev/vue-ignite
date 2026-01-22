<script setup>
// const name = "HelloWorld";
// const num = 42;
// const add = (x,y) => x+y;

const myChannel = "https://www.youtube.com/watch?v=ymXJlPeM-qI";
const img = "https://i.ytimg.com/vi/DsuTwV0jwaY/maxresdefault.jpg";
const altTxt = "vue js image";
const imgWidth = 400;
const imgHeight = 400;

</script>

<template>
    <a v-bind:href="myChannel">Huxu Channel</a>
    <div>
        <a :href="myChannel">Welcome to Vue</a>
        <img
        :src="img"
        :alt="altTxt"
        :width:="imgWidth"
        :height="imgHeight"
        />
    </div>


    <!-- <h1>{{ name }}</h1>
    <h2>{{num}}</h2>
    <h3> 2 + 2 = {{2+2}}</h3>
    <p>Add the Number {{add(2,2)}}</p> -->
</template>