<script setup>

    import {ref, computed} from 'vue';

    const lastName  = ref('Jonh')
    const firstName = ref('Smith')
    const fullName = computed (() =>{
        return firstName.value + '' + lastName.value;
    })
 
  
</script>

<template>
<div>

    <h2>fullName : {{fullName}}</h2>

    <button @click="changeUser">Change User</button>

</div>


</template>