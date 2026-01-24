<script setup>
import {ref,computed} from 'vue';
const formData = ref({
  name: "",
  email: "",
  password: ""
});


// logic validaiton
const isNameValid = computed(() => formData.value.name.trim() !== '');
const isEmailValid = computed(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(formData.value.email);
});
const isPasswordValid = computed(() => formData.value.password.length >= 8);

const isFormValid = computed(() => isNameValid.value && isEmailValid.value && isPasswordValid.value);   

const handleSubmit = () =>{
    if(isFormValid){
        console.log("Form Submitted", formData.value);
    }else{
        console.log("Form is invalid");
    }
}
 

</script>

<<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      <!-- Title -->
      <h2 class="text-2xl font-bold text-center text-gray-800">
        Create Account
      </h2>

      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          v-model="formData.name"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                 transition
                 "
          :class="isNameValid ? 'border-gray-300 focus:ring-green-400' : 'border-red-400 focus:ring-red-400'"
        />
        <p v-if="!isNameValid" class="mt-1 text-sm text-red-500">
          Name is required
        </p>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          v-model="formData.email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition"
          :class="isEmailValid ? 'border-gray-300 focus:ring-green-400' : 'border-red-400 focus:ring-red-400'"
        />
        <p v-if="!isEmailValid" class="mt-1 text-sm text-red-500">
          Invalid email address
        </p>
      </div>

      <!-- Password -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          v-model="formData.password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition"
          :class="isPasswordValid ? 'border-gray-300 focus:ring-green-400' : 'border-red-400 focus:ring-red-400'"
        />
        <p v-if="!isPasswordValid" class="mt-1 text-sm text-red-500">
          Password must be at least 8 characters
        </p>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="w-full py-2 rounded-lg text-white font-semibold transition
               "
        :class="isFormValid
          ? 'bg-green-500 hover:bg-green-600'
          : 'bg-gray-400 cursor-not-allowed'"
        :disabled="!isFormValid"
      >
        Submit
      </button>
    </form>
  </div>
</template>
