import type { User } from '@server/entities/user'
import { random } from '@tests/utils/random'
import { Transaction } from '@server/entities'

const randomNumber = () => random.integer({ min: 1, max: 10000000 })

/**
 * Generates a fake user with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeUser = <T extends Partial<User>>(overrides: T = {} as T) => ({
  id: randomNumber(),
  email: random.email(),
  password: 'Password.123!',
  ...overrides,
})

/**
 * Generates a fake project with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeTransaction = <T extends Partial<Transaction>>(
  overrides: T = {} as T
) => ({
  id: randomNumber(),
  type: 'deposit',
  amount: randomNumber(),
  description: random.string(),
  ...overrides,
})
