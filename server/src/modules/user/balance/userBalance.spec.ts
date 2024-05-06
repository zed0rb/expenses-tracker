import { authContext } from '@tests/utils/context'
import { Transaction, User } from '@server/entities'
import { fakeTransaction, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import router from '..'
;

it('should return user balance', async () => {
  const db = await createTestDatabase()

  const user = await db.getRepository(User).save(fakeUser({ balance: 100 }))

  await db.getRepository(Transaction).save(fakeTransaction({ userId: user.id }))

  const { balance } = router.createCaller(authContext({ db }, user))
  const userBalance = await balance()


  expect(Number(userBalance)).toBeCloseTo(100, 2);
})
