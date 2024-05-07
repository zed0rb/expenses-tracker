<script setup lang="ts">
defineProps<{
  balance: number
}>()
</script>

<template>
  <h2>Your Balance</h2>
  <h4 class="balance">€{{ parseFloat(String(balance)).toFixed(2) }}</h4>
</template>


