<script lang="ts" setup>
import { trpc } from '@/trpc'
import { onMounted, ref } from 'vue'
import { FwbAlert, FwbButton } from 'flowbite-vue'
import Balance from '@/components/Balance.vue'
import AppHeader from '@/components/AppHeader.vue'
import IncomeExpenses from '@/components/IncomeExpenses.vue'
import TransactionList from '@/components/TransactionList.vue'
import type { TransactionBare } from '@mono/server/src/shared/entities'

const userBalance = ref(0)
const totalDeposit = ref(0)
const totalWithdraw = ref(0)
const transactions = ref<TransactionBare[]>([])
const error = ref('')

// Fetch initial data in onMounted
const fetchData = async () => {
  try {
    const [balance, allTransactions, deposits, withdrawals] = await Promise.all([
      trpc.user.balance.query(),
      trpc.transaction.find.query(),
      trpc.transaction.amount.query({ type: 'deposit' }),
      trpc.transaction.amount.query({ type: 'withdraw' }),
    ]);

    userBalance.value = balance
    transactions.value = allTransactions
    totalDeposit.value = deposits
    totalWithdraw.value = withdrawals
  } catch (err) {
    error.value = 'Failed to fetch data. Please try again later.'
  }
};

onMounted(fetchData);

const deleteTransaction = async (id: number) => {
  try {
    await trpc.transaction.remove.mutate({ id })
    transactions.value = transactions.value.filter((t) => t.id !== id)

    await fetchData(); // Refresh data
  } catch (err) {
    error.value = 'Failed to delete transaction. Please try again later.'
  }
};
</script>

<template>
  <div class="DashboardView">
    <div class="flex flex-col items-center mb-4">
      <AppHeader />
      <Balance :balance="userBalance" />
    </div>
    <IncomeExpenses :incomes="totalDeposit" :expenses="totalWithdraw" />
    <!-- Show error message if any -->
    <FwbAlert v-if="error" class="error-alert">
      {{ error }}
    </FwbAlert>
    <div v-if="transactions.length > 0" data-testid="transactionList">
      <TransactionList :transactions="transactions" @deleteTransaction="deleteTransaction" />
    </div>
    <FwbAlert v-else data-testid="transactionListEmpty">No transactions yet!</FwbAlert>
    <div class="flex flex-col items-center mb-4">
      <FwbButton
        component="RouterLink"
        tag="router-link"
        :href="{ name: 'TransactionCreate' } as any"
        data-testid="createTransaction"
        size="xl"
      >
        Add a new transaction
      </FwbButton>
    </div>
  </div>
</template>

