import { TRPCError } from '@trpc/server'
import z from 'zod'
import { Transaction } from '@server/entities'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '../provideRepos'

export const transactionIdOwnerProcedure = authenticatedProcedure
  .use(provideRepos({ Transaction }))
  .input(
    z.object({
      transactionId: z.number(),
    })
  )
  .use(async ({ input: { transactionId }, ctx: { authUser, repos }, next }) => {
    const transaction = await repos.Transaction.findOne({
      select: {
        userId: true,
      },
      where: {
        id: transactionId,
      },
    })

    if (!transaction) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Transaction not found',
      })
    }

    if (transaction.userId !== authUser.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Transaction does not belong to the user',
      })
    }

    return next()
  })
