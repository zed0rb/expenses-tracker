import { Transaction, transactionSchema } from '@server/entities/transaction'
import type { TransactionBare } from '@server/entities/transaction'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'
import { User } from '@server/entities'

export default authenticatedProcedure
  .input(
    transactionSchema.pick({
      id: true,
    })
  )
  .mutation(async ({ input: { id }, ctx: { authUser, db } }) => {
    const transaction = (await db.getRepository(Transaction).findOne({
      where: { id },
    })) as TransactionBare

    if (!transaction) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Transaction was not found`,
      })
    }

    if (transaction.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `You are not allowed to delete this transaction.`,
      })
    }

    const transactionAmount = transaction.amount
    const isWithdrawal = transaction.type === 'withdraw'

    try {
      // Start a transaction to ensure data consistency
      await db.transaction(async (transactionRunner) => {
        // Update user balance based on transaction type
        if (isWithdrawal) {
          await db
            .getRepository(User)
            .update(
              { id: authUser.id },
              { balance: () => `balance + ${transactionAmount}` }
            )
        } else {
          await db
            .getRepository(User)
            .update(
              { id: authUser.id },
              { balance: () => `balance - ${transactionAmount}` }
            )
        }

        await transactionRunner.getRepository(Transaction).delete(id)
      })

      return {
        success: true,
        message: `Transaction with ID ${id} has been deleted successfully.`,
      }
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `An error occurred while deleting the transaction`,
      })
    }
  })
