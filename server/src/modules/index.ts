import { router } from '@server/trpc'
import transaction from './transaction'
import user from './user'

export const appRouter = router({
  transaction,
  user,
})

export type AppRouter = typeof appRouter
