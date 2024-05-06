import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { Transaction, transactionSchema } from '@server/entities/transaction'
import { TRPCError } from '@trpc/server'
import Currency from 'currency.js'

export default authenticatedProcedure
  .input(
    transactionSchema.pick({
      type: true,
    })
  )
  .query(async ({ input: { type }, ctx: { authUser, db } }) => {
    const userId = authUser.id

    if (type !== 'deposit' && type !== 'withdraw') {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Invalid transaction type. Type must be either "deposit" or "withdraw".`,
      })
    }

    const transactions = await db.getRepository(Transaction).find({
      where: { userId, type },
    })

    if (transactions.length === 0) {
      return 0
    }

    const total = transactions.reduce(
      (sum, transaction) => Currency(sum).add(Currency(transaction.amount)),
      Currency(0)
    ).value

    return total
  })
