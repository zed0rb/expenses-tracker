import { authContext } from '@tests/utils/context'
import { fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import transactionRouter from '..'

it('should create a deposit', async () => {
  // ARRANGE
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUser())
  const { create } = transactionRouter.createCaller(authContext({ db }, user))

  // ACT
  const transactionCreated = await create({
    type: 'deposit',
    amount: 100,
    description: 'random text',
    category: '',
  })

  // ASSERT
  expect(transactionCreated).toMatchObject({
    id: expect.any(Number),
    type: 'deposit',
    amount: 100,
    description: 'random text',
    userId: user.id,
    category: '',
  })
})
