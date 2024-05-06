import { authContext } from '@tests/utils/context'
import { Transaction, User } from '@server/entities'
import { fakeTransaction, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import router from '..'


it('should return a amount of deposit transactions', async () => {
  const db = await createTestDatabase()

  const user = await db.getRepository(User).save(fakeUser())

  await db
    .getRepository(Transaction)
    .save([
      fakeTransaction({ userId: user.id, amount: 150 }),
      fakeTransaction({ userId: user.id, amount: 100 }),
    ])

  const { amount } = router.createCaller(authContext({ db }, user))

  const userTransactions = await amount({ type: 'deposit' })

  expect(userTransactions).to.equal(250)
})

it('should return a amount of 0 if no transactions found', async () => {
  const db = await createTestDatabase()

  const user = await db.getRepository(User).save(fakeUser())

  const { amount } = router.createCaller(authContext({ db }, user))

  const userTransactions = await amount({ type: 'deposit' })

  expect(userTransactions).to.equal(0)
})

it('should throw an error for invalid transaction type', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUser())

  const { amount } = router.createCaller(authContext({ db }, user))

  await expect(amount({ type: 'invalid_type' })).rejects.toThrow()
})
