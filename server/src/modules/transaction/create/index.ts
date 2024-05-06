import {
  Transaction,
  transactionInsertSchema,
} from '@server/entities/transaction'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { User } from '@server/entities'
import { updateBalance } from './utils/updateBalance'

export default authenticatedProcedure
  .input(transactionInsertSchema.omit({ userId: true }))
  .mutation(async ({ input: transactionData, ctx: { authUser, db } }) => {
    const transaction = {
      ...transactionData,
      userId: authUser.id,
    }

    const user = await db.getRepository(User).findOne({
      where: {
        id: authUser.id,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const updatedUser = updateBalance(
      user,
      transactionData.type,
      transactionData.amount
    )

    const transactionCreated = await db
      .getRepository(Transaction)
      .save(transaction)

    // Save updated user balance
    await db.getRepository(User).save(updatedUser)

    return transactionCreated
  })
