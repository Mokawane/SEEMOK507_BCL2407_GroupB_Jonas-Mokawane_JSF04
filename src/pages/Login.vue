<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { jwtDecode } from 'jwt-decode';

  const username = ref('');
  const password = ref('');
  const step = ref(1);
  const errorMessage = ref('');
  const loadingMessage = ref('');
  const passwordVisible = ref(false);
  const router = useRouter();
  const store = useStore();

  const handleSubmit = async () => {
    if (step.value === 1) {
      try {
        const response = await fetch('https://fakestoreapi.com/users');
        const users = await response.json();
        const user = users.find(user => user.username === username.value);

        if (user) {
          step.value = 2;
          errorMessage.value = '';
        } else {
          errorMessage.value = 'Username not found. Please try again.';
        }
      } catch (error) {
        errorMessage.value = 'An error occurred. Please try again later.';
      }
    } else if (step.value === 2) {
      if (!username.value || !password.value) {
        errorMessage.value = 'Username and password cannot be empty.';
        return;
      }
  
      loadingMessage.value = 'Authenticating...';
  
      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          localStorage.setItem('token', result.token);
          const decoded = jwtDecode(result.token);
          console.log(decoded);
  
          store.dispatch('login', decoded);
  
          errorMessage.value = '';
          loadingMessage.value = '';
          const redirectPath = router.currentRoute.value.query.redirect || '/';
          router.push(redirectPath);
        } else {
          errorMessage.value = 'Login failed. Please check your credentials and try again.';
          loadingMessage.value = '';
        }
      } catch (error) {
        errorMessage.value = 'An error occurred. Please try again later.';
        loadingMessage.value = '';
      }
    }
  };

  const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleLogout = () => {
    localStorage.removeItem('token');
    store.dispatch('logout');
    router.push('/login');
  };
</script>

<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="mb-60 absolute">
            <img src="/src/assets/online-shop.png" alt="Flowbite-logo" class="h-20 mx-auto"/>
        </div>
      <div class="text-center max-w-sm w-full">
        <h2 class="text-xl font-semibold mb-6 mt-6 text-slate-600">{{ step === 1 ? 'Enter your email to Log in.' : 'Enter your password.' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4" v-if="step === 1">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Email*" 
              class="w-full p-3 border border-gray-300 rounded-lg"
              required 
            />
          </div>
          <div class="mb-4" v-if="step === 2">
              <input 
                :type="passwordVisible ? 'text' : 'password'"
                v-model="password" 
                placeholder="Password*" 
                class="w-full p-3 border border-gray-300 rounded-lg"
                required 
              />
              <button 
                type="button" 
                @click="togglePasswordVisibility" 
                class="text-sm text-cyan-700 mt-1">
                {{ passwordVisible ? 'Hide' : 'Show' }} Password
              </button>
            </div>
          <button 
            type="submit"
            class="flex float-right bg-cyan-700 text-white rounded-full px-6 py-3 hover:bg-cyan-900 transition">
            {{ step === 1 ? 'Continue' : 'Log in' }}
          </button>
          <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </template>
  