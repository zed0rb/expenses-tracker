import { router } from '@server/trpc'
import create from './create'
import find from './find'
import remove from './remove'
import amount from './amount'

export default router({
  create,
  find,
  remove,
  amount,
})
