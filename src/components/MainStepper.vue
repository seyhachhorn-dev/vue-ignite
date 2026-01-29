<script setup>

import Stepper from './Stepper.vue';

const mySteps = ['Shipping', 'Payment', 'Review', 'Finish'];

const handleStepChange = (index) => {
  console.log("User is now at step:", index);
};
</script>

<template>
  <Stepper :steps="mySteps" @change="handleStepChange" />
</template>