import { TransactionTypes } from '@server/entities/transaction'
import { User } from '@server/entities'
import { fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { updateBalance } from './updateBalance'

describe('update balance', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUser({ balance: 150 }))

  it('should update balance for deposit', () => {
    const updatedUser = updateBalance(user, TransactionTypes.DEPOSIT, 150)
    expect(updatedUser.balance).toBe(300)
  })

  it('should update balance for withdrawal', () => {
    const updatedUser = updateBalance(user, TransactionTypes.WITHDRAW, 50)
    expect(updatedUser.balance).toBe(100)
  })

  it('should throw error for insufficient balance on withdrawal', () => {
    expect(() => {
      updateBalance(user, TransactionTypes.WITHDRAW, 300)
    }).toThrow('Insufficient balance')
  })

  it('should throw error for invalid transaction type', () => {
    expect(() => {
      updateBalance(user, 'INVALID_TYPE', 50)
    }).toThrow('Invalid transaction type')
  })
})
