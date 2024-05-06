import { authContext } from '@tests/utils/context'
import { Transaction, User } from '@server/entities'
import { fakeTransaction, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import router from '..'

it('should remove a transaction', async () => {
  const db = await createTestDatabase()

  // Create a user and a transaction for testing deletion
  const user = await db.getRepository(User).save(fakeUser())
  const transaction = await db
    .getRepository(Transaction)
    .save(fakeTransaction({ userId: user.id }))

  const { remove } = router.createCaller(authContext({ db }, user))

  const { success } = await remove(transaction)

  expect(success).toBe(true)
})
