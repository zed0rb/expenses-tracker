<template>
  <div class="flex items-center justify-between">
    <form aria-label="Transaction" @submit.prevent="createTransaction">
      <div class="space-y-6">
        <FwbHeading tag="h4">Create a new transaction</FwbHeading>

        <!-- Dropdown for selecting transaction type -->
        <div class="mt-6">
          <label for="transaction-type" class="block text-sm font-medium text-gray-700">Transaction Type</label>
          <select
            id="transaction-type"
            v-model="transactionForm.type"
            class="block w-full rounded-md border border-gray-300 p-2"
          >
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>

        <!-- Transaction amount input -->
        <FwbInput
          aria-label="Transaction Amount"
          v-model="amountString"
          label="Transaction Amount"
          placeholder="Enter the transaction amount"
          type="number"
          :min="'0.01'"
          :step="'0.01'"
          @focus="clearOnFocus"
          required
        />

        <!-- Transaction description input -->
        <FwbInput
          aria-label="Transaction Description"
          v-model="transactionForm.description"
          label="Description"
          placeholder="Enter description"
          :minlength="2"
          required
        />
      </div>

      <!-- Display errors if any -->
      <AlertError :message="errorMessage" />

      <div class="mt-6 grid grid-cols-2 items-center gap-3">
        <FwbButton id="transactionBtn" type="submit">Create</FwbButton>
        <RouterLink
          class="text-center text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          :to="{ name: 'Dashboard' }"
        >
          Cancel
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FwbButton, FwbHeading, FwbInput } from 'flowbite-vue'
import { trpc } from '@/trpc'
import useErrorMessage from '@/composables/useErrorMessage'
import AlertError from '@/components/AlertError.vue'

const router = useRouter()

// Form for creating a new transaction
const transactionForm = ref({
  type: 'deposit',
  amount: 0,
  description: '',
  category: '',
})

const amountString = ref(transactionForm.value.amount.toString())

// Update the mutation call
const [createTransaction, errorMessage] = useErrorMessage(async () => {
  transactionForm.value.amount = parseFloat(amountString.value)

  await trpc.transaction.create.mutate(transactionForm.value)

  await router.push({ name: 'Dashboard' })
})

const clearOnFocus = () => {
  if (amountString.value === "0" || amountString.value === "0.00") {
    amountString.value = "";
  }
}
</script>
