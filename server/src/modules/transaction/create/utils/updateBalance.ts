import Currency from 'currency.js'
import { TransactionTypes } from '@server/entities/transaction'
import { User } from '@server/entities'

export function updateBalance(user: User, type: string, amount: number): User {
  let balance = Currency(user.balance)
  const transactionAmount = Currency(amount)

  let updatedUser: User

  if (type === TransactionTypes.DEPOSIT) {
    balance = balance.add(transactionAmount)
  } else if (type === TransactionTypes.WITHDRAW) {
    if (balance.value < transactionAmount.value) {
      throw new Error('Insufficient balance')
    }
    balance = balance.subtract(transactionAmount)
  } else {
    throw new Error('Invalid transaction type')
  }

  // Create a new object with the updated balance property
  // eslint-disable-next-line prefer-const
  updatedUser = { ...user, balance: balance.value }

  return updatedUser
}
