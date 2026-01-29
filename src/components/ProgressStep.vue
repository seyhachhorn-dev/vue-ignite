<script setup>
import { ref } from 'vue';

const step = ref(['Step 1', 'Step 2', 'Step 3']);
const currentStep = ref(0);

const nextStep = () => {
  if (currentStep.value < step.value.length - 1) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};
</script>

<template>
  <div>
    <div>
      <div 
        v-for="(s, index) in step" 
        :key="index" 
        :class="{'step-active': index === currentStep}"
      >
        {{ s }}
      </div>
    </div>

    <div class="controls">
      <button 
        @click="nextStep" 
        :disabled="currentStep === step.length - 1"
      >
        Next
      </button>
      
      <button 
        @click="prevStep" 
        :disabled="currentStep === 0"
      >
        Previous
      </button>
    </div>
  </div>
</template>

<style scoped>
.step-active {
  font-weight: bold;
  color: #42b983;
}
.controls {
  margin-top: 20px;
}
</style>