
<script setup>
import { reactive, ref, computed } from "vue";
import HistoryList from './HistoryList.vue';
// state
const billAmount = ref(0);
const tipState = reactive({
  percentage: 0,
});
const historyLogs = ref([]);

// updated when anything changes
const tipCalculation = computed(() => {
  return (billAmount.value * tipState.percentage) / 100;
});

// grand total

const gradeTotal = computed(() => {
  return billAmount.value + tipCalculation.value;
});
// reset

const resetBill = () => {
  billAmount.value = 0;
  tipState.percentage = 0;
};

const saveHistory = () => {
  historyLogs.value.push(gradeTotal.value);
};
const removeItem = (index) => {
  historyLogs.value.splice(index, 1);
};
</script>

<template>
  <main>
    <div>
      <h1>Tip Calculator</h1>
      <label>Bill Amount: </label>
      <input
        type="number"
        v-model.number="billAmount"
        placeholder="Bill Amount"
      />
      <label>Tip percentage: </label>
      <select v-model.number="tipState.percentage">
        <option value="10">10%</option>
        <option value="20">20%</option>
        <option value="30">30%</option>
      </select>

      <h2>TotalTips: {{ tipCalculation }}</h2>
      <h2>gradeTotal : {{ gradeTotal }}</h2>
      <button @click="resetBill">Reset Bill</button>
      <!-- save the history -->
      <button @click="saveHistory">Save History</button>
    </div>
    <!-- history logs -->
    <h1>History Logs</h1>
    <ul v-if="historyLogs.length > 0">
      <li v-for="(item, index) in historyLogs" :key="index">
        Save Total Tip: {{ item }}
      </li>
    </ul>
    <p v-else>no history are save here!!</p>
    <hr/>
    <div>
        <HistoryList :historyLogs="historyLogs" @delete-item="removeItem"/>
    </div>
  </main>
</template>
