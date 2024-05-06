import { authContext } from '@tests/utils/context'
import { createTestDatabase } from '@tests/utils/database'
import { fakeTransaction, fakeUser } from '@server/entities/tests/fakes'
import { User } from '@server/entities'
import { router } from '..'
import { transactionIdOwnerProcedure } from '.'

const routes = router({
  testCall: transactionIdOwnerProcedure.query(() => 'passed'),
})

const db = await createTestDatabase()

const [
  {
    transactions: [projectOne],
    ...userOne
  },
  {
    transactions: [projectTwo],
  },
] = await db.getRepository(User).save([
  fakeUser({
    transactions: [fakeTransaction()],
  }),
  fakeUser({
    transactions: [fakeTransaction()],
  }),
])

const authenticated = routes.createCaller(authContext({ db }, userOne))

it('should pass if transaction belongs to the user', async () => {
  const response = await authenticated.testCall({
    transactionId: projectOne.id,
  })

  expect(response).toEqual('passed')
})

it('should throw an error if transactionID is not provided', async () => {
  // casting to any to allow calling without type safe input
  await expect((authenticated.testCall as any)({})).rejects.toThrow(
    /transaction/i
  )
})

it('should throw an error if user provides a non-existing transactionId', async () => {
  // casting to any to allow calling without type safe input
  await expect(
    (authenticated.testCall as any)({ projectId: 999 })
  ).rejects.toThrow(/transaction/i)
})

it('should throw an error if user provides null transactionID', async () => {
  await expect(
    authenticated.testCall({ transactionId: null as any })
  ).rejects.toThrow(/transaction/i)
})

it('should throw an error if transaction does not belong to the user', async () => {
  await expect(
    authenticated.testCall({ transactionId: projectTwo.id })
  ).rejects.toThrow(/transaction/i)
})
