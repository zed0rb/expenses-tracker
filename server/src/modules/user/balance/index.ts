import {authenticatedProcedure} from '@server/trpc/authenticatedProcedure'
import {User} from '@server/entities/user'
import {TRPCError} from '@trpc/server'

export default authenticatedProcedure.query(
  async ({ ctx: { authUser, db } }) => {
    const userId = authUser.id

    const user = await db.getRepository(User).findOne({
      select: ['balance'],
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `User was not found`,
      })
    }
      return parseFloat(String(user.balance))
  }
)
