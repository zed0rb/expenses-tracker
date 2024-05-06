import { router } from '@server/trpc'
import login from './login'
import signup from './signup'
import balance from './balance'

export default router({
  login,
  signup,
  balance,
})
