import { authContext } from '@tests/utils/context'
import { Transaction, User } from '@server/entities'
import { fakeTransaction, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import router from '..'

it('should return a amount of transactions', async () => {
  const db = await createTestDatabase()

  // a pair of users and transaction to make sure we do not return other users' transactions
  const [user, userOther] = await db
    .getRepository(User)
    .save([fakeUser(), fakeUser()])

  await db
    .getRepository(Transaction)
    .save([
      fakeTransaction({ userId: user.id }),
      fakeTransaction({ userId: userOther.id }),
    ])

  const { find } = router.createCaller(authContext({ db }, user))

  const userTransactions = await find()

  expect(userTransactions).toHaveLength(1)
  expect(userTransactions[0]).toMatchObject({
    id: expect.any(Number),
    userId: user.id,

    user: undefined,
  })
})
