<script lang="ts" setup>
import { FwbButton } from 'flowbite-vue'
</script>

<template>
  <!-- Enhanced landing page with Tailwind CSS -->
  <div class="bg-gray-100 dark:bg-gray-900 flex justify-center items-center py-10 px-5">
    <div class="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
      <!-- Left content -->
      <div class="flex-1 text-center lg:text-left">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Track Your Expenses Seamlessly
        </h1>

        <p class="mt-4 text-gray-600 dark:text-gray-400 lg:max-w-md">
          Keep track of your expenses, set budgets, and get insights on your spending patterns. Make informed financial decisions with <strong>Expensify</strong>.
        </p>

        <div class="mt-6 flex flex-col lg:flex-row gap-3 justify-center lg:justify-start">
          <FwbButton component="RouterLink" tag="router-link" :href="{ name: 'Signup' } as any">
            Get Started
          </FwbButton>
          <FwbButton
            component="RouterLink"
            tag="router-link"
            color="alternative"
            :href="{ name: 'Login' } as any"
          >
            Log In
          </FwbButton>
        </div>
      </div>

      <!-- Right content (Image or illustration) -->
      <div class="flex-1 flex justify-center">
        <img
          src="https://managingfi.com/wp-content/uploads/2021/07/pexels-photo-5466785-1200x800.jpeg"
          alt="Expense Tracker Illustration"
          class="rounded-md shadow-lg"
        />
      </div>
    </div>
  </div>
</template>


