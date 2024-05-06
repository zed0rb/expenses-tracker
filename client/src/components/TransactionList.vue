<template>
  <div>
    <h3>Transaction History</h3>

    <select v-model="filterType" @change="applyFilter" class="filter-dropdown">
      <option value="all">All</option>
      <option value="deposit">Deposits</option>
      <option value="withdraw">Withdrawals</option>
    </select>

    <div v-if="filteredTransactions.length === 0" class="no-transactions-message">
      No transactions yet for "{{ filterType }}"
    </div>

    <ul id="list" class="list">
      <li class="header">
        <span class="description">Description</span>
        <span class="amount">Amount</span>
        <span class="type">Type</span>
        <span class="actions">Actions</span>
      </li>
      <li
        v-for="transaction in paginatedTransactions"
        :key="transaction.id"
        :class="transaction.type === 'withdraw' ? 'withdraw' : 'deposit'"
      >
        <span class="description" :title="transaction.description">
          {{ transaction.description }}
        </span>
        <span class="amount">€{{ transaction.amount }}</span>
        <span class="type">{{ transaction.type }}</span>
        <span class="actions">
          <button class="delete-btn" @click="handleDelete(transaction.id)">Delete</button>
        </span>
      </li>
    </ul>

    <div class="pagination" v-if="totalPages > 1">
      <button :disabled="currentPage === 1" @click="previousPage" class="pagination-button">Previous</button>
      <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage" class="pagination-button">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TransactionBare } from '@mono/server/src/shared/entities';

const props = defineProps({
  transactions: {
    type: Array as () => TransactionBare[],
    required: true,
  },
});

const emit = defineEmits(['deleteTransaction']);

const itemsPerPage = 3;
const currentPage = ref(1);

const filterType = ref('all');

const filteredTransactions = computed(() => {
  if (filterType.value === 'all') {
    return props.transactions;
  }

  return props.transactions.filter((transaction) => transaction.type === filterType.value);
});

const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / itemsPerPage);
});

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTransactions.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const handleDelete = (id:number) => {
  emit('deleteTransaction', id);
};

const applyFilter = () => {
  currentPage.value = 1;
};
</script>

<style scoped>
.filter-dropdown {
  margin-bottom: 10px;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: darkred;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.pagination-button {
  margin: 0 10px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 40px;
}

.list li {
  background-color: #fff;
  box-shadow: var(--box-shadow);
  color: #333;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  margin: 10px 0;
  flex-direction: row;
}

.list li.deposit {
  border-left: 5px solid #2ecc71;
}

.list li.withdraw {
  border-left: 5px solid #c0392b;
}

.header {
  font-weight: bold;
}

.actions {
  text-align: right;
}

.description {
  flex: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.amount,
.type,
.actions {
  flex: 1;
}

@media (max-width: 480px) {
  .list li {
    flex-direction: column;
  }

  .delete-btn {
    align-self: flex-end;
  }
}
</style>
