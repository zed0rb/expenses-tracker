<script setup lang="ts">
defineProps({
  incomes: {
    type: Number,
    required: true,
  },
  expenses: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="inc-exp-container">
    <div>
      <h4>Income</h4>
      <p id="deposit" class="money plus">€{{ parseFloat(String(incomes)).toFixed(2) }}</p>
    </div>
    <div>
      <h4>Expense</h4>
      <p id="withdraw" class="money minus">€{{ parseFloat(String(expenses)).toFixed(2) }}</p>
    </div>
  </div>
</template>

<style scoped>
#deposit {
  color: #2ecc71;
}
#withdraw {
  color: #c0392b;
}

</style>