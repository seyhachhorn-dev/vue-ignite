<script setup>
    // defind prop we expect to receive
    const props = defineProps({
        historyLogs:{
            type: Array,
            required: true
        }
    })

    const emit = defineEmits(['delete-item']);

    const removeItems = (index) =>{
        emit('delete-item',index)
    }

</script>

<template>

    <div>
        <h3>History Logs</h3>
        <ul v-if="props.historyLogs.length > 0">

            <li v-for="(items,index) in props.historyLogs" :key="index">
                Saved Total Tip: {{ items }}
                <button @click="removeItems(index)">Delete</button>
            </li>

        </ul>
        <p v-else>No history available</p>
    </div>



</template>