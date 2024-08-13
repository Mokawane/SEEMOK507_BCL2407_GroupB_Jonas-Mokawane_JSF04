<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="mb-60 absolute">
            <img src="/src/assets/online-shop.png" alt="Flowbite-logo" class="h-20 mx-auto"/>
        </div>
      <div class="text-center max-w-sm w-full">
        <h2 class="text-xl font-semibold mb-6 mt-6 text-slate-600">Enter your email to Log in.</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Email*" 
              class="w-full p-3 border border-gray-300 rounded-lg"
              required 
            />
          </div>
          <button 
            type="submit" 
            class="flex float-right bg-cyan-700 text-white rounded-full px-6 py-3 hover:bg-cyan-900 transition">
            Log in
          </button>
        </form>
      </div>
    </div>
  </template>
  