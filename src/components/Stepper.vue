<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  steps: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['change']);

const currentStep = ref(0);

const nextStep = () => {
  if (currentStep.value < props.steps.length - 1) {
    currentStep.value++;
    emit('change', currentStep.value);
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
    emit('change', currentStep.value);
  }
};

// Compute progress percentage for a progress bar
const progress = computed(() => {
  return ((currentStep.value) / (props.steps.length - 1)) * 100;
});
</script>

<template>
  <div class="stepper">
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>

    <div class="steps-header">
      <div 
        v-for="(step, index) in steps" 
        :key="index" 
        class="step-item"
        :class="{ 'active': index === currentStep, 'completed': index < currentStep }"
      >
        <span class="step-number">{{ index + 1 }}</span>
        <span class="step-label">{{ step }}</span>
      </div>
    </div>

    <div class="controls">
      <button @click="prevStep" :disabled="currentStep === 0">Back</button>
      <button @click="nextStep" :disabled="currentStep === steps.length - 1">Next</button>
    </div>
  </div>
</template>

<style scoped>
.progress-container { width: 100%; height: 8px; background: #eee; margin-bottom: 20px; border-radius: 4px; }
.progress-bar { height: 100%; background: #42b983; transition: width 0.3s ease; border-radius: 4px; }
.steps-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
.step-item { opacity: 0.5; text-align: center; }
.step-item.active { opacity: 1; font-weight: bold; color: #42b983; }
.step-item.completed { opacity: 1; color: #2c3e50; }
.step-number { display: block; width: 30px; height: 30px; line-height: 30px; border: 2px solid; border-radius: 50%; margin: 0 auto 5px; }
</style>