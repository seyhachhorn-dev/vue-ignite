<script setup>
import {ref} from 'vue';
 const passwordLength = ref(12);
 const includeUppercase = ref(true);
 const includeLowercase = ref(true);
 const includeNumbers = ref(true);
const includeSymbols = ref(true);
const generatedPassword = ref('');

const generatePassword = () => {
  const upper = includeUppercase.value ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
  const lower = includeLowercase.value ? 'abcdefghijklmnopqrstuvwxyz' : '';
  const numbers = includeNumbers.value ? '0123456789' : '';
  const symbols = includeSymbols.value ? '!@#$%^&*()_+[]{}|;:,.<>?' : '';
  const allChars = upper + lower + numbers + symbols;
  let password = '';

  for(let i = 0; i< passwordLength.value; i++){

    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];

  }

  generatedPassword.value = password;

};

</script>
<template>
  <div class="min-h-screen bg-black flex items-center justify-center px-4">
    <div
      class="w-full max-w-xl border-4 border-green-500 p-6 shadow-[0_0_25px_#22c55e]
             text-green-400 font-mono"
      style="font-family: 'Press Start 2P', monospace;"
    >
      <!-- Title -->
      <h2 class="text-lg text-center mb-6 tracking-widest">
        PASSWORD CRACKER
      </h2>

      <!-- Length -->
      <div class="mb-4">
        <label class="block mb-2 text-xs">PASSWORD LENGTH</label>
        <input
          type="number"
          v-model="passwordLength"
          min="4"
          max="32"
          class="w-full bg-black border-2 border-green-500 px-3 py-2
                 text-green-400 outline-none focus:shadow-[0_0_10px_#22c55e]"
        />
      </div>

      <!-- Checkboxes -->
      <div class="space-y-3 text-xs">
        <label class="flex items-center gap-3">
          <input type="checkbox" v-model="includeUppercase" class="accent-green-500" />
          INCLUDE UPPERCASE
        </label>

        <label class="flex items-center gap-3">
          <input type="checkbox" v-model="includeLowercase" class="accent-green-500" />
          INCLUDE LOWERCASE
        </label>

        <label class="flex items-center gap-3">
          <input type="checkbox" v-model="includeNumbers" class="accent-green-500" />
          INCLUDE NUMBERS
        </label>

        <label class="flex items-center gap-3">
          <input type="checkbox" v-model="includeSymbols" class="accent-green-500" />
          INCLUDE SYMBOLS
        </label>
      </div>

      <!-- Button -->
      <button
        @click="generatePassword"
        class="w-full mt-6 py-3 border-2 border-green-500
               hover:bg-green-500 hover:text-black transition
               shadow-[0_0_15px_#22c55e]"
      >
        GENERATE
      </button>

      <!-- Output -->
      <div
        v-if="generatedPassword"
        class="mt-6 border-2 border-green-500 p-4 bg-black
               text-xs break-all shadow-[0_0_15px_#22c55e]"
      >
        <p class="mb-2">OUTPUT:</p>
        <p class="text-green-300">{{ generatedPassword }}</p>
      </div>
    </div>
  </div>
</template>
