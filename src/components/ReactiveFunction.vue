<!-- <script setup>

    import {reactive} from 'vue';
    let initialState = reactive({count:0});

    let initialState = reactive({
        count:0,
        user:["Seyha","Huxu"]
    })

    const changeUser = () =>{
        initialState.user[0] = "Cutie";
        initialState.user[1] = "Pudding";
    }
</script>

<template>
<div>
    <h1>Current Count : {{initialState.count}}</h1>
    <h2>Current User : {{initialState.user}}</h2>

    <button @click="initialState.count+=10">Increase Count add 10</button>
    <button @click="changeUser">Change User</button>
    <button @click="initialState.user.push('Jonh Doe')">Add more user</button>

    <h2>this count is : {{initialState.count}}</h2>
    <button @click="initialState.count++">Count</button>

</div>


</template> -->

<!-- <script setup>
import { reactive, ref, computed } from "vue";
// state
const billAmount = ref(200);
const tipPercentage = reactive({
  percentage: 15,
});
// updated when anything changes
const totalTip = computed(() => {
  return (billAmount.value * tipPercentage.percentage) / 100;
});
// reset function

const resetBill = () =>{
    billAmount.value = 0;
    tipPercentage.percentage = 0;
}

</script>

<template>  
  <div>
    <h1>Bill Calculator</h1>
    <h2>Tip percentage : {{tipPercentage.percentage}}</h2>
    <h2>Bill Amount: {{ billAmount }}</h2>
    <h2>Total Tip: {{ totalTip }}</h2>
    <button @click="resetBill">Reset</button>
  </div>
</template> -->

<script setup>
import { reactive, ref, computed } from "vue";
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

const saveHistory = computed(() => {
  historyLogs.value.push(gradeTotal.value);
});
console.log({ historyLogs });
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

    <div></div>
  </main>
</template>
